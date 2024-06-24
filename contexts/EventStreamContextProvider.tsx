import { LambdaEvent, eventSchema } from "@/types/events";
import { createContext, useContext, useEffect, useState } from "react";

const EventStreamContext = createContext<LambdaEvent[]>([])
export const useEventStream = () => {
    return useContext(EventStreamContext);
  };
export default function EventStreamContextProvider({children, url} : {children: React.ReactNode, url: string}) {
    const [events, setEvents] = useState<LambdaEvent[]>([])
    useEffect(() => {
        const es = new EventSource(url);
        es.onmessage = (event) => {
            const results = JSON.parse(event.data);
            const {success, data} = eventSchema.safeParse(results);
            if(success) {
                setEvents(events => [...events, data])

            }
        }
    }, [url])
    return <EventStreamContext.Provider value={events}>
    {children}
    </EventStreamContext.Provider>

    
}