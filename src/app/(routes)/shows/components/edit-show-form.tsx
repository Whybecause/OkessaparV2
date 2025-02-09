"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";

import ShowForm, { formSchema, ShowsFormValue } from "./show-form";
import { Shows } from "@/app/api/shows/route";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import toast from "react-hot-toast";
import { handleErrorClient } from "@/lib/handleErrorClient";

interface EditShowFormProps {
  id: string;
  data: Shows;
}

const EditShowForm: React.FC<EditShowFormProps> = ({ id, data }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ShowsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...data,
      date: data.date ? new Date(data.date) : null,
    },
  });

  const handleEdit = async (data: ShowsFormValue) => {
    try {
      setIsLoading(true);
      await axios.patch<Shows>(`/api/shows/${id}`, data);
      setIsOpen(false);
      toast.success("Concert modifié");
      router.refresh();
    } catch (error) {
      handleErrorClient(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <Pencil />
      </Button>
      <Modal
        title="Modifier un concert"
        description=""
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ShowForm form={form} onSubmit={handleEdit} isLoading={isLoading} />
      </Modal>
    </>
  );
};

export default EditShowForm;
