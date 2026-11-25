import { useState, type FormEvent } from "react";
import { CalendarDays, ArrowRight, PhoneCall } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CONTACT } from "./primitives";

export const APPOINTMENT_SERVICES = [
  "Diabetes Care & Management", "Diabetic Foot Care", "Nutrition & Dietetics",
  "Endocrinology & Thyroid Care", "Weight Management", "Laboratory & Diagnostic Services",
  "Health Screening Packages", "Other",
] as const;
const schema = z.object({
  name: z.string().trim().min(1, "Please enter your full name.").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(25).regex(/^[+\d\s()-]+$/, "Please enter a valid phone number."),
  service: z.enum(APPOINTMENT_SERVICES, { error: "Please select a service." }),
});
const field = "h-11 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";
const label = "grid min-w-0 gap-1.5 text-xs font-semibold text-navy";

export function AppointmentForm({ className }: { className?: string }) {
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState<Date>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = schema.safeParse(Object.fromEntries(data));
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Please check your details.");
      return;
    }
    setError("");
    setNotice("Online requests are not available yet. Please call our team to arrange your appointment.");
  };
  return (
    <div className={cn("rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7", className)}>
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-soft text-royal"><CalendarDays className="h-5 w-5" /></div>
      <h2 className="text-2xl font-bold text-navy">Book Your Appointment</h2>
      <form onSubmit={onSubmit} className="mt-5 grid gap-3.5">
        <label className={label}>Full Name
          <input required name="name" autoComplete="name" maxLength={100} placeholder="Enter your full name" className={field} />
        </label>
        <label className={label}>Phone Number
          <input required name="phone" type="tel" autoComplete="tel" maxLength={25} placeholder="e.g. 03XX-XXXXXXX" className={field} />
        </label>
        <label className={label}>Select Your Required Service
          <select required name="service" defaultValue="" className={cn(field, "pr-7")}>
            <option value="" disabled>Select a service</option>
            {APPOINTMENT_SERVICES.map(service => <option key={service}>{service}</option>)}
          </select>
        </label>
        <div className={label}>
          <span id="appointment-date-label">Preferred Appointment Date</span>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" aria-labelledby="appointment-date-label" className={cn(field, "justify-between font-normal", !date && "text-muted-foreground")}>
                {date ? format(date, "dd MMM yyyy") : "Select a date"}<CalendarDays />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="pointer-events-auto w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={value => { setDate(value); setCalendarOpen(false); }} className="pointer-events-auto" />
            </PopoverContent>
          </Popover>
        </div>
        {error && <p role="alert" className="text-sm text-royal">{error}</p>}
        <Button type="submit" className="mt-1 h-12 w-full rounded-full font-semibold shadow-soft hover:bg-navy">Request an Appointment<ArrowRight /></Button>
        <p className="text-center text-xs leading-relaxed text-muted-foreground">Our team will contact you to assist with your appointment.</p>
        {notice && <div role="status" className="rounded-lg bg-cyan-soft p-4 text-sm leading-relaxed text-navy">
          <p>{notice}</p>
          <a href={CONTACT.phoneHref} className="mt-2 inline-flex items-center gap-2 font-semibold text-royal"><PhoneCall className="h-4 w-4" />{CONTACT.phone}</a>
        </div>}
      </form>
    </div>
  );
}
