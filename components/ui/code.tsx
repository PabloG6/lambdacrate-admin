"use client";
import * as React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { CopyIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { CodeBlock } from "react-code-block";
import {useCopyToClipboard} from 'react-use';

type Props = {
  code: string;
  lang: string;
  className?: string;
  addCopy?: boolean;
};
export function Code({ code, className, lang, addCopy }: Props) {
  const codeBlock =  buildCodeBlock(code, lang);
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <div className={cn("flex items-center relative w-full")}>
      <ScrollArea className={cn(className)}>
        <div>
          <CodeBlock code={code} language={lang}>
            <CodeBlock.Code className="py-4 px-4">
              <div className="table-row">
                <CodeBlock.LineContent className="table-cell">
                  <CodeBlock.Token />
                </CodeBlock.LineContent>
              </div>
            </CodeBlock.Code>
          </CodeBlock>
        </div>
        {/* <Button size={'icon'} className="absolute py-1.5 px-1.5 top-0 right-0"><CopyIcon></CopyIcon></Button> */}
        <ScrollBar orientation="horizontal"></ScrollBar>
      </ScrollArea>

    </div>
  );
}

async function highlightCode(code: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(code);

  return String(file);
}

export async function buildCodeBlock(code: string, lang: string) {
  return `\`${code}`;
}
