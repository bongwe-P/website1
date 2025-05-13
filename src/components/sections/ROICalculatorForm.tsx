'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import Link from 'next/link';

const AUTOMATION_EFFICIENCY_FIXED = 0.80; // 80% fixed automation efficiency

// Define the Zod schema for form validation
const roiFormSchema = z.object({
  numEmployees: z.coerce.number().min(1, "Must be at least 1 employee"),
  hoursPerWeek: z.coerce.number().min(0.1, "Must be at least 0.1 hours"),
  hourlyCost: z.coerce.number().min(1, "Must be at least $1"),
  errorReductionPercentage: z.coerce.number().min(0).max(100).optional(),
  currentMonthlyErrorCost: z.coerce.number().min(0).optional(),
  estimatedBudget: z.coerce.number().min(0).optional(),
  // New sophisticated inputs
  attritionRate: z.coerce.number().min(0).max(100).optional(), // % per year
  onboardingCost: z.coerce.number().min(0).optional(), // $ per employee
  productivityIncreaseFactor: z.coerce.number().min(1.0, "Must be at least 1.0").optional().default(1.0), // e.g., 1.2 for 20% increase
});

type ROIFormValues = z.infer<typeof roiFormSchema>;

interface CalculationResults {
  currentMonthlyHours: number;
  currentMonthlyLaborCost: number;
  currentMonthlyErrorCost: number;
  totalCurrentMonthlyCost: number;
  potentialMonthlyHoursSaved: number;
  maxPotentialMonthlyCostSavings: number;
  annualCostSavingsFromLabor: number;
  annualCostSavingsFromErrors: number;
  annualSavingsFromReducedAttrition?: number;
  annualValueFromProductivityIncrease?: number;
  totalAnnualPotentialValue: number; // Sum of all savings and value gains
  roiPercentage?: number;
  costComparisonChartData: any[];
  cumulativeSavingsTrendData: any[];
  costBreakdownChartData?: any[];
  timeAllocationChartData?: any[];
}

const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const BAR_CHART_COLORS = ['#0088FE', '#00C49F']; // Blue and Green for Bar Chart

