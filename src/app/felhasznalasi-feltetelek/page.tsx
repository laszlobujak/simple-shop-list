import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { contactInfo } from "@/data/contactInfo";

export const metadata: Metadata = {
  title: "Felhasználási Feltételek - Értékbecslés & Zálog",
  description:
    "A weboldal használatának feltételei, a szolgáltatás jellege és korlátai, felhasználói kötelezettségek.",
  robots: "noindex, nofollow",
};

export default function TermsOfServicePage() {
  const { address, phone, email } = contactInfo;
  const companyName = "Értékbecslés & Zálog Kft.";
  const websiteUrl = "https://www.ertekbecsles-zalog.hu";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <article className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-neutral dark:prose-invert">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-8">
              Felhasználási Feltételek
            </h1>

            <p className="text-muted-foreground mb-8">
              <strong>Hatályos:</strong> 2025. december 31.
              <br />
              <strong>Szolgáltató:</strong> {companyName}
              <br />
              <strong>Székhely:</strong> {address.full}
              <br />
              <strong>E-mail:</strong>{" "}
              <a href={`mailto:${email}`} className="text-accent">
                {email}
              </a>
              <br />
              <strong>Weboldal:</strong>{" "}
              <a href={websiteUrl} className="text-accent">
                {websiteUrl}
              </a>
            </p>

            <p className="text-lg text-muted-foreground">
              A Weboldal használatával a Felhasználó elfogadja az alábbi
              Felhasználási Feltételeket. Amennyiben a Felhasználó nem ért egyet
              ezekkel, a Weboldalt nem jogosult használni.
            </p>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              1. A szolgáltatás tárgya
            </h2>
            <p className="text-muted-foreground">
              A Szolgáltató online előzetes értékbecslési szolgáltatást nyújt
              ingóságokra (pl. ékszerek, nemesfém tárgyak, órák), amely:
            </p>
            <ul className="space-y-1 text-muted-foreground mt-4">
              <li>tájékoztató jellegű,</li>
              <li>nem minősül hivatalos szakértői véleménynek,</li>
              <li>nem kötelező érvényű ajánlat.</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              A végleges érték megállapítása kizárólag személyes megtekintés és
              szakértői vizsgálat után történik.
            </p>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              2. A szolgáltatás jellege és korlátai
            </h2>

            <h3 className="font-semibold text-xl mt-6 mb-3">
              2.1. Online értékbecslés
            </h3>
            <p className="text-muted-foreground">Az online értékbecslés:</p>
            <ul className="space-y-1 text-muted-foreground mt-4">
              <li>a Felhasználó által megadott adatokon,</li>
              <li>feltöltött képeken,</li>
              <li>
                valamint automatizált (AI-alapú) és/vagy szakértői előszűrésen
                alapul.
              </li>
            </ul>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-6">
              <p className="text-amber-800 dark:text-amber-200 font-medium mb-2">
                A becslés pontosságát befolyásolhatja:
              </p>
              <ul className="space-y-1 text-amber-700 dark:text-amber-300 text-sm">
                <li>a képek minősége,</li>
                <li>az adatok teljessége,</li>
                <li>az ékszer állapota, tisztasága, javításai,</li>
                <li>rejtett hibák vagy anyagösszetétel.</li>
              </ul>
            </div>

            <p className="text-muted-foreground mt-4">
              A Szolgáltató nem vállal felelősséget az online becslés és a
              helyszíni vizsgálat közötti eltérésért.
            </p>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              3. Felhasználói kötelezettségek
            </h2>
            <p className="text-muted-foreground">A Felhasználó köteles:</p>
            <ul className="space-y-1 text-muted-foreground mt-4">
              <li>valós, pontos adatokat megadni,</li>
              <li>
                saját tulajdonában lévő vagy jogszerűen birtokolt tárgyat
                feltölteni,
              </li>
              <li>harmadik személy jogait nem sérteni.</li>
            </ul>

            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-6">
              <p className="text-red-800 dark:text-red-200 font-medium mb-2">
                Tilos:
              </p>
              <ul className="space-y-1 text-red-700 dark:text-red-300 text-sm">
                <li>hamis, lopott vagy jogellenes eredetű tárgy feltöltése,</li>
                <li>más személy adatainak engedély nélküli megadása,</li>
                <li>a rendszer rendeltetésellenes használata.</li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              4. Ajánlat, szerződés, kötelezettség
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>Az online értékbecslés nem minősül ajánlattételnek.</li>
              <li>
                A Szolgáltató nem köteles a becsült áron szerződést kötni.
              </li>
              <li>
                A zálogba vétel vagy felvásárlás külön, személyes eljárás
                keretében történik, külön szerződéssel.
              </li>
            </ul>

            <h2 className="font-serif text-2xl mt-12 mb-4">5. Díjazás</h2>
            <p className="text-muted-foreground">Az online értékbecslés:</p>
            <ul className="space-y-1 text-muted-foreground mt-4">
              <li>
                <strong>ingyenes</strong>,
              </li>
              <li>
                nem keletkeztet fizetési kötelezettséget a Felhasználó részére,
                kivéve, ha ezt a Weboldal külön jelzi.
              </li>
            </ul>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              6. Felelősség kizárása
            </h2>
            <p className="text-muted-foreground">
              A Szolgáltató nem vállal felelősséget:
            </p>
            <ul className="space-y-1 text-muted-foreground mt-4">
              <li>a becslés alapján hozott egyéni döntésekért,</li>
              <li>elmaradt haszonért,</li>
              <li>közvetett vagy következményi károkért,</li>
              <li>technikai hibákból eredő kiesésekért.</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              A Weboldalt a Felhasználó saját felelősségére használja.
            </p>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              7. Szellemi tulajdon
            </h2>
            <p className="text-muted-foreground">
              A Weboldalon található:
            </p>
            <ul className="space-y-1 text-muted-foreground mt-4">
              <li>szövegek,</li>
              <li>képek,</li>
              <li>grafikai elemek,</li>
              <li>logók,</li>
              <li>szoftveres megoldások</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              a Szolgáltató szellemi tulajdonát képezik, azok engedély nélküli
              másolása, felhasználása tilos.
            </p>

            <h2 className="font-serif text-2xl mt-12 mb-4">8. Adatkezelés</h2>
            <p className="text-muted-foreground">
              A Szolgáltató az adatokat az{" "}
              <Link href="/adatvedelem" className="text-accent">
                Adatvédelmi Nyilatkozat
              </Link>{" "}
              szerint kezeli, amely a Weboldalon külön elérhető.
            </p>
            <p className="text-muted-foreground mt-2">
              A Felhasználó a Weboldal használatával kijelenti, hogy az
              Adatvédelmi Nyilatkozatot megismerte és elfogadta.
            </p>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              9. A feltételek módosítása
            </h2>
            <p className="text-muted-foreground">
              A Szolgáltató jogosult a Felhasználási Feltételeket egyoldalúan
              módosítani.
            </p>
            <p className="text-muted-foreground mt-2">
              A módosítás a Weboldalon való közzététellel lép hatályba.
            </p>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              10. Jogvita, irányadó jog
            </h2>
            <p className="text-muted-foreground">A jelen feltételekre:</p>
            <ul className="space-y-1 text-muted-foreground mt-4">
              <li>a magyar jog az irányadó,</li>
              <li>
                vitás kérdések esetén a Szolgáltató székhelye szerinti bíróság
                az illetékes.
              </li>
            </ul>

            <h2 className="font-serif text-2xl mt-12 mb-4">11. Kapcsolat</h2>
            <p className="text-muted-foreground">
              <strong>Szolgáltató:</strong> {companyName}
              <br />
              <strong>E-mail:</strong>{" "}
              <a href={`mailto:${email}`} className="text-accent">
                {email}
              </a>
              <br />
              <strong>Telefon:</strong>{" "}
              <a href={`tel:${phone.href}`} className="text-accent">
                {phone.display}
              </a>
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <Link
                href="/"
                className="text-accent hover:text-accent/80 font-medium"
              >
                ← Vissza a főoldalra
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
