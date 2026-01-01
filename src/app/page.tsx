import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getPublicListingsCached } from '@/lib/listings-cached';
import { ListingShowcase } from '@/components/listings/ListingShowcase';
import { HeroImage } from '@/components/ui/hero-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Shield,
  Sparkles,
  CheckCircle2,
  Crown,
  ShoppingBag,
  Scale,
  Coins,
  MessageCircle,
  Phone,
  MapPin,
} from 'lucide-react';

export default async function HomePage() {
  const listings = await getPublicListingsCached();

  const trustPillars = [
    {
      title: '2001 óta a piacon',
      description: 'Több mint két évtizedes tapasztalat az értékbecslés és a záloghitel területén.',
    },
    {
      title: 'Szakértői képesítések',
      description: 'Óra-ékszer becsüs, műtárgy becsüs, drágakő határozói és iparcikk képesítéssel rendelkező szakembereink.',
    },
    {
      title: 'Diszkréció és biztonság',
      description: 'Bizalmas ügyintézés, biztonságos környezet, teljes körű titoktartás.',
    },
    {
      title: 'Segítünk dönteni, nem siettetünk',
      description: 'Nyugodt légkör, időt adunk a megfontolásra, nincsenek rejtett költségek.',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Fotó / űrlap elküldése',
      description: 'Küldjön fotót és alapadatokat tárgyáról kényelmesen, otthonról.',
    },
    {
      number: '2',
      title: 'AI előzetes értékbecslés',
      description: 'Gyors, tájékoztató jellegű értékbecslés perceken belül.',
    },
    {
      number: '3',
      title: 'Szakértői egyeztetés',
      description: 'Telefonos vagy személyes konzultáció szakértőinkkel.',
    },
    {
      number: '4',
      title: 'Értékmegállapítás',
      description: 'Pontos értékbecslés üzletünkben vagy Önnél otthon.',
    },
    {
      number: '5',
      title: 'Döntés és ügyintézés',
      description: 'Zálog, felvásárlás, beszámítás vagy piactéri értékesítés.',
    },
  ];

  const services = [
    {
      icon: Scale,
      title: 'Értékbecslés',
      description: 'Szakértői becslés ékszerekre, órákra, műtárgyakra és értéktárgyakra. Óra-ékszer becsüs és műtárgy becsüs képesítéssel.',
    },
    {
      icon: Shield,
      title: 'Zálog',
      description: 'Gyors záloghitel, rugalmas futamidő, kedvező feltételek. Drágakő határozói vizsgálat igény szerint.',
    },
    {
      icon: ShoppingBag,
      title: 'Beszámítás',
      description: 'Régi ékszerét új vásárlásba beszámítjuk kedvező áron. Iparcikk becsüs képesítéssel.',
    },
    {
      icon: Coins,
      title: 'Felvásárlás',
      description: 'Azonnali készpénzes felvásárlás valós piaci áron. Szakértői értékmegállapítás minden esetben.',
    },
    {
      icon: MessageCircle,
      title: 'Tanácsadás',
      description: 'Ingyenes konzultáció értéktárgyai kezeléséről és értékéről. Többszintű szakértői háttér.',
    },
  ];

  const faqs = [
    {
      question: 'Milyen képesítésekkel rendelkeznek a szakértők?',
      answer:
        'Szakértői csapatunk óra-ékszer becsüs, műtárgy becsüs, drágakő határozói és iparcikk becsüs képesítéssel rendelkezik. Több mint 20 éves piaci tapasztalattal garantáljuk az értékbecslések szakszerűségét és megbízhatóságát.',
    },
    {
      question: 'Mennyire pontos az AI értékbecslés?',
      answer:
        'Az AI alapú előzetes becslés tájékoztató jellegű, segít gyorsan felmérni tárgya körülbelüli értékét. A végső, pontos értéket mindig szakértőink állapítják meg személyesen, figyelembe véve az állapotot, ritkaságot és piaci keresletet.',
    },
    {
      question: 'Mennyi idő az előzetes becslés?',
      answer:
        'Az AI alapú előzetes értékbecslést általában néhány percen belül elküldjük. A szakértői végleges becslés személyes egyeztetés után történik, amely 15-30 percet vesz igénybe.',
    },
    {
      question: 'Mennyibe kerül az értékbecslés?',
      answer:
        'Az előzetes AI alapú becslés és az első konzultáció ingyenes. A részletes szakértői értékbecslés díja a tárgy típusától függ, de erről előzetesen mindig tájékoztatjuk Önt.',
    },
    {
      question: 'Hogyan zajlik a házhoz menő értékbecslés?',
      answer:
        'VIP szolgáltatásként szakértőnk előre egyeztetett időpontban az Ön otthonában végzi az értékbecslést. Ez ideális nagyobb, törékeny vagy nehezen szállítható tárgyak esetén. Diszkrét, biztonságos, időpont-alapú szolgáltatás.',
    },
    {
      question: 'Mit érdemes előkészíteni az értékbecsléshez?',
      answer:
        'Ha van, készítse elő a tanúsítványokat, eredeti dobozokat, számlát vagy egyéb dokumentációt. Több tárgynál segít, ha fényképeket készít előre. Minden információ hasznos a pontos értékbecsléshez.',
    },
    {
      question: 'Mi a különbség a zálog és a felvásárlás között?',
      answer:
        'Zálog esetén kölcsönt kap tárgya fedezetével, amit meghatározott időn belül visszaválthat. Felvásárlás esetén véglegesen értékesíti tárgyát készpénzért. Mindkét esetben tisztességes, piaci árat kínálunk.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-background to-muted/30 py-20 md:py-28 lg:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                    AI-alapú értékbecslés - másodpercek alatt
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                    Töltse fel ékszere fotóját, és mesterséges intelligenciánk azonnal előzetes árajánlatot ad.
                    Szakértőink személyesen is megerősítik a becslést.
                  </p>
                </div>

                {/* Trust Bullets */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-sm md:text-base">2001 óta működünk</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-sm md:text-base">3 szakember - több szakterület</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-sm md:text-base">Nyugati pályaudvarnál, könnyen elérhető</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-sm md:text-base">Diszkrét, korrekt ügyintézés</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-base md:text-lg px-8 py-6 bg-primary hover:bg-primary/90" asChild>
                    <Link href="/ai-ertekbecslo">AI értékbecslés</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-base md:text-lg px-8 py-6 border-2 bg-transparent" asChild>
                    <Link href="#hazhoz-megyunk">
                      <Crown className="w-5 h-5 mr-2" />
                      Házhoz megyünk (VIP)
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Column - Image */}
              <HeroImage
                src="/images/hero/hero-jewelry.webp"
                alt="Ékszerek és értéktárgyak"
                icon={Crown}
                title="Értékes tárgyak"
                subtitle="Ékszerek · Órák · Műtárgyak"
                className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Trust Pillars */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Miért bíznak bennünk?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Több mint 20 éves tapasztalat, szakértelem és megbízhatóság.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {trustPillars.map((pillar, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 md:p-8 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-balance">{pillar.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Hogyan működik?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Egyszerű, átlátható folyamat - lépésről lépésre.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              {/* Step 1 - Contact */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg mb-2">
                  <Image
                    src="/images/sections/person-calling-phone-contact-consultation.webp"
                    alt="Ügyfél telefonál"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-accent-foreground font-serif text-2xl font-bold">1</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-semibold">Kapcsolatfelvétel</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Hívjon minket telefonon, vagy töltse ki online űrlapunkat. Röviden ismertesse, milyen értéktárgyról van
                  szó.
                </p>
              </div>

              {/* Step 2 - Appraisal */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg mb-2">
                  <Image
                    src="/images/sections/expert-examining-jewelry-magnifying-glass-appraisal.webp"
                    alt="Szakértő értékbecslést végez"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-accent-foreground font-serif text-2xl font-bold">2</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-semibold">Szakértői értékbecslés</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Szakértőnk alaposan megvizsgálja tárgyát, és pontos, piaci alapú értékelést készít. Kérdezzen bátran!
                </p>
              </div>

              {/* Step 3 - Decision */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg mb-2">
                  <Image
                    src="/images/sections/customer-signing-contract-handshake-agreement.webp"
                    alt="Ügyfél döntést hoz"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-accent-foreground font-serif text-2xl font-bold">3</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-semibold">Nyugodt döntés</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ön nyugodtan mérlegelheti lehetőségeit: záloghitel, felvásárlás vagy piactéri értékesítés. Segítünk
                  választani.
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground bg-card inline-block px-6 py-3 rounded-full border">
                <strong>Fontos:</strong> A végső értéket mindig szakértő állapítja meg.
              </p>
            </div>
          </div>
        </section>

        {/* AI Appraisal Explainer */}
        <section id="ai-ertekbecsles" className="py-16 md:py-24 bg-card scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Image */}
              <div className="order-2 lg:order-1">
                <HeroImage
                  src="/images/sections/ai-appraisal.webp"
                  alt="AI technológia értékbecsléshez"
                  icon={Sparkles}
                  title="AI Technológia"
                  subtitle="Gyors és pontos értékbecslés"
                  className="relative h-[350px] rounded-lg overflow-hidden shadow-lg"
                />
              </div>

              {/* Right - Content */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span className="text-sm font-semibold text-accent-foreground">AI Technológia</span>
                </div>

                <h2 className="font-serif text-3xl md:text-4xl font-bold">
                  AI értékbecslés - gyors előzetes tájékoztatás
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Mesterséges intelligencia alapú rendszerünk segít gyors, előzetes képet kapni értéktárgya körülbelüli
                  értékéről.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>
                      <strong>Gyors:</strong> Perceken belül válaszolunk
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>
                      <strong>Kényelmes:</strong> Otthonról, fotó alapján
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>
                      <strong>Tájékoztató:</strong> Segít felmérni a lehetőségeket
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>
                      <strong>Szakértői kontroll:</strong> Mindig ember ellenőrzi
                    </span>
                  </li>
                </ul>

                <div className="pt-4">
                  <p className="text-sm text-muted-foreground italic border-l-4 border-accent pl-4">
                    Az AI becslés kiindulópont. A végleges értéket tapasztalt szakértőink határozzák meg személyes
                    vizsgálat után.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VIP Home Visit */}
        <section id="hazhoz-megyunk" className="py-16 md:py-24 bg-accent/10 border-y-2 border-accent/30">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full">
                <Crown className="w-5 h-5 text-accent-foreground" />
                <span className="text-sm font-bold text-accent-foreground">VIP Szolgáltatás</span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">Házhoz megy az értékbecslő</h2>

              <p className="text-lg text-foreground/90 max-w-3xl mx-auto leading-relaxed">
                Szakértőnk Önhöz látogat - előre egyeztetett időpontban, diszkréten, biztonságosan.
              </p>

              {/* Two Options Grid */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-8">
                {/* Option 1: Gold Purchase */}
                <Card className="border-2 border-accent/50 bg-background">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                      <Coins className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold">Arany felvásárlás helyben</h3>
                    <p className="text-muted-foreground">
                      Arany ékszereit helyben, az Ön otthonában vásároljuk fel. Azonnali készpénzfizetés, átlátható árazás.
                    </p>
                    <ul className="text-sm text-left space-y-2 pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>Azonnali készpénz</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>Világpiaci áron számolunk</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>Helyszíni mérés és vizsgálat</span>
                      </li>
                    </ul>
                    <Button size="lg" className="w-full mt-4" asChild>
                      <Link href="/kapcsolat">
                        <Phone className="w-5 h-5 mr-2" />
                        Időpontot kérek
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Option 2: Marketplace */}
                <Card className="border-2 border-primary/30 bg-background">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold">Nagyobb ingóságok piactéren</h3>
                    <p className="text-muted-foreground">
                      Bútorok, festmények, műtárgyak, gyűjtemények - segítünk a piactéren keresztül értékesíteni.
                    </p>
                    <ul className="text-sm text-left space-y-2 pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Professzionális fotózás</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Hirdetés a piacterünkön</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Magasabb eladási ár lehetséges</span>
                      </li>
                    </ul>
                    <Button size="lg" variant="outline" className="w-full mt-4 border-2" asChild>
                      <Link href="/piacter">
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Piactér megtekintése
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <p className="text-sm text-muted-foreground italic pt-6">
                Biztonság: Szakértőink azonosító igazolvánnyal érkeznek. Minden értékbecslésről írásos dokumentumot adunk.
              </p>
            </div>
          </div>
        </section>

        {/* Marketplace Section with Listings */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left - Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                  <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-semibold">Értékesítési Lehetőség</span>
                </div>

                <h2 className="font-serif text-3xl md:text-4xl font-bold">Piactér: segítünk az értékesítésben</h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nem csak felvásárlást kínálunk - közvetítőként is segítünk értéktárgyai értékesítésében. Piacterünkön
                  érdeklődő vásárlókkal hozzuk össze Önt, biztonságos és szervezett keretek között.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Közvetítői modell</h4>
                      <p className="text-sm text-muted-foreground">Összekötjük eladókat és vásárlókat</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Mi kezeljük az érdeklődéseket</h4>
                      <p className="text-sm text-muted-foreground">Nem kell közvetlenül foglalkoznia a vevőkkel</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Biztonságos folyamat</h4>
                      <p className="text-sm text-muted-foreground">Ellenőrzött, szervezett értékesítés</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Jobb ár lehetséges</h4>
                      <p className="text-sm text-muted-foreground">A piaci kereslet szerint</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button size="lg" variant="outline" className="text-base border-2 bg-transparent" asChild>
                    <Link href="/kapcsolat">Szeretném eladni - érdeklődöm</Link>
                  </Button>
                </div>
              </div>

              {/* Right - Image */}
              <HeroImage
                src="/images/sections/marketplace.webp"
                alt="Online piactér értéktárgyakhoz"
                icon={ShoppingBag}
                title="Online Piactér"
                subtitle="Biztonságos értékesítés"
                className="relative h-[400px] rounded-lg overflow-hidden shadow-lg"
              />
            </div>

            {/* Listings Showcase */}
            <div className="border-t border-border pt-16">
              <div className="text-center mb-12">
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">Aktuális kínálatunk</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Legújabb értéktárgyaink a piacterünkön. Minden darab szakértői becslés alapján kerül értékesítésre.
                </p>
              </div>
              <ListingShowcase listings={listings} maxItems={4} />
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Szolgáltatásaink</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Teljes körű megoldások értéktárgyaihoz.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 md:p-8 space-y-4">
                      <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl font-semibold">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Gyakori kérdések</h2>
              <p className="text-lg text-muted-foreground">Válaszok a leggyakrabban felmerülő kérdésekre.</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-2 rounded-lg px-6 data-[state=open]:bg-muted/30"
                >
                  <AccordionTrigger className="text-left font-semibold text-base md:text-lg hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA + Contact */}
        <section id="kapcsolat" className="py-16 md:py-24 bg-primary text-primary-foreground scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
            <div className="space-y-8">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
                Készen áll a következő lépésre?
              </h2>

              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                Vegye fel velünk a kapcsolatot még ma. Szakértőink készséggel állnak rendelkezésére, hogy segítsünk
                meghozni a legjobb döntést.
              </p>

              <div className="flex items-center justify-center gap-2 text-lg">
                <MapPin className="w-5 h-5" />
                <span>Nyugati pályaudvar környéke - könnyen megközelíthető</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" variant="secondary" className="text-base md:text-lg px-8 py-6" asChild>
                  <Link href="/kapcsolat">
                    <Phone className="w-5 h-5 mr-2" />
                    Hívás indítása
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base md:text-lg px-8 py-6 border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 text-primary-foreground bg-transparent"
                  asChild
                >
                  <Link href="/kapcsolat">Űrlap kitöltése</Link>
                </Button>
              </div>

              <div className="pt-8 opacity-75 text-sm">
                <p>
                  Telefonon: <strong>+36 1 354 0555</strong>
                </p>
                <p className="mt-1">
                  Email: <strong>info@ertekbecsles.hu</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
