import { useState } from "react";
import {
  Activity, Apple, CalendarCheck, ChevronDown, Droplet, Footprints, HeartPulse,
  MapPin, Menu, MessageCircle, Phone, ShieldCheck, X, Microscope, Scale, PhoneCall,
} from "lucide-react";
import { CONTACT, Card, Container, CtaButton, IconBadge, Section, SectionHeading } from "./primitives";
import { trackAdsConversion } from "./tracking";
import logo from "@/assets/tdc_logo.png.asset.json";
import building from "@/assets/tdc-building.webp.asset.json";

const IMG = {
  hero: building.url,
  about: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&q=75&auto=format&fit=crop",
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
          <a href={CONTACT.phoneHref} onClick={() => trackAdsConversion("call")} className="flex items-center gap-2 text-sm font-semibold text-navy"><Phone className="h-4 w-4 text-royal" />{CONTACT.phone}</a>
          <CtaButton href={CONTACT.whatsappHref} onClick={() => trackAdsConversion("whatsapp")}>Book Appointment</CtaButton>
        </div>
        <button className="rounded-lg p-2 text-navy lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="grid gap-1 py-4">
            {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 font-medium text-navy hover:bg-muted">{l}</a>)}
            <CtaButton href={CONTACT.whatsappHref} className="mt-2" onClick={() => trackAdsConversion("whatsapp")}>Book Appointment</CtaButton>
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
            Explore diabetes management, diabetic foot care, nutrition, metabolic health and diagnostic services at The Diabetes Centre Karachi.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CtaButton href={CONTACT.whatsappHref} onClick={() => trackAdsConversion("whatsapp")}><CalendarCheck className="h-5 w-5" />Book Appointment</CtaButton>
            <CtaButton href={CONTACT.phoneHref} variant="outline" onClick={() => trackAdsConversion("call")}><PhoneCall className="h-5 w-5" />Call Now: 0337-1111832</CtaButton>
          </div>
        </div>
        <div className="relative">
          <img src={IMG.hero} alt="The Diabetes Centre Karachi building exterior" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-soft lg:aspect-[5/4]" />
          <div className="absolute -bottom-5 -left-3 rounded-2xl border border-border bg-card p-4 shadow-soft sm:-left-5 sm:p-5">
            <p className="text-sm font-bold text-navy">The Diabetes Centre</p>
            <p className="mt-1 text-xs text-muted-foreground">Diabetes & related healthcare in Karachi</p>
          </div>
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
  [Droplet, "Diabetes-Focused Healthcare", "Healthcare services focused on diabetes management and blood sugar monitoring."],
  [Microscope, "Comprehensive Diagnostic Services", "Laboratory testing and diagnostic investigations to support health assessment."],
  [Footprints, "Specialized Foot Care Services", "Foot screening, assessment, pressure assessment and orthotic consultation."],
  [Apple, "Nutrition & Metabolic Health Support", "Nutrition consultation, personalized diet planning and weight-management support."],
] as const;

export function WhyChoose() {
  return (
    <section className="bg-navy py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading invert eyebrow="Why Choose The Diabetes Centre?" title="Healthcare Focused on Your Wellbeing" />
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
          <SectionHeading center={false} eyebrow="About TDC" title="Your Partner in Diabetes & Related Healthcare" />
          <div className="-mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>The Diabetes Centre is focused on providing healthcare services related to diabetes management, metabolic health, diabetic foot care, nutrition and diagnostic testing.</p>
            <p>Our aim is to make essential healthcare and screening services accessible to patients through a coordinated healthcare experience.</p>
          </div>
          <CtaButton href={CONTACT.whatsappHref} className="mt-8" onClick={() => trackAdsConversion("whatsapp")}>Book a Consultation</CtaButton>
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
            <CtaButton href={CONTACT.whatsappHref} className="mt-6 w-full" onClick={() => trackAdsConversion("whatsapp")}>Book Appointment</CtaButton>
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
            <CtaButton href={CONTACT.whatsappHref} className="mt-7 w-full" onClick={() => { trackAdsConversion("package"); trackAdsConversion("whatsapp"); }}>Book This Package</CtaButton>
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
  [CalendarCheck, "Select Your Service", "Choose the healthcare service or screening package you need."],
  [MessageCircle, "Contact Our Team", "Call or message our team to discuss your service and appointment needs."],
  [MapPin, "Visit The Diabetes Centre", "Our team will assist you with appointment arrangements."],
] as const;

export function HowItWorks() {
  return (
    <Section className="bg-cyan-soft">
      <SectionHeading eyebrow="How to Book an Appointment" title="Getting Started Is Simple" />
      <ol className="grid gap-6 md:grid-cols-3">
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

const REVIEW_PLACEHOLDERS = ["Google patient review", "Google patient review", "Google patient review"];

export function Testimonials() {
  return (
    <Section>
      <SectionHeading eyebrow="Patient Testimonials" title="Experiences Shared by Our Patients" intro="Verified patient feedback will be displayed here when genuine reviews are available." />
      <div className="grid gap-5 md:grid-cols-3">
        {REVIEW_PLACEHOLDERS.map((_, index) => (
          <Card key={index} className="flex min-h-40 flex-col justify-center border-dashed text-center">
            <MessageCircle className="mx-auto h-7 w-7 text-royal" />
            <p className="mt-3 font-semibold text-navy">Patient feedback</p>
            <p className="mt-1 text-sm text-muted-foreground">Genuine patient review pending verification.</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

const FAQS = [
  ["What healthcare services are available at The Diabetes Centre?", "Services include diabetes care and management, diabetic foot care, nutrition and dietetics, endocrinology and thyroid care, weight management, and laboratory and diagnostic testing."],
  ["Does TDC provide Type 1 and Type 2 diabetes management?", "Yes. Type 1 and Type 2 diabetes management are among the listed healthcare services."],
  ["Can I get an HbA1c test?", "Yes. HbA1c testing is listed under diabetes care and laboratory services."],
  ["Does TDC provide diabetic foot screening?", "Yes. Comprehensive foot screening and diabetic foot assessment are available."],
  ["What is PedoScan foot pressure assessment?", "PedoScan is listed as a foot pressure assessment service for evaluating pressure distribution under the feet."],
  ["Are nutrition and personalized diet services available?", "Yes. Clinical nutrition consultation and personalized diet planning are available."],
  ["What laboratory tests are available?", "Listed tests include CBC, FBS, HbA1c, lipid profile, LFTs, RFTs, urine routine examination, and sodium and potassium."],
  ["How can I book an appointment?", "Select a service, then call 0337-1111832 or contact the team on WhatsApp to discuss appointment availability."],
  ["Where is The Diabetes Centre located?", "Rafah-e-Aam Society, Shah Faisal Avenue, Karachi, Pakistan."],
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
  return (
    <Section id="contact">
      <SectionHeading eyebrow="Contact & Location" title="Visit The Diabetes Centre Karachi" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid content-start gap-4">
          <Card>
            <IconBadge><MapPin className="h-6 w-6" /></IconBadge>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">Hospital</p>
            <p className="mt-1 font-bold text-navy">The Diabetes Centre Hospital</p>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">Address</p>
            <p className="mt-1 font-bold text-navy">{CONTACT.address}</p>
          </Card>
          <Card>
            <IconBadge><Phone className="h-6 w-6" /></IconBadge>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">Phone</p>
            <a href={CONTACT.phoneHref} onClick={() => trackAdsConversion("call")} className="mt-1 block font-bold text-navy hover:text-royal">{CONTACT.phone}</a>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <CtaButton href={CONTACT.phoneHref} variant="outline" onClick={() => trackAdsConversion("call")}><PhoneCall className="h-4 w-4" />Call The Centre</CtaButton>
              <CtaButton href={CONTACT.whatsappHref} onClick={() => trackAdsConversion("whatsapp")}><MessageCircle className="h-4 w-4" />WhatsApp Us</CtaButton>
            </div>
          </Card>
          <CtaButton href={CONTACT.mapsDirectionsUrl} variant="outline"><MapPin className="h-4 w-4" />Get Directions</CtaButton>
        </div>
        <iframe title="Map search for The Diabetes Centre address in Karachi" src="https://www.google.com/maps?q=Rafah-e-Aam%20Society%2C%20Shah%20Faisal%20Avenue%2C%20Karachi%2C%20Pakistan&output=embed" className="min-h-80 w-full rounded-3xl border border-border" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <section className="px-5 pb-16 sm:pb-20">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-br from-navy via-royal to-cyan px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 className="text-3xl font-extrabold text-primary-foreground sm:text-4xl">Take the First Step Towards Better Health</h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">Contact The Diabetes Centre to learn more about our healthcare services and appointment availability.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CtaButton href={CONTACT.whatsappHref} variant="light" onClick={() => trackAdsConversion("whatsapp")}><CalendarCheck className="h-5 w-5" />Book Your Appointment</CtaButton>
          <CtaButton href={CONTACT.whatsappHref} variant="ghostLight" onClick={() => trackAdsConversion("whatsapp")}><MessageCircle className="h-5 w-5" />WhatsApp Us</CtaButton>
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
        <div className="grid gap-2 text-sm"><a href={CONTACT.phoneHref} className="hover:text-cyan">{CONTACT.phone}</a><span>{CONTACT.address}</span></div>
      </Container>
      <Container className="mt-10 border-t border-primary-foreground/10 pt-6 text-xs">© {new Date().getFullYear()} The Diabetes Centre, Karachi. All rights reserved.</Container>
    </footer>
  );
}

export function MobileBar() {
  return (
    <>
      <div className="fixed bottom-24 right-4 z-[60] flex flex-col gap-3 sm:bottom-6 sm:right-6">
        <a href={CONTACT.phoneHref} aria-label={`Call The Diabetes Centre at ${CONTACT.phone}`} title={`Call ${CONTACT.phone}`} onClick={() => trackAdsConversion("call")} className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-background transition-transform hover:scale-105 hover:bg-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">
          <Phone className="h-6 w-6" />
        </a>
        <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with The Diabetes Centre on WhatsApp" title="WhatsApp" onClick={() => trackAdsConversion("whatsapp")} className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-2 ring-background transition-transform hover:scale-105 hover:bg-[#1DA851] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">
          <MessageCircle className="h-6 w-6" />
        </a>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 border-t border-border bg-background/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-soft backdrop-blur sm:hidden">
        <CtaButton href={CONTACT.phoneHref} variant="outline" className="min-h-12 rounded-xl px-2 text-xs" onClick={() => trackAdsConversion("call")}><Phone className="h-4 w-4" />Call Now: 0337-1111832</CtaButton>
        <CtaButton href={CONTACT.whatsappHref} variant="outline" className="min-h-12 rounded-xl border-cyan px-2 text-xs" onClick={() => trackAdsConversion("whatsapp")}><MessageCircle className="h-4 w-4" />WhatsApp</CtaButton>
        <CtaButton href={CONTACT.whatsappHref} className="min-h-12 rounded-xl px-2 text-xs" onClick={() => trackAdsConversion("whatsapp")}> <CalendarCheck className="h-4 w-4" />Book</CtaButton>
      </div>
    </>
  );
}
