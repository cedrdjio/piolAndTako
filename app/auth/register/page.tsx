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
  name: z.string().min(2, "Indiquez votre nom"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Au moins 8 caractères"),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
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
      title="Créez votre compte"
      subtitle="Rejoignez Piol & Tako et réservez l'exception en quelques secondes."
      footer={
        <>
          Vous avez déjà un compte ?{" "}
          <Link href="/auth/login" className="font-semibold text-brand hover:underline">
            Se connecter
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <AuthField label="Nom complet" error={errors.name?.message}>
          <Input autoComplete="name" placeholder="Awa Njoya" {...register("name")} />
        </AuthField>
        <AuthField label="Email" error={errors.email?.message}>
          <Input type="email" autoComplete="email" placeholder="vous@exemple.com" {...register("email")} />
        </AuthField>
        <AuthField label="Mot de passe" error={errors.password?.message}>
          <Input type="password" autoComplete="new-password" placeholder="••••••••" {...register("password")} />
        </AuthField>

        <Button type="submit" size="lg" disabled={pending} className="w-full">
          {pending && <Loader2 className="size-4 animate-spin" />}
          Créer mon compte
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          En continuant, vous acceptez nos{" "}
          <Link href="/terms" className="underline hover:text-foreground">Conditions</Link> et notre{" "}
          <Link href="/privacy" className="underline hover:text-foreground">Politique de confidentialité</Link>.
        </p>
      </form>
    </AuthShell>
  );
}
