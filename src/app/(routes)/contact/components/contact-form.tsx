"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { Mail, User } from "lucide-react";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toastError } from "@/utils/error-front";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().min(1, "Le mail est requis"),
  message: z.string().min(1, "Le message est requis"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleSubmit = async (data: ContactFormValues) => {
    try {
      setIsLoading(true);
      emailjs.init({
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      });

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        data
      );
      toast.success("Message envoyé");
    } catch (error) {
      toastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow px-4 pb-4">
      <div className="w-full max-w-4xl bg-gray-900/50 backdrop-blur-lg p-4 sm:p-8 rounded-2xl shadow-lg flex flex-col md:flex-row">
        {/* Colonne Gauche - Infos */}
        <div className="md:w-1/2 p-6 flex flex-col">
          <h2 className="text-3xl font-bold text-white">
            Réservations et Contact
          </h2>

          <div className="mt-6 ">
            <p className="text-gray-300 mt-2">
              Une question ou un projet ? Remplissez le formulaire et nous vous
              répondrons rapidement.
            </p>
          </div>
        </div>

        {/* Colonne Droite - Formulaire */}
        <div className="md:w-1/2 p-6">
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <FormControl>
                        <Input
                          type="text"
                          className="text-white pl-10 bg-gray-700 border-none"
                          placeholder="Votre Nom"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <FormControl>
                        <Input
                          type="text"
                          className="text-white pl-10 bg-gray-700 border-none"
                          placeholder="Votre Email"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-white bg-gray-700 border-none"
                        placeholder="Votre Message"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                variant="primary"
                aria-label="Envoyer"
                disabled={isLoading}
                type="submit"
                className="w-full mt-4"
              >
                Envoyer
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
