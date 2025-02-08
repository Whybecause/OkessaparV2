import React, { useState } from "react";
import axios from "axios";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

import { Shows } from "@/app/api/shows/route";
import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { handleErrorClient } from "@/lib/handleErrorClient";

interface DeleteShowFormProps {
  id: string;
  setShows: React.Dispatch<React.SetStateAction<Shows[]>>;
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
      setShows((prev) => prev.filter((show) => show.id !== id));
      toast.success("Concert supprimé");
      //eslint-disable-next-line
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
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default DeleteShowForm;
