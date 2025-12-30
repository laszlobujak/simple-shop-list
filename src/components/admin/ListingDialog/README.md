# ListingDialog Component

Refactored listing dialog component with improved separation of concerns.

## Structure

```
ListingDialog/
├── index.tsx              # Main dialog component
├── PhotoUploadSection.tsx # Photo upload UI and management
├── FormField.tsx          # Reusable form field wrapper
└── README.md             # This file
```

## Related Files

- `src/lib/image-compression.ts` - Image compression utilities
- `src/hooks/use-photo-upload.ts` - Photo upload logic hook

## Components

### `ListingDialog` (index.tsx)
Main dialog component that orchestrates the form and handles saving.

**Props:**
- `open: boolean` - Dialog open state
- `onOpenChange: (open: boolean) => void` - Open state change handler
- `listing: Listing | null` - Listing to edit (null for new listing)
- `onSave: (listing: Listing) => void` - Save handler
- `isSaving?: boolean` - Loading state

### `PhotoUploadSection`
Handles photo upload, compression, and display.

**Props:**
- `photos: string[]` - Array of photo URLs
- `onPhotosChange: (photos: string[]) => void` - Photos change handler
- `onPhotoRemove: (index: number) => void` - Photo remove handler
- `disabled?: boolean` - Disable uploads
- `maxPhotos?: number` - Maximum number of photos (default: 5)

### `FormField`
Reusable form field wrapper with label and error display.

**Props:**
- `label: string` - Field label
- `error?: string` - Error message
- `children: ReactNode` - Form input element
- `htmlFor?: string` - Label's htmlFor attribute

## Hooks

### `usePhotoUpload`
Custom hook for photo upload logic with compression.

**Options:**
- `maxPhotos?: number` - Maximum photos allowed
- `onPhotosChange: (photos: string[]) => void` - Photos change callback
- `currentPhotos: string[]` - Current photo URLs

**Returns:**
- `fileInputRef` - Ref for file input element
- `uploading` - Upload loading state
- `uploadError` - Upload error message
- `handleFileSelect` - File selection handler
- `handleUploadClick` - Upload button click handler

## Utilities

### `compressImage(file, options)`
Compresses a single image file using web workers.

**Options:**
- `maxWidthOrHeight?: number` - Max dimension (default: 1920)
- `quality?: number` - Compression quality 0-1 (default: 0.8)
- `fileType?: 'image/jpeg' | 'image/webp' | 'image/png'` - Output format
- `useWebWorker?: boolean` - Use web worker (default: true)

### `compressImages(files, options)`
Compresses multiple image files in parallel.

## Features

- ✅ Image compression with web workers
- ✅ Preserves original filenames and MIME types
- ✅ Automatic validation
- ✅ Photo limit enforcement
- ✅ Blob URL cleanup on save
- ✅ Error handling and user feedback
- ✅ Responsive UI with loading states



