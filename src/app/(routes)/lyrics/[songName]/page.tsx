import axios from "axios";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

import BackButton from "@/components/back-button";
import Container from "@/components/ui/container";
import Error from "@/components/ui/error";
import { handleErrorServer } from "@/lib/handleErrorServer";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/lyrics`;

const LyricPage = async ({ params }: { params: { songName: string } }) => {
  const { songName } = await params;

  try {
    const { data: lyric } = await axios.get(`${URL}/${songName}`);

    if (lyric.error) {
      return <Error error={lyric.error} />;
    }

    return (
      <Container>
        <div className="p-8">
          <div className="flex justify-between">
            <BackButton />
            <div className="space-x-2">
              <Button variant="secondary">
                <Pencil />
              </Button>
              <Button variant="destructive">
                <Trash />
              </Button>
            </div>
          </div>
          <h2 className="absolute left-1/2 transform -translate-x-1/2">
            {lyric.songName}
          </h2>
        </div>
        <div
          className="p-4 text-lg font-semibold"
          dangerouslySetInnerHTML={{
            __html: new QuillDeltaToHtmlConverter(
              JSON.parse(lyric.content).ops,
              {}
            ).convert(),
          }}
        />
      </Container>
    );
  } catch (error: unknown) {
    handleErrorServer(error, "Failed to get lyrics");
  }
};

export default LyricPage;
