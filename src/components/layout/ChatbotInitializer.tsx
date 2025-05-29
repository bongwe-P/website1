"use client";

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export function ChatbotInitializer() {
  useEffect(() => {
    const timer = setTimeout(() => {
      createChat({
        webhookUrl: 'https://primary-production-155f.up.railway.app/webhook/5292a909-86c9-419e-8f0e-4c9a06e062ea/chat',
        initialMessages: [
          "How can I help you today 😊?"
        ],
        i18n: {
          en: {
            title: 'Fortune AI Assistant',
            subtitle: 'Book a consultation or ask any question you.',
            footer: '',
            getStarted: 'New conversation',
            inputPlaceholder: 'Input text here...',
            closeButtonTooltip: ""
          },
        },
      });
    }, 5000); //5 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  return null; // This component doesn't render anything itself
}
