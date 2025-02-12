"use client";
import Image from "next/image";

import SocialLinks from "@/components/social-links";

export default function Home() {
  return (
    <div className="h-full w-full items-center flex flex-col justify-center gap-y-2">
      <Image src="/logoname.jpg" alt="logo" width={500} height={500} />
      <div className="flex gap-x-4">
        <SocialLinks />
      </div>
    </div>
  );
}
