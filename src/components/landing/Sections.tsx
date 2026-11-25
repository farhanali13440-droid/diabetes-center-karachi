import { useState } from "react";
import {
  Activity, Apple, Baby, CalendarCheck, ChevronDown, Clock, Droplet, Eye, Footprints, HeartPulse,
  Mail, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Star, Stethoscope, Syringe, Users, X, Microscope, Scale, Brain, ClipboardList, PhoneCall,
} from "lucide-react";
import { CONTACT, Card, Container, CtaButton, IconBadge, Section, SectionHeading } from "./primitives";
import { AppointmentForm } from "./AppointmentForm";
import logo from "@/assets/tdc_logo.png.asset.json";

const IMG = {
  hero: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1400&q=80&auto=format&fit=crop",
  about: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80&auto=format&fit=crop",
};
export const HERO_IMAGE = IMG.hero;

const NAV = [
  ["Services", "#services"], ["Packages", "#packages"], ["About", "#about"], ["FAQs", "#faqs"], ["Contact", "#contact"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logo.url} alt="The Diabetes Centre logo" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
          <span className="leading-tight">
            <span className="block text-base font-extrabold text-navy sm:text-lg">The Diabetes Centre</span>
            <span className="block text-xs font-medium text-royal">Karachi</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="text-sm font-medium text-foreground hover:text-royal">{l}</a>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={CONTACT.phoneHref} className="flex items-center gap-2 text-sm font-semibold text-navy"><Phone className="h-4 w-4 text-royal" />{CONTACT.phone}</a>
          <CtaButton href="#book">Book Appointment</CtaButton>
        </div>
        <button className="rounded-lg p-2 text-navy lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="grid gap-1 py-4">
            {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 font-medium text-navy hover:bg-muted">{l}</a>)}
            <CtaButton href="#book" className="mt-2">Book Appointment</CtaButton>
          </Container>
        </div>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-cyan-soft to-background">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-1.5 text-xs font-semibold text-royal shadow-card sm:text-sm">
            <ShieldCheck className="h-4 w-4" /> Specialist Diabetes Care in Karachi
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Take Control of Your Diabetes <span className="text-royal">With Expert Care</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Complete diabetes diagnosis, treatment and long-term management under one roof — from blood sugar control to foot, eye and nutrition care.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CtaButton href="#book"><CalendarCheck className="h-5 w-5" />Book Appointment</CtaButton>
            <CtaButton href={CONTACT.phoneHref} variant="outline"><PhoneCall className="h-5 w-5" />Call Now</CtaButton>
          </div>
          <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-border pt-7">
            {[["15+", "Years of care"], ["50k+", "Patients served"], ["6", "Specialised services"]].map(([n, l]) => (
              <div key={l}><dt className="text-2xl font-extrabold text-navy sm:text-3xl">{n}</dt><dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{l}</dd></div>
            ))}
          </dl>
        </div>
        <div id="book" className="relative scroll-mt-24">
          <img src={IMG.hero} alt="Healthcare professional checking a patient's blood sugar" className="absolute -right-10 -top-10 hidden h-[115%] w-[85%] rounded-[2rem] object-cover opacity-90 lg:block" />
          <AppointmentForm className="relative lg:mt-24 lg:-ml-6" />
        </div>
      </Container>
    </section>
  );
}

const CONCERNS = [
  [Droplet, "Diabetes & Blood Sugar Management", "Support for blood sugar monitoring, diabetes care and ongoing glucose management.", "#services"],
  [Footprints, "Diabetic Foot Problems", "Assessment and support for foot health, pressure concerns and ulcer-risk prevention.", "#services"],
  [Activity, "Thyroid & Hormonal Health", "Clinical support for thyroid disorders and hormonal health concerns.", "#services"],
  [Scale, "Weight & Obesity Management", "Assessment and guidance to support weight and metabolic health goals.", "#services"],
  [Apple, "Nutrition & Diet Planning", "Personalized nutrition guidance for diabetes, pregnancy and weight management.", "#services"],
  [Microscope, "Laboratory Testing", "Access the listed laboratory and diagnostic investigations.", "#services"],
] as const;

