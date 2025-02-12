"use client";
import React, { useState } from "react";
import axios from "axios";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { handleErrorClient } from "@/utils/handleErrorClient";
import { GetShowProps } from "@/app/api/shows/route";

interface DeleteShowFormProps {
  id: string;
  setShows: React.Dispatch<React.SetStateAction<GetShowProps[]>>;

}

const DeleteShowForm: React.FC<DeleteShowFormProps> = ({ id, setShows }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "Supprimer ce concert?",
    "Le concert va être supprimé. Cette action est irréversible."
  );

  const handleDelete = async () => {
    const ok = await confirm();

    if (!ok) {
      return;
    }

    try {
      setIsDeleting(true);
      await axios.delete(`/api/shows/${id}`);
      setShows((prevItems) => prevItems.filter((item) => item.id !== id));
      toast.success("Concert supprimé");
    } catch (error) {
      handleErrorClient(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <ConfirmDialog />
      <Button
        variant="destructive"
        size="icon"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default DeleteShowForm;
