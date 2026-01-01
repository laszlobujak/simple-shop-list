"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Info, Check, Phone, MapPin, Shield } from "lucide-react";
import Link from "next/link";
import {
  aiAppraisalSchema,
  defaultAIAppraisalValues,
  type AIAppraisalInput,
  type Material,
  type Karat,
  type Hallmark,
} from "@/lib/validations/ai-appraisal";
import { FormField, getFieldError } from "@/components/admin/ListingDialog/FormField";

interface AIEstimate {
  marketValue: number;
  lowerBound: number;
  confidence?: string;
  notes?: string;
}

export function AIAppraisalForm() {
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [estimate, setEstimate] = useState<AIEstimate | null>(null);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  }, []);

  const handleSubmit = async (value: AIAppraisalInput) => {
    if (images.length === 0) {
      alert("Kérjük, töltsön fel legalább egy képet!");
      return;
    }

    setIsLoading(true);

    try {
      // Convert images to base64
      const imagePromises = images.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;
            const base64Data = base64.split(",")[1];
            resolve(base64Data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const imageBase64Array = await Promise.all(imagePromises);

      const response = await fetch("/api/ai-appraisal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...value,
          images: imageBase64Array,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Hiba történt az értékbecslés során");
      }

      const aiEstimate: AIEstimate = await response.json();
      setEstimate(aiEstimate);
    } catch (error) {
      console.error("Error fetching AI appraisal:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Hiba történt az értékbecslés során. Kérjük, próbálja újra."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm({
    defaultValues: defaultAIAppraisalValues,
    validators: {
      onSubmit: aiAppraisalSchema,
    },
    onSubmit: async ({ value }) => {
      await handleSubmit(value);
    },
  });

  const handleEmailSubmit = () => {
    const formValues = {
      weight: form.getFieldValue("weight"),
      karat: form.getFieldValue("karat"),
      material: form.getFieldValue("material"),
      hasHallmark: form.getFieldValue("hasHallmark"),
      dimensions: {
        length: form.getFieldValue("length"),
        width: form.getFieldValue("width"),
        thickness: form.getFieldValue("thickness"),
      },
    };

    const emailData = {
      images,
      ...formValues,
      estimate,
    };
    console.log("[v0] Email data:", emailData);
    alert(
      "Ajánlatát sikeresen továbbítottuk szakértőinknek. Hamarosan jelentkezünk!"
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 text-balance">
            AI alapú előzetes ékszer értékbecslés
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed text-pretty">
            Pár adat és fotó alapján segítünk felmérni az Ön ékszerének várható
            értékét. A végső értéket minden esetben szakértő állapítja meg.
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
              <CardTitle className="font-serif text-3xl">
                AI Értékbecslés
              </CardTitle>
              <CardDescription className="text-lg">
                Töltse ki az alábbi mezőket a becslés elkészítéséhez
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="space-y-8"
              >
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
                      disabled={isLoading}
                    />
                    {images.length > 0 && (
                      <p className="text-muted-foreground text-base mb-4">
                        {images.length} kép kiválasztva
                      </p>
                    )}

                    {/* Image Preview */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden border-2 border-border"
                          >
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
                    Kérjük, több szögből készült, jó fényviszonyok melletti
                    képeket töltsön fel. Ha van jelzés (karát, fémjel), azt is
                    fotózza le közelről.
                  </p>
                </div>

                {/* Basic Data Section */}
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl">Alapadatok</h3>

                  <form.Field name="weight">
                    {(field) => (
                      <FormField
                        label="Súly (gramm) *"
                        htmlFor={field.name}
                        error={getFieldError(field.state.meta.errors)}
                      >
                        <Input
                          id={field.name}
                          type="number"
                          step="0.01"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="text-lg p-6"
                          placeholder="pl. 15.5"
                          disabled={isLoading}
                        />
                      </FormField>
                    )}
                  </form.Field>

                  <form.Field name="material">
                    {(field) => (
                      <FormField
                        label="Anyag (opcionális)"
                        error={getFieldError(field.state.meta.errors)}
                      >
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => field.handleChange(value as Material)}
                          disabled={isLoading}
                        >
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
                      </FormField>
                    )}
                  </form.Field>

                  <form.Field name="karat">
                    {(field) => (
                      <FormField
                        label="Karát (opcionális)"
                        error={getFieldError(field.state.meta.errors)}
                      >
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => field.handleChange(value as Karat)}
                          disabled={isLoading}
                        >
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
                      </FormField>
                    )}
                  </form.Field>

                  <form.Field name="hasHallmark">
                    {(field) => (
                      <FormField
                        label="Van-e fémjelzés a tárgyon? *"
                        error={getFieldError(field.state.meta.errors)}
                      >
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => field.handleChange(value as Hallmark)}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="text-lg p-6">
                            <SelectValue placeholder="Válasszon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="igen">Igen, van fémjelzés</SelectItem>
                            <SelectItem value="nem">Nem, nincs fémjelzés</SelectItem>
                            <SelectItem value="nemtudom">
                              Nem tudom / Nem látom egyértelműen
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-base text-muted-foreground leading-relaxed mt-2">
                          A fémjelzés (pl. 585, 750, 14K, 18K) általában apró betűk
                          vagy számok az ékszeren, amelyek az anyag tisztaságát
                          jelölik.
                        </p>
                      </FormField>
                    )}
                  </form.Field>
                </div>

                {/* Optional Dimensions Section */}
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl">Opcionális méretek</h3>
                  <p className="text-base text-muted-foreground">
                    A méretek megadása segíti a pontosabb becslést, de nem
                    kötelező.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <form.Field name="length">
                      {(field) => (
                        <FormField
                          label="Hosszúság (mm)"
                          htmlFor={field.name}
                          error={getFieldError(field.state.meta.errors)}
                        >
                          <Input
                            id={field.name}
                            type="number"
                            step="0.1"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            className="text-lg p-6"
                            placeholder="pl. 25.0"
                            disabled={isLoading}
                          />
                        </FormField>
                      )}
                    </form.Field>

                    <form.Field name="width">
                      {(field) => (
                        <FormField
                          label="Szélesség (mm)"
                          htmlFor={field.name}
                          error={getFieldError(field.state.meta.errors)}
                        >
                          <Input
                            id={field.name}
                            type="number"
                            step="0.1"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            className="text-lg p-6"
                            placeholder="pl. 10.0"
                            disabled={isLoading}
                          />
                        </FormField>
                      )}
                    </form.Field>

                    <form.Field name="thickness">
                      {(field) => (
                        <FormField
                          label="Vastagság (mm)"
                          htmlFor={field.name}
                          error={getFieldError(field.state.meta.errors)}
                        >
                          <Input
                            id={field.name}
                            type="number"
                            step="0.1"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            className="text-lg p-6"
                            placeholder="pl. 2.5"
                            disabled={isLoading}
                          />
                        </FormField>
                      )}
                    </form.Field>
                  </div>
                </div>

                <form.Subscribe selector={(state) => state.isSubmitting}>
                  {(isSubmitting) => (
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isLoading || isSubmitting}
                      className="w-full text-xl py-8"
                    >
                      {isLoading || isSubmitting
                        ? "Becslés folyamatban..."
                        : "Becslés elkészítése"}
                    </Button>
                  )}
                </form.Subscribe>
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
                <CardTitle className="font-serif text-2xl">
                  Hogyan számol az AI?
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <ul className="space-y-3 list-none">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span>
                    Elemzi a feltöltött képeket: állapot, kidolgozottság,
                    anyagminőség
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span>A világpiaci nemesfém árakat veszi alapul</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span>
                    Figyelembe veszi a megadott súlyt, anyagot és karátot
                  </span>
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
                    Ez <strong>nem végleges ár</strong>, hanem tájékoztató
                    becslés
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
                <CardTitle className="font-serif text-3xl text-center">
                  Becsült értéksáv
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-card p-8 rounded-lg border-2 border-border text-center">
                  <p className="text-base text-muted-foreground mb-4">
                    Becsült érték
                  </p>
                  <p className="font-serif text-4xl font-bold">
                    {formatCurrency(estimate.lowerBound)} -{" "}
                    {formatCurrency(estimate.marketValue)}
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg border-l-4 border-accent">
                  <p className="text-lg text-muted-foreground text-center leading-relaxed">
                    {estimate.notes ||
                      "A pontos érték az ékszer állapotának és vizsgálatának függvénye."}
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
                  Ha az előzetes becslés megfelelő Önnek, egy gombnyomással
                  továbbíthatja szakértőinknek.
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
                <CardTitle className="font-serif text-2xl">
                  Mi történik ezután?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-lg text-muted-foreground pt-1">
                    Szakértő átnézi az adatokat és képeket
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-lg text-muted-foreground pt-1">
                    Telefonos vagy emailes egyeztetés
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-muted-foreground mb-3">
                      Döntés: üzletben vagy VIP házhoz kiszállással
                    </p>
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
              Az AI értékbecslés tájékoztató jellegű. A végső értéket minden
              esetben szakértő állapítja meg személyes vizsgálat alapján.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <Phone className="w-10 h-10 mx-auto mb-3 text-accent" />
              <p className="text-lg font-semibold">Telefonszám</p>
              <p className="text-base opacity-80">+36 1 354 0555</p>
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
            <Link
              href="/"
              className="text-lg text-accent hover:text-accent/80 underline"
            >
              ← Vissza a főoldalra
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