export function Concerns() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Patient Health Concerns"
        title="What Healthcare Support Are You Looking For?"
        intro="Explore healthcare services designed to support diabetes management, metabolic health and related medical conditions."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {CONCERNS.map(([Icon, title, description, href]) => (
          <a key={title} href={href} className="group block rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-cyan/50 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <IconBadge className="h-14 w-14 transition-colors group-hover:bg-cyan-soft"><Icon className="h-7 w-7" /></IconBadge>
            <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-royal">Explore service <span aria-hidden="true">→</span></span>
          </a>
        ))}
      </div>
    </Section>
  );
}

const WHY = [
  [Users, "Multidisciplinary team", "Diabetologists, educators, dietitians and foot-care specialists working together."],
  [Microscope, "Diagnostics on site", "Lab tests, HbA1c and screenings in the same visit — no running around."],
  [ClipboardList, "Personalised care plans", "Treatment tailored to your lifestyle, goals and medical history."],
  [HeartPulse, "Long-term follow-up", "Regular reviews to keep your sugar levels stable for years, not weeks."],
] as const;

export function WhyChoose() {
  return (
    <section className="bg-navy py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading invert eyebrow="Why Choose Us" title="Why Patients Trust The Diabetes Centre" intro="A dedicated diabetes facility focused entirely on helping Karachi live better with diabetes." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {WHY.map(([Icon, t, d]) => (
            <div key={t} className="rounded-3xl border border-primary-foreground/10 bg-primary-foreground/5 p-6">
              <IconBadge className="bg-royal text-primary-foreground"><Icon className="h-6 w-6" /></IconBadge>
              <h3 className="mt-5 text-lg font-bold text-primary-foreground">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <img src={IMG.about} alt="Modern clinic consultation room" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-soft" loading="lazy" />
        <div>
          <SectionHeading center={false} eyebrow="About TDC" title="Dedicated to Diabetes Care in Karachi" />
          <p className="-mt-6 leading-relaxed text-muted-foreground">
            The Diabetes Centre is a specialised healthcare facility offering comprehensive care for people living with diabetes and related conditions. We combine modern diagnostics, evidence-based treatment and patient education to help you manage your condition with confidence.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {["Evidence-based treatment", "Patient education programmes", "Comfortable, modern facility", "Affordable care packages"].map((x) => (
              <li key={x} className="flex items-center gap-2.5 text-sm font-medium text-navy"><ShieldCheck className="h-5 w-5 text-cyan" />{x}</li>
            ))}
          </ul>
          <CtaButton href="#book" className="mt-8">Book a Consultation</CtaButton>
        </div>
      </div>
    </Section>
  );
}

const SERVICES = [
  {
    icon: Droplet,
    title: "Diabetes Care & Management",
    description: "Comprehensive support for diabetes monitoring, treatment and patient education.",
    items: ["Type 1 & Type 2 Diabetes Management", "Gestational Diabetes Management", "Blood Sugar Monitoring", "HbA1c Testing", "Diabetes Education"],
  },
  {
    icon: Footprints,
    title: "Diabetic Foot Care",
    description: "Foot screening and assessment services focused on identifying pressure concerns and ulcer risk.",
    items: ["Comprehensive Foot Screening", "Diabetic Foot Assessment", "PedoScan Foot Pressure Assessment", "Foot Ulcer Risk Assessment", "Orthotic Consultation"],
  },
  {
    icon: Apple,
    title: "Nutrition & Dietetics",
    description: "Clinical nutrition guidance and personalized planning for different health needs.",
    items: ["Clinical Nutrition Consultation", "Personalized Diet Planning", "Diabetes Nutrition Management", "Pregnancy Nutrition Planning", "Weight Management Nutrition"],
  },
  {
    icon: Activity,
    title: "Endocrinology & Thyroid Care",
    description: "Consultation and care for thyroid disorders and hormonal health concerns.",
    items: ["Thyroid Disorders", "Hormonal Imbalance", "Endocrine Health Consultation"],
  },
  {
    icon: Scale,
    title: "Obesity & Weight Management",
    description: "Assessment and personalized planning to support weight and metabolic health.",
    items: ["Weight Management Assessment", "Obesity Assessment", "Metabolic Health Assessment", "Personalized Diet Plans"],
  },
  {
    icon: Microscope,
    title: "Laboratory & Diagnostic Services",
    description: "A range of laboratory investigations to support health assessment and monitoring.",
    items: ["Complete Blood Count (CBC)", "Fasting Blood Sugar (FBS)", "HbA1c", "Lipid Profile", "Liver Function Tests (LFTs)", "Renal Function Tests (RFTs)", "Urine Routine Examination", "Sodium & Potassium"],
  },
] as const;

