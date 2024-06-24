'use client';

import { useEventStream } from "@/contexts/EventStreamContextProvider";
import { AppInfoSchema } from "@/types/apps";
import { AppInfoEvent, LambdaEvent, eventSchema } from "@/types/events";
import { useEffect, useState } from "react";
import ProgressBadge from "./ui/ProgressBadge";

 type Props = {
    eventSource: EventSource | string;

}

function isEventSource(event: any): event is EventSource {
    return event instanceof EventSource
}
export default function BuildProgressBar() {
    const eventStream = useEventStream();
    const [events, setEvents] = useState<AppInfoEvent[]>();
    const steps = ['build_image', 'push_image', 'setting_secrets', 'deploying_image', 'setting_up_dashboard'];
    useEffect(() => {
        setEvents(eventStream.filter(event => event.event_type == 'apps').map(e => e as AppInfoEvent))
    }, [eventStream])
    return <div className="flex w-full gap-2">
        <ProgressBadge/>
    </div>
}