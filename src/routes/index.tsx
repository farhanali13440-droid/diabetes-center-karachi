import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diabetes Center Karachi" },
      { name: "description", content: "Diabetes Center Karachi — diabetes care in Karachi, Pakistan." },
      { property: "og:title", content: "Diabetes Center Karachi" },
      { property: "og:description", content: "Diabetes Center Karachi — diabetes care in Karachi, Pakistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <h1 className="text-center text-4xl font-bold text-foreground md:text-6xl">
        Diabetes Center Karachi
      </h1>
    </main>
  );
}
