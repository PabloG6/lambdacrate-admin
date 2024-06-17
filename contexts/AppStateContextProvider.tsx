'use client';
import { AppStatSchema } from '@/types/apps';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { z } from 'zod';

// Create a context for the EventSource
const AppStateContext = createContext<z.infer<typeof AppStatSchema> | undefined>(undefined);

export const useAppState = () => {
  return useContext(AppStateContext);
};

export const AppStateContextProvider = ({children, app_id}: {app_id: string, children: React.ReactNode}) => {
  const [appState, setAppState] = useState<z.infer<typeof AppStatSchema> | undefined>(undefined);
  useEffect(() => {
    const es = new EventSource(`/api/apps/${app_id}/status`);
    
    es.onmessage = (event) => {
      console.log('Message received:', event.data);
      console.log(JSON.parse(event.data));
      setAppState(AppStatSchema.parse(JSON.parse(event.data)));
    };

    es.onerror = (error) => {
      console.error('EventSource error:', error);
    };


    // Clean up the EventSource on unmount
    return () => {
      console.log('closing event source');
      es.close();
    };
  }, [app_id]);

  return (
    <AppStateContext.Provider value={appState}>
      {children}
    </AppStateContext.Provider>
  );
};
