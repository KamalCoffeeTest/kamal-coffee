"use client";
import { useState, useEffect, useRef } from "react";
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
  PendingBadge
} from "../page";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const RESERVE_CONFIG = {
  receiveEmail: "hello@kamalcoffee.com",   // mailto fallback destination
  notifyEndpoint: null,                    // Formspree-style POST (set to null for mailto)
  dropWindow: null,                        // e.g. "August 2026" → renders "Next drop: August 2026"; null → "coming soon"
  batchNote: null,                         // e.g. "Brewed in small batches of 200 cans" → shown under status line
  prices: { single: null, six: null, twelve: null }, // future use; ALL null = show no prices anywhere
};

const images = [
  { src: "/images/kamal/can-render.png", alt: "KAMAL can front render", file: "product-front.png", note: "Front can render on transparent background" },
  { src: "/images/kamal/product-angle.jpg", alt: "KAMAL can at 3/4 angle on warm surface", file: "product-angle.jpg", note: "3/4 angle can on warm wood/ceramic surface" },
  { src: "/images/kamal/product-condensation.jpg", alt: "KAMAL can condensation close-up", file: "product-condensation.jpg", note: "Chilled can macro, droplets" },
  { src: "/images/kamal/product-pour.jpg", alt: "KAMAL coffee pour over ice", file: "product-pour.jpg", note: "Pour into iced glass" },
  { src: "/images/kamal/product-label-flat.jpg", alt: "KAMAL flat label artwork", file: "product-label-flat.jpg", note: "The flat label artwork" }
];

