"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import ShowForm, { formSchema, ShowsFormValue } from "./show-form";
import { Button } from "@/components/ui/button";
import { toastError } from "@/utils/error-front";
import { GetShowProps } from "@/app/api/shows/route";

const initialData = {
  country: "France",
  city: "",
  date: null,
  venue: "",
  ticketLink: "",
};

interface AddShowFormProps {
  setShows: React.Dispatch<React.SetStateAction<GetShowProps[]>>;
}

const AddShowForm: React.FC<AddShowFormProps> = ({ setShows }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ShowsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: ShowsFormValue) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/shows", data);
      setIsOpen(false);
      setShows((prevItems) => {
        const updatedShows = [...prevItems, response.data];
        updatedShows.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        return updatedShows;
      });
      toast.success("Date ajoutée");
      form.reset(initialData);
    } catch (error) {
      toastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline" aria-label="Ajouter un concert">
        <Plus />
        Ajouter un concert
      </Button>

      <ShowForm
        modalTitle={"Ajouter un concert"}
        modalDescription={""}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </>
  );
};

export default AddShowForm;
