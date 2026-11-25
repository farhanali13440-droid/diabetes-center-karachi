import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const CONTACT = {
  phone: "0337-1111832",
  phoneHref: "tel:+923371111832",
  whatsappHref: "https://wa.me/92337111832",
  address: "Rafah-e-Aam Society, Shah Faisal Avenue, Karachi, Pakistan.",
  mapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Rafah-e-Aam%20Society%2C%20Shah%20Faisal%20Avenue%2C%20Karachi%2C%20Pakistan",
};

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6", className)}>{children}</div>;
}

export function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-16 sm:py-20 lg:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, center = true, invert = false }: { eyebrow: string; title: string; intro?: string; center?: boolean; invert?: boolean }) {
  return (
    <div className={cn("mb-10 max-w-2xl sm:mb-14", center && "mx-auto text-center")}>
      <p className={cn("text-sm font-semibold uppercase tracking-[0.14em]", invert ? "text-cyan" : "text-royal")}>{eyebrow}</p>
      <h2 className={cn("mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl", invert ? "text-primary-foreground" : "text-navy")}>{title}</h2>
      {intro && <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", invert ? "text-primary-foreground/80" : "text-muted-foreground")}>{intro}</p>}
    </div>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: "primary" | "outline" | "light" | "ghostLight"; className?: string; onClick?: () => void };
export function CtaButton({ href, children, variant = "primary", className, onClick }: BtnProps) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-navy shadow-soft",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    light: "bg-background text-navy hover:bg-cyan-soft",
    ghostLight: "border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10",
  }[variant];
  return (
    <Button asChild className={cn("h-auto min-h-12 gap-2 whitespace-normal rounded-full px-6 text-sm font-semibold sm:text-base", styles, className)}>
      <a href={href} onClick={onClick}>{children}</a>
    </Button>
  );
}

export function IconBadge({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-soft text-royal", className)}>{children}</div>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-3xl border border-border bg-card p-6 shadow-card sm:p-7", className)}>{children}</div>;
}