const faqAccordions = [
  {
    title: "INGREDIENTS",
    content: (
      <>
        <p>Brewed coffee, oat milk (water, oats, sunflower oil, dipotassium phosphate, calcium carbonate, tricalcium phosphate, sea salt), allulose.</p>
        <p className="footnote-text" style={{ marginTop: "12px", borderTop: "1px dashed var(--line)", paddingTop: "12px" }}>
          No gums or stabilizers. Sweetened exclusively with allulose.
        </p>
      </>
    ),
    defaultOpen: true
  },
  {
    title: "BENEFITS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ paddingBottom: "10px", borderBottom: "1px solid var(--line)" }}>Dairy-free &amp; 100% vegan</div>
        <div style={{ paddingBottom: "10px", borderBottom: "1px solid var(--line)" }}>Sweetened with allulose — sweetness without the sugar spike</div>
        <div style={{ paddingBottom: "10px", borderBottom: "1px solid var(--line)" }}>6g net carbs (56g total carbs − 50g allulose − 0g fiber)</div>
        <div style={{ paddingBottom: "10px", borderBottom: "1px solid var(--line)" }}>90mg caffeine — about one strong cup</div>
        <div style={{ paddingBottom: "10px" }}>135mg calcium (10% DV) &amp; 185mg potassium (4% DV) from the oat milk</div>
      </div>
    )
  },
  {
    title: "NUTRITION FACTS",
    content: (
      <>
        <table className="nutrition-table">
          <thead>
            <tr>
              <th colSpan="3" className="nutrition-header">
                <span className="nutrition-title">Nutrition Facts</span>
                <span className="nutrition-sub">1 serving per container</span>
                <span className="nutrition-sub bold">Serving size 1 can (8.4 oz / 250ml)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="thick-row">
              <td colSpan="3">
                <span className="calories-label">Amount Per Serving</span>
                <span className="calories-value-wrap">
                  <span className="calories-title">Calories</span>
                  <span className="calories-count">85</span>
                </span>
              </td>
            </tr>
            <tr className="header-row">
              <td colSpan="2"></td>
              <td className="right bold">% Daily Value*</td>
            </tr>
            <tr>
              <td className="bold col-main">Total Fat</td>
              <td className="col-val">3.5g</td>
              <td className="right bold">4%</td>
            </tr>
            <tr className="indent">
              <td className="col-main">Saturated Fat</td>
              <td className="col-val">0.3g</td>
              <td className="right bold">2%</td>
            </tr>
            <tr className="indent">
              <td className="col-main">Trans Fat</td>
              <td className="col-val">0g</td>
              <td className="right"></td>
            </tr>
            <tr>
              <td className="bold col-main">Cholesterol</td>
              <td className="col-val">0mg</td>
              <td className="right bold">0%</td>
            </tr>
            <tr>
              <td className="bold col-main">Sodium</td>
              <td className="col-val">58mg</td>
              <td className="right bold">3%</td>
            </tr>
            <tr>
              <td className="bold col-main">Total Carbohydrate</td>
              <td className="col-val">56g</td>
              <td className="right bold">20%</td>
            </tr>
            <tr className="indent">
              <td className="col-main">Dietary Fiber</td>
              <td className="col-val">0g</td>
              <td className="right bold">0%</td>
            </tr>
            <tr className="indent">
              <td className="col-main">Total Sugars</td>
              <td className="col-val">2g</td>
              <td className="right"></td>
            </tr>
            <tr className="indent-2">
              <td colSpan="2" className="col-main">Includes 2g Added Sugars</td>
              <td className="right bold">4%</td>
            </tr>
            <tr className="indent">
              <td className="col-main">Allulose</td>
              <td className="col-val">50g</td>
              <td className="right"></td>
            </tr>
            <tr className="thick-row-bottom">
              <td className="bold col-main">Protein</td>
              <td className="col-val">1g</td>
              <td className="right bold">2%</td>
            </tr>
            <tr>
              <td colSpan="2">Vitamin D 0mcg</td>
              <td className="right">0%</td>
            </tr>
            <tr>
              <td colSpan="2">Calcium 135mg</td>
              <td className="right">10%</td>
            </tr>
            <tr>
              <td colSpan="2">Iron 0mg</td>
              <td className="right">0%</td>
            </tr>
            <tr className="thin-row-bottom">
              <td colSpan="2">Potassium 185mg</td>
              <td className="right">4%</td>
            </tr>
          </tbody>
        </table>
        <p className="footnote-text">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
        </p>
        <p className="footnote-text italic">
          Allulose is included in Total Carbohydrate but excluded from Total and Added Sugars per FDA guidance.
        </p>
      </>
    )
  },
  {
    title: "SHIPPING & STORAGE",
    content: (
      <>
        <p>Every drop ships cold in insulated packaging. Refrigerate on arrival.</p>
        <p style={{ marginTop: "10px" }}>Perishable — once opened, enjoy within 48 hours. Best shaken and served over ice.</p>
        <p style={{ marginTop: "10px" }}>Shipping regions and details announced with each drop.</p>
      </>
    )
  }
];

