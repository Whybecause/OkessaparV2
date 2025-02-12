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
    <div className="py-4 relative flex flex-row items-center">
      <Link
        href={`${href}/${data.slug}`}
        className="text-2xl underline decoration-emerald-300 transform absolute left-1/2 -translate-x-1/2"
      >
        {data.songName}
      </Link>
      {children}
    </div>
  );
};

export default LyricItem;
