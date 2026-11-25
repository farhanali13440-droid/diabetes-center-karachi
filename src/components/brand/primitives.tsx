import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  spacing?: "default" | "compact" | "none";
  tone?: "white" | "soft";
};

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("tdc-container", className)}>{children}</div>;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
  spacing = "default",
  tone = "white",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        spacing === "default" && "tdc-section",
        spacing === "compact" && "tdc-section--compact",
        spacing === "none" && "py-0",
        tone === "soft" && "bg-[var(--tdc-surface)]",
        className,
      )}
    >
      <Container>
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-3xl space-y-4 md:mb-14">
            {eyebrow && <span className="tdc-eyebrow">{eyebrow}</span>}
            {title && <h2 className="tdc-section-title">{title}</h2>}
            {description && <p className="tdc-section-description">{description}</p>}
          </div>
        )}
        <div className={contentClassName}>{children}</div>
      </Container>
    </section>
  );
}

export function SurfaceCard({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div className={cn("tdc-card p-5 sm:p-6", interactive && "tdc-card--interactive", className)}>
      {children}
    </div>
  );
}

type CTAGroupProps = {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
  size?: "default" | "lg";
};

export function CTAGroup({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
  size = "lg",
}: CTAGroupProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}>
      <Button asChild size={size} className="rounded-xl px-6 font-semibold shadow-md shadow-blue-900/10">
        <a href={primaryHref}>
          {primaryLabel}
          <ArrowRight aria-hidden="true" />
        </a>
      </Button>
      {secondaryLabel && secondaryHref && (
        <Button asChild size={size} variant="outline" className="rounded-xl border-slate-200 bg-white px-6 font-semibold text-[var(--tdc-navy)] hover:bg-slate-50">
          <a href={secondaryHref}>{secondaryLabel}</a>
        </Button>
      )}
    </div>
  );
}
