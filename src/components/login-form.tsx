"use client";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { app } from "@/lib/firebase/db-client";
import { handleErrorClient } from "@/utils/error-front";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CircleUserRound } from "lucide-react";
import { Modal } from "./ui/modal";

const formSchema = z.object({
  email: z.string().min(1, "Email est requis"),
  password: z.string().min(1, "Password est requis"),
});

type LoginFormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const router = useRouter();
  const auth = getAuth(app);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;
      const idToken = await user.getIdToken();

      await axios.post("/api/login", JSON.stringify({ token: idToken }));
      window.location.reload();
      router.push("/admin");
    } catch (error) {
      handleErrorClient(error);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <CircleUserRound />
      </button>

      <Modal
        title="Login"
        description=""
        isOpen={isOpen}
        className="max-w-[400px]"
        onClose={() => setIsOpen(false)}
      >
        <Form {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="text-black" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="text-black" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit" className="w-full mt-4">
              Connexion
            </Button>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default LoginForm;
