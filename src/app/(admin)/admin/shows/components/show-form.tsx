"use client";
import React, { useState } from "react";
import * as z from "zod";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormReturn } from "react-hook-form";

import AutoSuggest from "@/components/auto-suggest";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Modal } from "@/components/ui/modal";
import { DISCOVERY_VENUE_PROPS } from "@/app/api/admin/music/venues/route";

const DatePickerButton = ({
  value,
  onClick,
}: {
  value?: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-300 hover:text-gray-700 transition cursor-pointer"
  >
    {value ? `📅 ${value}` : "Pick a date"}
  </div>
);

export const formSchema = z.object({
  country: z.string().min(1, "Le pays est requis"),
  city: z.string().min(1, "La ville est requise"),
  date: z
    .date()
    .nullable()
    .refine(
      (val) => {
        if (val === null) return false;
        return !isNaN(val.getTime());
      },
      {
        message: "La date est requise",
      }
    ),
  venue: z.string().min(1, "Le nom de la salle est requis"),
  ticketLink: z.string(),
});

export type ShowsFormValue = z.infer<typeof formSchema>;

interface ShowFormProps {
  form: UseFormReturn<ShowsFormValue>;
  onSubmit: (data: ShowsFormValue) => void;
  isLoading: boolean;
  modalTitle: string;
  modalDescription: string;
  isOpen: boolean;
  onClose: () => void;
}

const ShowForm: React.FC<ShowFormProps> = ({
  form,
  onSubmit,
  isLoading,
  modalTitle,
  modalDescription,
  isOpen,
  onClose,
}) => {
  const venueQuery = form.watch("venue");
  const [cachedData, setCachedData] = useState<DISCOVERY_VENUE_PROPS[]>([]);

  const onVenueSelect = (venue: DISCOVERY_VENUE_PROPS): void => {
    form.setValue("venue", venue.name);
    form.setValue("country", venue.country.name);
    form.setValue("city", venue.city.name);
  };

  return (
    <Modal
      title={modalTitle}
      description={modalDescription}
      isOpen={isOpen}
      onClose={onClose}
      disableEscape={cachedData.length > 0}
    >
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Salle
                  <span className="text-red-500">*</span>
                </FormLabel>

                <FormControl>
                  <AutoSuggest
                    getDisplayData={(venue: DISCOVERY_VENUE_PROPS) =>
                      `${venue?.name} - ${venue?.city?.name}, ${venue?.country?.name} ${venue?.postalCode}`
                    }
                    placeholder="Nom de la salle"
                    field={field}
                    inputQuery={venueQuery}
                    onVenueSelect={onVenueSelect}
                    apiUrl={"/api/admin/music/venues?keyword="}
                    cachedData={cachedData}
                    setCachedData={setCachedData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Ville
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    placeholder="Ville de l'évènement"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Pays
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    placeholder="Pays de l'évènement"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ticketLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Link</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    placeholder="Lien d'achat des billets"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex pt-2">
                  Date
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <ReactDatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    placeholderText="Date de l'évènement"
                    onKeyDown={(e) => {
                      if (e.key !== "Tab" && e.key !== "Enter") {
                        e.preventDefault(); // Empêche toute saisie manuelle sauf Tab et Enter
                      }
                      if (e.key === "Enter") {
                        if (
                          document.activeElement?.getAttribute(
                            "aria-haspopup"
                          ) === "true"
                        ) {
                          e.preventDefault(); // Ferme le calendrier si ouvert
                          (document.activeElement as HTMLElement).blur();
                        } // Sinon laisse la touche enter valider le form
                      }
                    }}
                    customInput={<DatePickerButton />}
                    dateFormat="dd/MM/yyyy"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" className="w-full">
            Ajouter
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default ShowForm;
