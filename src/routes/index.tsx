import { createFileRoute } from "@tanstack/react-router";
import { About, Concerns, Contact, Faqs, FinalCta, Footer, HERO_IMAGE, Header, Hero, HowItWorks, MobileBar, Packages, Services, Testimonials, WhyChoose } from "@/components/landing/Sections";

const title = "The Diabetes Centre Karachi | Book a Diabetes Appointment";
const description = "Specialist diabetes care in Karachi: consultations, insulin management, foot and eye screening, nutrition and screening packages. Book today.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: HERO_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: HERO_IMAGE },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero /><Concerns /><WhyChoose /><About /><Services /><Packages /><HowItWorks /><Testimonials /><Faqs /><Contact /><FinalCta />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
