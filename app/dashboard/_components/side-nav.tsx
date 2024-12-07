"use client";

import Link from "next/link";

type Props = {
  links: { name: string; link: string }[];
};
export default function SideNav({ links }: Props) {
  return (
    <div className="flex flex-col items-start">
      {links.map((link) => {
        return (
          <Link
            className="font-medium py-2 hover:font-semibold text-muted-foreground hover:text-foreground"
            key={link.link}
            href={link.link}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
