import Image from "next/image";
import Link from "next/link";

const LOGOS = {
  compact: {
    src: "/brand/compact-horizontal.png",
    width: 792,
    height: 239,
  },
  primary: {
    src: "/brand/primary-horizontal.png",
    width: 792,
    height: 239,
  },
  alternate: {
    src: "/brand/alternate-horizontal.png",
    width: 1028,
    height: 343,
  },
  stacked: {
    src: "/brand/primary-stacked.png",
    width: 803,
    height: 989,
  },
  "alternate-stacked": {
    src: "/brand/alternate-stacked.png",
    width: 803,
    height: 989,
  },
  icon: {
    src: "/brand/icon-mark.png",
    width: 851,
    height: 846,
  },
  circular: {
    src: "/brand/circular-badge.png",
    width: 684,
    height: 677,
  },
  crest: {
    src: "/brand/badge-crest.png",
    width: 803,
    height: 989,
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
        className="h-8 w-auto sm:h-9 lg:h-10"
        loading="eager"
        fetchPriority="high"
        sizes="141px"
      />
    </Link>
  );
}
