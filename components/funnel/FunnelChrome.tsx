import { BrandLogo } from "@/components/BrandLogo";
import { PHONE_DISPLAY, PHONE_HREF, PRIVACY_URL, SITE_ORIGIN } from "@/lib/contact";
import { SITE } from "@/lib/site";

export function FunnelChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="px-5 py-4 sm:px-8">
        <BrandLogo
          variant="compact"
          className="h-8 w-auto sm:h-9"
          loading="eager"
          fetchPriority="high"
          sizes="160px"
        />
      </header>
      {children}
      <footer className="px-5 py-8 text-sm text-[var(--v02-slate)] sm:px-8">
        <p className="flex flex-wrap gap-x-2 gap-y-1">
          <span>{SITE.shortName}</span>
          <span aria-hidden="true">·</span>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <span aria-hidden="true">·</span>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          <span aria-hidden="true">·</span>
          <a href={PRIVACY_URL}>Privacy Policy</a>
          <span aria-hidden="true">·</span>
          <a href={`${SITE_ORIGIN}/privacy#messaging-terms`}>Terms</a>
        </p>
      </footer>
    </>
  );
}
