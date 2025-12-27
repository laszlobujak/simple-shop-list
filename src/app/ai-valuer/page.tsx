"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Info, Check, Phone, MapPin, Shield } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

interface AIEstimate {
  marketValue: number
  lowerBound: number
  confidence?: string
  notes?: string
}

export default function AIAppraisalPage() {
  const [images, setImages] = useState<File[]>([])
  const [weight, setWeight] = useState("")
  const [karat, setKarat] = useState("")
  const [material, setMaterial] = useState("")
  const [hasHallmark, setHasHallmark] = useState("")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [thickness, setThickness] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [estimate, setEstimate] = useState<AIEstimate | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Convert images to base64
      const imagePromises = images.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            const base64 = reader.result as string
            // Remove the data:image/...;base64, prefix
            const base64Data = base64.split(',')[1]
            resolve(base64Data)
          }
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })

      const imageBase64Array = await Promise.all(imagePromises)

      // Call AI appraisal API
      const response = await fetch('/api/ai-appraisal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weight,
          material,
          karat,
          hasHallmark,
          length,
          width,
          thickness,
          images: imageBase64Array,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Hiba történt az értékbecslés során')
      }

      const aiEstimate: AIEstimate = await response.json()
      setEstimate(aiEstimate)
    } catch (error) {
      console.error('Error fetching AI appraisal:', error)
      alert(error instanceof Error ? error.message : 'Hiba történt az értékbecslés során. Kérjük, próbálja újra.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSubmit = () => {
    // Mock email submission - would send data to backend
    const emailData = {
      images,
      weight,
      karat,
      material,
      dimensions: { length, width, thickness },
      estimate,
      hasHallmark,
    }
    console.log("[v0] Email data:", emailData)
    alert("Ajánlatát sikeresen továbbítottuk szakértőinknek. Hamarosan jelentkezünk!")
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 text-balance">
            AI alapú előzetes ékszer értékbecslés
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed text-pretty">
            Pár adat és fotó alapján segítünk felmérni az Ön ékszerének várható értékét. A végső értéket minden esetben
            szakértő állapítja meg.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span>2001 óta működünk</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-accent" />
              <span>Szakértői csapat</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-accent" />
              <span>Diszkrét ügyintézés</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-accent" />
              <span>Nyugodt döntések, nem siettetünk</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-3xl">AI Értékbecslés</CardTitle>
              <CardDescription className="text-lg">
                Töltse ki az alábbi mezőket a becslés elkészítéséhez
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image Upload Section */}
                <div className="space-y-3">
                  <Label htmlFor="images" className="text-lg font-semibold">
                    Képek feltöltése *
                  </Label>
                  <div className="border-2 border-dashed border-accent rounded-lg p-8 text-center bg-card cursor-pointer hover:bg-muted/20 transition-colors">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-accent" />
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="mb-3 cursor-pointer"
                      required
                    />
                    {images.length > 0 && <p className="text-muted-foreground text-base mb-4">{images.length} kép kiválasztva</p>}

                    {/* Image Preview */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-border">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Feltöltött kép ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Kérjük, több szögből készült, jó fényviszonyok melletti képeket töltsön fel. Ha van jelzés (karát,
                    fémjel), azt is fotózza le közelről.
                  </p>
                </div>

                {/* Basic Data Section */}
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl">Alapadatok</h3>

                  <div className="space-y-3">
                    <Label htmlFor="weight" className="text-lg">
                      Súly (gramm) *
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.01"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="text-lg p-6"
                      placeholder="pl. 15.5"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="material" className="text-lg">
                      Anyag (opcionális)
                    </Label>
                    <Select value={material} onValueChange={setMaterial}>
                      <SelectTrigger className="text-lg p-6">
                        <SelectValue placeholder="Válasszon anyagot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arany">Arany</SelectItem>
                        <SelectItem value="feherarany">Fehérarany</SelectItem>
                        <SelectItem value="ezust">Ezüst</SelectItem>
                        <SelectItem value="platina">Platina</SelectItem>
                        <SelectItem value="egyeb">Egyéb</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="karat" className="text-lg">
                      Karát (opcionális)
                    </Label>
                    <Select value={karat} onValueChange={setKarat}>
                      <SelectTrigger className="text-lg p-6">
                        <SelectValue placeholder="Válasszon karátot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8k">8K</SelectItem>
                        <SelectItem value="9k">9K</SelectItem>
                        <SelectItem value="10k">10K</SelectItem>
                        <SelectItem value="14k">14K</SelectItem>
                        <SelectItem value="18k">18K</SelectItem>
                        <SelectItem value="21k">21K</SelectItem>
                        <SelectItem value="22k">22K</SelectItem>
                        <SelectItem value="ismeretlen">Ismeretlen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="hallmark" className="text-lg">
                      Van-e fémjelzés a tárgyon? *
                    </Label>
                    <Select value={hasHallmark} onValueChange={setHasHallmark} required>
                      <SelectTrigger className="text-lg p-6">
                        <SelectValue placeholder="Válasszon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="igen">Igen, van fémjelzés</SelectItem>
                        <SelectItem value="nem">Nem, nincs fémjelzés</SelectItem>
                        <SelectItem value="nemtudom">Nem tudom / Nem látom egyértelműen</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      A fémjelzés (pl. 585, 750, 14K, 18K) általában apró betűk vagy számok az ékszeren, amelyek az
                      anyag tisztaságát jelölik.
                    </p>
                  </div>
                </div>

                {/* Optional Dimensions Section */}
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl">Opcionális méretek</h3>
                  <p className="text-base text-muted-foreground">
                    A méretek megadása segíti a pontosabb becslést, de nem kötelező.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="length" className="text-base">
                        Hosszúság (mm)
                      </Label>
                      <Input
                        id="length"
                        type="number"
                        step="0.1"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="text-lg p-6"
                        placeholder="pl. 25.0"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="width" className="text-base">
                        Szélesség (mm)
                      </Label>
                      <Input
                        id="width"
                        type="number"
                        step="0.1"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="text-lg p-6"
                        placeholder="pl. 10.0"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="thickness" className="text-base">
                        Vastagság (mm)
                      </Label>
                      <Input
                        id="thickness"
                        type="number"
                        step="0.1"
                        value={thickness}
                        onChange={(e) => setThickness(e.target.value)}
                        className="text-lg p-6"
                        placeholder="pl. 2.5"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full text-xl py-8"
                >
                  {isLoading ? "Becslés folyamatban..." : "Becslés elkészítése"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How AI Calculates Section */}
      <section className="py-12 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Info className="w-8 h-8 text-accent" />
                <CardTitle className="font-serif text-2xl">Hogyan számol az AI?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <ul className="space-y-3 list-none">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span>Elemzi a feltöltött képeket: állapot, kidolgozottság, anyagminőség</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span>A világpiaci nemesfém árakat veszi alapul</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span>Figyelembe veszi a megadott súlyt, anyagot és karátot</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span>
                    Az AI egy <strong>reális piaci értéksávot</strong> ad vissza
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span>
                    Ez <strong>nem végleges ár</strong>, hanem tájékoztató becslés
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI Result Section */}
      {estimate && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="border-2 border-accent shadow-xl bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <CardTitle className="font-serif text-3xl text-center">Becsült értéksáv</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-card p-8 rounded-lg border-2 border-border text-center">
                  <p className="text-base text-muted-foreground mb-4">Becsült érték</p>
                  <p className="font-serif text-4xl font-bold">
                    {formatCurrency(estimate.lowerBound)} - {formatCurrency(estimate.marketValue)}
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg border-l-4 border-accent">
                  <p className="text-lg text-muted-foreground text-center leading-relaxed">
                    {estimate.notes || 'A pontos érték az ékszer állapotának és vizsgálatának függvénye.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Email Submission Section */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-center">
                  Továbbítás szakértőinknek
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-xl text-muted-foreground text-center leading-relaxed">
                  Ha az előzetes becslés megfelelő Önnek, egy gombnyomással továbbíthatja szakértőinknek.
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={handleEmailSubmit}
                    className="flex-1 text-xl py-8 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Ajánlat továbbítása emailen
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 text-xl py-8 border-2"
                  >
                    Szakértői egyeztetést kérek
                  </Button>
                </div>

                <p className="text-base text-muted-foreground text-center">
                  Adatait bizalmasan kezeljük, harmadik félnek nem adjuk tovább.
                </p>
              </CardContent>
            </Card>

            {/* Next Steps Section */}
            <Card className="bg-muted/20">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Mi történik ezután?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-lg text-muted-foreground pt-1">Szakértő átnézi az adatokat és képeket</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-lg text-muted-foreground pt-1">Telefonos vagy emailes egyeztetés</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-muted-foreground mb-3">Döntés: üzletben vagy VIP házhoz kiszállással</p>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full md:w-auto text-lg py-6 border-2 border-accent"
                    >
                      VIP házhoz becslést kérek
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Disclaimer / Trust Footer */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-primary-foreground/10 p-8 rounded-lg border border-primary-foreground/20">
            <p className="text-xl text-center leading-relaxed mb-4">
              Az AI értékbecslés tájékoztató jellegű. A végső értéket minden esetben szakértő állapítja meg személyes
              vizsgálat alapján.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <Phone className="w-10 h-10 mx-auto mb-3 text-accent" />
              <p className="text-lg font-semibold">Telefonszám</p>
              <p className="text-base opacity-80">+36 1 234 5678</p>
            </div>
            <div className="space-y-2">
              <MapPin className="w-10 h-10 mx-auto mb-3 text-accent" />
              <p className="text-lg font-semibold">Helyszín</p>
              <p className="text-base opacity-80">Nyugati pályaudvar környéke</p>
            </div>
            <div className="space-y-2">
              <Shield className="w-10 h-10 mx-auto mb-3 text-accent" />
              <p className="text-lg font-semibold">Tapasztalat</p>
              <p className="text-base opacity-80">2001 óta működünk</p>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-primary-foreground/20">
            <Link href="/" className="text-lg text-accent hover:text-accent/80 underline">
              ← Vissza a főoldalra
            </Link>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  )
}
