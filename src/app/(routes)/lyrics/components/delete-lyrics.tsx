"use client";

import { useState } from "react";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handleErrorClient } from "@/lib/handleErrorClient";

const DeleteLyrics = ({ id }: { id: string }) => {
  const router = useRouter();
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
      router.push("/lyrics");
      //eslint-disable-next-line
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

export default DeleteLyrics;
