import React from "react";
import Image from "next/image";
interface BackgroundWrapperProps {
  children: React.ReactNode;
}

export default function BackgroundWrapper({
  children,
}: BackgroundWrapperProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Image
        alt="Background Image"
        className="opacity-5"
        src="/background.svg"
        objectFit="cover"
        layout="fill"
        quality={100}
        priority
      ></Image>
      <div className="relative z-10 h-scrren overflow-hidden">{children}</div>
    </div>
  );
}
