"use client";
import { motion } from "framer-motion";

import { LyricProps } from "@/app/api/lyrics/route";
import LyricItem from "./lyric-item";

const LyricsList = ({ data }: { data: LyricProps[] }) => {
  return (
    <motion.ul
      className="flex justify-center items-center flex-col mt-4 w-full gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {data.map((lyric) => (
        <LyricItem key={lyric.id} data={lyric} href={"/lyrics"} />
      ))}
    </motion.ul>
  );
};

export default LyricsList;