export function ROICalculatorForm() {
  const [results, setResults] = useState<CalculationResults | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ROIFormValues>({
    resolver: zodResolver(roiFormSchema),
    defaultValues: {
      numEmployees: 1,
      hoursPerWeek: 5,
      hourlyCost: 25,
      errorReductionPercentage: undefined,
      currentMonthlyErrorCost: undefined,
      estimatedBudget: undefined,
      attritionRate: undefined,
      onboardingCost: undefined,
      productivityIncreaseFactor: 1.0,
    },
  });

  const onSubmit = (data: ROIFormValues) => {
    const weeklyHoursPerTask = data.numEmployees * data.hoursPerWeek;
    const monthlyHoursPerTask = weeklyHoursPerTask * 4.33; // Avg weeks per month
    const currentMonthlyLaborCost = monthlyHoursPerTask * data.hourlyCost;
    const currentMonthlyErrorCost = data.currentMonthlyErrorCost || 0;
    const totalCurrentMonthlyCost = currentMonthlyLaborCost + currentMonthlyErrorCost;

    const potentialMonthlyHoursSaved = monthlyHoursPerTask * AUTOMATION_EFFICIENCY_FIXED;
    const maxPotentialMonthlyCostSavingsFromLabor = potentialMonthlyHoursSaved * data.hourlyCost;
    
    const errorReductionEfficiency = (data.errorReductionPercentage || 0) / 100;
    const potentialMonthlyErrorCostSavings = currentMonthlyErrorCost * errorReductionEfficiency;

    const maxPotentialMonthlyDirectSavings = maxPotentialMonthlyCostSavingsFromLabor + potentialMonthlyErrorCostSavings;
    
    const annualCostSavingsFromLabor = maxPotentialMonthlyCostSavingsFromLabor * 12;
    const annualCostSavingsFromErrors = potentialMonthlyErrorCostSavings * 12;
    let totalAnnualDirectSavings = annualCostSavingsFromLabor + annualCostSavingsFromErrors;

    // Sophisticated Calculations
    let annualSavingsFromReducedAttrition: number | undefined = undefined;
    if (data.attritionRate && data.onboardingCost && data.numEmployees > 0) {
      // Assuming automation reduces attrition for these roles by a fixed percentage (e.g., 10-25% of original attrition)
      const attritionReductionFactor = 0.15; // e.g., AI helps reduce 15% of the attrition problem for these roles
      const numberOfEmployeesAffectedByAttrition = data.numEmployees * (data.attritionRate / 100);
      const employeesRetainedDueToAutomation = numberOfEmployeesAffectedByAttrition * attritionReductionFactor;
      annualSavingsFromReducedAttrition = employeesRetainedDueToAutomation * data.onboardingCost;
      totalAnnualDirectSavings += annualSavingsFromReducedAttrition;
    }

    let annualValueFromProductivityIncrease: number | undefined = undefined;
    if (data.productivityIncreaseFactor && data.productivityIncreaseFactor > 1.0) {
      const hoursReinvested = potentialMonthlyHoursSaved; // Hours saved are now available
      // Value of these hours if applied to tasks with the defined productivity factor
      // This is a simplified model; true value depends on what the reinvested hours produce.
      // Assuming the reinvested hours generate value at the same hourly cost but amplified by the productivity factor.
      const additionalValuePerMonth = (hoursReinvested * data.hourlyCost * (data.productivityIncreaseFactor - 1.0));
      annualValueFromProductivityIncrease = additionalValuePerMonth * 12;
      // Note: This productivity increase is added to total *value*, not direct cost savings for ROI calculation against budget, unless specified.
    }
    
    const totalAnnualPotentialValue = totalAnnualDirectSavings + (annualValueFromProductivityIncrease || 0);

    let roiPercentage: number | undefined = undefined;
    if (data.estimatedBudget && data.estimatedBudget > 0) {
        // ROI based on direct cost savings against budget
      roiPercentage = (totalAnnualDirectSavings / (data.estimatedBudget * 12)) * 100; // Assuming budget is monthly, so annualize it
    }

    const costComparisonChartData = [
      { name: 'Current Monthly Cost', value: totalCurrentMonthlyCost },
      { name: 'Est. Monthly Cost with AI', value: totalCurrentMonthlyCost - maxPotentialMonthlyDirectSavings },
    ];

    const rampUpFactors = [0.3, 0.6, 1.0];
    let cumulativeSavings = 0;
    const cumulativeSavingsTrendData = Array.from({ length: 12 }, (_, i) => {
      const monthFactor = i < rampUpFactors.length ? rampUpFactors[i] : rampUpFactors[rampUpFactors.length -1];
      const monthlySaving = maxPotentialMonthlyDirectSavings * monthFactor;
      cumulativeSavings += monthlySaving;
      return {
        month: `M${i + 1}`,
        savings: cumulativeSavings,
      };
    });

    let costBreakdownChartData: any[] | undefined = undefined;
    if(currentMonthlyErrorCost > 0 || currentMonthlyLaborCost > 0) {
        costBreakdownChartData = [];
        if(currentMonthlyLaborCost > 0) costBreakdownChartData.push({ name: 'Labor Cost', value: currentMonthlyLaborCost });
        if(currentMonthlyErrorCost > 0) costBreakdownChartData.push({ name: 'Error Cost', value: currentMonthlyErrorCost });
    }

    const timeAllocationChartData = [
        { name: 'Time Reclaimed by AI (80%)', value: potentialMonthlyHoursSaved },
        { name: 'Remaining Manual Time', value: monthlyHoursPerTask - potentialMonthlyHoursSaved },
    ];

    setResults({
      currentMonthlyHours: monthlyHoursPerTask,
      currentMonthlyLaborCost,
      currentMonthlyErrorCost,
      totalCurrentMonthlyCost,
      potentialMonthlyHoursSaved,
      maxPotentialMonthlyCostSavings: maxPotentialMonthlyDirectSavings,
      annualCostSavingsFromLabor,
      annualCostSavingsFromErrors,
      annualSavingsFromReducedAttrition,
      annualValueFromProductivityIncrease,
      totalAnnualPotentialValue,
      roiPercentage,
      costComparisonChartData,
      cumulativeSavingsTrendData,
      costBreakdownChartData,
      timeAllocationChartData,
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
      <RevealOnScroll>
        <Card className="shadow-lg bg-secondary">
          <CardHeader>
            <CardTitle>Calculate Your Automation ROI</CardTitle>
            <CardDescription>
              Estimate potential savings & value. AI is assumed to automate 80% of the task time. Fields marked (Optional) can be left blank.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="numEmployees">Number of Employees on Task</Label>
                <Input id="numEmployees" type="number" {...register("numEmployees")} className="mt-1" />
                {errors.numEmployees && <p className="text-sm text-destructive mt-1">{errors.numEmployees.message}</p>}
              </div>
              <div>
                <Label htmlFor="hoursPerWeek">Avg. Hours Spent Per Employee Per Week on This Task</Label>
                <Input id="hoursPerWeek" type="number" step="0.1" {...register("hoursPerWeek")} className="mt-1" />
                {errors.hoursPerWeek && <p className="text-sm text-destructive mt-1">{errors.hoursPerWeek.message}</p>}
              </div>
              <div>
                <Label htmlFor="hourlyCost">Avg. Hourly Cost of Employee ($)</Label>
                <Input id="hourlyCost" type="number" step="0.01" {...register("hourlyCost")} className="mt-1" />
                {errors.hourlyCost && <p className="text-sm text-destructive mt-1">{errors.hourlyCost.message}</p>}
              </div>
              <div>
                <Label htmlFor="currentMonthlyErrorCost">Current Monthly Cost of Errors ($) (Optional)</Label>
                <Input id="currentMonthlyErrorCost" type="number" step="0.01" {...register("currentMonthlyErrorCost")} className="mt-1" placeholder="e.g., 500" />
                {errors.currentMonthlyErrorCost && <p className="text-sm text-destructive mt-1">{errors.currentMonthlyErrorCost.message}</p>}
              </div>
              <div>
                <Label htmlFor="errorReductionPercentage">Estimated Error Reduction by AI (%) (Optional, if error cost &gt; 0)</Label>
                <Input id="errorReductionPercentage" type="number" {...register("errorReductionPercentage")} className="mt-1" placeholder="e.g., 90"/>
                {errors.errorReductionPercentage && <p className="text-sm text-destructive mt-1">{errors.errorReductionPercentage.message}</p>}
              </div>
              <hr/>
              <p className="text-sm text-muted-foreground">Advanced Value Drivers (Optional):</p>
              <div>
                <Label htmlFor="attritionRate">Avg. Employee Attrition Rate for Role (% per year)</Label>
                <Input id="attritionRate" type="number" step="0.1" {...register("attritionRate")} className="mt-1" placeholder="e.g., 15"/>
                {errors.attritionRate && <p className="text-sm text-destructive mt-1">{errors.attritionRate.message}</p>}
              </div>
              <div>
                <Label htmlFor="onboardingCost">Avg. Cost to Onboard New Employee ($)</Label>
                <Input id="onboardingCost" type="number" step="1" {...register("onboardingCost")} className="mt-1" placeholder="e.g., 5000"/>
                {errors.onboardingCost && <p className="text-sm text-destructive mt-1">{errors.onboardingCost.message}</p>}
              </div>
              <div>
                <Label htmlFor="productivityIncreaseFactor">Productivity Factor for Reinvested Hours (e.g., 1.0 = no change, 1.2 = 20% more output)</Label>
                <Input id="productivityIncreaseFactor" type="number" step="0.01" {...register("productivityIncreaseFactor")} className="mt-1" placeholder="e.g., 1.2"/>
                {errors.productivityIncreaseFactor && <p className="text-sm text-destructive mt-1">{errors.productivityIncreaseFactor.message}</p>}
              </div>
              <hr/>
              <div>
                <Label htmlFor="estimatedBudget">Your Est. Monthly Budget for Automation Solution ($) (Optional for ROI %)</Label>
                <Input id="estimatedBudget" type="number" step="0.01" {...register("estimatedBudget")} className="mt-1" placeholder="e.g., 1000" />
                {errors.estimatedBudget && <p className="text-sm text-destructive mt-1">{errors.estimatedBudget.message}</p>}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isSubmitting ? "Calculating..." : "Calculate ROI & Potential Value"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </RevealOnScroll>

      {results && (
        <RevealOnScroll delay={200}>
          <Card className="shadow-lg bg-secondary">
            <CardHeader>
              <CardTitle>Your Estimated Automation Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Key Financial Projections:</h3>
                <ul className="list-disc list-inside space-y-1.5 mt-2 text-muted-foreground">
                  <li>Current Monthly Labor Cost: ${results.currentMonthlyLaborCost.toFixed(2)}</li>
                  {results.currentMonthlyErrorCost > 0 && (
                    <li>Current Monthly Cost of Errors: ${results.currentMonthlyErrorCost.toFixed(2)}</li>
                  )}
                  <li className="font-medium">Total Current Estimated Monthly Operating Cost for Task: ${results.totalCurrentMonthlyCost.toFixed(2)}</li>
                  
                  <li className="text-green-600 font-medium">Potential Monthly Hours Saved (Task Automation at 80%): {results.potentialMonthlyHoursSaved.toFixed(2)} hours</li>
                  <li className="text-green-600 font-medium">Potential Monthly Direct Cost Savings (Labor & Errors): ${(results.maxPotentialMonthlyCostSavings).toFixed(2)}</li>
                  <li className="text-green-500 font-bold text-lg">Total Potential Annual Direct Cost Savings: ${results.annualCostSavingsFromLabor.toFixed(2)} (Labor) + ${results.annualCostSavingsFromErrors.toFixed(2)} (Errors) = ${ (results.annualCostSavingsFromLabor + results.annualCostSavingsFromErrors).toFixed(2) }</li>
                  {results.annualSavingsFromReducedAttrition !== undefined && (
                    <li className="text-sky-600 font-medium">Est. Annual Savings from Reduced Attrition: ${results.annualSavingsFromReducedAttrition.toFixed(2)}</li>
                  )}
                  {results.annualValueFromProductivityIncrease !== undefined && results.annualValueFromProductivityIncrease > 0 && (
                    <li className="text-purple-600 font-medium">Est. Annual Value from Reinvested Hours (Productivity Gain): ${results.annualValueFromProductivityIncrease.toFixed(2)}</li>
                  )}
                   <li className="text-emerald-700 font-bold text-2xl">Total Estimated Annual Potential Value: ${results.totalAnnualPotentialValue.toFixed(2)}</li>
                  {results.roiPercentage !== undefined && (
                    <li className="text-blue-600 font-bold text-2xl">Estimated ROI (Annual Direct Savings vs Annual Budget): {results.roiPercentage.toFixed(1)}%</li>
                  )}
                </ul>
              </div>
              
              {results.costBreakdownChartData && results.costBreakdownChartData.length > 0 && (
                 <div>
                  <h3 className="text-lg font-semibold mt-6 mb-2">Current Monthly Cost Breakdown:</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={results.costBreakdownChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {results.costBreakdownChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {results.timeAllocationChartData && results.timeAllocationChartData.length > 0 && (
                 <div>
                  <h3 className="text-lg font-semibold mt-6 mb-2">Projected Monthly Time Allocation (Post-Automation):</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={results.timeAllocationChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {results.timeAllocationChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `${value.toFixed(1)} hours`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {results.costComparisonChartData.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mt-6 mb-2">Monthly Cost Comparison:</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={results.costComparisonChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, undefined]}/>
                      <Legend />
                      <Bar dataKey="value" name="Cost ($)" >
                        {results.costComparisonChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={BAR_CHART_COLORS[index % BAR_CHART_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {results.cumulativeSavingsTrendData.length > 0 && (
                 <div>
                  <h3 className="text-lg font-semibold mt-6 mb-2">Projected Cumulative Direct Savings (12 Months with Ramp-up):</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={results.cumulativeSavingsTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, undefined]}/>
                      <Legend />
                      <Line type="monotone" dataKey="savings" name="Cumulative Direct Savings ($)" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="mt-10 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  * Disclaimer: These calculations are estimates based on the inputs you provided and common automation scenarios (80% task automation, 15% attrition reduction factor). Actual results can vary significantly.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/80 text-accent-foreground">
                  <Link href={`/contact?service=workflow-automation&message=I've used the ROI calculator. My estimated annual potential value is $${results.totalAnnualPotentialValue.toFixed(2)} (including $${(results.annualCostSavingsFromLabor + results.annualCostSavingsFromErrors).toFixed(2)} direct savings). I'd like to discuss this.`}>
                    Discuss Your Custom Automation Strategy
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </RevealOnScroll>
      )}
    </div>
  );
}
