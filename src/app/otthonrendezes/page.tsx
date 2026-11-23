import type { Metadata } from 'next';
import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleCheck,
  Clock,
  HandCoins,
  HandHeart,
  Home,
  MapPin,
  Phone,
  Recycle,
  Scale,
  Sparkles,
  Truck,
  Wrench,
} from 'lucide-react';
import {
  Eyebrow,
  LandingHeader,
  PHONE,
  PhotoPanel,
} from '@/components/otthonrendezes/LandingChrome';
import { LandingFooter } from '@/components/otthonrendezes/LandingFooter';
import { QuoteForm } from '@/components/otthonrendezes/QuoteForm';

export const metadata: Metadata = {
  title: 'Otthonrendezés és ingatlan-előkészítés',
  description:
    'A válogatástól és értékfelméréstől a teljes kiürítésen, takarításon át egészen a festésig. Budapest és Pest vármegye, 2001 óta.',
  alternates: { canonical: '/otthonrendezes' },
};

const painPoints = [
  {
    icon: Clock,
    title: 'Nincs ideje mindent megszervezni?',
    text: 'A sok egyeztetés és teendő könnyen szétaprózza a mindennapokat.',
  },
  {
    icon: Scale,
    title: 'Nem tudja, mi képviselhet értéket?',
    text: 'Segítünk átnézni a tárgyakat, mielőtt döntést hozna a sorsukról.',
  },
  {
    icon: Home,
    title: 'Rendezett állapotban adná át?',
    text: 'A kiürítéstől a takarításig és a kisebb előkészítő munkákig számíthat ránk.',
  },
];

const services = [
  {
    icon: Home,
    title: 'Átválogatás és rendszerezés',
    text: 'Közösen átnézzük a holmikat, és az Ön szempontjai szerint csoportosítjuk őket.',
  },
  {
    icon: Scale,
    title: 'Értékfelmérés',
    text: 'Segítünk felismerni, mely tárgyak képviselhetnek értéket, és mi érdemel külön figyelmet.',
  },
  {
    icon: HandCoins,
    title: 'Értékesítés segítése',
    text: 'A még értékes tárgyak megőrzésében és értékesítésének előkészítésében is segítséget nyújtunk.',
  },
  {
    icon: Truck,
    title: 'Teljes kiürítés és elszállítás',
    text: 'A megbeszélt módon megszervezzük az ingatlan kiürítését és a holmik elszállítását.',
  },
  {
    icon: Sparkles,
    title: 'Takarítás',
    text: 'A kiürítés után kitakarítjuk az ingatlant, hogy rendezett állapotban lehessen továbbadni.',
  },
  {
    icon: Wrench,
    title: 'Festés és kisebb javítások',
    text: 'Igény esetén a következő bérlőre vagy vevőre való felkészítésben is segítünk.',
  },
];

const reuse = [
  { icon: Scale, text: 'Ami értékes, annak segítünk megtalálni a megfelelő értékesítési lehetőséget.' },
  { icon: HandHeart, text: 'Ami használható, azt lehetőség szerint segélyszervezetekhez juttatjuk el.' },
  { icon: Recycle, text: 'Ami már nem használható, arról felelősen gondoskodunk.' },
];

const steps = [
  { title: 'Kapcsolatfelvétel', text: 'Elmondja, miben van szüksége segítségre.' },
  { title: 'Helyszíni felmérés', text: 'Megnézzük az ingatlant és átbeszéljük a feladatokat.' },
  { title: 'Személyre szabott ajánlat', text: 'Átláthatóan egyeztetjük a munkát és a költségeket.' },
  { title: 'A munka elvégzése', text: 'Megszervezzük és elvégezzük a megbeszélt feladatokat.' },
  { title: 'Átadás', text: 'Az ingatlant a megbeszélt állapotban adjuk át.' },
];

const trustPoints = [
  '2001 óta működő vállalkozás',
  'Diszkrét, tiszteletteljes hozzáállás',
  'Értékek körültekintő felmérése',
  'Átlátható, előre egyeztetett folyamat',
  'Egy kapcsolattartó, teljes körű ügyintézés',
];

const teamPoints = [
  'Összehangolt munkavégzés',
  'Megbízható, bevált szakemberek',
  'Előre egyeztetett feladatok',
  'Egy kapcsolattartó a teljes folyamat során',
];

