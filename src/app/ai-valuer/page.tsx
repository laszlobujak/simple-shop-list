import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIAppraisalForm } from "@/components/ai-appraisal/AIAppraisalForm";

export const metadata: Metadata = {
  title: "AI Értékbecslés - Ékszer Értékbecslő",
  description:
    "AI alapú előzetes ékszer értékbecslés. Pár adat és fotó alapján segítünk felmérni az Ön ékszerének várható értékét. Szakértői ellenőrzés minden esetben.",
  keywords: [
    "AI értékbecslés",
    "ékszer értékbecslés",
    "arany értékbecslés",
    "online értékbecslés",
    "ékszer becsüs",
  ],
  openGraph: {
    title: "AI Értékbecslés - Ékszer Értékbecslő",
    description:
      "AI alapú előzetes ékszer értékbecslés. Pár adat és fotó alapján segítünk felmérni az Ön ékszerének várható értékét.",
    type: "website",
  },
};

export default function AIAppraisalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <AIAppraisalForm />
      </main>

      <Footer />
    </div>
  );
}
