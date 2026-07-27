"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";
import { SearchPanel } from "@/components/search/search-panel";
import { Container } from "@/components/ui/container";
import { STATS } from "@/lib/constants";

export function Hero() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      // Headline animates on transform only (opacity kept at 1) to protect LCP.
      tl.from(".hero-title", { y: 22, duration: 0.7, stagger: 0.08 })
        .from(".hero-fade", { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(".hero-orb", { scale: 0.6, opacity: 0, duration: 1.2, stagger: 0.15 }, 0);
    },
    { scope },
  );

  return (
    <section ref={scope} className="bg-mesh relative overflow-hidden text-white">
      {/* Ambient light + brand watermark */}
      <div className="hero-orb pointer-events-none absolute -left-24 top-10 size-[420px] rounded-full bg-brand/25 blur-[120px]" />
      <div className="hero-orb pointer-events-none absolute -right-20 bottom-0 size-[460px] rounded-full bg-brand/20 blur-[130px]" />
      <Image
        src="/brand/mark-white.png"
        alt=""
        width={728}
        height={513}
        aria-hidden
        priority
        className="hero-orb pointer-events-none absolute -right-16 top-1/2 w-[52%] max-w-2xl -translate-y-1/2 opacity-[0.06]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      <Container className="relative pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-44">
        <div className="max-w-3xl">
          <span className="hero-fade inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/90 backdrop-blur">
            <Sparkles className="size-4 text-brand-100" />
            La plateforme premium du Cameroun
          </span>

          <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            <span className="hero-title block">Réservez l&apos;exception.</span>
            <span className="hero-title block">
              Vivez{" "}
              <span className="bg-gradient-to-r from-brand-100 via-white to-brand-100 bg-clip-text text-transparent">
                Piol &amp; Tako.
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            Hébergements d&apos;exception, voitures de prestige et expériences uniques.
            Tout au même endroit, réservé en quelques secondes.
          </p>
        </div>

        <div className="hero-fade mt-10 max-w-4xl">
          <SearchPanel />
        </div>

        <dl className="hero-fade mt-12 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="text-2xl font-bold sm:text-3xl">{stat.value}</dt>
              <dd className="mt-1 text-sm text-white/70">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
