// import axios from "axios";
// import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

// import BackButton from "@/components/back-button";
// import Error from "@/components/ui/error";
import { handleErrorServer } from "@/utils/handleErrorServer";
// import EditLyrics from "../components/edit-lyrics";
// import DeleteLyrics from "../components/delete-lyrics";

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/lyrics`;

// type tParams = Promise<{ songName: string }>;

const LyricPage = async () => {
// const LyricPage = async ({ params }: { params: tParams }) => {
  // const { songName } = await params;

  try {
    // const { data: lyric } = await axios.get(`${URL}/${songName}`);

    // if (lyric.error) {
    //   return <Error error={lyric.error} />;
    // }

    return (
      <div>p</div>
      // <>
      //   <div className="p-8">
      //     <div className="flex justify-between">
      //       <BackButton />
      //       <div className="space-x-2">
      //         <EditLyrics
      //           id={lyric.id}
      //           currentSongName={songName}
      //           content={lyric.content}
      //         />
      //         <DeleteLyrics id={lyric.id} />
      //       </div>
      //     </div>
      //     <h2 className="absolute left-1/2 transform -translate-x-1/2">
      //       {lyric.songName}
      //     </h2>
      //   </div>
      //   <div
      //     className="p-4 text-lg font-semibold"
      //     dangerouslySetInnerHTML={{
      //       __html: new QuillDeltaToHtmlConverter(
      //         JSON.parse(lyric.content).ops,
      //         {}
      //       ).convert(),
      //     }}
      //   />
      // </>
    );
  } catch (error: unknown) {
    return handleErrorServer(error, "Failed to get lyrics");
  }
};

export default LyricPage;
