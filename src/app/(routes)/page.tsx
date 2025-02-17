"use client";
import Image from "next/image";

import SocialLinks from "@/components/social-links";
import MotionDiv from "@/components/motion-div";

export default function Home() {
  return (
    <MotionDiv className="flex items-center flex-col justify-center min-h-[calc(100dvh-64px)]">
      <Image src="/logo-full.webp" alt="logo" width={500} height={500} priority layout="intrinsic" />
      <div className="flex gap-x-4">
        <SocialLinks />
      </div>
    </MotionDiv>
  );
}
