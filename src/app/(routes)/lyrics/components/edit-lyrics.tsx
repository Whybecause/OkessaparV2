"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Pencil } from "lucide-react";
import Editor from "./editor";
import Quill from "quill";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleErrorClient } from "@/lib/handleErrorClient";

type EditLyricsValues = {
  songName: string;
  content: string;
};

type EditLyricsProps = {
  id: string;
  currentSongName: string;
  content: string;
};

const EditLyrics = ({ id, currentSongName, content }: EditLyricsProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [updatedSongName, setUpdatedSongName] = useState(currentSongName);
  const editorRef = useRef<Quill | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async ({ content }: { content: string }) => {
    try {
      setIsLoading(true);
      editorRef?.current?.enable(false);
      const data: EditLyricsValues = {
        content,
        songName: updatedSongName,
      };

      const hasNoSongName =
        updatedSongName.replace(/<(.|\n)*?>/g, "").trim().length === 0;
      if (hasNoSongName) {
        toast.error("TIIIIITRE");
        return;
      }

      await axios.patch(`/api/lyrics/id/${id}`, data);
      toast.success("Lyrics modifiés");
      setEditorKey((prevKey) => prevKey + 1);
      setIsOpen(false);
      if (currentSongName !== updatedSongName) {
        router.replace(`/lyrics/${updatedSongName}`);
      } else {
        router.refresh();
      }
    } catch (error) {
      handleErrorClient(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="secondary" size="icon">
        <Pencil />
      </Button>

      <Modal
        title="Edit Lyrics"
        description=""
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Input
          type="text"
          defaultValue={currentSongName}
          onChange={(e) => setUpdatedSongName(e.target.value)}
        />

        <Editor
          key={editorKey}
          onSubmit={handleSubmit}
          disabled={isLoading}
          innerRef={editorRef}
          defaultValue={JSON.parse(content)}
        />
      </Modal>
    </>
  );
};

export default EditLyrics;