export function Services() {
  return (
    <Section id="services" className="bg-muted">
      <SectionHeading
        eyebrow="Our Healthcare Services"
        title="Comprehensive Healthcare Services Under One Roof"
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, description, items }) => (
          <Card key={title} className="flex h-full flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-soft">
            <div className="flex items-start gap-4">
              <IconBadge className="h-14 w-14 bg-gradient-to-br from-royal to-cyan text-primary-foreground"><Icon className="h-7 w-7" /></IconBadge>
              <div className="min-w-0 pt-1">
                <h3 className="text-lg font-bold leading-snug text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </div>
            <ul className="mt-5 grid flex-1 content-start gap-2.5 border-t border-border pt-5">
              {items.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <CtaButton href="#book" className="mt-6 w-full">Book Appointment</CtaButton>
          </Card>
        ))}
      </div>
    </Section>
  );
}

const PACKAGES = [
  {
    name: "Basic Health Check-Up",
    price: "PKR 8,960",
    includes: ["CBC", "FBS", "Lipid Profile", "HbA1c", "LFTs", "RFTs", "Urine RE", "Na + K"],
  },
  {
    name: "Complete Foot Screening",
    price: "PKR 2,500",
    includes: ["Diabetologist Consultation", "Diabetic Foot Education", "Foot Assessment", "Pedo-Scanning", "Orthotic Consultation"],
  },
  {
    name: "Metabolic Control Package",
    price: "PKR 2,200",
    includes: ["Weight Management", "Fasting Insulin Level", "NPT", "TSH", "Personalized Diet Plan"],
  },
] as const;

