import React, { useState } from "react";
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
  setShows: React.Dispatch<React.SetStateAction<Shows[]>>;
}

const EditShowForm: React.FC<EditShowFormProps> = ({ id, data, setShows }) => {
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
      const response = await axios.patch<Shows>(`/api/shows/${id}`, data);

      setShows((prev) => {
        const updatedShows = prev.map((show) =>
          show.id === id
            ? {
                ...show,
                ...response.data,
              }
            : show
        );

        updatedShows.sort((a, b) => {
          // Convertir les dates en objets Date et les comparer avec getTime()
          const dateA = a.date instanceof Date ? a.date.getTime() : new Date(a.date).getTime();
          const dateB = b.date instanceof Date ? b.date.getTime() : new Date(b.date).getTime();

          return dateA - dateB;
        });

        return updatedShows;
        });
      setIsOpen(false);
      toast.success("Concert modifié");
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
