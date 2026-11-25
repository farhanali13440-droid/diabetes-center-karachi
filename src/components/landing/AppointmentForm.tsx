import { useRef, useState, type FormEvent } from "react";
import { CalendarDays, ArrowRight, PhoneCall, MessageCircle } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CONTACT } from "./primitives";
import { trackAdsConversion } from "./tracking";

export const APPOINTMENT_SERVICES = [
  "Diabetes Care & Management", "Diabetic Foot Care", "Nutrition & Dietetics",
  "Endocrinology & Thyroid Care", "Weight Management", "Laboratory & Diagnostic Services",
  "Health Screening Packages", "Other",
] as const;

const pakistaniMobile = /^(?:(?:\\+92|0092)3\\d{9}|03\\d{9})$/;
const schema = z.object({
  name: z.string().trim().min(1, "Please enter your full name.").max(100, "Name is too long."),
  phone: z.string().trim().transform(value => value.replace(/[\\s()-]/g, "")).pipe(z.string().regex(pakistaniMobile, "Enter a valid Pakistani mobile number, e.g. 03XX-XXXXXXX.")),
  service: z.enum(APPOINTMENT_SERVICES, { error: "Please select a service." }),
  preferredDate: z.string().min(1, "Please select your preferred appointment date.").refine(value => value >= todayLocal(), "Please select today or a future date."),
});

const field = "h-12 w-full min-w-0 rounded-xl border border-input bg-background px-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";
const label = "grid min-w-0 gap-2 text-sm font-semibold text-navy";
const endpoint = import.meta.env.VITE_APPOINTMENT_ENDPOINT?.trim();

function todayLocal() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export function AppointmentForm({ className }: { className?: string }) {
  const submittingRef = useRef(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "unconfigured">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current || status === "submitting") return;
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form));
    const result = schema.safeParse(raw);
    if (!result.success) {
      setStatus("error");
      setMessage(result.error.issues[0]?.message ?? "Please check your details.");
      return;
    }
    if (!endpoint) {
      setStatus("unconfigured");
      setMessage("Online appointment requests are not connected yet. Your details have not been sent. Please call or WhatsApp our team.");
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...result.data, source: "TDC Karachi landing page" }),
      });
      if (!response.ok) throw new Error("The appointment request could not be submitted. Please try again or contact our team.");
      setStatus("success");
      setMessage("Your appointment request has been received. Our team will contact you to assist with arrangements.");
      form.reset();
      trackAdsConversion("appointment");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please call or WhatsApp our team.");
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <div className={cn("min-w-0 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-7", className)}>
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-soft text-royal"><CalendarDays className="h-5 w-5" /></div>
      <h2 className="text-2xl font-bold text-navy">Book Your Appointment</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Share your details and preferred date. Our team will follow up.</p>
      <form onSubmit={onSubmit} className="mt-5 grid gap-4" noValidate>
        <label className={label}>Full Name
          <input required name="name" autoComplete="name" maxLength={100} placeholder="Enter your full name" className={field} />
        </label>
        <label className={label}>Phone Number
          <input required name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={16} placeholder="03XX-XXXXXXX" className={field} />
        </label>
        <label className={label}>Required Service
          <select required name="service" defaultValue="" className={cn(field, "pr-7")}>
            <option value="" disabled>Select a service</option>
            {APPOINTMENT_SERVICES.map(service => <option key={service} value={service}>{service}</option>)}
          </select>
        </label>
        <label className={label}>Preferred Date
          <input required name="preferredDate" type="date" min={todayLocal()} className={field} />
        </label>
        {message && <div role={status === "success" ? "status" : "alert"} className={cn("rounded-xl p-4 text-sm leading-relaxed", status === "success" ? "bg-cyan-soft text-navy" : "bg-muted text-foreground")}>
          <p>{message}</p>
          {(status === "unconfigured" || status === "error") && <div className="mt-3 flex flex-wrap gap-3">
            <a href={CONTACT.phoneHref} onClick={() => trackAdsConversion("call")} className="inline-flex items-center gap-1.5 font-semibold text-royal"><PhoneCall className="h-4 w-4" />Call {CONTACT.phone}</a>
            <a href={CONTACT.whatsappHref} onClick={() => trackAdsConversion("whatsapp")} className="inline-flex items-center gap-1.5 font-semibold text-royal"><MessageCircle className="h-4 w-4" />WhatsApp</a>
          </div>}
        </div>}
        <Button type="submit" disabled={status === "submitting"} className="mt-1 h-12 w-full rounded-full text-base font-semibold shadow-soft hover:bg-navy disabled:cursor-wait disabled:opacity-70">
          {status === "submitting" ? "Sending Request…" : "Request an Appointment"}<ArrowRight className="h-4 w-4" />
        </Button>
        <p className="text-center text-xs leading-relaxed text-muted-foreground">Submitting a request does not confirm an appointment. Our team will contact you.</p>
      </form>
    </div>
  );
}
