import axios from "axios";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

import Error from "@/components/ui/error";
import { handleErrorServer } from "@/utils/error-front";
import HeaderBack from "@/components/header-back";

const API_URL = `${process.env.API_URL}`;

type tParams = Promise<{ slug: string }>;

export const generateMetadata = async ({
  params,
}: {
  params: tParams;
}) => {
  const { slug } = await params;

  try {
    const {
      data: { songName },
    } = await axios.get(`${API_URL}/lyrics/${slug}?filter=songName`);
    return {
      title: `${songName} | Okessapar`,
      description: `Les paroles du morceau ${songName}`,
    };
  } catch (error: unknown) { //eslint-disable-line
    return {
      title: "Chanson introuvable | Okessapar",
      description: "Désolé, les paroles de ce morceau ne sont pas disponibles.",
    };
  }
};


const LyricPage = async ({ params }: { params: tParams }) => {
  const { slug } = await params;

  try {
    const { data: lyric } = await axios.get(`${API_URL}/lyrics/${slug}`);

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
