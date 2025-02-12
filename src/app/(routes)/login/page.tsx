"use client";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { app } from "@/firebase/db-client";
import { useUser } from "@/hooks/use-user";
import { handleErrorClient } from "@/utils/handleErrorClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().min(1, "Email est requis"),
  password: z.string().min(1, "Password est requis"),
});

type LoginFormValues = z.infer<typeof formSchema>;

const Login = () => {
  const router = useRouter();
  const { user } = useUser();
  const auth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    router.push("/");
  }, [user, router]);

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
      <h1 className="mt-4 text-center">Login</h1>

      <div className="grid place-items-center min-h-[50vh]">
        <Form {...form}>
          <form
            className="max-w-lg w-full"
            onSubmit={form.handleSubmit(handleLogin)}
          >
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
      </div>
    </>
  );
};

export default Login;
