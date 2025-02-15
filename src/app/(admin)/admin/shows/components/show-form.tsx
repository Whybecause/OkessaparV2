import React from "react";
import * as z from "zod";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormReturn } from "react-hook-form";

import { cn } from "@/utils/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
}

const ShowForm: React.FC<ShowFormProps> = ({ form, onSubmit, isLoading }) => {
  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
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
                <Input
                  className="text-black"
                  placeholder="Nom de la salle"
                  {...field}
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
                  className={cn(
                    "text-black w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  )}
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
  );
};

export default ShowForm;
