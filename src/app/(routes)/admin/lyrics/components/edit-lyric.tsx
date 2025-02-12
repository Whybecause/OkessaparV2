"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Pencil } from "lucide-react";
import Quill from "quill";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleErrorClient } from "@/utils/handleErrorClient";
import Editor from "@/app/(routes)/lyrics/components/editor";
import { LyricProps } from "@/app/api/lyrics/route";

type EditLyricsValues = {
  songName: string;
  content: string;
};

type EditLyricsProps = {
  data: {
    id: string;
    songName: string;
    content: string;
    slug: string;
  };
  setLyric: React.Dispatch<React.SetStateAction<LyricProps>>;
};

const EditLyric = ({ data, setLyric }: EditLyricsProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [updatedSongName, setUpdatedSongName] = useState(data.songName);
  const editorRef = useRef<Quill | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async ({ content }: { content: string }) => {
    try {
      setIsLoading(true);
      editorRef?.current?.enable(false);

      const updatedData: EditLyricsValues = {
        content,
        songName: updatedSongName,
      };

      const hasNoSongName =
        updatedSongName.replace(/<(.|\n)*?>/g, "").trim().length === 0;
      if (hasNoSongName) {
        toast.error("TIIIIITRE");
        return;
      }

      const response = await axios.patch(
        `/api/lyrics/id/${data.id}`,
        updatedData
      );

      setLyric((prevItems) => ({
        ...prevItems,
        songName: response.data.songName,
        slug: response.data.slug,
        content: response.data.content,
      }));

      if (data.songName !== updatedSongName) {
        router.replace(`/admin/lyrics/${response.data.slug}`)
      }
      toast.success("Lyrics modifiés");
      setEditorKey((prevKey) => prevKey + 1);
      setIsOpen(false);
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
          defaultValue={data.songName}
          onChange={(e) => setUpdatedSongName(e.target.value)}
        />

        <Editor
          key={editorKey}
          onSubmit={handleSubmit}
          disabled={isLoading}
          innerRef={editorRef}
          defaultValue={JSON.parse(data.content)}
        />
      </Modal>
    </>
  );
};

export default EditLyric;
