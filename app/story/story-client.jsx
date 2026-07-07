"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  CSS,
  AssetProvider,
  Nav,
  Footer,
  Deco,
  Rv,
  Pic,
  PendingBadge,
  FadeSection
} from "../page";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function OurStoryPage() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1.1,
      syncTouch: true,
    });

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return (
    <AssetProvider>
      <div className="kamal-app">
        <style>{CSS}</style>
        <style>{`
          .story-cta-container {
            margin-top: 38px;
          }
          @media (max-width: 880px) {
            .story-cta-container {
              display: flex;
              justify-content: center;
            }
          }
        `}</style>
        <a className="skip-link" href="#story-content">Skip to content</a>
        <Nav />
        <main id="story-content">
          <section className="sec" id="story" style={{ paddingTop: "clamp(120px, 16vh, 180px)" }}>
            <Deco name="deco-palm.png" style={{ top: "15%", right: "-40px", width: 180 }} rotate={12} />
            <div className="wrap">
              <div className="story-grid">
                <Rv>
                  <div className="story-photo">
                    <Pic
                      src="/images/kamal/photo-hero-counter.jpg"
                      alt="KAMAL can in warm daylight in LA"
                      type="Photo"
                      note="Can in warm golden-hour light — portrait ~4:5, kitchen counter or market table."
                    />
                  </div>
                </Rv>
                <Rv delay={210}>
                  <div className="story-body">
                    <div className="eyebrow">Our story</div>
                    <p className="story-quote">"We grew up on <span>cà phê sữa đá</span> — and wanted a version that loved us back."</p>
                    <p>Vietnamese iced coffee was the taste of every family gathering, every afternoon break, every reason to slow down for five minutes. Bold coffee, sweet condensed milk, a tall glass of ice.</p>
                    <p>KAMAL keeps the flavor we grew up loving and adds the wellness we care about now: <b>dairy swapped for creamy oat milk, sugar swapped for allulose.</b> Every can is brewed and canned in Los Angeles, and we bring it to you in person — one farmers market at a time.</p>
                    <p className="story-close">The pagoda on our can rises over still water at sunset — a quiet tribute to the landscapes and rituals that gave the world this coffee.</p>
                    
                    <div className="story-cta-container">
                      <a href="/#find" className="hero-cta" style={{ display: "inline-block", textDecoration: "none", animation: "none" }}>
                        Find Us This Week
                      </a>
                    </div>
                  </div>
                </Rv>
              </div>
            </div>
          </section>

          <section className="sec" style={{ background: "var(--cream)", padding: "40px 0 clamp(80px, 10vh, 120px) 0" }}>
            <div className="wrap">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <Rv>
                  <div style={{
                    width: "100%",
                    maxWidth: "800px",
                    borderRadius: "4px",
                    overflow: "hidden",
                    boxShadow: "0 30px 70px rgba(58,42,26,0.12)",
                    aspectRatio: "16 / 9",
                    marginBottom: "44px"
                  }}>
                    <img
                      src="/images/kamal/atmosphere/coffee-swirl.webp"
                      alt="Espresso coffee swirled with creamy condensed oat milk"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      width="800"
                      height="450"
                      loading="lazy"
                    />
                  </div>
                </Rv>
                <Rv delay={150}>
                  <p style={{
                    fontFamily: "var(--f-fraunces)",
                    fontWeight: 430,
                    fontStyle: "italic",
                    fontSize: "clamp(20px, 2.4vw, 28px)",
                    lineHeight: 1.4,
                    color: "var(--ink)",
                    maxWidth: "28ch"
                  }}>
                    Creamy condensed oat milk, swirled low and slow.
                  </p>
                </Rv>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <PendingBadge />
      </div>
    </AssetProvider>
  );
}
