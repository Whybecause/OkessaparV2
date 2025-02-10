"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import ShowForm, { formSchema, ShowsFormValue } from "./show-form";
import { Shows } from "@/app/api/shows/route";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { handleErrorClient } from "@/utils/handleErrorClient";

const initialData = {
  country: "France",
  city: "",
  date: null,
  venue: "",
  ticketLink: "",
};

const AddShowForm = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ShowsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: ShowsFormValue) => {
    try {
      setIsLoading(true);
      await axios.post<Shows>("/api/shows", data);
      setIsOpen(false);
      toast.success("Date ajoutée");
      form.reset(initialData);
      router.refresh();
    } catch (error) {
      handleErrorClient(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        <Button onClick={() => setIsOpen(true)} variant="outline">
          <Plus />
          Ajouter un concert
        </Button>

      <Modal
        title="Ajouter un concert"
        description=""
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ShowForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </Modal>
    </>
  );
};

export default AddShowForm;
