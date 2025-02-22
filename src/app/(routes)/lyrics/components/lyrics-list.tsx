import { LyricProps } from "@/app/api/lyrics/route";
import LyricItem from "./lyric-item";

const LyricsList = ({ data }: { data: LyricProps[] }) => {
  return (
    <ul className="flex justify-center items-center flex-col mt-4 w-full gap-4">
      {data.map((lyric) => (
        <LyricItem key={lyric.id} data={lyric} href={"/lyrics"} />
      ))}
    </ul>
  );
};

export default LyricsList;
