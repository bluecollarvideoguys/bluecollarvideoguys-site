"use client";

import Script from "next/script";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { funnelConfig } from "@/lib/funnel-config";

const FormModalContext = createContext<(() => void) | null>(null);

export function useOpenForm() {
  const open = useContext(FormModalContext);
  if (!open) throw new Error("Form button rendered outside the funnel modal");
  return open;
}

export function OpenFormButton({ className = "funnel-cta" }: { className?: string }) {
  const open = useOpenForm();
  return (
    <button type="button" className={className} onClick={open}>
      Book My Free Strategy Call
    </button>
  );
}

export function FormModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const formId = funnelConfig.popupFormId;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <FormModalContext.Provider value={() => {
      setMounted(true);
      setOpen(true);
    }}>
      {children}
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="max-h-[92vh] w-full overflow-y-auto bg-[var(--v02-paper)] p-5 sm:max-w-xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id={titleId} className="v02-display text-3xl font-bold tracking-tight">
                Let&apos;s find you a time
              </h2>
              <button
                type="button"
                className="min-h-12 min-w-12 text-sm font-semibold"
                onClick={() => setOpen(false)}
                autoFocus
              >
                Close
              </button>
            </div>
            {mounted ? (
              <>
                <iframe
                  src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
                  id={`inline-${formId}`}
                  title="BCVG Popup Form"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="BCVG Popup Form"
                  data-height="640"
                  data-layout-iframe-id={`inline-${formId}`}
                  data-form-id={formId}
                  className="mt-4 w-full border-0"
                  style={{ height: 640 }}
                />
                <Script
                  src="https://link.msgsndr.com/js/form_embed.js"
                  strategy="afterInteractive"
                />
              </>
            ) : null}
            <p className="mt-3 text-sm text-[var(--v02-slate)]">
              We&apos;ll never spam you or sell your info.
            </p>
          </div>
        </div>
      ) : null}
    </FormModalContext.Provider>
  );
}

export function StickyCallBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("funnel-hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!show) return null;

  return (
    <div className="funnel-sticky fixed inset-x-0 bottom-0 z-40 border-t border-[var(--v02-line)] bg-[var(--v02-paper)] p-3 md:hidden">
      <OpenFormButton />
    </div>
  );
}
