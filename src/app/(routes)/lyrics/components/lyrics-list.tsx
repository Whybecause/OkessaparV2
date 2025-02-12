import { LyricProps } from "@/app/api/lyrics/route";
import LyricItem from "./lyric-item";

const LyricsList = ({ data }: { data: LyricProps[] }) => {
  return (
    <>
      {data.map((lyric) => (
        <LyricItem key={lyric.id} data={lyric} href={"/lyrics"}/>
      ))}
    </>
  );
};

export default LyricsList;