const pad = (n: number) => String(n).padStart(2, '0');

function CheckDot({ className }: { className?: string }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-plum-mist text-plum ${className ?? ''}`}
    >
      <Check className="h-3 w-3" strokeWidth={2.5} />
    </span>
  );
}

function PrimaryCta({ className }: { className?: string }) {
  return (
    <a
      href="#ajanlatkeres"
      className={`inline-flex items-center justify-center gap-3 rounded-full bg-plum px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-lg shadow-plum/20 transition hover:bg-plum-deep ${className ?? ''}`}
    >
      Ajánlatot kérek <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function CallCta({ className }: { className?: string }) {
  return (
    <a
      href={`tel:${PHONE.href}`}
      className={`inline-flex items-center justify-center gap-3 rounded-full border border-plum/15 bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] text-plum-ink transition hover:border-plum/40 ${className ?? ''}`}
    >
      <Phone className="h-4 w-4" /> Hívjon minket
    </a>
  );
}

export default function HomePreparationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-linen text-plum-ink">
      <LandingHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-plum/15 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-plum-ink/70">
                <CircleCheck className="h-3.5 w-3.5" /> 2001 óta működő vállalkozás
              </span>
              <h1 className="mt-7 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-plum-ink sm:text-6xl">
                Egy otthon rendezése.{' '}
                <span className="text-plum-soft">Egy teherrel kevesebb.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-plum-ink/70">
                A válogatástól és értékfelméréstől a teljes kiürítésen, takarításon át egészen a
                festésig. Mi átvállaljuk a szervezést és a munka nagy részét.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <PrimaryCta />
                <CallCta />
              </div>
              <ul className="mt-8 flex flex-col gap-3 text-sm text-plum-ink/70 sm:flex-row sm:gap-6">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Budapest és Pest vármegye
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> Egy kézben, az első lépéstől az átadásig
                </li>
              </ul>
            </div>

            <PhotoPanel
              tone="plum"
              src="/images/otthonrendezes/hero-valogatas.webp"
              alt="Két ember gondosan dobozba csomagol egy porcelánvázát egy régi bútorokkal berendezett nappaliban"
              priority
              className="aspect-[5/4.4] rounded-[28px] shadow-2xl shadow-plum/20"
            >
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-plum-deep/95 via-plum-deep/70 to-transparent p-7 pt-28">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                    Gondos előkészítés
                  </p>
                  <p className="mt-2 font-serif text-2xl text-white sm:text-[26px]">
                    Nyugodtabb következő lépés.
                  </p>
                </div>
                <a
                  href="#miert"
                  aria-label="Tovább"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
                >
                  <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </PhotoPanel>
          </div>
        </section>

        {/* Pain points */}
        <section id="miert" className="scroll-mt-20 bg-linen-warm py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <Eyebrow>Nem kell mindent egyedül intéznie</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Amikor egy ingatlant rendezni kell, nem kell mindent egyedül megoldania.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-plum-ink/70">
              A folyamat lehet fizikailag megterhelő, érzelmileg nehéz és időigényes. A feladatok
              összehangolása önmagában is sok energiát kér.
            </p>

            <div className="mt-14 grid gap-5 text-left md:grid-cols-3">
              {painPoints.map(({ icon: Icon, title, text }, i) => (
                <div
                  key={title}
                  className="rounded-3xl border border-plum/10 bg-linen p-8 shadow-sm"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-plum-mist text-plum">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-bronze">{pad(i + 1)}</p>
                  <h3 className="mt-3 font-serif text-2xl leading-snug">{title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-plum-ink/70">{text}</p>
                </div>
              ))}
            </div>

            <p className="mt-12 font-serif text-2xl text-plum-ink/80">
              Mi segítünk átlátni a feladatokat, és végigvisszük a folyamatot.
            </p>
          </div>
        </section>

        {/* Services */}
        <section id="szolgaltatasok" className="scroll-mt-20 py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <Eyebrow>Rugalmas segítség, az Ön igényei szerint</Eyebrow>
                <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                  A teljes folyamat egy kézben
                </h2>
              </div>
              <p className="max-w-md text-[17px] text-plum-ink/70">
                Kérhet egy-egy részfeladatot vagy teljes körű ügyintézést. A teendőket és a
                költségeket előre, közösen egyeztetjük.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ icon: Icon, title, text }, i) => (
                <div key={title} className="rounded-3xl border border-plum/10 bg-white p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-plum-mist text-plum">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-serif text-plum-ink/50">{pad(i + 1)}</span>
                  </div>
                  <h3 className="mt-7 font-serif text-2xl">{title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-plum-ink/70">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid overflow-hidden rounded-3xl border border-plum/10 bg-linen-warm md:grid-cols-[2fr_3fr]">
              <PhotoPanel
                src="/images/otthonrendezes/valogatas-szeles.webp"
                alt="Két ember együtt nézi át a régi porcelánt, könyveket és festményeket egy nappaliban"
                className="min-h-[220px]"
              />
              <div className="p-8 md:p-10">
                <Eyebrow>Tisztelettel minden tárgy iránt</Eyebrow>
                <h3 className="mt-4 font-serif text-3xl">Először átlátjuk. Utána döntünk.</h3>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-plum-ink/70">
                  Nem siettetjük a döntéseket. Az átválogatás során együtt tekintjük át a holmikat,
                  így Ön nyugodtan mérlegelheti, mi maradjon, mely tárgyakhoz keressünk
                  értékesítési lehetőséget, és mi kerüljön elszállításra.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reuse / donations */}
        <section className="bg-sage py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <PhotoPanel
              tone="sage"
              src="/images/otthonrendezes/adomanyozas.webp"
              alt="Adományra előkészített dobozok összehajtott pulóverekkel, plüssmacival, edényekkel és könyvekkel"
              className="order-2 aspect-[5/4] rounded-[28px] shadow-xl shadow-sage-ink/10 lg:order-1"
            >
              <div className="absolute bottom-7 left-7 flex items-center gap-3 rounded-full bg-white py-2.5 pl-2.5 pr-5 text-sm font-semibold shadow-lg">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage text-sage-ink">
                  <HandHeart className="h-4 w-4" />
                </span>
                Tárgyak, amelyek új helyet találhatnak
              </div>
            </PhotoPanel>

            <div className="order-1 lg:order-2">
              <Eyebrow className="text-sage-ink">Gondos döntések, új lehetőségek</Eyebrow>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Ami másnak már nem szükséges, másnak még érték lehet.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-plum-ink/70">
                Nem az a célunk, hogy mindent kidobjunk. A használható, jó állapotú tárgyaknak
                igyekszünk új helyet találni. Együttműködünk segélyszervezetekkel, amelyek
                átvehetik és továbbadhatják azokat a tárgyakat, amelyek mások számára még valódi
                segítséget jelenthetnek.
              </p>
              <ul className="mt-8 space-y-3">
                {reuse.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-4 rounded-2xl border border-sage-ink/15 bg-white/70 px-5 py-4 text-[15px]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage text-sage-ink">
                      <Icon className="h-4 w-4" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-plum-ink/60">
                Az adományozás lehetősége az adott szervezet átvételi feltételeitől és
                kapacitásától függ.
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="folyamat" className="scroll-mt-20 bg-plum py-20 text-white md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <Eyebrow className="text-[#D9C2A6]">Ön mindig tudja, mi következik</Eyebrow>
              <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Egyszerűen, átláthatóan, lépésről lépésre
              </h2>
              <p className="mt-5 text-white/70">
                Egy kapcsolattartóval haladunk végig a megbeszélt feladatokon.
              </p>
            </div>

            <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {steps.map((step, i) => (
                <li key={step.title}>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 font-serif text-lg">
                    {pad(i + 1)}
                  </span>
                  <h3 className="mt-6 font-serif text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Trust */}
        <section className="bg-linen-warm py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <PhotoPanel
              src="/images/otthonrendezes/ertekfelmeres.webp"
              alt="Kesztyűs kézzel, gondosan vizsgál meg egy porcelán csészét egy munkatárs a dobozok között"
              className="aspect-[5/4] rounded-[28px]"
            >
              <div className="absolute bottom-7 left-7 right-7 max-w-xs rounded-2xl bg-linen p-6 shadow-xl">
                <p className="font-serif text-xl leading-snug">Figyelemmel. Tisztelettel. Együtt.</p>
                <p className="mt-2 text-sm text-plum-ink/70">
                  A fontos döntésekben az Ön tempójához igazodunk.
                </p>
              </div>
            </PhotoPanel>

            <div>
              <Eyebrow>Bizalom az első lépéstől</Eyebrow>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Értékekre vigyázunk. Emberségesen segítünk.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-plum-ink/70">
                Az otthon rendezése személyes ügy. Figyelmesen hallgatjuk meg, mire van szüksége,
                és csak az előre egyeztetett feladatokat végezzük el.
              </p>
              <ul className="mt-8 space-y-4">
                {trustPoints.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[16px]">
                    <CheckDot /> {p}
                  </li>
                ))}
              </ul>
              <a
                href="#ajanlatkeres"
                className="mt-9 inline-flex items-center gap-3 text-[15px] font-semibold hover:underline"
              >
                Beszéljük át a teendőket <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <PhotoPanel
              src="/images/otthonrendezes/festes.webp"
              alt="Festő szakember hengerrel festi a falat egy letakart bútorú szobában"
              className="order-2 aspect-[5/4] rounded-[28px] shadow-xl shadow-plum/10 lg:order-1"
            >
              <div className="absolute bottom-7 left-7 rounded-2xl bg-linen px-5 py-4 shadow-lg">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">
                  Otthon-előkészítés
                </p>
                <p className="mt-1 font-serif text-xl">Gondosan összehangolva</p>
              </div>
            </PhotoPanel>

            <div className="order-1 lg:order-2">
              <Eyebrow>Egy csapat, közös figyelem</Eyebrow>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Megbízható szakemberekkel dolgozunk.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-plum-ink/70">
                A teljes körű ügyintézéshez megbízható, tapasztalt szakemberekből álló csapattal
                dolgozunk együtt. A szükséges munkafolyamatokat összehangoljuk, így Önnek nem kell
                külön szakembereket keresnie és egyeztetnie.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {teamPoints.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 rounded-2xl border border-plum/10 bg-white px-4 py-4 text-[15px]"
                  >
                    <CheckDot className="mt-0.5" /> {p}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-plum/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">
                    Festési munkák
                  </p>
                  <p className="mt-2">
                    <span className="font-serif text-2xl">Séra István</span>{' '}
                    <span className="text-plum-ink/60">– Festő szakember</span>
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-plum-ink/70">
                    A festési munkák elvégzésében Séra István megbízható szakemberrel dolgozunk
                    együtt.
                  </p>
                </div>
                <a
                  href="tel:+36706278191"
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-plum/15 px-4 py-2.5 text-sm font-semibold transition hover:border-plum/40 sm:self-center"
                >
                  <Phone className="h-4 w-4" /> Telefon: 06 70 627 8191
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quote form */}
        <section id="ajanlatkeres" className="scroll-mt-20 pb-20 md:pb-28">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="grid overflow-hidden rounded-[28px] lg:grid-cols-[5fr_7fr]">
              <div className="relative flex flex-col justify-between overflow-hidden bg-plum p-8 text-white sm:p-12">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-36 h-72 w-72 rounded-full border border-white/10"
                />
                <div className="relative">
                  <Eyebrow className="text-[#D9C2A6]">Kezdjük egy beszélgetéssel</Eyebrow>
                  <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight">
                    Kérjen személyre szabott ajánlatot!
                  </h2>
                  <p className="mt-5 text-white/75">
                    Írja meg röviden, miben van szüksége segítségre. Hamarosan felvesszük Önnel a
                    kapcsolatot.
                  </p>
                </div>
                <div className="relative mt-12 border-t border-white/15 pt-8">
                  <p className="text-sm text-white/70">Telefonon is elér minket</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <a
                      href={`tel:${PHONE.href}`}
                      className="flex items-center gap-3 font-serif text-2xl hover:underline"
                    >
                      <Phone className="h-5 w-5" /> {PHONE.display}
                    </a>
                    <span className="flex items-center gap-2 text-sm text-white/70">
                      <MapPin className="h-4 w-4" /> Budapest és Pest vármegye
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-plum-haze p-6 sm:p-12">
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-plum/10 py-20 text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Eyebrow>A következő lépés lehet egyszerűbb</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Nem kell egyedül végigcsinálnia.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-plum-ink/70">
              Vegye fel velünk a kapcsolatot, és segítünk megtalálni a legegyszerűbb megoldást.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <CallCta />
              <PrimaryCta />
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
