import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

interface HeroImageProps {
  src?: string;
  alt: string;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  className?: string;
}

export function HeroImage({ src, alt, icon: Icon, title, subtitle, className = '' }: HeroImageProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          priority
        />
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-primary/10 via-accent/20 to-primary/10 flex items-center justify-center ${className}`}>
      <div className="text-center">
        <Icon className="w-20 h-20 md:w-24 md:h-24 text-accent/60 mx-auto mb-4" />
        <p className="text-sm md:text-base text-muted-foreground font-semibold">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground/60 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
