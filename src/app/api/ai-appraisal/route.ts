import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '@/env.mjs';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { weight, material, karat, hasHallmark, length, width, thickness, images } = body;

    // Validate required fields
    if (!weight || !hasHallmark) {
      return NextResponse.json(
        { error: 'Hiányzó kötelező mezők: súly, fémjelzés' },
        { status: 400 }
      );
    }

    // Create prompt for Gemini
    const prompt = `
Te egy szakértő ékszer értékbecslő vagy. A mellékelt képek és a következő adatok alapján becsüld meg egy ékszer piaci értékét Hungarian Forint (HUF) valutában.

Ékszer adatok:
- Súly: ${weight} gramm
${material ? `- Anyag: ${material}` : ''}
${karat ? `- Karát: ${karat}` : ''}
- Fémjelzés van-e: ${hasHallmark}
${length ? `- Hosszúság: ${length} mm` : ''}
${width ? `- Szélesség: ${width} mm` : ''}
${thickness ? `- Vastagság: ${thickness} mm` : ''}

Fontos tudnivalók:
1. Elemezd a képeket: állapot, kidolgozottság, anyagminőség, fémjelzés
2. A nemesfém világpiaci árakat kell figyelembe venni (arany, ezüst, platina aktuális ára)
3. Az értékbecslést HUF valutában add meg
4. Készíts egy piaci értéket és egy alsó értéket (világpiaci érték - 15%)
5. Legyen reális és konzervatív a becslésben
6. A válasz CSAK egy JSON formátumú legyen, semmi más szöveg
7. Az alábbi formátumban válaszolj:

{
  "marketValue": 150000,
  "lowerBound": 127500,
  "confidence": "medium",
  "notes": "Rövid magyarázat a becslésről 1-2 mondatban, beleértve a képeken látott állapotot és minőséget"
}

CSAK a JSON-t add vissza, más szöveget ne!
`;

    // Try to call Gemini API with fallback
    let aiResponse;
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash'
      });

      // Prepare content with images
      const parts: any[] = [{ text: prompt }];

      // Add images if provided
      if (images && images.length > 0) {
        for (const imageBase64 of images) {
          parts.push({
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageBase64,
            },
          });
        }
      }

      const result = await model.generateContent(parts as any);
      const response = result.response;
      const text = response.text();

      // Parse JSON response
      try {
        // Remove markdown code blocks if present
        const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        aiResponse = JSON.parse(cleanText);
      } catch (parseError) {
        console.error('Failed to parse AI response:', text);
        throw parseError;
      }
    } catch (apiError) {
      console.error('Gemini API Error:', apiError);
      // Fallback calculation if AI fails
      const baseValue = calculateFallbackValue(weight, material, karat);
      aiResponse = {
        marketValue: Math.round(baseValue),
        lowerBound: Math.round(baseValue * 0.85),
        confidence: 'low',
        notes: 'Alapszámítás a világpiaci árak alapján. Pontos becsléshez szakértői vizsgálat szükséges.',
      };
    }

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error('AI Appraisal API Error:', error);
    return NextResponse.json(
      { error: 'Hiba történt az értékbecslés során. Kérjük, próbálja újra később.' },
      { status: 500 }
    );
  }
}

// Fallback calculation based on current precious metal prices
function calculateFallbackValue(weight: string, material: string, karat?: string): number {
  const weightNum = parseFloat(weight);

  // Approximate prices per gram in HUF (these should be updated regularly)
  const prices: Record<string, number> = {
    arany: 25000, // ~24K gold
    feherarany: 24000,
    ezust: 350,
    platina: 13000,
    egyeb: 5000,
  };

  let basePrice = prices[material] || prices.egyeb;

  // Adjust for karat if gold
  if (material === 'arany' || material === 'feherarany') {
    const karatMultipliers: Record<string, number> = {
      '8k': 0.333,
      '9k': 0.375,
      '10k': 0.417,
      '14k': 0.583,
      '18k': 0.75,
      '21k': 0.875,
      '22k': 0.917,
    };

    if (karat && karatMultipliers[karat]) {
      basePrice = basePrice * karatMultipliers[karat];
    }
  }

  return weightNum * basePrice;
}
