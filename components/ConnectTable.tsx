/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6kDM61CvOCt
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import {
  Card,

  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Separator } from "./ui/separator";

export default function Component({ app_id }: { app_id: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Card className="w-full max-w-3xl mx-auto px-4 py-3  text-white">
      <CardContent className="space-y-6 p-3">
        <div className="grid grid-cols-12">
          <div className="col-span-3 flex items-center">API URL</div>
          <div className="col-span-9 flex items-center gap-3">
            <div className="border px-4 py-2 rounded-md text-xs text-muted-foreground overflow-hidden whitespace-nowrap text-ellipsis text-nowrap">
              https://{app_id}-lmdc-be.lambdacrate.com
            </div>
            <Button variant={"outline"} className="h-7 gap-2">
              <span className="text-xs">Copy</span> <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-12">
          <div className="col-span-3 flex items-center">API Key</div>
          <div className="col-span-9  space-y-4">
            <div className="flex items-center gap-3">
            <div className="border px-4 py-2 rounded-md text-xs text-muted-foreground overflow-hidden whitespace-nowrap text-ellipsis text-nowrap">
              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJLaVp2Q05HNUQiLCJuYW1lIjoiSm9obiBEb2UiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjQyNTk5MDAwfQ.QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVo=
            </div>

            <Button variant={"outline"} className="h-7 gap-2">
              <span className="text-xs">Copy</span> <Copy className="w-4 h-4" />
            </Button>
            </div>
            <div className="text-sm text-foreground/80">
              This is the api key for your first test user. Pass this key as a bearer
              token to get authenticated access.
            </div>
          </div>
        </div>
        <Separator />
      </CardContent>
    </Card>
  );
}
