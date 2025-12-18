import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { listings } from '@/db/schema';
import { validateCreateListing } from '@/lib/validations/listing';

// GET all listings
export async function GET() {
  try {
    const allListings = await db.select().from(listings);
    return NextResponse.json(allListings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

// POST create new listing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input with Zod
    const validatedData = validateCreateListing(body);

    const newListing = await db.insert(listings).values({
      id: crypto.randomUUID(),
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    return NextResponse.json(newListing[0], { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}
