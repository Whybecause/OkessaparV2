"use client";
import Image from "next/image";

import SocialLinks from "@/components/social-links";

export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <Image src="/logoname.jpg" alt="logo" width={500} height={500} />
      </div>
      <div className="flex justify-center space-x-4">
        <SocialLinks />
      </div>
    </>
  );
}
