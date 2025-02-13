"use client";
import Image from "next/image";

import SocialLinks from "@/components/social-links";
import MotionDiv from "@/components/motion-div";

export default function Home() {
  return (
    <MotionDiv className="flex items-center flex-col justify-center min-h-[calc(100vh-64px)]">
      <Image src="/logoname.jpg" alt="logo" width={500} height={500} />
      <div className="flex gap-x-4">
        <SocialLinks />
      </div>
    </MotionDiv>
  );
}
