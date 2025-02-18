"use client";
import React, { useState } from "react";
import axios from "axios";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

import { useConfirm } from "@/hooks/use-confirm";
import { toastError } from "@/utils/error-front";
import { GetShowProps } from "@/app/api/shows/route";

interface DeleteShowFormProps {
  id: string;
  setShows: React.Dispatch<React.SetStateAction<GetShowProps[]>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<string | null>>;
}

const DeleteShowForm: React.FC<DeleteShowFormProps> = ({
  id,
  setShows,
  setOpenMenu,
}) => {
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
      toastError(error);
    } finally {
      setIsDeleting(false);
      setOpenMenu(null);
    }
  };

  return (
    <div>
      <ConfirmDialog />
      <button
        onClick={handleDelete}
        className="flex w-full h-8 justify-start items-center gap-2"
        disabled={isDeleting}
        aria-label="Supprimer"
      >
        <Trash />
        Delete
      </button>
    </div>
  );
};

export default DeleteShowForm;
