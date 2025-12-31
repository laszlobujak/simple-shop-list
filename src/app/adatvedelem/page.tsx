import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { contactInfo } from "@/data/contactInfo";

export const metadata: Metadata = {
  title: "Adatvédelmi Nyilatkozat - Értékbecslés & Zálog",
  description:
    "Adatvédelmi nyilatkozatunk ismerteti, hogyan gyűjtjük, kezeljük és védjük személyes adatait a weboldal használata során.",
  robots: "noindex, nofollow",
};

export default function PrivacyPolicyPage() {
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
              Adatvédelmi Nyilatkozat
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
              <strong>Telefon:</strong>{" "}
              <a href={`tel:${phone.href}`} className="text-accent">
                {phone.display}
              </a>
              <br />
              <strong>Weboldal:</strong>{" "}
              <a href={websiteUrl} className="text-accent">
                {websiteUrl}
              </a>
            </p>

            <p className="text-lg text-muted-foreground">
              Ez az Adatvédelmi Nyilatkozat ismerteti, hogyan gyűjtjük, kezeljük,
              tároljuk és védjük a személyes adatokat a zálogház értékbecslő
              weboldal (a továbbiakban: „Weboldal") használata során, valamint
              milyen jogok illetik meg a felhasználókat az adatkezeléssel
              kapcsolatban.
            </p>

            <h2 className="font-serif text-2xl mt-12 mb-4">1. Fogalmak</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <strong>Személyes adat:</strong> bármely információ, amely
                természetes személlyel kapcsolatba hozható (pl. név, e-mail,
                telefonszám).
              </li>
              <li>
                <strong>Értékbecslés:</strong> a zálogtárgy piaci értékének
                felmérése a Weboldalon keresztül.
              </li>
              <li>
                <strong>Felhasználó:</strong> minden olyan látogató vagy ügyfél,
                aki igénybe veszi a Weboldal szolgáltatásait.
              </li>
            </ul>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              2. Az adatkezelés jogalapja és célja
            </h2>

            <h3 className="font-semibold text-xl mt-6 mb-3">
              2.1. Honlap működtetése
            </h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <strong>Cél:</strong> a Weboldal működéséhez szükséges technikai
                adatok kezelése.
              </li>
              <li>
                <strong>Adatok:</strong> IP-cím, böngésző típusa, dátum/idő.
              </li>
              <li>
                <strong>Jogalap:</strong> jogos érdek (GDPR 6. cikk (1) f)
                pont).
              </li>
            </ul>

            <h3 className="font-semibold text-xl mt-6 mb-3">
              2.2. Értékbecslő szolgáltatás
            </h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <strong>Cél:</strong> ingóságok zálogba vételéhez kapcsolódó
                online értékbecslés elkészítése.
              </li>
              <li>
                <strong>Adatok:</strong> név, e-mail cím, telefonszám, ingóság
                jellemzői és fényképei.
              </li>
              <li>
                <strong>Jogalap:</strong> szerződés teljesítése / felhasználó
                kifejezett hozzájárulása (GDPR 6. cikk (1) b) és a) pont).
              </li>
            </ul>

            <h3 className="font-semibold text-xl mt-6 mb-3">
              2.3. Kapcsolattartás
            </h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <strong>Cél:</strong> érdeklődések, kérdések és visszajelzések
                kezelése.
              </li>
              <li>
                <strong>Adatok:</strong> név, e-mail cím, üzenet szövege.
              </li>
              <li>
                <strong>Jogalap:</strong> felhasználó hozzájárulása (GDPR 6.
                cikk (1) a) pont).
              </li>
            </ul>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              3. Milyen adatokat gyűjtünk?
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-muted-foreground border border-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Adattípus
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Mire használjuk?
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Tárolás időtartama
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Név</td>
                    <td className="px-4 py-3">Azonosítás és kommunikáció</td>
                    <td className="px-4 py-3">
                      3 év vagy ameddig jogilag szükséges
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">E-mail cím</td>
                    <td className="px-4 py-3">Értékbecslés eredmény küldése</td>
                    <td className="px-4 py-3">3 év</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Telefonszám</td>
                    <td className="px-4 py-3">Kapcsolattartás</td>
                    <td className="px-4 py-3">3 év</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">IP-cím, böngészési adatok</td>
                    <td className="px-4 py-3">
                      Weboldal működtetése és statisztika
                    </td>
                    <td className="px-4 py-3">1 év</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Feltöltött fényképek</td>
                    <td className="px-4 py-3">Értékbecsléshez</td>
                    <td className="px-4 py-3">3 év</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              4. Süti (Cookie) szabályzat
            </h2>
            <p className="text-muted-foreground">A Weboldal sütiket használ:</p>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li>
                <strong>Működési sütik:</strong> a weboldal biztonságos és
                zökkenőmentes működéséhez.
              </li>
              <li>
                <strong>Elemzési sütik:</strong> weboldal használatának anonim
                méréséhez (pl. Google Analytics).
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              <strong>Sütik elfogadása:</strong> a felhasználó kifejezetten
              hozzájárul, amikor elfogadja a sütik használatát a felugró
              értesítési sávban.
            </p>

            <h2 className="font-serif text-2xl mt-12 mb-4">5. Adatbiztonság</h2>
            <p className="text-muted-foreground">
              A Szolgáltató megfelelő technikai és szervezési intézkedéseket
              alkalmaz az adatok védelmére, ideértve:
            </p>
            <ul className="space-y-1 text-muted-foreground mt-4">
              <li>titkosítást (HTTPS),</li>
              <li>hozzáférés-szabályozást,</li>
              <li>rendszeres biztonsági mentést.</li>
            </ul>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              6. Adatmegosztás és adattovábbítás
            </h2>
            <p className="text-muted-foreground">
              A Szolgáltató harmadik félnek csak a funkció ellátásához szükséges
              mértékben ad át adatokat (pl. tárhelyszolgáltató, e-mail küldő
              szolgáltatás).
            </p>
            <p className="text-muted-foreground mt-2">
              Harmadik féltől érkező automatizált döntéshozatal vagy
              profilalkotás nem történik.
            </p>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              7. Felhasználói jogok
            </h2>
            <p className="text-muted-foreground">
              A felhasználót az alábbi jogok illetik meg:
            </p>
            <ul className="space-y-1 text-muted-foreground mt-4">
              <li>Tájékoztatáshoz való jog,</li>
              <li>Hozzáférés joga a saját adatokhoz,</li>
              <li>Helyesbítés joga,</li>
              <li>Törlés joga („elfeledtetéshez való jog"),</li>
              <li>Adatkezelés korlátozásának joga,</li>
              <li>Tiltakozás joga,</li>
              <li>Adathordozhatósághoz való jog.</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Kérelmeket az alábbi e-mail címre küldhetsz:{" "}
              <a href={`mailto:${email}`} className="text-accent">
                {email}
              </a>
            </p>

            <h2 className="font-serif text-2xl mt-12 mb-4">
              8. Adatkezelés időtartama
            </h2>
            <p className="text-muted-foreground">
              A személyes adatokat a jogszabályi kötelezettségek teljesítéséig,
              illetve a szolgáltatási cél megszűnésétől számított legfeljebb 3
              évig tároljuk, kivéve, ha a törvény ettől hosszabb időt ír elő.
            </p>

            <h2 className="font-serif text-2xl mt-12 mb-4">9. Jogorvoslat</h2>
            <p className="text-muted-foreground">
              Ha úgy érzed, hogy az adatkezelés sérti a GDPR-t, panaszt tehetsz
              a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH).
            </p>
            <p className="text-muted-foreground mt-2">
              <strong>NAIH elérhetősége:</strong>
              <br />
              Cím: 1055 Budapest, Falk Miksa utca 9-11.
              <br />
              Telefon: +36 1 391 1400
              <br />
              E-mail: ugyfelszolgalat@naih.hu
              <br />
              Weboldal:{" "}
              <a
                href="https://www.naih.hu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent"
              >
                www.naih.hu
              </a>
            </p>

            <h2 className="font-serif text-2xl mt-12 mb-4">10. Kapcsolat</h2>
            <p className="text-muted-foreground">
              <strong>Adatkezelő:</strong> {companyName}
              <br />
              <strong>Levelezési cím:</strong> {address.full}
              <br />
              <strong>E-mail:</strong>{" "}
              <a href={`mailto:${email}`} className="text-accent">
                {email}
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
