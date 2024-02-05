"use client";
import CodeMirror, { BasicSetupOptions, Extension, basicSetup } from "@uiw/react-codemirror";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { LanguageName, langNames, langs } from "@uiw/codemirror-extensions-langs";
import { useState } from "react";

export default function Editor() {
  const [language, setLanguage] = useState<LanguageName>('javascript');
  const [extensions, setExtensions] = useState<Extension[]>();
  const [height, setHeight] = useState('200px');

  const [basicSetup, setBasicSetup] = useState<BasicSetupOptions>({
    crosshairCursor: false,
  });

  const handleLangChange = (value: string) => {
    console.log(value);
    setLanguage(value as keyof typeof langs)
  };
  return (
    <>
      <div className="w-full">
        <Select onValueChange={handleLangChange} value={language}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            {langNames.map((lang, idx) => (
              <SelectItem value={lang} key={idx}>
                <span className="capitalize">{lang}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <CodeMirror value={"console.log()"} height={`${height} !important`}extensions={[langs[language]()]} basicSetup={basicSetup}></CodeMirror>
    </>
  );
}
