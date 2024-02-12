'use client';
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    console.log('loading')
    return <main className="w-full h-full ">
    <div className="flex items-center gap-4 justify-center h-12 py-4 border-b border-b-slate-100">
      <Skeleton className="w-[100px] h-4" />
      <Skeleton className="w-[100px] h-4" />
      <Skeleton className="w-[100px] h-4" />
      <Skeleton className="w-[100px] h-4" />
      <Skeleton className="w-[100px] h-4" />
    </div>

    <div className="max-w-2xl flex flex-col items-center mx-auto py-10 gap-12">
          <div className="flex justify-end w-full">
          <Skeleton className="w-8 h-8" />

          </div>
      <Skeleton className="w-full h-8" />

        <div className="w-full flex flex-col gap-4 justify-start">
          <Skeleton className="w-[128px] h-4" />
          <Skeleton className="w-full h-10" />
        </div>

        <div className="w-full flex flex-col gap-4 justify-start">
          <Skeleton className="w-[128px] h-4" />
          <Skeleton className="w-full h-10" />
       <div className="w-full flex gap-3">
          <Skeleton className="h-6 w-6"/>
          <Skeleton className="w-64"/>
       </div>
      </div>

      <div className="w-full flex flex-col gap-4 justify-start">
          <Skeleton className="w-[128px] h-4" />
          <Skeleton className="w-full h-10" />
        </div>

        <div className="w-full flex flex-col gap-4 justify-start">
          <Skeleton className="w-[128px] h-4" />
          <Skeleton className="w-full h-10" />
       <div className="w-full flex gap-3">
          <Skeleton className="h-6 w-6"/>
          <Skeleton className="w-64"/>
       </div>
      </div>
    </div>
  </main>
}