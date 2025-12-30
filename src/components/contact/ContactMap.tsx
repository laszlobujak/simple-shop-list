"use client";

interface ContactMapProps {
  embedUrl: string;
  address: string;
}

export function ContactMap({ embedUrl, address }: ContactMapProps) {
  return (
    <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden border-2 border-border">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "400px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Térkép - ${address}`}
      />
    </div>
  );
}
