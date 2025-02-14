"use client";
import React, { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";

import ShowForm, { formSchema, ShowsFormValue } from "./show-form";
import { Modal } from "@/components/ui/modal";
import toast from "react-hot-toast";
import { handleErrorClient } from "@/utils/error-front";
import { GetShowProps } from "@/app/api/shows/route";

interface EditShowFormProps {
  id: string;
  initialData: GetShowProps;
  setShows: React.Dispatch<React.SetStateAction<GetShowProps[]>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<string | null>>;
}

const EditShowForm: React.FC<EditShowFormProps> = ({
  id,
  initialData,
  setShows,
  setOpenMenu,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ShowsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      date: initialData.date ? new Date(initialData.date) : null,
    },
  });

  const handleEdit = async (data: ShowsFormValue) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/shows/${id}`, data);
      setShows((prevItems) => {
        const index = prevItems.findIndex(
          (show) => show.id === response.data.id
        );

        let updatedShows;
        if (index !== -1) {
          updatedShows = prevItems.map((show) =>
            show.id === response.data.id ? { ...show, ...response.data } : show
          );
        } else {
          updatedShows = [...prevItems, response.data];
        }

        updatedShows.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        return updatedShows;
      });
      toast.success("Concert modifié");
    } catch (error) {
      handleErrorClient(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      setOpenMenu(null);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full h-8 justify-start items-center gap-2"
      >
        <Pencil />
        Edit
      </button>

      <Modal
        title="Modifier un concert"
        description=""
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setOpenMenu(null);
        }}
      >
        <ShowForm form={form} onSubmit={handleEdit} isLoading={isLoading} />
      </Modal>
    </>
  );
};

export default EditShowForm;
