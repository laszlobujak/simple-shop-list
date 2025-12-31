import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";
import { Card, CardContent } from "@/components/ui/card";
import { contactInfo } from "@/data/contactInfo";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Award,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kapcsolat - Értékbecslés & Zálog",
  description:
    "Vegye fel velünk a kapcsolatot! Személyes konzultáció, értékbecslés, záloghitel. Cím: 1062 Budapest, Teréz körút 55. Telefon: +36 1 354 0555",
  keywords: [
    "kapcsolat",
    "értékbecslés budapest",
    "zálogház budapest",
    "teréz körút",
    "személyes konzultáció",
  ],
  openGraph: {
    title: "Kapcsolat - Értékbecslés & Zálog",
    description:
      "Vegye fel velünk a kapcsolatot! Személyes konzultáció, értékbecslés, záloghitel.",
    type: "website",
  },
};

// Contact info card component - server component
function ContactInfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Phone;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { address, phone, email, openingHours, googleMapsEmbedUrl, qualifications, established, yearsOfExperience } =
    contactInfo;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 text-balance">
              Kapcsolat
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed text-pretty max-w-3xl mx-auto">
              Keressen minket bizalommal! Személyesen, telefonon vagy online -
              ahogy Önnek a legkényelmesebb.
            </p>
          </div>
        </section>

        {/* Contact Info + Form Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left - Contact Information */}
              <div className="space-y-8">
                <Card className="border-2">
                  <CardContent className="p-8 space-y-8">
                    <h2 className="font-serif text-2xl">Elérhetőségeink</h2>

                    <ContactInfoCard icon={MapPin} title="Cím">
                      <p className="font-medium">{address.full}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.full)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 inline-flex items-center gap-1 mt-1"
                      >
                        Útvonaltervezés <ExternalLink className="w-4 h-4" />
                      </a>
                    </ContactInfoCard>

                    <ContactInfoCard icon={Phone} title="Telefon">
                      <a
                        href={`tel:${phone.href}`}
                        className="text-accent hover:text-accent/80 font-medium text-lg"
                      >
                        {phone.display}
                      </a>
                    </ContactInfoCard>

                    <ContactInfoCard icon={Mail} title="Email">
                      <a
                        href={`mailto:${email}`}
                        className="text-accent hover:text-accent/80"
                      >
                        {email}
                      </a>
                    </ContactInfoCard>

                    <ContactInfoCard icon={Clock} title="Nyitvatartás">
                      <div className="space-y-1">
                        {openingHours.map((item) => (
                          <div
                            key={item.day}
                            className="flex justify-between gap-4"
                          >
                            <span>{item.day}</span>
                            <span className="font-medium">{item.hours}</span>
                          </div>
                        ))}
                      </div>
                    </ContactInfoCard>
                  </CardContent>
                </Card>

                {/* Qualifications Card */}
                <Card className="bg-muted/20">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-accent" />
                      <h2 className="font-serif text-2xl">Szakképesítéseink</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {qualifications.map((qual) => (
                        <div
                          key={qual}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <Shield className="w-4 h-4 text-accent flex-shrink-0" />
                          <span>{qual}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground border-t border-border pt-4">
                      {yearsOfExperience}+ év szakmai tapasztalat ({established}{" "}
                      óta)
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Right - Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 px-4 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl mb-4">Hol talál minket?</h2>
              <p className="text-muted-foreground text-lg">
                Könnyen megközelíthető a Nyugati pályaudvar közelében
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Map */}
              <div className="lg:col-span-2">
                <ContactMap
                  embedUrl={googleMapsEmbedUrl}
                  address={address.full}
                />
              </div>

              {/* Directions */}
              <Card className="h-fit">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-serif text-xl">Megközelítés</h3>

                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        Metróval
                      </p>
                      <p>M3-as metró, Nyugati pályaudvar megálló, 3 perc séta</p>
                    </div>

                    <div>
                      <p className="font-medium text-foreground mb-1">
                        Villamossal
                      </p>
                      <p>4-6 villamos, Nyugati tér megálló</p>
                    </div>

                    <div>
                      <p className="font-medium text-foreground mb-1">Autóval</p>
                      <p>Parkolás a környező utcákban (fizetős zóna)</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.full)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium"
                    >
                      <MapPin className="w-5 h-5" />
                      Útvonaltervezés megnyitása
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl">
              Készen áll a találkozásra?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Hívjon minket telefonon, vagy jöjjön be személyesen nyitvatartási
              időben. Időpont foglalás nem szükséges!
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`tel:${phone.href}`}
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg text-xl font-medium hover:bg-accent/90 transition-colors"
              >
                <Phone className="w-6 h-6" />
                {phone.display}
              </a>
              <Link
                href="/ai-ertekbecslo"
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 text-primary-foreground px-8 py-4 rounded-lg text-xl font-medium hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20"
              >
                Online AI értékbecslés
              </Link>
            </div>

            <p className="text-sm opacity-70">
              Diszkrét ügyintézés, szakértői tanácsadás, valós piaci árak
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
