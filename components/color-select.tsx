import { cn } from "@/lib/utils"
import { Control, Controller } from "react-hook-form"

type ColorSelectProps = {
    control: Control;
    className?: string;
    colors: string[];
    name: string;
}
export function ColorSelect({control, className,name, colors}: ColorSelectProps) {


    console.log(colors);

    return <Controller name={name} render={({field}) => (<div className={cn(className, "grid grid-cols-11 grid-rows-1 max-w-[600px] rounded-md")}>
    {colors.map((c, i) => <button style={{backgroundColor: c}} key={i} className="aspect-square hover:rounded-lg hover:m-[1px] animate-in transition-all duration-300"></button>)}
</div>)}>
         
    </Controller>
}