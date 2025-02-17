import React from "react";
import Link from "next/link";

import { LyricProps } from "@/app/api/lyrics/route";

type LyricItemProps = {
  data: LyricProps;
  href: string;
  children?: React.ReactNode;
};
const LyricItem: React.FC<LyricItemProps> = ({ data, href, children }) => {
  return (
    <li className="max-w-[300px] flex justify-center border-b border-emerald-300 hover:border-emerald-500 transition text-white/80 hover:text-white">
      <Link href={`${href}/${data.slug}`} className="text-2xl truncate" aria-label="Accéder aux paroles">
        {data.songName}
      </Link>
      {children}
    </li>
  );
};

export default LyricItem;