export function Packages() {
  return (
    <Section id="packages">
      <SectionHeading
        eyebrow="Health Screening Packages"
        title="Take a Proactive Step Towards Better Health"
        intro="Explore the available health screening packages and request an appointment with our team."
      />
      <div className="grid items-stretch gap-5 lg:grid-cols-3">
        {PACKAGES.map((pkg, index) => (
          <Card key={pkg.name} className={`flex h-full flex-col ${index === 1 ? "border-royal/40 shadow-soft lg:-translate-y-2" : ""}`}>
            {index === 1 && <span className="mb-4 inline-flex w-fit rounded-full bg-cyan-soft px-3 py-1 text-xs font-bold text-royal">Foot Screening</span>}
            <h3 className="text-xl font-bold leading-snug text-navy">{pkg.name}</h3>
            <p className="mt-4 text-3xl font-extrabold tracking-tight text-royal">{pkg.price}</p>
            <div className="mt-5 border-t border-border pt-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Package includes</p>
              <ul className="mt-4 grid flex-1 content-start gap-3">
                {pkg.includes.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <CtaButton href="#book" className="mt-7 w-full">Book This Package</CtaButton>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
        Package prices and inclusions are reproduced as supplied and should be confirmed by The Diabetes Centre before publication.
      </p>
    </Section>
  );
}

const STEPS = [
  [CalendarCheck, "Request appointment", "Fill the form or call us."],
  [Phone, "Get a confirmation call", "We confirm your date and time."],
  [Stethoscope, "Visit the centre", "Tests and specialist consultation."],
  [HeartPulse, "Follow your care plan", "Ongoing support and reviews."],
] as const;

export function HowItWorks() {
  return (
    <Section className="bg-cyan-soft">
      <SectionHeading eyebrow="How It Works" title="Booking Your Visit Is Simple" />
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(([Icon, t, d], i) => (
          <li key={t} className="text-center">
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background text-royal shadow-card">
              <Icon className="h-7 w-7" />
              <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
            </div>
            <h3 className="mt-5 font-bold text-navy">{t}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const REVIEWS = [
  ["Ayesha R.", "Gulshan-e-Iqbal", "My HbA1c dropped from 9.2 to 6.8 in six months. The team explained everything clearly and the diet plan was easy to follow."],
  ["Muhammad T.", "DHA", "Having lab tests, foot check and consultation in one visit saved me so much time. Very professional staff."],
  ["Farzana K.", "North Nazimabad", "They helped my mother start insulin safely and called regularly to check on her. Truly caring service."],
];

export function Testimonials() {
  return (
    <Section>
      <SectionHeading eyebrow="Patient Stories" title="What Our Patients Say" />
      <div className="grid gap-5 md:grid-cols-3">
        {REVIEWS.map(([n, a, q]) => (
          <Card key={n}>
            <div className="flex gap-0.5 text-cyan">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
            <p className="mt-4 text-sm leading-relaxed text-foreground">“{q}”</p>
            <div className="mt-5 border-t border-border pt-4"><p className="font-bold text-navy">{n}</p><p className="text-xs text-muted-foreground">{a}, Karachi</p></div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

const FAQS = [
  ["Do I need a referral to book an appointment?", "No. You can book directly through the form above or by calling the centre."],
  ["Should I come fasting for my visit?", "For blood sugar and lipid tests, please fast for 8–10 hours. Water is allowed. Our team will guide you when confirming."],
  ["Do you treat both Type 1 and Type 2 diabetes?", "Yes. We manage Type 1, Type 2, gestational diabetes and pre-diabetes for adults and children."],
  ["How long does a first visit take?", "Most first visits take 60–90 minutes including tests and consultation."],
  ["What should I bring?", "Please bring previous reports, your current medicines and your glucose meter readings if available."],
];

export function Faqs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faqs" className="bg-muted">
      <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" />
      <div className="mx-auto grid max-w-3xl gap-3">
        {FAQS.map(([q, a], i) => (
          <div key={q} className="rounded-2xl border border-border bg-card">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy" aria-expanded={open === i}>
              {q}<ChevronDown className={`h-5 w-5 shrink-0 text-royal transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Contact() {
  const items = [
    [MapPin, "Address", CONTACT.address, undefined],
    [Phone, "Phone", CONTACT.phone, CONTACT.phoneHref],
    [Mail, "Email", CONTACT.email, `mailto:${CONTACT.email}`],
    [Clock, "Timings", CONTACT.hours, undefined],
  ] as const;
  return (
    <Section id="contact">
      <SectionHeading eyebrow="Visit Us" title="Location & Contact" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map(([Icon, t, v, href]) => (
            <Card key={t}>
              <IconBadge><Icon className="h-6 w-6" /></IconBadge>
              <p className="mt-4 text-sm font-semibold text-muted-foreground">{t}</p>
              {href ? <a href={href} className="mt-1 block font-bold text-navy hover:text-royal">{v}</a> : <p className="mt-1 font-bold text-navy">{v}</p>}
            </Card>
          ))}
        </div>
        <iframe title="Map of The Diabetes Centre, Karachi" src="https://www.google.com/maps?q=Karachi,Pakistan&output=embed" className="min-h-80 w-full rounded-3xl border border-border" loading="lazy" />
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <section className="px-5 pb-16 sm:pb-20">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-br from-navy via-royal to-cyan px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 className="text-3xl font-extrabold text-primary-foreground sm:text-4xl">Start Your Diabetes Care Journey Today</h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">Book your appointment at The Diabetes Centre, Karachi, and get a personalised plan to manage your sugar levels.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CtaButton href="#book" variant="light"><CalendarCheck className="h-5 w-5" />Book Appointment</CtaButton>
          <CtaButton href={CONTACT.whatsappHref} variant="ghostLight"><MessageCircle className="h-5 w-5" />WhatsApp Us</CtaButton>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy pb-24 pt-12 text-primary-foreground/80 sm:pb-12">
      <Container className="grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-3"><span className="rounded-xl bg-background p-1.5"><img src={logo.url} alt="" className="h-8 w-8 object-contain" /></span><p className="text-lg font-extrabold text-primary-foreground">The Diabetes Centre</p></div>
          <p className="mt-2 text-sm">Specialist diabetes care in Karachi, Pakistan.</p>
        </div>
        <div className="grid gap-2 text-sm">{NAV.map(([l, h]) => <a key={h} href={h} className="hover:text-cyan">{l}</a>)}</div>
        <div className="grid gap-2 text-sm"><span>{CONTACT.phone}</span><span>{CONTACT.email}</span><span>{CONTACT.address}</span></div>
      </Container>
      <Container className="mt-10 border-t border-primary-foreground/10 pt-6 text-xs">© {new Date().getFullYear()} The Diabetes Centre, Karachi. All rights reserved.</Container>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-background p-3 sm:hidden">
      <CtaButton href={CONTACT.phoneHref} variant="outline" className="min-h-11"><Phone className="h-4 w-4" />Call</CtaButton>
      <CtaButton href="#book" className="min-h-11"><CalendarCheck className="h-4 w-4" />Book Now</CtaButton>
    </div>
  );
}
