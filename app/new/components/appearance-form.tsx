import { ColorSelect } from "@/components/color-select";
import { FormField } from "@/components/ui/form";
import { getAllDefaultColors } from "@/lib/util/colors";
import { AppInfo } from "@/lib/util/types";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-select";
import { Check } from "lucide-react";
import React from "react";
import { ReactElement, JSXElementConstructor } from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";

type AppearanceFormProps = {
  control: Control<AppInfo, any, AppInfo>;
};

export const AppearanceForm = ({ control }: AppearanceFormProps) => {
  const colors = getAllDefaultColors();
  return (
    <div className="space-y-4">
      <Controller
        render={({ field }) => (
         <>
         <div className="py-3 font-medium text-sm ">Primary Color</div>
          <div
            className={cn(
              "grid grid-cols-11 grid-rows-1 max-w-[600px] rounded-md"
            )}
          >
            {colors.map((c, i) => (
              <button
                type="button"
                onClick={() => {
                 
                  field.onChange(c);
                }}
                style={{ backgroundColor: c }}
                key={i}
                className={`aspect-square  flex items-center justify-center ${field.value == c ? 'rounded-full hover:rounded-full hover:m-[2px] m-[1px]': 'hover:rounded-lg hover:m-[1px]'}`}
              >
                <Check className={cn(`text-white`, `${field.value == c ? 'visible': 'invisible'} `)}/>
              </button>
            ))}
          </div></>
        )}
        name={"primary_color"}
      ></Controller>
      <Controller
        render={({ field }) => (
          <div className="">
            <div className="text-sm font-medium py-3">Secondary Color</div>
            <div
            className={cn(
              "grid grid-cols-11 grid-rows-1 max-w-[600px] rounded-md"
            )}
          >
            {colors.map((c, i) => (
             <button
             type="button"
             onClick={() => {
              
               field.onChange(c);
             }}
             style={{ backgroundColor: c }}
             key={i}
             className={`aspect-square  flex items-center justify-center ${field.value == c ? 'rounded-full hover:rounded-full hover:m-[2px] m-[1px]': 'hover:rounded-lg hover:m-[1px]'}`}
           >
             <Check className={cn(`text-white`, `${field.value == c ? 'visible': 'invisible'} `)}/>
           </button>
            ))}
          </div>
 </div>
          )}
        name={"secondary_color"}
      ></Controller>
    </div>
  );
};