export function ReservePageClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPack, setSelectedPack] = useState("six"); // "single" | "six" | "twelve"
  const [formData, setFormData] = useState({ name: "", email: "", zip: "" });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
  const [submittedName, setSubmittedName] = useState("");
  
  const galleryRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = sessionStorage.getItem("kamal-reserve-success-name");
      if (savedName) {
        setSubmittedName(savedName);
        setStatus("success");
      }
    }
  }, []);

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

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % images.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handlePackChange = (packValue) => {
    setSelectedPack(packValue);
  };

  const handlePackKeyDown = (e, val) => {
    const packValues = ["single", "six", "twelve"];
    const currIndex = packValues.indexOf(val);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currIndex + 1) % packValues.length;
      setSelectedPack(packValues[nextIndex]);
      document.getElementById(`pack-${packValues[nextIndex]}`).focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (currIndex - 1 + packValues.length) % packValues.length;
      setSelectedPack(packValues[prevIndex]);
      document.getElementById(`pack-${packValues[prevIndex]}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) {
      // Quietly reject bot submissions by pretending it succeeded
      setStatus("success");
      setSubmittedName(formData.name);
      return;
    }

    // Quick regex validators
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const zipRegex = /^\d{5}$/;

    if (!formData.name.trim() || !emailRegex.test(formData.email) || !zipRegex.test(formData.zip)) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    if (RESERVE_CONFIG.notifyEndpoint) {
      try {
        const res = await fetch(RESERVE_CONFIG.notifyEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            zip: formData.zip,
            pack: selectedPack,
            page: "reserve"
          })
        });

        if (res.ok) {
          sessionStorage.setItem("kamal-reserve-success-name", formData.name);
          setSubmittedName(formData.name);
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    } else {
      // Fallback mailto behavior
      console.warn("VITE_NOTIFY_ENDPOINT is not configured. Falling back to client mailto link.");
      const subject = encodeURIComponent("KAMAL drop list");
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nZIP: ${formData.zip}\nPack Preference: ${selectedPack}`
      );
      window.location.href = `mailto:${RESERVE_CONFIG.receiveEmail}?subject=${subject}&body=${body}`;
      
      // Assume success for fallback
      sessionStorage.setItem("kamal-reserve-success-name", formData.name);
      setSubmittedName(formData.name);
      setStatus("success");
    }
  };

  return (
    <AssetProvider>
      <div className="kamal-app">
        <style>{CSS}</style>
        <style>{`
          .reserve-main-layout {
            padding: clamp(120px, 16vh, 180px) 0 clamp(60px, 10vh, 120px) 0;
            background: var(--cream);
          }
          .reserve-grid {
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            gap: clamp(40px, 8vw, 90px);
            align-items: start;
          }
          @media (max-width: 880px) {
            .reserve-grid {
              grid-template-columns: 1fr;
              gap: 40px;
            }
          }
          .gallery-container {
            width: 100%;
            outline: none;
          }
          .gallery-display {
            position: relative;
            width: 100%;
            aspect-ratio: 1;
            background: var(--cream-2);
            border: 1px solid var(--line);
            border-radius: 4px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .gallery-main-img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: contain;
            opacity: 0;
            transition: opacity 300ms ease;
            pointer-events: none;
          }
          .gallery-main-img.active {
            opacity: 1;
            position: relative;
            pointer-events: auto;
          }
          .gallery-thumbs {
            display: flex;
            gap: 12px;
            margin-top: 16px;
          }
          .thumb-btn {
            flex: 1;
            aspect-ratio: 1;
            background: var(--cream-2);
            border: 1px solid var(--line);
            border-radius: 4px;
            padding: 0;
            cursor: pointer;
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .thumb-btn img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .thumb-btn.active {
            border-color: var(--orange);
            box-shadow: 0 0 0 1px var(--orange);
          }
          .thumb-btn:focus-visible {
            outline: 2.5px solid var(--orange);
            outline-offset: 2px;
          }
          .sticky-col {
            position: sticky;
            top: 120px;
          }
          @media (max-width: 880px) {
            .sticky-col {
              position: static;
            }
          }
          .info-desc {
            font-size: 16px;
            line-height: 1.6;
            color: var(--ink-soft);
            margin: 20px 0;
            font-weight: 350;
          }
          .fact-line {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            align-items: center;
            margin: 24px 0;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 2px;
            color: var(--ink);
            text-transform: uppercase;
          }
          .fact-line i {
            color: var(--gold);
            font-style: normal;
            padding: 0 4px;
          }
          .pack-selector-label {
            display: block;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--ink-soft);
            margin-bottom: 12px;
          }
          .pack-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border: 1px solid var(--line);
            border-radius: 4px;
            background: var(--cream);
            margin-bottom: 10px;
            cursor: pointer;
            outline: none;
            transition: all 0.2s ease;
            user-select: none;
          }
          .pack-row:hover {
            border-color: var(--gold);
          }
          .pack-row.active {
            border: 1.5px solid var(--orange);
            background: var(--cream-2);
          }
          .pack-row:focus-visible {
            outline: 2.5px solid var(--orange);
            outline-offset: 2px;
          }
          .pack-name {
            font-family: var(--f-fraunces);
            font-size: 17px;
            font-weight: 540;
            color: var(--ink);
          }
          .pack-desc {
            font-size: 13px;
            color: var(--ink-soft);
            font-weight: 350;
          }
          .status-header {
            margin-top: 36px;
            padding-top: 24px;
            border-top: 1px solid var(--line);
          }
          .status-main {
            font-family: var(--f-fraunces);
            font-style: italic;
            font-size: 20px;
            color: var(--orange-deep);
            margin-bottom: 6px;
          }
          .shipping-info {
            font-size: 13px;
            line-height: 1.5;
            color: var(--ink-soft);
            margin-bottom: 20px;
            font-weight: 350;
          }
          .form-group {
            margin-bottom: 14px;
          }
          .form-label {
            display: block;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--ink-soft);
            margin-bottom: 6px;
          }
          .form-input {
            width: 100%;
            height: 48px;
            background: var(--cream-2);
            border: 1px solid var(--line);
            border-radius: 4px;
            padding: 0 16px;
            font-size: 15px;
            font-family: var(--f-body);
            color: var(--ink);
            transition: border-color 0.2s ease;
          }
          .form-input:focus {
            outline: none;
            border-color: var(--orange);
          }
          .submit-button {
            width: 100%;
            height: 52px;
            background: var(--orange);
            color: var(--foam);
            border: none;
            border-radius: 100px;
            font-family: var(--f-body);
            font-size: 15px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;
            transition: background 0.2s ease, transform 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .submit-button:hover {
            background: var(--orange-deep);
          }
          .submit-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          .error-block {
            margin-top: 12px;
            font-size: 14px;
            color: var(--orange-deep);
            font-family: var(--f-body);
            text-align: center;
          }
          .success-container {
            padding: 24px;
            background: var(--cream-2);
            border: 1px solid var(--line);
            border-radius: 4px;
            text-align: center;
            animation: fadeIn 0.4s ease forwards;
          }
          .success-title {
            font-family: var(--f-fraunces);
            font-size: 20px;
            color: var(--espresso);
            font-weight: 540;
            margin-bottom: 8px;
          }
          .success-sub {
            font-size: 14px;
            color: var(--ink-soft);
            font-weight: 350;
          }
          
          /* Nutrition Table Stylings */
          .nutrition-table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid var(--espresso);
            font-family: var(--f-body);
            color: var(--espresso);
            background: var(--cream);
            margin-bottom: 12px;
            text-align: left;
          }
          .nutrition-header {
            padding: 8px 12px;
            border-bottom: 8px solid var(--espresso);
            text-align: left;
          }
          .nutrition-title {
            display: block;
            font-family: var(--f-fraunces);
            font-size: 28px;
            font-weight: 700;
            line-height: 1.1;
          }
          .nutrition-sub {
            display: block;
            font-size: 13px;
            font-weight: 350;
          }
          .nutrition-sub.bold {
            font-weight: 600;
          }
          .nutrition-table td {
            padding: 4px 12px;
            border-bottom: 1px solid var(--espresso);
            font-size: 14px;
          }
          .nutrition-table tr.thick-row td {
            border-bottom: 4px solid var(--espresso);
            padding: 6px 12px;
          }
          .nutrition-table tr.thick-row-bottom td {
            border-bottom: 4px solid var(--espresso);
          }
          .nutrition-table tr.thin-row-bottom td {
            border-bottom: none;
          }
          .nutrition-table tr.header-row td {
            border-bottom: 1px solid var(--espresso);
            padding: 2px 12px;
            font-size: 11px;
          }
          .calories-label {
            display: block;
            font-size: 11px;
            font-weight: 600;
          }
          .calories-value-wrap {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }
          .calories-title {
            font-family: var(--f-fraunces);
            font-size: 20px;
            font-weight: 700;
          }
          .calories-count {
            font-family: var(--f-fraunces);
            font-size: 28px;
            font-weight: 700;
          }
          .nutrition-table td.right {
            text-align: right;
          }
          .nutrition-table td.bold {
            font-weight: 600;
          }
          .nutrition-table tr.indent td.col-main {
            padding-left: 24px;
          }
          .nutrition-table tr.indent-2 td.col-main {
            padding-left: 36px;
          }
          .footnote-text {
            font-size: 11.5px;
            line-height: 1.5;
            color: var(--ink-soft);
            margin-top: 8px;
            font-weight: 350;
          }
          .footnote-text.italic {
            font-style: italic;
          }

          /* Full bleed banner styles */
          .reserve-banner {
            position: relative;
            width: 100%;
            height: clamp(240px, 35vh, 480px);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .banner-overlay {
            position: absolute;
            inset: 0;
            background: rgba(38, 26, 14, 0.45);
            z-index: 1;
            pointer-events: none;
          }
          .banner-text {
            position: relative;
            z-index: 2;
            font-family: var(--f-fraunces);
            font-style: italic;
            font-size: clamp(24px, 4vw, 42px);
            color: var(--foam);
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          }

          /* How drops work columns */
          .drops-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(24px, 4vw, 60px);
            margin: 60px 0;
          }
          @media (max-width: 768px) {
            .drops-grid {
              grid-template-columns: 1fr;
              gap: 36px;
            }
          }
          .drops-col {
            border-top: 2px solid var(--gold);
            padding-top: 20px;
          }
          .drops-num {
            font-family: var(--f-fraunces);
            font-size: 18px;
            color: var(--gold);
            margin-bottom: 12px;
            font-weight: 600;
          }
          .drops-title {
            font-family: var(--f-fraunces);
            font-size: 20px;
            font-weight: 540;
            color: var(--espresso);
            margin-bottom: 12px;
          }
          .drops-text {
            font-size: 14.5px;
            line-height: 1.6;
            color: var(--ink-soft);
            font-weight: 350;
          }

          /* Bridge styles */
          .bridge-sec {
            background: var(--cream-2);
            padding: 80px 0;
            border-top: 1px solid var(--line);
            text-align: center;
          }
          .bridge-h2 {
            font-family: var(--f-fraunces);
            font-size: clamp(28px, 4vw, 40px);
            color: var(--espresso);
            font-weight: 540;
            margin-bottom: 12px;
          }
          .bridge-text {
            font-size: 16px;
            color: var(--ink-soft);
            max-width: 48ch;
            margin: 0 auto 30px auto;
            line-height: 1.6;
            font-weight: 350;
          }
          .bridge-cta {
            display: inline-block;
            border: 1px solid var(--espresso);
            color: var(--espresso);
            font-family: var(--f-body);
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            padding: 16px 36px;
            text-decoration: none;
            background: transparent;
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .bridge-cta:hover {
            background: var(--espresso);
            color: var(--foam);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <a className="skip-link" href="#reserve-content">Skip to content</a>
        <Nav />

        <main id="reserve-content">
          <section className="reserve-main-layout">
            <div className="wrap">
              <div className="reserve-grid">
                
                {/* GALLERY LEFT */}
                <div 
                  className="gallery-container" 
                  ref={galleryRef}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  aria-label="Product Image Gallery. Use left and right arrow keys to switch images."
                >
                  <Rv>
                    <div className="gallery-display">
                      {images.map((img, i) => (
                        <div key={i} className={`gallery-main-img ${i === activeIndex ? "active" : ""}`}>
                          <Pic
                            src={img.src}
                            alt={img.alt}
                            file={img.file}
                            note={img.note}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                        </div>
                      ))}
                    </div>
                  </Rv>

                  <Rv delay={120}>
                    <div className="gallery-thumbs" role="tablist" aria-label="Product image thumbnails">
                      {images.map((img, i) => (
                        <button
                          key={i}
                          role="tab"
                          aria-selected={i === activeIndex}
                          aria-label={`Show image ${i + 1}: ${img.alt}`}
                          className={`thumb-btn ${i === activeIndex ? "active" : ""}`}
                          onClick={() => setActiveIndex(i)}
                        >
                          <img src={img.src} alt="" aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </Rv>
                </div>

                {/* INFO COLUMN RIGHT */}
                <div className="sticky-col">
                  <Rv delay={180}>
                    <div className="eyebrow">SMALL BATCH · BREWED IN LOS ANGELES</div>
                    <h1 className="h1" style={{ margin: "8px 0" }}>Vietnamese Iced Coffee</h1>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: "15px", fontWeight: "600", color: "var(--espresso)" }}>
                      Bold &amp; Smooth · 8.4 oz (250 ml)
                    </p>
                    <p className="info-desc">
                      Authentic cà phê sữa đá — bold slow-brewed coffee, silky condensed oat milk, sweetened with allulose instead of sugar. Dairy-free and 100% vegan.
                    </p>
                    <div className="fact-line">
                      85 CALORIES <i>·</i> VEGAN <i>·</i> 90MG CAFFEINE <i>·</i> 6G NET CARBS
                    </div>
                  </Rv>

                  {/* PACK SELECTOR */}
                  <Rv delay={240}>
                    <div>
                      <span className="pack-selector-label">Choose your pack</span>
                      <div role="radiogroup" aria-label="Select pack size">
                        <div 
                          id="pack-single"
                          role="radio"
                          aria-checked={selectedPack === "single"}
                          tabIndex={selectedPack === "single" ? 0 : -1}
                          onClick={() => handlePackChange("single")}
                          onKeyDown={(e) => handlePackKeyDown(e, "single")}
                          className={`pack-row ${selectedPack === "single" ? "active" : ""}`}
                        >
                          <span className="pack-name">Single Can</span>
                          <span className="pack-desc">try it</span>
                        </div>
                        <div 
                          id="pack-six"
                          role="radio"
                          aria-checked={selectedPack === "six"}
                          tabIndex={selectedPack === "six" ? 0 : -1}
                          onClick={() => handlePackChange("six")}
                          onKeyDown={(e) => handlePackKeyDown(e, "six")}
                          className={`pack-row ${selectedPack === "six" ? "active" : ""}`}
                        >
                          <span className="pack-name">6-Pack</span>
                          <span className="pack-desc">the fridge staple</span>
                        </div>
                        <div 
                          id="pack-twelve"
                          role="radio"
                          aria-checked={selectedPack === "twelve"}
                          tabIndex={selectedPack === "twelve" ? 0 : -1}
                          onClick={() => handlePackChange("twelve")}
                          onKeyDown={(e) => handlePackKeyDown(e, "twelve")}
                          className={`pack-row ${selectedPack === "twelve" ? "active" : ""}`}
                        >
                          <span className="pack-name">12-Pack</span>
                          <span className="pack-desc">never run out</span>
                        </div>
                      </div>
                      <p style={{ fontSize: "12px", color: "var(--ink-soft)", marginTop: "8px", fontStyle: "italic", fontWeight: "350" }}>
                        Pricing announced at drop.
                      </p>
                    </div>
                  </Rv>

                  {/* STATUS & NOTIFY FORM */}
                  <Rv delay={300}>
                    <div className="status-header">
                      <div className="status-main">
                        {RESERVE_CONFIG.dropWindow ? `Next drop: ${RESERVE_CONFIG.dropWindow}.` : "Next drop coming soon."}
                      </div>
                      {RESERVE_CONFIG.batchNote && (
                        <p style={{ fontSize: "12px", color: "var(--ink-soft)", marginBottom: "16px", fontWeight: "350" }}>
                          {RESERVE_CONFIG.batchNote}
                        </p>
                      )}
                      <p className="shipping-info">
                        Ships cold, nationwide — leave your ZIP so we know where to ship first.
                      </p>

                      {status === "success" ? (
                        <div className="success-container" aria-live="polite">
                          <h4 className="success-title">You're on the list, {submittedName}</h4>
                          <p className="success-sub">First pick when the next batch is ready.</p>
                          <p style={{ fontSize: "11px", color: "var(--ink-soft)", marginTop: "12px", fontWeight: "350" }}>
                            We'll only email you about drops. No spam, ever.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} noValidate aria-live="polite">
                          {/* Honeypot field */}
                          <input
                            type="text"
                            name="company"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            style={{ display: "none" }}
                            tabIndex={-1}
                            autoComplete="off"
                          />
                          {/* Live hidden pack field */}
                          <input type="hidden" name="pack" value={selectedPack} />

                          <div className="form-group">
                            <label htmlFor="name-input" className="form-label">First name</label>
                            <input
                              id="name-input"
                              type="text"
                              required
                              placeholder="Your first name"
                              className="form-input"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="email-input" className="form-label">Email address</label>
                            <input
                              id="email-input"
                              type="email"
                              required
                              placeholder="you@example.com"
                              className="form-input"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="zip-input" className="form-label">ZIP code</label>
                            <input
                              id="zip-input"
                              type="text"
                              required
                              maxLength={5}
                              pattern="[0-9]{5}"
                              inputMode="numeric"
                              placeholder="90001"
                              className="form-input"
                              value={formData.zip}
                              onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                            />
                          </div>

                          <button 
                            type="submit" 
                            className="submit-button"
                            disabled={status === "submitting"}
                          >
                            {status === "submitting" ? "Securing spot..." : "Notify me first"}
                          </button>

                          {status === "error" && (
                            <div className="error-block">
                              Something hiccuped — try again in a moment.
                            </div>
                          )}
                        </form>
                      )}
                    </div>
                  </Rv>

                  {/* FAQ ACCORDIONS */}
                  <Rv delay={360}>
                    <div className="faq-list accordions-list">
                      {faqAccordions.map((item, index) => (
                        <details key={index} open={item.defaultOpen}>
                          <summary>{item.title}</summary>
                          <div className="accordions-content">
                            {item.content}
                          </div>
                        </details>
                      ))}
                    </div>
                  </Rv>

                </div>

              </div>
            </div>
          </section>

          {/* FULL BLEED IMAGE BAND */}
          <section className="reserve-banner">
            <div className="banner-overlay" />
            <Pic
              src="/images/kamal/reserve-band.jpg"
              alt="KAMAL cold cans inside a cooler at the Los Angeles brewery"
              file="reserve-band.jpg"
              note="Cans in the cooler or at the brewery — landscape aspect, full width"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="banner-text">Small batches. Real drops.</div>
          </section>

          {/* HOW DROPS WORK */}
          <section className="sec" style={{ background: "var(--cream)" }}>
            <div className="wrap">
              <h2 className="h2" style={{ textAlign: "center", fontFamily: "var(--f-fraunces)" }}>How drops work</h2>
              <div className="drops-grid">
                <div className="drops-col">
                  <div className="drops-num">01</div>
                  <h3 className="drops-title">Reserve your spot</h3>
                  <p className="drops-text">Leave your name, email, and ZIP. We use location data to map out shipping regions and routes first.</p>
                </div>
                <div className="drops-col">
                  <div className="drops-num">02</div>
                  <h3 className="drops-title">We brew the batch</h3>
                  <p className="drops-text">Small-batch brewed and canned in Los Angeles, packed cold, and prepared for immediate shipment.</p>
                </div>
                <div className="drops-col">
                  <div className="drops-num">03</div>
                  <h3 className="drops-title">You get first pick</h3>
                  <p className="drops-text">One direct email when the batch is ready to claim. First come, first served. No subscriptions.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CAN'T WAIT BRIDGE */}
          <section className="bridge-sec">
            <div className="wrap">
              <h2 className="bridge-h2">Can't wait for the drop?</h2>
              <p className="bridge-text">
                We pour every weekend at LA farmers markets — cold cans, straight from the cooler.
              </p>
              <button 
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = "/#find";
                  }
                }} 
                className="bridge-cta"
              >
                See this week's markets
              </button>
            </div>
          </section>

        </main>

        <Footer />
        <PendingBadge />
      </div>
    </AssetProvider>
  );
}
