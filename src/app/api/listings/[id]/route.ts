import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { listings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { validateUpdateListing } from '@/lib/validations/listing';
import { revalidateListingById } from '@/lib/revalidate';

// GET single listing by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const listing = await db.select().from(listings).where(eq(listings.id, id));

    if (listing.length === 0) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Check if request is from admin dashboard
    // Admin requests should bypass Vercel CDN cache
    const isAdminRequest = request.headers.get('x-admin-request') === 'true';

    const cacheControl = isAdminRequest
      ? 'private, no-cache, no-store, must-revalidate, max-age=0'
      : 'public, s-maxage=60, stale-while-revalidate=120';

    return NextResponse.json(listing[0], {
      headers: {
        'Cache-Control': cacheControl,
      },
    });
  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listing' },
      { status: 500 }
    );
  }
}

// PUT update listing
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input with Zod
    const validatedData = validateUpdateListing(body);

    const updatedListing = await db.update(listings)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(listings.id, id))
      .returning();

    if (updatedListing.length === 0) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Revalidate caches after updating
    await revalidateListingById(id);

    return NextResponse.json(updatedListing[0]);
  } catch (error) {
    console.error('Error updating listing:', error);

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
      { error: 'Failed to update listing' },
      { status: 500 }
    );
  }
}

// DELETE listing
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const deletedListing = await db.delete(listings)
      .where(eq(listings.id, id))
      .returning();

    if (deletedListing.length === 0) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Revalidate caches after deleting
    await revalidateListingById(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json(
      { error: 'Failed to delete listing' },
      { status: 500 }
    );
  }
}
