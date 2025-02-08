"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Shows } from "@/app/api/shows/route";
import { cn, formatDate } from "@/lib/utils";
import Container from "@/components/ui/container";
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
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const formSchema = z.object({
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

const initialData = {
  country: "France",
  city: "",
  date: null,
  venue: "",
  ticketLink: "",
};

type ShowsFormValue = z.infer<typeof formSchema>;

const ShowsPage = () => {
  const [shows, setShows] = useState<Shows[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get("/api/shows");
        console.log("response", response.data);
        setShows(response.data);
        //eslint-disable-next-line
      } catch (error) {
        console.log("error", error);
        toast.error("Error lors du chargements des dates de concert.");
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  const form = useForm<ShowsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  interface ErrorResponse {
    error: string;
  }

  const onSubmit = async (data: ShowsFormValue) => {
    try {
      const response = await axios.post<Shows>("/api/shows", data);
      setShows((prevShows) => [...prevShows, response.data]);

      setIsOpen(false);
      form.reset(initialData);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError?.response?.data?.error || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <Container>
      <h1>Concerts</h1>
      <Button onClick={() => setIsOpen(true)}>
        <Plus />
        Ajouter un concert
      </Button>
      <Modal
        title="Ajouter un concert"
        description=""
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Form {...form}>
          <form
            className="space-y-8 w-full p-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salle</FormLabel>
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
                    <FormLabel>Ville</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Ville"
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
                    <FormLabel>Pays</FormLabel>
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
                    <FormLabel className="flex pt-2">Date</FormLabel>
                    <FormControl>
                      <ReactDatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
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
            </div>
            <Button disabled={isLoading} type="submit">
              Ajouter
            </Button>
          </form>
        </Form>
      </Modal>

      <Table>
        <TableBody>
          {shows.map((show) => (
            <TableRow key={show.id}>
              <TableCell>{formatDate(show.date)}</TableCell>
              <TableCell>{show.venue}</TableCell>
              <TableCell>
                {show.city}, {show.country}
              </TableCell>
              {show.ticketLink && (
                <TableCell>
                  <Link href={show.ticketLink} target="_blank" rel="noreferrer">
                    <Button>Billets</Button>
                  </Link>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ShowsPage;
