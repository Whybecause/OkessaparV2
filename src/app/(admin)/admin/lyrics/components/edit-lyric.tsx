"use client";

import dynamic from 'next/dynamic';
import React, { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Quill from "quill";
import toast from "react-hot-toast";
import axios from "axios";
import { Pencil } from "lucide-react";

import Editor from "@/app/(routes)/lyrics/components/editor";
import { toastError } from "@/utils/error-front";
import { LyricProps } from "@/app/api/lyrics/route";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Modal = dynamic(() => import('@/components/ui/modal'));

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
  setLyrics: React.Dispatch<React.SetStateAction<LyricProps[]>>;
};

const EditLyric = ({ data, setLyrics }: EditLyricsProps) => {
  const router = useRouter();
  const pathname = usePathname();

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

      setLyrics((prevItems) => {
        const index = prevItems.findIndex(
          (lyric) => lyric.id === response.data.id
        );

        let updatedLyrics;
        if (index !== -1) {
          updatedLyrics = prevItems.map((lyric) =>
            lyric.id === response.data.id
              ? { ...lyric, ...response.data }
              : lyric
          );
        } else {
          updatedLyrics = [...prevItems, response.data];
        }
        return updatedLyrics;
      });

      const isSlugPage = /^\/admin\/lyrics\/[^/]+$/.test(pathname);

      if (isSlugPage && data.songName !== updatedSongName) {
        router.replace(`/admin/lyrics/${response.data.slug}`);
      }

      toast.success("Lyrics modifiés");
      setEditorKey((prevKey) => prevKey + 1);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="secondary" size="icon" aria-label="Modifier">
        <Pencil />
      </Button>

      <Modal
        title="Modifier les paroles"
        description=""
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex flex-col gap-2">
          <Label className="text-lg font-medium">Titre</Label>
          <Input
            type="text"
            defaultValue={data.songName}
            onChange={(e) => setUpdatedSongName(e.target.value)}
          />

          <Label className="text-lg font-medium">Paroles</Label>
          <Editor
            key={editorKey}
            onSubmit={handleSubmit}
            disabled={isLoading}
            innerRef={editorRef}
            defaultValue={JSON.parse(data.content)}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditLyric;
