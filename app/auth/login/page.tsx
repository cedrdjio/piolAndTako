"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { AuthShell, AuthField } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Au moins 8 caractères"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(_values: FormValues) {
    setPending(true);
    await new Promise((r) => setTimeout(r, 900));
    setPending(false);
  }

  return (
    <AuthShell
      title="Bon retour parmi nous"
      subtitle="Connectez-vous pour retrouver vos réservations et favoris."
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link href="/auth/register" className="font-semibold text-brand hover:underline">
            Créer un compte
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <AuthField label="Email" error={errors.email?.message}>
          <Input type="email" autoComplete="email" placeholder="vous@exemple.com" {...register("email")} />
        </AuthField>
        <AuthField label="Mot de passe" error={errors.password?.message}>
          <Input type="password" autoComplete="current-password" placeholder="••••••••" {...register("password")} />
        </AuthField>

        <div className="flex justify-end">
          <Link href="/auth/reset" className="text-sm font-medium text-brand hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>

        <Button type="submit" size="lg" disabled={pending} className="w-full">
          {pending && <Loader2 className="size-4 animate-spin" />}
          Se connecter
        </Button>
      </form>
    </AuthShell>
  );
}
