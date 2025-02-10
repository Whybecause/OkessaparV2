"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { handleErrorClient } from "@/utils/handleErrorClient";

interface DeleteShowFormProps {
  id: string;
}

const DeleteShowForm: React.FC<DeleteShowFormProps> = ({ id }) => {
  const router = useRouter();
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
      toast.success("Concert supprimé");
      router.refresh();
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
