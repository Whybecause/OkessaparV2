"use client";

import { useState } from "react";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { handleErrorClient } from "@/utils/handleErrorClient";
import { LyricProps } from "@/app/api/lyrics/route";

const DeleteLyric = ({
  id,
  setLyrics,
}: {
  id: string;
  setLyrics?: React.Dispatch<React.SetStateAction<LyricProps[]>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isDeleting, setIsDeleting] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "Supprimer ce lyric?",
    "Le lyric va être supprimé. Cette action est irréversible."
  );

  const handleDelete = async () => {
    const ok = await confirm();

    if (!ok) {
      return;
    }

    try {
      setIsDeleting(true);
      await axios.delete(`/api/lyrics/id/${id}`);
      toast.success("Lyric supprimé");

      const isSlugPage = /^\/admin\/lyrics\/[^/]+$/.test(pathname);

      if (isSlugPage) {
        router.push("/admin/lyrics");
      } else if (setLyrics) {
        setLyrics((prevItems) => prevItems.filter((item) => item.id !== id));
      }
    } catch (error) {
      handleErrorClient(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Button
        onClick={handleDelete}
        disabled={isDeleting}
        variant="destructive"
        size="icon"
      >
        <Trash />
      </Button>
    </>
  );
};

export default DeleteLyric;
