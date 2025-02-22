"use client";

import React from "react";
import { useState } from "react";
import { LyricProps } from "@/app/api/lyrics/route";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type LyricItemProps = {
  data: LyricProps;
  href: string;
  children?: React.ReactNode;
};

const LyricItem: React.FC<LyricItemProps> = ({ data, href, children }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = () => {
    setIsNavigating(true);
  };

  return (
    <li className="text-2xl max-w-[300px] flex justify-center items-center border-b border-emerald-300 hover:border-emerald-500 transition text-white/80 hover:text-white">
      <Link
        href={`${href}/${data.slug}`}
        aria-label={`Lyrics ${data.songName}`}
        onClick={handleNavigation}
        className="flex gap-2 truncate items-center"
      >
        {data.songName}
        {isNavigating && (
          <Loader2 className="w-4 h-4 animate-spin text-gray-300 text-muted-foreground" />
        )}
      </Link>
      {children}
    </li>
  );
};

export default LyricItem;
