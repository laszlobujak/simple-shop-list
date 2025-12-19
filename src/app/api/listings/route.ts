import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { listings } from '@/db/schema';
import { validateCreateListing } from '@/lib/validations/listing';
import { revalidateListings } from '@/lib/revalidate';

// GET all listings
export async function GET(request: NextRequest) {
  try {
    const allListings = await db.select().from(listings);

    // Check if request is from admin dashboard
    // Admin requests should bypass Vercel CDN cache
    const isAdminRequest = request.headers.get('x-admin-request') === 'true';

    const cacheControl = isAdminRequest
      ? 'private, no-cache, no-store, must-revalidate, max-age=0'
      : 'public, s-maxage=60, stale-while-revalidate=120';

    return NextResponse.json(allListings, {
      headers: {
        'Cache-Control': cacheControl,
      },
    });
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

    // Revalidate caches after creating listing
    await revalidateListings();

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
