"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { CALENDLY_URL } from "@/lib/calendly";

export function SiteFooter({
  children,
  after,
  className = "",
  liftClassName = "",
}: {
  children: ReactNode;
  after?: ReactNode;
  className?: string;
  liftClassName?: string;
}) {
  const pageLiftRef = useRef<HTMLDivElement>(null);
  const stickyFooterRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const setStickyMargin = () => {
      const footer = stickyFooterRef.current;
      const lift = pageLiftRef.current;
      if (!footer || !lift) return;
      const h = footer.scrollHeight;
      const vh =
        window.innerHeight || document.documentElement.clientHeight || 0;
      lift.style.marginBottom = `${Math.min(h, vh)}px`;
    };

    setStickyMargin();
    window.addEventListener("resize", setStickyMargin);
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(setStickyMargin)
        : null;
    if (stickyFooterRef.current && ro) ro.observe(stickyFooterRef.current);

    return () => {
      window.removeEventListener("resize", setStickyMargin);
      ro?.disconnect();
    };
  }, []);

  return (
    <div className={`v02-page-shell ${className}`.trim()}>
      <div ref={pageLiftRef} className={`v02-page-lift ${liftClassName}`.trim()}>
        {children}
        <div className="v02-footer-bleed" aria-hidden="true" />
      </div>
      <footer
        ref={stickyFooterRef}
        className="v02-sticky-footer"
        aria-label="Site footer"
      >
        <div className="v02-footer-reveal">
          <div className="v02-footer-reveal__inner">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="v02-footer-reveal__cta"
            >
              <span className="v02-footer-reveal__eyebrow">
                Ready to break ground?
              </span>
              <span className="v02-footer-reveal__title">Let&apos;s Build</span>
              <div className="v02-footer-reveal__rule" aria-hidden="true" />
            </a>

            <div className="v02-footer-reveal__grid">
              <div>
                <Link href="/" className="v02-footer-reveal__brand">
                  BLUE COLLAR <span>VIDEO GUYS™</span>
                </Link>
              </div>
              <div>
                <span className="v02-footer-reveal__label">Let&apos;s chat</span>
                <div className="v02-footer-reveal__links">
                  <a href="mailto:build@bluecollarvideoguys.com">
                    build@bluecollarvideoguys.com
                  </a>
                  <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                    Book a discovery call
                  </a>
                </div>
              </div>
              <div>
                <span className="v02-footer-reveal__label">Explore</span>
                <div className="v02-footer-reveal__links">
                  <Link href="/">Home</Link>
                  <Link href="/services">Services</Link>
                  <Link href="/contact">Contact</Link>
                </div>
              </div>
              <div>
                <span className="v02-footer-reveal__label">The Blueprint</span>
                <p className="v02-footer-reveal__copy">
                  Build Trust. Stand Out. Win More Work. Authentic video
                  marketing for blue-collar businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="v02-footer-legal">
          <p>
            © {new Date().getFullYear()} The Blue Collar Video Guys™. All
            rights reserved.
          </p>
          <a href="mailto:build@bluecollarvideoguys.com">
            build@bluecollarvideoguys.com
          </a>
        </div>
      </footer>
      {after}
    </div>
  );
}
