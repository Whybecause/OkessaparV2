import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import ShowForm, { formSchema, ShowsFormValue } from "./show-form";
import { Shows } from "@/app/api/shows/route";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { handleError } from "@/lib/utils";

const initialData = {
  country: "France",
  city: "",
  date: null,
  venue: "",
  ticketLink: "",
};

interface AddShowFormProps {
  setShows: React.Dispatch<React.SetStateAction<Shows[]>>;
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
      const response = await axios.post<Shows>("/api/shows", data);
      setShows((prevShows) => [...prevShows, response.data]);
      setIsOpen(false);
      toast.success("Date ajoutée");
      form.reset(initialData);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsOpen(true)} variant="outline">
          <Plus />
          Ajouter un concert
        </Button>
      </div>

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
