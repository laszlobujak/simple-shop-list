"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import {
  contactFormSchema,
  defaultContactValues,
  type ContactFormInput,
  type Subject,
  subjectLabels,
} from "@/lib/validations/contact";
import { FormField, getFieldError } from "@/components/admin/ListingDialog/FormField";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (value: ContactFormInput) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Hiba történt az üzenet küldése során. Kérjük, próbálja újra.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm({
    defaultValues: defaultContactValues,
    validators: {
      onSubmit: contactFormSchema,
    },
    onSubmit: async ({ value }) => {
      await handleSubmit(value);
    },
  });

  if (isSuccess) {
    return (
      <Card className="border-2 border-accent shadow-lg">
        <CardContent className="py-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-serif text-2xl">Üzenetét megkaptuk!</h3>
            <p className="text-muted-foreground text-lg">
              Hamarosan felvesszük Önnel a kapcsolatot. Köszönjük a megkeresést!
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setIsSuccess(false);
                form.reset();
              }}
              className="mt-4"
            >
              Új üzenet küldése
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader>
        <CardTitle className="font-serif text-3xl">Írjon nekünk</CardTitle>
        <CardDescription className="text-lg">
          Töltse ki az alábbi űrlapot és hamarosan felvesszük Önnel a kapcsolatot
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <form.Field name="name">
              {(field) => (
                <FormField
                  label="Név *"
                  htmlFor={field.name}
                  error={getFieldError(field.state.meta.errors)}
                >
                  <Input
                    id={field.name}
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="text-lg p-6"
                    placeholder="Teljes név"
                    disabled={isSubmitting}
                  />
                </FormField>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <FormField
                  label="Email *"
                  htmlFor={field.name}
                  error={getFieldError(field.state.meta.errors)}
                >
                  <Input
                    id={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="text-lg p-6"
                    placeholder="email@pelda.hu"
                    disabled={isSubmitting}
                  />
                </FormField>
              )}
            </form.Field>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <form.Field name="phone">
              {(field) => (
                <FormField
                  label="Telefonszám (opcionális)"
                  htmlFor={field.name}
                  error={getFieldError(field.state.meta.errors)}
                >
                  <Input
                    id={field.name}
                    type="tel"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="text-lg p-6"
                    placeholder="+36 30 123 4567"
                    disabled={isSubmitting}
                  />
                </FormField>
              )}
            </form.Field>

            <form.Field name="subject">
              {(field) => (
                <FormField
                  label="Tárgy *"
                  error={getFieldError(field.state.meta.errors)}
                >
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value as Subject)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="text-lg p-6">
                      <SelectValue placeholder="Válasszon témát" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(subjectLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              )}
            </form.Field>
          </div>

          <form.Field name="message">
            {(field) => (
              <FormField
                label="Üzenet *"
                htmlFor={field.name}
                error={getFieldError(field.state.meta.errors)}
              >
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="text-lg p-4 min-h-[150px]"
                  placeholder="Írja le kérdését vagy kérését..."
                  disabled={isSubmitting}
                />
              </FormField>
            )}
          </form.Field>

          <form.Field name="privacyConsent">
            {(field) => (
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) =>
                      field.handleChange(checked === true)
                    }
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                  <label
                    htmlFor={field.name}
                    className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                  >
                    Elfogadom az{" "}
                    <a
                      href="/adatvedelem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 underline"
                    >
                      adatvédelmi nyilatkozatot
                    </a>{" "}
                    és hozzájárulok személyes adataim kezeléséhez. *
                  </label>
                </div>
                {getFieldError(field.state.meta.errors) && (
                  <p className="text-sm text-destructive">
                    {getFieldError(field.state.meta.errors)}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(formIsSubmitting) => (
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || formIsSubmitting}
                className="w-full text-xl py-8"
              >
                {isSubmitting || formIsSubmitting
                  ? "Küldés folyamatban..."
                  : "Üzenet küldése"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
