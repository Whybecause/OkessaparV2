"use client";

import { useState } from "react";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { toastError } from "@/utils/error-front"
;
import { LyricProps } from "@/app/api/lyrics/route";

const DeleteLyric = ({
  id,
  setLyrics,
  songName
}: {
  id: string;
  setLyrics?: React.Dispatch<React.SetStateAction<LyricProps[]>>;
  songName: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isDeleting, setIsDeleting] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
    `Supprimer ${songName} ?`,
    "Les paroles vont être supprimées. Cette action est irréversible."
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
      toastError(error);
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
        aria-label="Supprimer"
      >
        <Trash />
      </Button>
    </>
  );
};

export default DeleteLyric;
