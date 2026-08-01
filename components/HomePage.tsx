"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconArrowRight,
  IconArrowUp,
  IconBlueprint,
  IconHardHat,
  IconPlus,
  IconWrench,
} from "./icons";
import { VideoSlot } from "./VideoSlot";
import { VersionNav } from "./VersionNav";

gsap.registerPlugin(ScrollTrigger);

function scrollToSection(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HomePage() {
  useEffect(() => {
    // ── LOADER ──────────────────────────────────────────────────────────────
    const loader = document.getElementById("loader");
    const prog = document.getElementById("loader-progress");
    const pct = document.getElementById("loader-percentage");
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate() {
        if (prog) prog.style.width = obj.val + "%";
        if (pct) pct.innerText = Math.round(obj.val) + "%";
      },
      onComplete() {
        if (!loader) return;
        loader.classList.add("opacity-0", "pointer-events-none");
        loader.setAttribute("aria-busy", "false");
        setTimeout(() => {
          loader.style.display = "none";
        }, 700);
      },
    });

    // ── NAV hide on scroll ──────────────────────────────────────────────────
    const mainNav = document.getElementById("mainNav");
    let lastST = 0;
    const onScrollNav = () => {
      const st = window.pageYOffset;
      if (mainNav) {
        mainNav.style.transform =
          st > lastST && st > 120 ? "translateY(-100%)" : "translateY(0)";
      }
      lastST = st <= 0 ? 0 : st;
    };
    window.addEventListener("scroll", onScrollNav, { passive: true });

    // ── HERO VIDEO SCROLL ───────────────────────────────────────────────────
    const video = document.getElementById("scrollVideo") as HTMLVideoElement | null;
    const stage = document.getElementById("video-stage");
    const overlays = document.getElementById("heroOverlays");
    const blocks = document.querySelectorAll<HTMLElement>(".overlay-block");
    let maxScroll = 1;
    let pending = false;
    let targetTime = 0;
    let seeking = false;
    let rafId = 0;

    if (video) {
      video.pause();
      video.addEventListener("seeked", () => {
        seeking = false;
      });

      const computeMax = () => {
        if (!stage) return;
        maxScroll = Math.max(stage.offsetHeight - window.innerHeight, 1);
      };
      const clamp = (v: number) => Math.min(1, Math.max(0, v));

      const applySync = () => {
        pending = false;
        const p = clamp(window.scrollY / maxScroll);
        if (video.duration) targetTime = p * video.duration;
        blocks.forEach((b) => {
          const inRange = p >= +b.dataset.start! && p <= +b.dataset.end!;
          b.classList.toggle("opacity-0", !inRange);
          b.classList.toggle("scale-95", !inRange);
          b.classList.toggle("opacity-100", inRange);
          b.classList.toggle("scale-100", inRange);
          b.classList.toggle("pointer-events-auto", inRange);
        });
        const done = window.scrollY >= maxScroll - 1;
        overlays?.classList.toggle("opacity-0", done);
        overlays?.classList.toggle("invisible", done);
      };

      const renderFrame = () => {
        if (
          video.readyState >= 2 &&
          !seeking &&
          video.duration &&
          Math.abs(video.currentTime - targetTime) > 0.05
        ) {
          seeking = true;
          try {
            video.currentTime = targetTime;
          } catch {
            seeking = false;
          }
        }
        rafId = requestAnimationFrame(renderFrame);
      };

      computeMax();
      const onScrollVideo = () => {
        if (!pending) {
          pending = true;
          requestAnimationFrame(applySync);
        }
      };
      const onResizeVideo = () => {
        computeMax();
        applySync();
      };
      window.addEventListener("scroll", onScrollVideo, { passive: true });
      window.addEventListener("resize", onResizeVideo);

      if (video.readyState >= 1) {
        applySync();
        rafId = requestAnimationFrame(renderFrame);
      } else {
        video.addEventListener(
          "loadedmetadata",
          () => {
            applySync();
            rafId = requestAnimationFrame(renderFrame);
          },
          { once: true },
        );
      }
      applySync();

      // cleanup refs stored on window for this effect's return
      (window as unknown as { __bcvgCleanupVideo?: () => void }).__bcvgCleanupVideo =
        () => {
          window.removeEventListener("scroll", onScrollVideo);
          window.removeEventListener("resize", onResizeVideo);
          cancelAnimationFrame(rafId);
        };
    }

    // ── USP HORIZONTAL SCROLL ───────────────────────────────────────────────
    // Uses ScrollTrigger pin (not CSS sticky). Sticky breaks under the page
    // root's overflow-x-hidden, which was leaving panel 01 stuck while the
    // tall spacer scrolled empty.
    let uspTween: gsap.core.Tween | null = null;
    const setupUspScroll = () => {
      uspTween?.scrollTrigger?.kill();
      uspTween?.kill();
      uspTween = null;
      gsap.set("#usp-track", { clearProps: "transform" });

      if (window.innerWidth < 768) return;

      const wrap = document.getElementById("usp-pin-wrap");
      const track = document.getElementById("usp-track");
      const dots = document.querySelectorAll<HTMLElement>(".usp-dot");
      const panels = document.querySelectorAll(".usp-panel");
      const ghostNums = document.querySelectorAll<HTMLElement>(".usp-ghost-num");

      if (!wrap || !track || panels.length === 0) return;

      const totalPanels = panels.length;
      uspTween = gsap.to(track, {
        x: () => -(window.innerWidth * (totalPanels - 1)),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          pin: true,
          pinSpacing: true,
          pinType: "fixed",
          scrub: 0.5,
          anticipatePin: 1,
          start: "top top",
          end: () => "+=" + window.innerWidth * (totalPanels - 1) * 1.15,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const pos = self.progress * (totalPanels - 1);
            const active = Math.round(pos);
            dots.forEach((d, i) => {
              d.style.width = i === active ? "1.5rem" : "0.25rem";
              d.style.opacity = i === active ? "1" : "0.3";
            });
            ghostNums.forEach((n, i) => {
              const dist = Math.abs(pos - i);
              const t = Math.max(0, 1 - dist * 1.5);
              n.style.opacity = (t * 0.1).toString();
            });
          },
        },
      });
    };

    setupUspScroll();
    const onResizeUsp = () => {
      setupUspScroll();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResizeUsp);
    // Refresh after loader / layout settle so pin distances are correct
    requestAnimationFrame(() => ScrollTrigger.refresh());
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 1400);

    // ── MANIFESTO canvas particle network ───────────────────────────────────
    const canvas = document.getElementById("phil-canvas") as HTMLCanvasElement | null;
    let canvasRaf = 0;
    let resizeObserver: ResizeObserver | null = null;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let W = 0;
      let H = 0;
      let pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
      const N = 40;
      const DIST = 180;
      // Denim-tinted particles on concrete
      const COLOR = "27,58,92";

      const resize = () => {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
      };
      const mkPts = () => {
        pts = Array.from({ length: N }, () => ({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: Math.random() * 1.5 + 0.5,
        }));
      };
      const frame = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, W, H);
        pts.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${COLOR},.25)`;
          ctx.fill();
        });
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < DIST) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = `rgba(${COLOR},${(1 - d / DIST) * 0.08})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
        canvasRaf = requestAnimationFrame(frame);
      };
      resize();
      mkPts();
      if (canvas.parentElement) {
        resizeObserver = new ResizeObserver(() => {
          resize();
          mkPts();
        });
        resizeObserver.observe(canvas.parentElement);
      }
      frame();
    }

    // ── MANIFESTO block reveal ──────────────────────────────────────────────
    const philObservers: IntersectionObserver[] = [];
    document.querySelectorAll(".phil-block").forEach((block) => {
      const lines = block.querySelectorAll(".phil-line");
      const fades = block.querySelectorAll(".phil-line-fade");
      const nums = block.querySelectorAll(".phil-num");
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            lines.forEach((l) => {
              l.classList.remove("opacity-0", "translate-y-10");
            });
            fades.forEach((f) => {
              f.classList.remove("opacity-0");
            });
            nums.forEach((n) => {
              n.classList.remove("opacity-0");
            });
          });
        },
        { threshold: 0.3 },
      );
      obs.observe(block);
      philObservers.push(obs);
    });

    // ── SERVICE accordion ───────────────────────────────────────────────────
    const accordionTriggers = document.querySelectorAll(".accordion-trigger");
    const onAccordionClick = (btn: Element) => () => {
      const item = btn.closest(".accordion-item");
      if (!item) return;
      const body = item.querySelector<HTMLElement>(".accordion-body");
      const icon = item.querySelector<HTMLElement>(".acc-plus");
      const isOpen = item.classList.contains("active");

      document.querySelectorAll(".accordion-item").forEach((i) => {
        i.classList.remove("active");
        const b = i.querySelector<HTMLElement>(".accordion-body");
        const ic = i.querySelector<HTMLElement>(".acc-plus");
        if (b) b.style.maxHeight = "";
        if (ic) ic.style.transform = "rotate(0deg)";
      });

      if (!isOpen && body && icon) {
        item.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
        icon.style.transform = "rotate(45deg)";
      }
    };
    const accordionHandlers: { btn: Element; handler: () => void }[] = [];
    accordionTriggers.forEach((btn) => {
      const handler = onAccordionClick(btn);
      btn.addEventListener("click", handler);
      accordionHandlers.push({ btn, handler });
    });

    // ── CTA & Scroll Reveals ────────────────────────────────────────────────
    let counted = false;
    const scrollObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) =>
      scrollObserver.observe(el),
    );

    const cta = document.getElementById("cta");
    let ctaObs: IntersectionObserver | null = null;
    if (cta) {
      ctaObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            cta.querySelectorAll(".cta-anim").forEach((el) => {
              el.classList.remove("opacity-0", "translate-y-6");
            });
            if (!counted) {
              counted = true;
              setTimeout(() => {
                cta.querySelectorAll<HTMLElement>(".cta-stat").forEach((s) => {
                  const target = parseFloat(s.dataset.target || "0");
                  const isFloat = s.dataset.float === "true";
                  let step = 0;
                  const steps = 60;
                  const t = setInterval(() => {
                    step++;
                    const ease = 1 - Math.pow(1 - step / steps, 3);
                    const val = target * ease;
                    s.textContent =
                      step >= steps
                        ? isFloat
                          ? target.toFixed(1)
                          : String(target)
                        : isFloat
                          ? val.toFixed(1)
                          : String(Math.floor(val));
                    if (step >= steps) clearInterval(t);
                  }, 1500 / steps);
                });
              }, 300);
            }
          });
        },
        { threshold: 0.3 },
      );
      ctaObs.observe(cta);
    }

    return () => {
      window.removeEventListener("scroll", onScrollNav);
      window.removeEventListener("resize", onResizeUsp);
      window.clearTimeout(refreshTimer);
      (
        window as unknown as { __bcvgCleanupVideo?: () => void }
      ).__bcvgCleanupVideo?.();
      uspTween?.scrollTrigger?.kill();
      uspTween?.kill();
      cancelAnimationFrame(canvasRaf);
      resizeObserver?.disconnect();
      philObservers.forEach((o) => o.disconnect());
      accordionHandlers.forEach(({ btn, handler }) =>
        btn.removeEventListener("click", handler),
      );
      scrollObserver.disconnect();
      ctaObs?.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="bg-denim-deep text-concrete font-sans antialiased min-h-screen selection:bg-rust selection:text-paper">
      {/* LOADER */}
      <div
        id="loader"
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-denim-deep transition-opacity duration-700"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="relative z-10 flex flex-col items-center w-full max-w-xs px-6">
          <div className="w-full h-px bg-denim overflow-hidden">
            <div
              id="loader-progress"
              className="h-full bg-rust w-0 transition-all duration-100"
            />
          </div>
          <div className="flex justify-between w-full mt-4">
            <span className="text-xs font-light tracking-widest text-steel uppercase">
              Loading
            </span>
            <span
              id="loader-percentage"
              className="text-xs font-light tracking-widest text-steel"
            >
              0%
            </span>
          </div>
        </div>
      </div>

      {/* NAV — version switcher */}
      <VersionNav
        active={1}
        cta={{
          label: "Get Your Blueprint",
          onClick: () => scrollToSection("contact"),
        }}
      />

      {/* CLIENT ASSET: Scroll-scrubbed hero — /public/video/hero-scroll.mp4 */}
      <video
        id="scrollVideo"
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        aria-label="Brand film"
        className="fixed top-0 left-0 w-screen h-screen object-cover z-0 bg-denim-deep opacity-45"
      >
        <source src="/video/hero-scroll.mp4" type="video/mp4" />
      </video>

      <div
        id="video-stage"
        className="relative h-[300vh] z-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* HERO OVERLAYS */}
      <div className="fixed inset-0 z-30 pointer-events-none" id="heroOverlays">
        <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-denim-deep to-transparent pointer-events-none" />

        <div
          className="overlay-block absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ease-in-out opacity-100 scale-100 pointer-events-auto"
          data-start="0"
          data-end="0.18"
        >
          <p className="stamp-badge text-rust mb-8">Trust Framework™</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-wide text-concrete uppercase leading-tight">
            The Blue Collar
            <br />
            Video Guys™
          </h1>
        </div>

        <div
          className="overlay-block absolute inset-0 flex flex-col items-center md:items-start justify-center p-6 md:pl-[12%] text-center md:text-left transition-all duration-700 ease-in-out opacity-0 scale-95"
          data-start="0.25"
          data-end="0.44"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-wide text-concrete max-w-[18ch] leading-tight uppercase">
            Build Trust. Stand Out.
            <br />
            <span className="text-concrete/50">Win More Work.</span>
          </h2>
        </div>

        <div
          className="overlay-block absolute inset-0 flex flex-col items-center md:items-end justify-center p-6 md:pr-[12%] text-center md:text-right transition-all duration-700 ease-in-out opacity-0 scale-95"
          data-start="0.5"
          data-end="0.69"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-wide text-concrete max-w-[18ch] leading-tight uppercase">
            You earned your reputation.
            <br />
            <span className="text-concrete/50">
              We make sure more people see it.
            </span>
          </h2>
        </div>

        <div
          className="overlay-block absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ease-in-out opacity-0 scale-95"
          data-start="0.76"
          data-end="0.95"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-wide text-concrete mb-8 uppercase">
            Break ground on your brand.
          </h2>
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="btn-stamp pointer-events-auto text-paper bg-rust hover:bg-rust-hover px-6 py-3"
          >
            Get Your Blueprint
          </button>
        </div>
      </div>

      {/* ─── BLUEPRINT (USP) ───────────────────────────────────────────────── */}
      <section
        id="blueprint"
        className="relative w-full z-40 bg-denim-deep border-t border-white/10"
      >
        <div
          id="usp-pin-wrap"
          className="hidden md:block h-screen w-full overflow-hidden"
        >
          <div className="h-screen w-full overflow-hidden flex flex-col">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-10 flex items-center justify-between pt-24 pb-0 shrink-0">
              <p className="text-xs font-light text-steel uppercase tracking-widest">
                The Blue Collar Blueprint™
              </p>
              <div className="flex gap-2 items-center usp-dots">
                <div className="usp-dot h-1 w-6 bg-rust transition-all duration-500 rounded-sm" />
                <div className="usp-dot h-1 w-1 bg-concrete/20 transition-all duration-500 rounded-sm" />
                <div className="usp-dot h-1 w-1 bg-concrete/20 transition-all duration-500 rounded-sm" />
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <div
                id="usp-track"
                className="flex h-full will-change-transform w-[300vw]"
              >
                <BlueprintPanel
                  num="01"
                  label="Build Trust"
                  icon={<IconHardHat className="text-rust mb-6" />}
                  title="Show them who you are before they ever call."
                  body="Brand story films. Testimonials. Meet-the-crew videos. Educational content. Behind-the-scenes. Culture. Community. Trust isn't a slogan — it's footage that proves you show up and do the work right."
                />
                <BlueprintPanel
                  num="02"
                  label="Stand Out"
                  icon={<IconBlueprint className="text-rust mb-6" />}
                  title="Look like the shop that should win the job."
                  body="Cinematic project videos. Photography. Modern web design. Consistent branding. Social strategy. Monthly content. When a homeowner or GC is comparing crews, you shouldn't look like everyone else."
                />
                <BlueprintPanel
                  num="03"
                  label="Win More Work"
                  icon={<IconWrench className="text-rust mb-6" />}
                  title="Better leads. Bigger projects. More referrals."
                  body="That's the payoff. Stronger hires. Brand equity that compounds. Growth you can sustain — not a one-off ad blitz. We don't sell cameras. We sell trust that turns into jobs."
                  cta
                  onCta={() => scrollToSection("contact")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile stacked */}
        <div className="md:hidden flex flex-col">
          <MobileBlueprint
            num="01"
            label="Build Trust"
            title="Show them who you are before they ever call."
            body="Brand stories, testimonials, crew films, education, culture — trust you can see."
          />
          <MobileBlueprint
            num="02"
            label="Stand Out"
            title="Look like the shop that should win the job."
            body="Project films, photo, web, branding, social — so you don't blend in with every other truck."
          />
          <MobileBlueprint
            num="03"
            label="Win More Work"
            title="Better leads. Bigger projects. More referrals."
            body="Growth built on reputation — not gimmicks."
            cta
            onCta={() => scrollToSection("contact")}
          />
        </div>
      </section>

      {/* ─── PORTFOLIO REEL (inline video spots) ───────────────────────────── */}
      {/* CLIENT ASSET: Wire each VideoSlot `src` to real portfolio films */}
      <section
        id="reel"
        className="relative z-40 bg-denim-deep border-t border-white/10 py-20 md:py-28"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-light text-steel uppercase tracking-widest block mb-4">
                From the yard
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-wide text-concrete uppercase">
                Recent Footage
              </h2>
            </div>
            <p className="text-concrete/55 font-light text-sm max-w-sm leading-relaxed md:text-right">
              Short clips from real crews and real jobs. Drop your films in —
              these slots are framed up and ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            <VideoSlot
              className="md:col-span-7 scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out"
              label="Brand Story Film"
              trade="HVAC"
              aspect="video"
            />
            <VideoSlot
              className="md:col-span-5 scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100"
              label="Meet the Crew"
              trade="Electrical"
              aspect="video"
            />
            <VideoSlot
              className="md:col-span-4 scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out"
              label="Project Spotlight"
              trade="Roofing"
              aspect="video"
            />
            <VideoSlot
              className="md:col-span-4 scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100"
              label="Testimonial Cut"
              trade="Plumbing"
              aspect="video"
            />
            <VideoSlot
              className="md:col-span-4 scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200"
              label="Job Site BTS"
              trade="Concrete"
              aspect="video"
            />
          </div>
        </div>
      </section>

      {/* ─── MANIFESTO ─────────────────────────────────────────────────────── */}
      <section
        id="manifesto"
        className="relative z-40 bg-concrete overflow-hidden border-t border-denim/10 texture-grain"
      >
        <div
          className="absolute inset-0 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <canvas
            id="phil-canvas"
            className="absolute inset-0 w-full h-full opacity-40"
          />
        </div>

        <div className="relative z-10 border-b border-denim/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16">
            <div className="scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out">
              <span className="text-xs font-light text-steel uppercase tracking-widest block mb-4">
                Why we exist
              </span>
              <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-wide text-denim uppercase">
                Manifesto
              </h2>
            </div>
          </div>
        </div>

        <PhilBlock
          num="01"
          label="Belief"
          line1="Blue-collar businesses"
          line2="deserve to be seen."
          body="You've built something real — crews that show up, work that lasts, a name people trust. That story shouldn't sit buried under the same stock photos every competitor uses. We believe the trades deserve the same sharp storytelling the big brands get."
        />

        {/* Inline portfolio spot mid-manifesto */}
        <div className="relative z-10 border-b border-denim/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 items-center">
              <div className="scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out">
                <span className="text-xs font-light text-steel uppercase tracking-widest block mb-4">
                  See it land
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-wide text-denim uppercase mb-4 leading-tight">
                  Trust on camera.
                  <br />
                  <span className="text-denim/45">Not just on a truck door.</span>
                </h3>
                <p className="text-charcoal/70 font-light text-sm md:text-base leading-relaxed max-w-md">
                  A brand film that shows how you work — the crew, the craft, the
                  finish — does more than any slogan. Slot your best story film
                  here.
                </p>
              </div>
              {/* CLIENT ASSET: Featured brand-story video */}
              <VideoSlot
                className="scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100"
                label="Featured Brand Film"
                trade="Placeholder"
                aspect="video"
                tone="light"
              />
            </div>
          </div>
        </div>

        <PhilBlock
          num="02"
          label="Difference"
          line1="We don't sell cameras."
          line2="We sell trust."
          body="Plenty of vendors will shoot a video and walk away. We're a growth partner. Powered by the Trust Framework™, every piece of content is built to earn belief, then demand, then jobs — not just fill a feed."
        />
        <PhilBlock
          num="03"
          label="Right Fit"
          line1="Established shops."
          line2="Quality first."
          body="We work with contractors, electricians, plumbers, HVAC, roofers, welders, concrete crews — businesses that already care about reputation and treat marketing like an investment. Not a startup with no track record looking for a miracle."
          cta
          onCta={() => scrollToSection("contact")}
        />
      </section>

      {/* ─── TOOLBOX (Services) ────────────────────────────────────────────── */}
      <section
        className="relative z-40 overflow-hidden py-24 md:py-32 bg-paper border-t border-denim/10"
        id="toolbox"
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 pb-16 scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <span className="text-xs font-light text-steel uppercase tracking-widest block mb-4">
            What&apos;s in the kit
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-wide text-denim uppercase">
            Toolbox
          </h2>
          <p className="mt-6 max-w-xl text-steel text-sm md:text-base font-light leading-relaxed">
            Services framed under The Blue Collar Blueprint™ — so every deliverable
            has a job on the job site.
          </p>
        </div>

        <div
          id="serviceAccordion"
          className="w-full max-w-7xl mx-auto px-6 md:px-10 border-t border-denim/10"
        >
          <AccordionItem
            num="01"
            title="Build Trust"
            delay=""
            body="Content that proves who you are before the first handshake. Story films, testimonials, crew intros, education, BTS, culture, and community — the foundation of the Trust Framework™."
            items={[
              "Brand story films",
              "Customer testimonials",
              "Meet-the-crew videos",
              "Educational / how-we-work content",
              "Behind-the-scenes & culture",
              "Community involvement pieces",
            ]}
            onCta={() => scrollToSection("contact")}
          />
          <AccordionItem
            num="02"
            title="Stand Out"
            delay="delay-100"
            body="Make your brand impossible to confuse with the next truck on the street. Cinematic project films, photography, web, identity, and a steady social cadence that keeps you top of mind."
            items={[
              "Cinematic project videos",
              "Job-site photography",
              "Modern website design",
              "Brand identity systems",
              "Social strategy & monthly content",
            ]}
            onCta={() => scrollToSection("contact")}
          />
          <AccordionItem
            num="03"
            title="Win More Work"
            delay="delay-200"
            body="The punch list that matters: leads that convert, projects that grow, referrals that compound, and a brand strong enough to attract better people and bigger work."
            items={[
              "Lead-quality strategy",
              "Referral-ready content systems",
              "Hiring & culture films",
              "Long-term brand equity plays",
            ]}
            onCta={() => scrollToSection("contact")}
          />
        </div>

        {/* Toolbox portfolio strip */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 pt-20">
          <div className="scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-wide text-denim uppercase">
              Sample cuts
            </h3>
            <p className="text-xs text-steel uppercase tracking-widest">
              One clip per Blueprint stage — swap with real work
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            <VideoSlot
              className="scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out"
              label="Build Trust cut"
              trade="Testimonials"
              tone="light"
            />
            <VideoSlot
              className="scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100"
              label="Stand Out cut"
              trade="Project film"
              tone="light"
            />
            <VideoSlot
              className="scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200"
              label="Win More Work cut"
              trade="Lead magnet"
              tone="light"
            />
          </div>
        </div>
      </section>

      {/* ─── JOB SITES (case studies) ──────────────────────────────────────── */}
      {/* CLIENT ASSET: Replace placeholder case studies with real clients, footage, and results */}
      <section
        id="jobsites"
        className="relative z-40 bg-denim-deep border-t border-white/10 py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out mb-16 md:mb-24">
            <span className="text-xs font-light text-steel uppercase tracking-widest block mb-4">
              Field reports
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-wide text-concrete uppercase">
              Job Sites
            </h2>
            <p className="mt-6 max-w-xl text-concrete/60 font-light text-sm md:text-base leading-relaxed">
              Case studies, blue-collar style. What we built with each crew —
              and what it did for their pipeline.
            </p>
            <p className="mt-3 text-xs text-rust uppercase tracking-widest">
              Placeholder builds — swap with live client stories
            </p>
          </div>

          <div className="flex flex-col gap-20 md:gap-28">
            <JobSiteCase
              num="01"
              trade="Electrical"
              client="[Company Name]"
              title="From word-of-mouth only to the shop GCs call first."
              challenge="Great work. Almost no proof online. Bids landed cold."
              build="Brand story film, crew intros, project reels, and a site that looked as sharp as their installs."
              result="Stronger inbound. Shorter sales cycles. Crews that recruit themselves."
              reverse={false}
            />
            <JobSiteCase
              num="02"
              trade="Roofing"
              client="[Company Name]"
              title="Looked like every other truck — until they didn't."
              challenge="Same Facebook ads. Same stock photos. Same ignore rate."
              build="Cinematic project films, consistent brand kit, monthly content on a Blueprint cadence."
              result="Homeowners recognized the brand before the estimate. Referrals climbed."
              reverse
            />
            <JobSiteCase
              num="03"
              trade="HVAC"
              client="[Company Name]"
              title="Trust on file. Bigger commercial work on the books."
              challenge="Residential was steady. Commercial buyers needed more proof."
              build="Testimonial system, meet-the-crew series, and a Trust Framework™ content plan."
              result="Better-fit leads. Bigger tickets. A brand that hired easier."
              reverse={false}
            />
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ──────────────────────────────────────────────────── */}
      {/* CLIENT ASSET: Replace placeholder testimonials and case-study stats with real client quotes, names, trades, and results */}
      <section
        id="proof"
        className="relative z-40 bg-concrete-dark border-t border-denim/10 py-24 md:py-32 texture-grain"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out mb-16">
            <span className="text-xs font-light text-steel uppercase tracking-widest block mb-4">
              From the job site
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-wide text-denim uppercase">
              Proof
            </h2>
            <p className="mt-4 text-xs text-rust uppercase tracking-widest">
              Placeholder quotes — swap with real client stories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            <Testimonial
              quote="They didn't just shoot pretty footage. They framed up how we talk about our work — and the phone started ringing differently."
              name="[Client Name]"
              trade="[Trade / Company — placeholder]"
            />
            <Testimonial
              quote="Finally a crew that gets the trades. No fluff. Just a blueprint that made us look as solid as our installs."
              name="[Client Name]"
              trade="[Trade / Company — placeholder]"
            />
            <Testimonial
              quote="We stopped sounding like every other contractor on Facebook. Now GCs know who we are before we bid."
              name="[Client Name]"
              trade="[Trade / Company — placeholder]"
            />
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ───────────────────────────────────────────────────── */}
      <section
        id="cta"
        className="relative z-40 bg-denim border-t border-white/10 w-full min-h-[70vh] flex flex-col justify-between py-24 overflow-hidden texture-grain"
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col flex-1 justify-between h-full">
          <div className="flex flex-col items-start justify-center h-full">
            <span className="cta-anim opacity-0 translate-y-6 transition-all duration-1000 ease-out text-xs font-light tracking-widest uppercase text-concrete/50 mb-8">
              Ready to break ground?
            </span>
            <h2 className="cta-anim opacity-0 translate-y-6 transition-all duration-1000 delay-100 ease-out font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-wide text-concrete mb-6 leading-tight uppercase">
              Your story
              <br />
              <span className="text-concrete/45">deserves to be told.</span>
            </h2>
            <p className="cta-anim opacity-0 translate-y-6 transition-all duration-1000 delay-150 ease-out text-concrete/70 font-light text-sm md:text-base max-w-lg mb-10 leading-relaxed">
              You&apos;ve spent years earning your reputation. Let&apos;s build the
              trust system that turns it into more of the right work.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="cta-anim opacity-0 translate-y-6 transition-all duration-1000 delay-200 ease-out btn-stamp bg-rust hover:bg-rust-hover text-paper text-sm px-8 py-4 group"
            >
              Get Your Blueprint
              <IconArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* CLIENT ASSET: Replace placeholder stats with real metrics when available */}
          <div className="cta-anim opacity-0 translate-y-6 transition-all duration-1000 delay-300 ease-out flex flex-wrap border-t border-white/10 pt-12 mt-20 gap-16 md:gap-32 items-end justify-start">
            <div className="flex flex-col">
              <div className="font-display text-5xl md:text-6xl font-semibold tracking-wide text-concrete flex items-end">
                <span className="cta-stat" data-target="3">
                  0
                </span>
              </div>
              <span className="text-xs font-light text-concrete/50 mt-3 uppercase tracking-wider">
                Blueprint stages
              </span>
            </div>
            <div className="flex flex-col">
              <div className="font-display text-5xl md:text-6xl font-semibold tracking-wide text-concrete flex items-end">
                <span className="cta-stat" data-target="100">
                  0
                </span>
                <span className="text-3xl text-concrete/40 ml-1">%</span>
              </div>
              <span className="text-xs font-light text-concrete/50 mt-3 uppercase tracking-wider">
                Built for the trades
              </span>
            </div>
            <div className="flex flex-col">
              <div className="font-display text-5xl md:text-6xl font-semibold tracking-wide text-concrete flex items-end">
                <span className="text-rust">∞</span>
              </div>
              <span className="text-xs font-light text-concrete/50 mt-3 uppercase tracking-wider">
                Trust compounds
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER / CONTACT ──────────────────────────────────────────────── */}
      {/* CLIENT ASSET: Replace placeholder address, phone, and email with real contact details */}
      <footer
        id="contact"
        className="relative z-40 bg-denim-deep border-t border-white/10 overflow-hidden text-concrete"
      >
        <div className="flex flex-col w-full max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start w-full gap-10 border-b border-white/10 pb-16 scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <div className="flex flex-col gap-8">
              <span className="text-xs font-light tracking-widest text-steel uppercase">
                Break ground
              </span>
              <p className="font-display text-2xl md:text-4xl font-medium tracking-wide text-concrete uppercase max-w-xl leading-snug">
                Build Trust. Stand Out. Win More Work.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:hello@bluecollarvideoguys.com"
                  className="text-xl md:text-3xl font-display tracking-wide text-concrete/60 hover:text-rust transition-colors"
                >
                  hello@bluecollarvideoguys.com
                </a>
                {/* Placeholder phone — replace with live number */}
                <a
                  href="tel:+10000000000"
                  className="text-xl md:text-3xl font-display tracking-wide text-concrete/60 hover:text-rust transition-colors"
                >
                  [Phone — placeholder]
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection("top")}
              className="w-12 h-12 border border-white/15 flex items-center justify-center text-concrete/60 hover:text-concrete hover:bg-white/5 transition-all rounded-sm"
              aria-label="Back to top"
            >
              <IconArrowUp />
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full pt-8 gap-4 scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-light text-steel">
                © {new Date().getFullYear()} The Blue Collar Video Guys™. All
                rights reserved.
              </span>
              <span className="text-[11px] font-light text-steel/70 max-w-md">
                The Blue Collar Blueprint™ and Trust Framework™ are trademarks of
                The Blue Collar Video Guys™.
              </span>
            </div>
            <div className="flex gap-8 text-xs font-light text-steel">
              <a href="#" className="hover:text-concrete transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-concrete transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BlueprintPanel({
  num,
  label,
  icon,
  title,
  body,
  cta,
  onCta,
}: {
  num: string;
  label: string;
  icon: ReactNode;
  title: string;
  body: string;
  cta?: boolean;
  onCta?: () => void;
}) {
  return (
    <div className="usp-panel relative flex-shrink-0 h-full w-[100vw]">
      <div
        className="usp-ghost-num pointer-events-none select-none absolute top-10 right-10 font-display text-9xl font-semibold tracking-tight text-white/5 transition-colors duration-500 ease-in"
        aria-hidden="true"
      >
        {num}
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-center relative z-10">
        <div className="max-w-2xl">
          {icon}
          <span className="block text-xs font-light text-rust mb-6 uppercase tracking-widest">
            {label}
          </span>
          <h3 className="font-display text-4xl md:text-6xl font-semibold tracking-wide text-concrete mb-8 leading-tight uppercase">
            {title}
          </h3>
          <p className="text-concrete/60 font-light text-sm md:text-base leading-relaxed">
            {body}
          </p>
          {cta && onCta ? (
            <button
              type="button"
              onClick={onCta}
              className="mt-10 cursor-pointer inline-flex items-center gap-2 text-xs font-medium text-concrete group uppercase tracking-wider"
            >
              Get Your Blueprint
              <IconArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MobileBlueprint({
  num,
  label,
  title,
  body,
  cta,
  onCta,
}: {
  num: string;
  label: string;
  title: string;
  body: string;
  cta?: boolean;
  onCta?: () => void;
}) {
  return (
    <div className="w-full border-b border-white/10 flex flex-col px-6 py-16 last:border-b-0">
      <span className="text-sm font-display tracking-wide text-steel mb-2">
        {num}
      </span>
      <span className="text-xs font-light text-rust mb-6 uppercase tracking-widest">
        {label}
      </span>
      <h3 className="font-display text-3xl font-semibold tracking-wide text-concrete mb-6 leading-tight uppercase">
        {title}
      </h3>
      <p className="text-concrete/60 font-light text-sm leading-relaxed">{body}</p>
      {cta && onCta ? (
        <button
          type="button"
          onClick={onCta}
          className="mt-8 inline-flex items-center gap-2 text-xs font-medium text-concrete uppercase tracking-wider"
        >
          Get Your Blueprint
          <IconArrowRight />
        </button>
      ) : null}
    </div>
  );
}

function PhilBlock({
  num,
  label,
  line1,
  line2,
  body,
  cta,
  onCta,
}: {
  num: string;
  label: string;
  line1: string;
  line2: string;
  body: string;
  cta?: boolean;
  onCta?: () => void;
}) {
  return (
    <div className="phil-block relative z-10 border-b border-denim/10 group/block last:border-b-0">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[200px_1fr] min-h-[40vh]">
          <div className="hidden md:flex flex-col justify-between border-r border-denim/10 py-16 pr-10">
            <div>
              <span className="font-display text-3xl font-semibold tracking-wide text-denim/25 group-hover/block:text-denim transition-colors duration-500 block phil-num opacity-0">
                {num}
              </span>
              <span className="text-xs font-light text-steel mt-2 block uppercase tracking-widest">
                {label}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center md:pl-16 py-16">
            <span className="md:hidden text-xs font-medium text-steel mb-4 block uppercase tracking-widest">
              {num} — {label}
            </span>
            <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-wide text-denim mb-8 leading-tight uppercase">
              <span className="phil-line block opacity-0 translate-y-10 transition-all duration-700 ease-out">
                {line1}
              </span>
              <span className="phil-line block text-denim/45 opacity-0 translate-y-10 transition-all duration-700 ease-out delay-100">
                {line2}
              </span>
            </h3>
            <p className="text-charcoal/70 font-light text-sm md:text-base leading-relaxed max-w-xl phil-line-fade opacity-0 transition-opacity duration-700 delay-300">
              {body}
            </p>
            {cta && onCta ? (
              <button
                type="button"
                onClick={onCta}
                className="btn-stamp mt-10 text-paper bg-rust hover:bg-rust-hover px-6 py-3 w-fit phil-line-fade opacity-0 transition-all duration-700 delay-400"
              >
                Join the Crew
                <IconArrowRight />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionItem({
  num,
  title,
  body,
  items,
  delay,
  onCta,
}: {
  num: string;
  title: string;
  body: string;
  items: string[];
  delay: string;
  onCta: () => void;
}) {
  return (
    <div
      className={`accordion-item border-b border-denim/10 scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out ${delay}`}
    >
      <button
        type="button"
        className="accordion-trigger w-full flex items-center justify-between py-10 text-left group"
      >
        <div className="flex items-center gap-8 md:gap-16">
          <span className="text-sm font-display tracking-wide text-denim/30 group-hover:text-rust transition-colors w-6">
            {num}
          </span>
          <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-wide text-denim/50 group-hover:text-denim transition-colors duration-300 uppercase">
            {title}
          </h3>
        </div>
        <span className="acc-plus text-steel group-hover:text-denim transition-transform duration-300 flex items-center justify-center">
          <IconPlus />
        </span>
      </button>
      <div className="accordion-body max-h-0 overflow-hidden transition-all duration-500 ease-in-out">
        <div className="pb-12 flex flex-col md:flex-row gap-8 md:gap-16 pl-14 md:pl-[5.5rem]">
          <div className="md:w-1/2">
            <p className="text-sm text-charcoal/70 font-light leading-relaxed">
              {body}
            </p>
          </div>
          <div className="md:w-1/2 flex flex-col gap-3 border-l border-denim/15 pl-6">
            {items.map((item) => (
              <span
                key={item}
                className="text-sm font-light text-charcoal/80"
              >
                {item}
              </span>
            ))}
            <button
              type="button"
              onClick={onCta}
              className="cursor-pointer mt-4 inline-flex items-center gap-2 text-xs font-medium text-rust group uppercase tracking-wider"
            >
              Get a Blueprint
              <IconArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function JobSiteCase({
  num,
  trade,
  client,
  title,
  challenge,
  build,
  result,
  reverse,
}: {
  num: string;
  trade: string;
  client: string;
  title: string;
  challenge: string;
  build: string;
  result: string;
  reverse?: boolean;
}) {
  return (
    <article
      className={`scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out grid md:grid-cols-2 gap-8 md:gap-14 items-center ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* CLIENT ASSET: Case study hero video for this client */}
      <VideoSlot
        label={`${trade} case film`}
        trade={client}
        aspect="video"
      />
      <div>
        <div className="flex items-center gap-4 mb-6">
          <span className="font-display text-sm tracking-wide text-steel">
            {num}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-rust border border-rust/50 px-2 py-1">
            {trade}
          </span>
        </div>
        <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-wide text-concrete uppercase leading-tight mb-8">
          {title}
        </h3>
        <dl className="flex flex-col gap-5 border-t border-white/10 pt-6">
          <div>
            <dt className="text-[10px] uppercase tracking-widest text-steel mb-1">
              The job
            </dt>
            <dd className="text-sm text-concrete/70 font-light leading-relaxed">
              {challenge}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-widest text-steel mb-1">
              The build
            </dt>
            <dd className="text-sm text-concrete/70 font-light leading-relaxed">
              {build}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-widest text-rust mb-1">
              The punch list
            </dt>
            <dd className="text-sm text-concrete font-light leading-relaxed">
              {result}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

function Testimonial({
  quote,
  name,
  trade,
}: {
  quote: string;
  name: string;
  trade: string;
}) {
  return (
    <blockquote className="scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out border-t-2 border-rust pt-8">
      <p className="text-charcoal/80 font-light text-base md:text-lg leading-relaxed mb-8">
        &ldquo;{quote}&rdquo;
      </p>
      <footer>
        <cite className="not-italic font-display text-sm tracking-wide text-denim uppercase">
          {name}
        </cite>
        <p className="text-xs text-steel mt-1">{trade}</p>
      </footer>
    </blockquote>
  );
}
