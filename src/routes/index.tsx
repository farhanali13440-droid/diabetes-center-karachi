import { createFileRoute } from "@tanstack/react-router";
import { About, Concerns, Contact, Faqs, FinalCta, Footer, HERO_IMAGE, Header, Hero, HowItWorks, MobileBar, Packages, Services, Testimonials, WhyChoose } from "@/components/landing/Sections";

const title = "Diabetes Care & Healthcare Services in Karachi | The Diabetes Centre";
const description = "Explore diabetes management, diabetic foot care, nutrition, endocrinology, weight management and diagnostic services at The Diabetes Centre Karachi. Book an appointment.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_PK" },
      { name: "keywords", content: "diabetes care Karachi, diabetes management Karachi, diabetic foot screening Karachi, HbA1c test Karachi, nutrition clinic Karachi, diagnostic laboratory Karachi" },
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
