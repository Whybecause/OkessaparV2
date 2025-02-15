import axios from "axios";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

import Error from "@/components/ui/error";
import { handleErrorServer } from "@/utils/error-front";
import HeaderBack from "@/components/header-back";

const URL = `${process.env.API_URL}/lyrics`;

type tParams = Promise<{ slug: string }>;

const LyricPage = async ({ params }: { params: tParams }) => {
  const { slug } = await params;

  try {
    const { data: lyric } = await axios.get(`${URL}/${slug}`);

    if (lyric.error) {
      return <Error error={lyric.error} />;
    }

    return (
      <>
        <HeaderBack title={lyric.songName} />

        <div
          className="p-4 text-md max-w-3xl break-all flex justify-center items-center mx-auto"
          dangerouslySetInnerHTML={{
            __html: new QuillDeltaToHtmlConverter(
              JSON.parse(lyric.content).ops,
              {}
            ).convert(),
          }}
        />
      </>
    );
  } catch (error: unknown) {
    return handleErrorServer(error, "Failed to get lyrics");
  }
};

export default LyricPage;
