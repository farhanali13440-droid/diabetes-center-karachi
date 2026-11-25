import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const field = "h-12 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";

export function AppointmentForm({ className }: { className?: string }) {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  return (
    <div className={cn("rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8", className)}>
      <h3 className="text-xl font-bold text-navy sm:text-2xl">Book an Appointment</h3>
      <p className="mt-1 text-sm text-muted-foreground">Our team will call you back to confirm your visit.</p>
      {sent ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-cyan-soft p-5 text-navy">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-royal" />
          <p className="text-sm font-medium">Thank you. Your request has been received — we will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <input required name="name" placeholder="Full name" className={field} aria-label="Full name" />
          <input required name="phone" type="tel" placeholder="Phone number" className={field} aria-label="Phone number" />
          <select required name="service" defaultValue="" className={field} aria-label="Service">
            <option value="" disabled>Select a service</option>
            <option>Diabetes consultation</option>
            <option>Diabetic foot care</option>
            <option>Diabetes eye screening</option>
            <option>Diet & nutrition counselling</option>
            <option>Health screening package</option>
          </select>
          <input name="date" type="date" className={field} aria-label="Preferred date" />
          <button type="submit" className="mt-1 h-12 rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-navy sm:text-base">
            Request Appointment
          </button>
          <p className="text-center text-xs text-muted-foreground">Your details are kept confidential.</p>
        </form>
      )}
    </div>
  );
}
