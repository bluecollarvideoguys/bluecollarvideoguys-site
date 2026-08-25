import Image from "next/image";
import Link from "next/link";

const LOGOS = {
  compact: {
    src: "/brand/compact-horizontal.png",
    width: 1024,
    height: 290,
  },
  primary: {
    src: "/brand/primary-horizontal.png",
    width: 1024,
    height: 269,
  },
  stacked: {
    src: "/brand/primary-stacked.png",
    width: 1024,
    height: 890,
  },
  icon: {
    src: "/brand/icon-mark.png",
    width: 1024,
    height: 901,
  },
  circular: {
    src: "/brand/circular-badge.png",
    width: 1016,
    height: 1020,
  },
  crest: {
    src: "/brand/badge-crest.png",
    width: 867,
    height: 1024,
  },
} as const;

export type BrandLogoVariant = keyof typeof LOGOS;

const ALT = "The Blue Collar Video Guys";

export function BrandLogo({
  variant,
  className = "",
  alt = ALT,
  loading,
  fetchPriority,
  sizes = "200px",
}: {
  variant: BrandLogoVariant;
  className?: string;
  alt?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
}) {
  const image = LOGOS[variant];
  return (
    <Image
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      className={`block object-contain ${className}`.trim()}
      loading={loading}
      fetchPriority={fetchPriority}
      sizes={sizes}
    />
  );
}

export function SiteBrandLink({
  href = "/",
  className = "flex shrink-0 items-center",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={className} aria-label={`${ALT} home`}>
      <BrandLogo
        variant="compact"
        alt=""
        className="h-8 w-[7.06rem] sm:h-9 sm:w-[7.94rem] lg:h-10 lg:w-[8.81rem]"
        loading="eager"
        fetchPriority="high"
        sizes="141px"
      />
    </Link>
  );
}
