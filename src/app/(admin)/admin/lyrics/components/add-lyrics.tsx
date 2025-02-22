"use client";

import dynamic from 'next/dynamic';
import React, { useRef, useState } from "react";
import axios from "axios";
import "quill/dist/quill.snow.css";
import { Plus } from "lucide-react";
import Quill from "quill";

import { Button } from "@/components/ui/button";
import { toastError } from "@/utils/error-front";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import Editor from "@/app/(routes)/lyrics/components/editor";
import { LyricProps } from "@/app/api/lyrics/route";

const Modal = dynamic(() => import('@/components/ui/modal'));

type CreateLyricsValues = {
  songName: string;
  content: string;
};

const AddLyrics = ({
  setLyrics,
}: {
  setLyrics: React.Dispatch<React.SetStateAction<LyricProps[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const editorRef = useRef<Quill | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [songName, setSongName] = useState("");

  const handleSubmit = async ({ content }: { content: string }) => {
    try {
      setIsLoading(true);
      editorRef?.current?.enable(false);
      const data: CreateLyricsValues = {
        content,
        songName,
      };

      const hasNoSongName =
        songName.replace(/<(.|\n)*?>/g, "").trim().length === 0;
      if (hasNoSongName) {
        toast.error("TIIIIITRE");
        return;
      }

      const response = await axios.post("/api/lyrics", data);
      setLyrics((prevItems) => [...prevItems, response.data]);
      toast.success("Lyrics ajoutés");
      setEditorKey((prevKey) => prevKey + 1);
      setIsOpen(false);
    } catch (error) {
      toastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        aria-label="Ajouter des paroles"
      >
        <Plus />
        Ajouter des lyrics
      </Button>

      <Modal
        title="Nouveau lyrics"
        description=""
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <label className="text-black font-semibold">Titre</label>
        <Input
          type="text"
          className="my-2"
          onChange={(e) => setSongName(e.target.value)}
        />
        <label className="text-black font-semibold">Lyrics</label>

        <Editor
          key={editorKey}
          onSubmit={handleSubmit}
          disabled={isLoading}
          innerRef={editorRef}
        />
      </Modal>
    </>
  );
};

export default AddLyrics;
