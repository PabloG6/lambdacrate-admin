'use client';

import { Logs, logSchema } from "@/types/logs";
import { useEffect, useState } from "react";

export default function LogViewer({id}: {id: string}) {
    const [logs, setLogs] = useState<Logs[]>([])

    useEffect(() => {
        let es: EventSource = new EventSource(`/api/apps/${id}/status`)
      console.log('connecting to event source');
      es.onmessage = (event) => {
        const results = JSON.parse(event.data)
        console.log(results);
        const response = logSchema.safeParse(results);
        if(response.success) {
          setLogs(logs => [...logs, response.data])
        } else {
          console.log(response.error);
        }
      
      }

      es.onerror = (error) => {
        console.log(error);
      }
      return () => {
        es.close();
      };
    }, [id])
    return <div className="">
    {logs.filter(l => l.status != 'init').map((log) => (<div key={log.timestamp}>
       <span>{log.timestamp}</span> <span>{log.log}</span>
    </div>))}
    </div>
}