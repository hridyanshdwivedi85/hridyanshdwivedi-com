import React, { useRef, useState, useEffect } from "react";
import UnicornScene from "unicornstudio-react";

/* ═══════════════════════════════════════════════════════════
   NIKE — Purple energy, sport power (UnicornScene)
   ═══════════════════════════════════════════════════════════ */
export function NikeSlide({ active, isMobile }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1 / 3);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => setScale(e.contentRect.width / 1440));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="br-slide">
      <div className="br-corner-tl" style={{ borderColor: "rgba(124,58,237,0.35)" }} />
      <div className="br-corner-br" style={{ borderColor: "rgba(124,58,237,0.35)" }} />
      <div className="br-bg-text">
        <span style={{ color: "rgba(124,58,237,0.05)" }}>JUST DO IT</span>
      </div>

      {/* Text */}
      <div className="br-text-col">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <path d="M2 20 C6 10, 16 4, 30 2 C24 8, 14 18, 8 22 Z" fill="#a78bfa" opacity="0.9" />
          </svg>
          <div className="br-kicker" style={{ color: "#a78bfa", margin: 0, paddingBottom: 0 }}>
            Nike · Sportswear · Est. 1964
          </div>
        </div>
        <h2 className="br-headline">
          Defy
          <br />
          <span style={{ color: "#7c3aed" }}>Gravity.</span>
        </h2>
        <p
          className="br-subline"
          style={{
            borderColor: "rgba(124,58,237,0.5)",
            color: "rgba(167,139,250,0.8)",
            background: "rgba(124,58,237,0.06)",
          }}
        >
          "Because running from your problems
          <br />
          requires aerodynamic support."
        </p>
        <div className="br-price-row">
          <span className="br-price-from">MSRP</span>
          <span className="br-price-amount">$185.00</span>
        </div>
      </div>

      {/* UnicornScene — right column */}
      <div className="br-img-col">
        <div
          className="br-img-glow"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.65), transparent)",
          }}
        />
        <div
          ref={wrapRef}
          style={{
            position: "relative",
            width: isMobile ? "88%" : "100%",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.65), 0 0 50px rgba(124,58,237,0.2)",
            aspectRatio: "1440/900",
          }}
        >
          <div
            style={{
              width: "1440px",
              height: "900px",
              transformOrigin: "top left",
              transform: `scale(${scale})`,
              pointerEvents: "none",
            }}
          >
            <UnicornScene
              projectId="8G5jntH3UKR9Ejazjr7M"
              width="1440px"
              height="900px"
              scale={1}
              dpi={1}
              sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.6/dist/unicornStudio.umd.js"
            />
          </div>
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 40,
              background: "linear-gradient(to top, rgba(5,5,16,1) 40%, transparent)",
              zIndex: 10, pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   PS5 — Deep blue, tech minimal
   ═══════════════════════════════════════════════════════════ */
export function PS5Slide({ active, isMobile }) {
  return (
    <div className="br-slide">
      <div className="br-corner-tl" style={{ borderColor: "rgba(59,130,246,0.3)" }} />
      <div className="br-corner-br" style={{ borderColor: "rgba(59,130,246,0.3)" }} />
      <div className="br-bg-text">
        <span style={{ color: "rgba(59,130,246,0.03)", fontSize: "22vw" }}>
          PS5
        </span>
      </div>

      <div className="br-text-col">
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}
        >
          <svg width="24" height="24" viewBox="0 0 32 32">
            <polygon points="16,4 28,26 4,26" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
          </svg>
          <div className="br-kicker" style={{ color: "#93c5fd", margin: 0, paddingBottom: 0 }}>
            Sony · PlayStation · 2020
          </div>
        </div>
        <h2 className="br-headline">
          Play Has
          <br />
          <span style={{ color: "#3b82f6" }}>No Limits.</span>
        </h2>
        <p
          className="br-subline"
          style={{
            borderColor: "rgba(59,130,246,0.45)",
            color: "#93c5fd",
            background: "rgba(59,130,246,0.06)",
          }}
        >
          "Outside has terrible graphics and bugs.
          <br />
          Stay inside."
        </p>
        <div
          className="br-price-row"
          style={{
            background: "rgba(59,130,246,0.08)",
            borderColor: "rgba(59,130,246,0.2)",
          }}
        >
          <span className="br-price-from" style={{ color: "#bfdbfe" }}>
            SRP
          </span>
          <span className="br-price-amount">$499.99</span>
        </div>
      </div>

      <div className="br-img-col">
        <div
          className="br-img-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.6), transparent)",
          }}
        />
        <div
          className="br-ring"
          style={{ borderColor: "rgba(59,130,246,0.2)" }}
        />
        <img
          src="assets/images/fg_ps5.png"
          alt="PlayStation 5"
          className="br-product float-vertical"
          style={{
            maxWidth: "75%",
            maxHeight: "88%",
            filter: "drop-shadow(0 20px 60px rgba(59,130,246,0.4))",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COCA-COLA — Classic red, retro bold
   ═══════════════════════════════════════════════════════════ */
export function CokeSlide({ active, isMobile }) {
  return (
    <div className="br-slide br-flip">
      <div className="br-corner-tl" style={{ borderColor: "rgba(239,68,68,0.3)" }} />
      <div className="br-corner-br" style={{ borderColor: "rgba(239,68,68,0.3)" }} />
      <div className="br-bg-text">
        <span style={{ color: "rgba(239,68,68,0.04)" }}>OPEN HAPPINESS</span>
      </div>

      {/* Image — left (via br-flip) */}
      <div className="br-img-col">
        <div
          className="br-img-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(239,68,68,0.65), transparent)",
          }}
        />
        <img
          src="assets/images/coke_can.png"
          alt="Coca-Cola"
          className="br-product tall float-fast"
          style={{
            filter: "drop-shadow(0 24px 60px rgba(239,68,68,0.55))",
          }}
        />
      </div>

      {/* Text — right */}
      <div className="br-text-col">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="12" fill="#ef4444" />
            <text x="16" y="20" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">C</text>
          </svg>
          <div className="br-kicker" style={{ color: "#fca5a5", margin: 0, paddingBottom: 0 }}>
            Coca-Cola · Beverages · Est. 1886
          </div>
        </div>
        <div className="br-coke-wordmark">Coca-Cola</div>
        <h2 className="br-headline" style={{ fontSize: "clamp(2.3rem,5vw,5.5rem)" }}>
          Open
          <br />
          <span style={{ color: "#ef4444" }}>Happiness.</span>
        </h2>
        <p
          className="br-subline"
          style={{
            borderColor: "rgba(239,68,68,0.4)",
            color: "#fca5a5",
            background: "rgba(239,68,68,0.05)",
          }}
        >
          "Scientifically proven to make pizza
          <br />
          taste 300% better."
        </p>
        <div
          className="br-price-row"
          style={{
            background: "rgba(239,68,68,0.08)",
            borderColor: "rgba(239,68,68,0.22)",
          }}
        >
          <span className="br-price-from">12-PACK</span>
          <span className="br-price-amount">$6.99</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   APPLE — Ultra-minimal, light mode
   ═══════════════════════════════════════════════════════════ */
export function AppleSlide({ active, isMobile }) {
  return (
    <div className="br-slide">
      <div className="br-corner-tl" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
      <div className="br-corner-br" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
      <div className="br-bg-text">
        <span style={{ color: "rgba(0,0,0,0.025)", fontSize: "18vw" }}>
          APPLE
        </span>
      </div>

      <div className="br-text-col">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <path d="M16 6c0-3 2.5-4 4-4-0.2 2-2 4-4 4zm-3 3c-4 0-7 4-7 9 0 6 4 11 7 11 1 0 2-1 3-1 1 0 2 1 3 1 3 0 7-5 7-11 0-4-3-7-5-7-1.5 0-3 1-4 1s-2.5-1-4-1z" fill="#6b7280" />
          </svg>
          <div className="br-kicker" style={{ color: "#6b7280", margin: 0, paddingBottom: 0 }}>
            Apple · Technology · 2015
          </div>
        </div>
        <div
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1rem,2vw,1.6rem)",
            color: "#111",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Apple Watch Ultra
        </div>
        <h2 className="br-headline light">
          Adventure
          <br />
          <span style={{ color: "#6b7280" }}>Awaits.</span>
        </h2>
        <p className="br-subline light" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          // "Track exactly how many steps
          <br />
          you didn't take today."
        </p>
        <div className="br-price-row light">
          <span className="br-price-from" style={{ color: "#6b7280" }}>
            From
          </span>
          <span className="br-price-amount light">$799.00</span>
        </div>
      </div>

      <div className="br-img-col">
        <div
          className="br-img-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(107,114,128,0.25), transparent)",
          }}
        />
        <img
          src="https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111852_apple-watch-ultra.png"
          alt="Apple Watch Ultra"
          className="br-product float-vertical"
          onError={(e) => {
            e.target.style.display = "none";
          }}
          style={{
            filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.15))",
            maxWidth: "75%",
            maxHeight: "85%",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ON (Optimum Nutrition) — Gold standard, dark intensity
   ═══════════════════════════════════════════════════════════ */
export function OnSlide({ active, isMobile }) {
  return (
    <div className="br-slide">
      <div className="br-corner-tl" style={{ borderColor: "rgba(234,179,8,0.25)" }} />
      <div className="br-corner-br" style={{ borderColor: "rgba(234,179,8,0.25)" }} />
      <div className="br-bg-text">
        <span style={{ color: "rgba(234,179,8,0.03)", fontSize: "12vw" }}>
          GOLD STANDARD
        </span>
      </div>

      <div className="br-text-col">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect x="6" y="8" width="20" height="16" rx="3" fill="none" stroke="#10b981" strokeWidth="2.5" />
            <text x="16" y="21" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="900" fontFamily="sans-serif">ON</text>
          </svg>
          <div className="br-kicker" style={{ color: "#fbbf24", margin: 0, paddingBottom: 0 }}>
            Performance · Est. 2010
          </div>
        </div>
        <h2 className="br-headline">
          Fuel Your
          <br />
          <span style={{ color: "#eab308" }}>Greatness.</span>
        </h2>
        <p
          className="br-subline"
          style={{
            borderColor: "rgba(220,38,38,0.5)",
            color: "rgba(251,191,36,0.85)",
            background: "rgba(234,179,8,0.05)",
          }}
        >
          "For when you want to look like you lift,
          <br />
          but mostly just drink shakes."
        </p>
        <div
          className="br-price-row"
          style={{
            background: "rgba(234,179,8,0.08)",
            borderColor: "rgba(234,179,8,0.22)",
          }}
        >
          <span className="br-price-from" style={{ color: "#fbbf24" }}>
            5 LBS
          </span>
          <span className="br-price-amount">$74.99</span>
        </div>
      </div>

      <div className="br-img-col">
        <div
          className="br-img-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(234,179,8,0.55), transparent)",
          }}
        />
        <img
          src="assets/images/whey_real.png"
          alt="ON Whey Protein"
          className="br-product tall float-fast"
          style={{
            filter: "drop-shadow(0 20px 55px rgba(0,0,0,0.55))",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CETAPHIL — Clinical clean, pure hydration
   ═══════════════════════════════════════════════════════════ */
export function CetaSlide({ active, isMobile }) {
  return (
    <div className="br-slide br-flip">
      <div className="br-corner-tl" style={{ borderColor: "rgba(96,165,250,0.25)" }} />
      <div className="br-corner-br" style={{ borderColor: "rgba(96,165,250,0.25)" }} />
      <div className="br-bg-text">
        <span style={{ color: "rgba(96,165,250,0.04)", fontSize: "11vw" }}>
          PURE HYDRATION
        </span>
      </div>

      {/* Image — left (via br-flip) */}
      <div className="br-img-col">
        <div
          className="br-img-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(96,165,250,0.45), transparent)",
          }}
        />
        <img
          src="assets/images/cetaphil_real.png"
          alt="Cetaphil"
          className="br-product tall float-vertical"
          style={{
            filter: "drop-shadow(0 16px 50px rgba(0,90,156,0.3))",
          }}
        />
      </div>

      {/* Text — right */}
      <div className="br-text-col">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <path d="M16 4 C16 4 6 16 6 21 C6 26.5 10.5 29 16 29 C21.5 29 26 26.5 26 21 C26 16 16 4 16 4Z" fill="#60a5fa" opacity="0.85" />
          </svg>
          <div className="br-kicker" style={{ color: "#60a5fa", margin: 0, paddingBottom: 0 }}>
            Cetaphil · Skincare · 2022
          </div>
        </div>
        <div
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.1rem,2.2vw,1.8rem)",
            color: "#60a5fa",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Cetaphil
        </div>
        <h2 className="br-headline">
          Pure
          <br />
          <span style={{ color: "#60a5fa" }}>Hydration.</span>
        </h2>
        <p
          className="br-subline"
          style={{
            borderColor: "rgba(96,165,250,0.4)",
            color: "#93c5fd",
            background: "rgba(96,165,250,0.06)",
          }}
        >
          "Because splashing tap water on your face
          <br />
          at 3 AM isn't a skincare routine."
        </p>
        <div
          className="br-price-row"
          style={{
            background: "rgba(96,165,250,0.08)",
            borderColor: "rgba(96,165,250,0.22)",
          }}
        >
          <span className="br-price-amount">$14.50</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CARLSBERG — Golden premium, summer vibes
   ═══════════════════════════════════════════════════════════ */
export function CarlsSlide({ active, isMobile }) {
  return (
    <div className="br-slide">
      <div className="br-corner-tl" style={{ borderColor: "rgba(212,175,55,0.35)" }} />
      <div className="br-corner-br" style={{ borderColor: "rgba(212,175,55,0.35)" }} />
      <div className="br-bg-text">
        <span style={{ color: "rgba(212,175,55,0.04)" }}>PROBABLY THE BEST</span>
      </div>

      <div className="br-text-col">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <path d="M6 22 L10 10 L16 16 L22 10 L26 22 Z" fill="#D4AF37" opacity="0.9" />
            <circle cx="16" cy="24" r="3" fill="#D4AF37" />
          </svg>
          <div className="br-kicker" style={{ color: "#fbbf24", margin: 0, paddingBottom: 0 }}>
            Carlsberg · Beverages · Est. 1847
          </div>
        </div>
        <div
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: "clamp(1.5rem,3vw,2.6rem)",
            color: "#D4AF37",
            textShadow: "0 0 30px rgba(212,175,55,0.45)",
            lineHeight: 1,
          }}
        >
          Carlsberg
        </div>
        <h2 className="br-headline">
          Summer
          <br />
          <span style={{ color: "#D4AF37" }}>Vibes.</span>
        </h2>
        <p
          className="br-subline"
          style={{
            borderColor: "rgba(212,175,55,0.4)",
            color: "#fde68a",
            background: "rgba(212,175,55,0.06)",
          }}
        >
          "Probably the best excuse to skip
          <br />
          the gym today."
        </p>
        <div
          className="br-price-row"
          style={{
            background: "rgba(212,175,55,0.08)",
            borderColor: "rgba(212,175,55,0.28)",
          }}
        >
          <span className="br-price-from">6-PACK</span>
          <span className="br-price-amount">$12.99</span>
        </div>
      </div>

      <div className="br-img-col" style={{ alignItems: "flex-end" }}>
        <div
          className="br-img-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.6), transparent)",
          }}
        />
        <img
          src="assets/images/carlsberg_real.png"
          alt="Carlsberg"
          className="br-product tall float-fast"
          style={{
            maxHeight: "96%",
            filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.75))",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BMW — Luxury dark, precision engineering
   ═══════════════════════════════════════════════════════════ */
export function BMWSlide({ active, isMobile }) {
  return (
    <div className="br-slide">
      <div className="br-corner-tl" style={{ borderColor: "rgba(96,165,250,0.22)" }} />
      <div className="br-corner-br" style={{ borderColor: "rgba(96,165,250,0.22)" }} />
      <div className="br-bg-text">
        <span style={{ color: "rgba(59,130,246,0.03)", fontSize: "20vw" }}>
          BMW
        </span>
      </div>
      {/* Diagonal shimmer overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, transparent 40%, rgba(0,102,204,0.05) 50%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="br-text-col">
        <div className="br-bmw-badge">
          <svg width="46" height="46" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="3"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
            />
            <path d="M50 10 L50 50 L10 50" fill="#0066CC" />
            <path d="M50 50 L50 90 L90 50" fill="#0066CC" />
            <path d="M50 10 L50 50 L90 50" fill="rgba(255,255,255,0.9)" />
            <path d="M50 50 L50 90 L10 50" fill="rgba(255,255,255,0.9)" />
          </svg>
          <div>
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                color: "#fff",
                fontSize: "1.15rem",
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              BMW
            </div>
            <div
              className="br-kicker"
              style={{ color: "#60a5fa", letterSpacing: "0.35em" }}
            >
              M SERIES
            </div>
          </div>
        </div>
        <h2 className="br-headline">
          Born To
          <br />
          <span
            style={{
              background: "linear-gradient(135deg,#60a5fa,#a78bfa,#3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Dominate.
          </span>
        </h2>
        <p
          className="br-subline"
          style={{
            borderColor: "rgba(59,130,246,0.4)",
            color: "#93c5fd",
            background: "rgba(59,130,246,0.06)",
          }}
        >
          "0–60 in 3.2s. Your student loan?
          <br />
          0–crippling in 3.2 semesters."
        </p>
        <div
          className="br-price-row"
          style={{
            background: "rgba(59,130,246,0.08)",
            borderColor: "rgba(59,130,246,0.22)",
          }}
        >
          <span className="br-price-from" style={{ color: "#93c5fd" }}>
            STARTING
          </span>
          <span className="br-price-amount">$142,000</span>
        </div>
      </div>

      <div className="br-img-col" style={{ alignItems: "flex-end", paddingBottom: "3%" }}>
        <div
          className="br-img-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.5), transparent)",
            bottom: "-25%",
            top: "auto",
          }}
        />
        <img
          src="assets/images/bmw_car.png"
          alt="BMW M Series"
          className="br-product wide float-fast"
          style={{
            filter: "drop-shadow(0 20px 60px rgba(0,100,255,0.4))",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NVIDIA — Neon green, raw GPU power
   ═══════════════════════════════════════════════════════════ */
export function NvidiaSlide({ active, isMobile }) {
  const specs = [
    "21,760 CUDA CORES · BLACKWELL",
    "32GB GDDR7 · 1792-BIT BUS",
    "4K 240FPS · DLSS 4 · RAY TRACING",
    "575W TDP · LIQUID COOLED READY",
  ];

  return (
    <div className="br-slide">
      <div className="br-corner-tl" style={{ borderColor: "rgba(118,185,0,0.4)" }} />
      <div className="br-corner-br" style={{ borderColor: "rgba(118,185,0,0.4)" }} />
      <div className="br-bg-text">
        <span style={{ color: "rgba(118,185,0,0.03)", fontSize: "16vw" }}>
          RTX 5090
        </span>
      </div>
      {/* Matrix-style scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(118,185,0,0.012) 3px, rgba(118,185,0,0.012) 4px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Diagonal accent beam */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, transparent 30%, rgba(118,185,0,0.04) 45%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="br-text-col">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* NVIDIA GPU logo */}
          <svg width="42" height="42" viewBox="0 0 32 32">
            <rect x="7" y="7" width="18" height="18" rx="3" fill="#76B900" opacity="0.9" />
            <rect x="11" y="11" width="10" height="10" rx="1.5" fill="#0a0a0a" />
            <text x="16" y="19" textAnchor="middle" fill="#76B900" fontSize="7" fontWeight="900" fontFamily="sans-serif">N</text>
            <rect x="4" y="12" width="3" height="2" rx="0.5" fill="#76B900" opacity="0.7" />
            <rect x="4" y="18" width="3" height="2" rx="0.5" fill="#76B900" opacity="0.7" />
            <rect x="25" y="12" width="3" height="2" rx="0.5" fill="#76B900" opacity="0.7" />
            <rect x="25" y="18" width="3" height="2" rx="0.5" fill="#76B900" opacity="0.7" />
            <rect x="12" y="4" width="2" height="3" rx="0.5" fill="#76B900" opacity="0.7" />
            <rect x="18" y="4" width="2" height="3" rx="0.5" fill="#76B900" opacity="0.7" />
            <rect x="12" y="25" width="2" height="3" rx="0.5" fill="#76B900" opacity="0.7" />
            <rect x="18" y="25" width="2" height="3" rx="0.5" fill="#76B900" opacity="0.7" />
          </svg>
          <div>
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                color: "#fff",
                fontSize: "1.3rem",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "0.08em",
              }}
            >
              NVIDIA
            </div>
            <div
              className="br-kicker"
              style={{ color: "#76B900", letterSpacing: "0.3em" }}
            >
              GEFORCE RTX 5090
            </div>
          </div>
        </div>
        <h2 className="br-headline">
          Beyond
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #76B900, #a4e335, #76B900)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Real-Time.
          </span>
        </h2>
        <p
          className="br-subline"
          style={{
            borderColor: "rgba(118,185,0,0.5)",
            color: "rgba(166,227,53,0.9)",
            background: "rgba(118,185,0,0.06)",
          }}
        >
          // "Your electricity bill called.
          <br />
          It filed for emotional damage."
        </p>
        {!isMobile && (
          <div className="br-spec-list">
            {specs.map((s) => (
              <div key={s} className="br-spec-item">
                <div
                  className="br-spec-dot"
                  style={{
                    background: "#76B900",
                    boxShadow: "0 0 8px #76B900, 0 0 16px rgba(118,185,0,0.3)",
                  }}
                />
                {s}
              </div>
            ))}
          </div>
        )}
        <div
          className="br-price-row"
          style={{
            background: "rgba(118,185,0,0.1)",
            borderColor: "rgba(118,185,0,0.3)",
          }}
        >
          <span className="br-price-from" style={{ color: "#76B900" }}>
            MSRP
          </span>
          <span className="br-price-amount">$1,999</span>
        </div>
      </div>

      <div className="br-img-col">
        <div
          className="br-img-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(118,185,0,0.55), rgba(74,122,0,0.2), transparent)",
          }}
        />
        <div
          className="br-ring"
          style={{ borderColor: "rgba(118,185,0,0.18)" }}
        />
        <img
          src="assets/images/nvidia_gpu.png"
          alt="NVIDIA GeForce RTX 5090"
          className="br-product float-vertical"
          style={{
            maxWidth: "92%",
            maxHeight: "82%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 25px 60px rgba(118,185,0,0.5)) drop-shadow(0 0 30px rgba(118,185,0,0.2))",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GTA VI — Neon Miami, cinematic chaos
   ═══════════════════════════════════════════════════════════ */
export function GTA6Slide({ active, isMobile }) {
  const stats = [
    { n: "170M+", l: "Sold" },
    { n: "$2B+", l: "Day-1" },
    { n: "∞", l: "Chaos" },
  ];

  return (
    <div className="br-slide">
      <div className="br-neon-bar top" />
      <div className="br-neon-bar bottom" />
      <div className="br-bg-text">
        <span style={{ color: "rgba(255,110,30,0.04)", fontSize: "16vw" }}>
          VICE CITY
        </span>
      </div>

      <div className="br-text-col">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <polygon points="16,3 19.5,12 29,12 21.5,18 24,27 16,22 8,27 10.5,18 3,12 12.5,12" fill="#f59e0b" opacity="0.9" />
          </svg>
          <div
            className="br-kicker"
            style={{ color: "rgba(255,80,30,0.9)", letterSpacing: "0.3em", margin: 0, paddingBottom: 0 }}
          >
            ROCKSTAR GAMES · ENTERTAINMENT · 2025
          </div>
        </div>
        <img
          src="assets/images/gta6.png"
          alt="GTA VI"
          onError={(e) => (e.target.style.display = "none")}
          style={{
            width: "auto",
            height: "clamp(48px,9vw,100px)",
            objectFit: "contain",
            filter: "drop-shadow(0 0 20px rgba(255,110,30,0.65))",
          }}
        />
        <div
          className="br-kicker"
          style={{ color: "rgba(255,80,30,0.9)", letterSpacing: "0.45em" }}
        >
          ◈ COMING 2025 ◈
        </div>
        <p
          className="br-subline"
          style={{
            borderColor: "rgba(255,110,30,0.4)",
            color: "rgba(255,140,80,0.9)",
            background: "rgba(255,110,30,0.05)",
          }}
        >
          // "Finally — a game that lets you simulate crime,
          <br />
          traffic jams & moral bankruptcy at 60fps."
        </p>

        {/* Stats */}
        <div className="br-stats-row">
          {stats.map((s, i) => (
            <React.Fragment key={s.n}>
              {i > 0 && <div className="br-stat-divider" />}
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span className="br-stat-val" style={{ color: "#FF6E1E" }}>
                  {s.n}
                </span>
                <span className="br-stat-lbl">{s.l}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "linear-gradient(135deg, #FF6E1E, #FF3E8A)",
            color: "#fff",
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "11px 28px",
            borderRadius: 4,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 30px rgba(255,110,30,0.4)",
            width: "fit-content",
          }}
        >
          🎮 Pre-Book Now
        </button>
      </div>

      {/* Disc */}
      <div className="br-img-col" style={{ flexDirection: "column", gap: "0.75rem" }}>
        <div
          className="br-img-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(255,110,30,0.5), rgba(255,62,138,0.3), transparent)",
          }}
        />
        <div className="br-disc-wrap">
          <div
            className="br-disc-glow"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,110,30,0.22), transparent)",
            }}
          />
          <img
            src="/assets/images/cd.png"
            alt="GTA 6 Disc"
            className="br-disc-img"
            style={{
              filter:
                "drop-shadow(0 0 30px rgba(255,110,30,0.65)) drop-shadow(0 0 60px rgba(255,60,130,0.3))",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.35em",
            color: "rgba(255,80,30,0.9)",
            textTransform: "uppercase",
          }}
        >
          ▶ PHYSICAL EDITION ◀
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   INSECONDS ULTRA — SaaS, modern dark red
   ═══════════════════════════════════════════════════════════ */
export function InSecondsSlide({ active, isMobile }) {
  return (
    <div className="br-slide">
      <div className="br-corner-tl" style={{ borderColor: "rgba(238,63,44,0.35)" }} />
      <div className="br-corner-br" style={{ borderColor: "rgba(238,63,44,0.35)" }} />
      <div className="br-bg-text">
        <span style={{ color: "rgba(238,63,44,0.03)", fontSize: "16vw" }}>
          ULTRA
        </span>
      </div>

      <div className="br-text-col">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
          <div style={{ padding: "4px 8px", background: "#EE3F2C", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, borderRadius: "4px", fontSize: "10px" }}>IS</div>
          <div className="br-kicker" style={{ color: "#fca5a5", margin: 0, paddingBottom: 0 }}>
            InSeconds · Software · 2026
          </div>
        </div>
        <div className="br-coke-wordmark" style={{ fontSize: "2rem", fontFamily: "'Space Grotesk', sans-serif", color: "#EE3F2C", letterSpacing: "-0.04em", fontWeight: 900 }}>InSeconds Ultra</div>
        <h2 className="br-headline">
          Ship
          <br />
          <span style={{ color: "#EE3F2C" }}>Faster.</span>
        </h2>
        <p
          className="br-subline"
          style={{
            borderColor: "rgba(238,63,44,0.4)",
            color: "#fca5a5",
            background: "rgba(238,63,44,0.05)",
          }}
        >
          // "A fully automated cold-email operating system.
          <br />
          Don't work hard, let the algorithms work hard."
        </p>
        <div
          className="br-price-row"
          style={{
            background: "rgba(238,63,44,0.08)",
            borderColor: "rgba(238,63,44,0.22)",
          }}
        >
          <span className="br-price-from">STARTING</span>
          <span className="br-price-amount">₹800/mo</span>
        </div>
        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "linear-gradient(135deg, #EE3F2C, #FF3E8A)",
            color: "#fff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "11px 28px",
            borderRadius: 4,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 30px rgba(238,63,44,0.4)",
            width: "fit-content",
            marginTop: "20px"
          }}
          onClick={() => window.location.href = "/inseconds"}
        >
          🚀 Buy Now
        </button>
      </div>

      <div className="br-img-col">
        <div
          className="br-img-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(238,63,44,0.45), transparent)",
          }}
        />
        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: "340px",
          aspectRatio: "4/5",
          background: "linear-gradient(180deg, #110808 0%, #050202 100%)",
          border: "1px solid rgba(238,63,44,0.3)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 50px rgba(238,63,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
          transform: "rotate(-2deg)",
          transformOrigin: "bottom right"
        }} className="br-product float-fast">
          {/* Mac-style Window Top Bar */}
          <div style={{
            padding: "12px 16px",
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{ display: "flex", gap: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
            </div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px", fontFamily: "monospace", letterSpacing: "1px" }}>IS-ULTRA_V5.0</div>
          </div>
          {/* Content Area */}
          <div style={{ position: "relative", height: "calc(100% - 35px)", width: "100%" }}>
            <img
              src="/assets/images/portrait.png"
              alt="Hridyansh Portrait in UI"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "contrast(1.05) saturate(1.1) brightness(0.9)",
              }}
            />
            {/* Animated Scanning Line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg, transparent, #EE3F2C, transparent)",
              boxShadow: "0 0 10px #EE3F2C",
              opacity: 0.7,
            }} className="is-scan-line" />
            <style>{`
              @keyframes is-scan { 0% { top: 0%; opacity: 0; } 10% { opacity: 0.8; } 90% { opacity: 0.8; } 100% { top: 100%; opacity: 0; } }
              .is-scan-line { animation: is-scan 4s linear infinite; }
            `}</style>
            
            {/* Lower UI Floating Panel */}
            <div style={{
              position: "absolute", bottom: "16px", left: "16px", right: "16px",
              background: "rgba(10,5,5,0.75)",
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid rgba(238,63,44,0.3)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              display: "flex", flexDirection: "column", gap: "8px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "28px", height: "28px", background: "#EE3F2C",
                    borderRadius: "6px", display: "grid", placeItems: "center",
                    color: "#fff", fontSize: "11px", fontWeight: 900,
                    boxShadow: "0 0 10px rgba(238,63,44,0.5)"
                  }}>IS</div>
                  <div>
                    <div style={{ color: "#fff", fontSize: "13px", fontWeight: "bold", fontFamily: "'Space Grotesk', sans-serif" }}>System Active</div>
                    <div style={{ color: "#fca5a5", fontSize: "9px", fontFamily: "monospace", textTransform: "uppercase" }}>Auth: Verified</div>
                  </div>
                </div>
                <div style={{ color: "#EE3F2C", fontSize: "14px", fontWeight: 900, textShadow: "0 0 10px rgba(238,63,44,0.5)" }}>100%</div>
              </div>
              <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ width: "100%", height: "100%", background: "#EE3F2C" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   AGENCY (CONTACT) — Intellectual, sarcastic, premium
   ═══════════════════════════════════════════════════════════ */
export function AgencySlide({ active, isMobile }) {
  return (
    <div className="br-slide" style={{ overflow: "hidden" }}>
      {/* Premium animated background */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: "hidden", pointerEvents: 'none' }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 20%, rgba(67, 56, 202, 0.25), transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(236, 72, 153, 0.25), transparent 50%)", animation: "is-pulse-glow 8s infinite alternate" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)' }} />
      </div>

      <div className="br-corner-tl" style={{ borderColor: "rgba(255,255,255,0.2)", zIndex: 1 }} />
      <div className="br-corner-br" style={{ borderColor: "rgba(255,255,255,0.2)", zIndex: 1 }} />
      <div className="br-bg-text" style={{ zIndex: 1, pointerEvents: 'none' }}>
        <span style={{ color: "rgba(255,255,255,0.02)", fontSize: "16vw", fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif" }}>
          FORGE
        </span>
      </div>

      <div className="br-text-col" style={{ zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
          <div style={{ padding: "4px 8px", background: "#fff", color: "#000", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, borderRadius: "4px", fontSize: "10px", letterSpacing: "1px" }}>AVAILABLE</div>
          <div className="br-kicker" style={{ color: "#a1a1aa", margin: 0, paddingBottom: 0 }}>
            Hridyansh Dwivedi · Digital Architect
          </div>
        </div>
        <h2 className="br-headline" style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)", lineHeight: 0.9 }}>
          Digital Mediocrity<br/>
          <span style={{ color: "#a855f7", fontStyle: "italic", fontFamily: "'Instrument Serif', serif" }}>is a choice.</span>
        </h2>
        
        <p
          className="br-subline"
          style={{
            borderColor: "rgba(168, 85, 247, 0.3)",
            color: "#e4e4e7",
            background: "rgba(168, 85, 247, 0.05)",
            maxWidth: "500px",
            fontSize: "15px",
            lineHeight: 1.6,
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)"
          }}
        >
          Stop losing clients to competitors with better taste. I design and engineer premium web experiences that look expensive and convert aggressively. 
          <br/><br/>
          <strong style={{ color: "#fff", fontWeight: 600 }}>We don't make it pretty. We build weapons.</strong>
        </p>
        
        <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <a href="mailto:mannathridyanshdwivedi85@gmail.com" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", background: "#fff", color: "#000",
            borderRadius: "6px", textDecoration: "none",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "14px",
            transition: "all 0.2s", boxShadow: "0 4px 14px rgba(255,255,255,0.25)"
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            Email Me
          </a>
          <a href="https://in.linkedin.com/in/hridyanshd85" target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", background: "rgba(255,255,255,0.05)", color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
            borderRadius: "6px", textDecoration: "none",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "14px",
            transition: "all 0.2s"
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            LinkedIn
          </a>
          <a href="https://wa.me/916393973524" target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", background: "rgba(255,255,255,0.05)", color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
            borderRadius: "6px", textDecoration: "none",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "14px",
            transition: "all 0.2s"
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            WhatsApp
          </a>
          <a href="https://www.instagram.com/hridyansh__D/" target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", background: "rgba(255,255,255,0.05)", color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
            borderRadius: "6px", textDecoration: "none",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "14px",
            transition: "all 0.2s"
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            Instagram
          </a>
        </div>
      </div>

      <div className="br-img-col" style={{ zIndex: 2 }}>
        {/* Services Glass Panel */}
        <div style={{
          background: "rgba(20, 20, 25, 0.6)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px",
          padding: "32px", width: "100%", maxWidth: "420px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
          display: "flex", flexDirection: "column", gap: "24px",
          transform: "rotate(1deg)"
        }}>
          <div>
            <div style={{ fontSize: "12px", fontFamily: "monospace", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "20px" }}>Services Arsenal</div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { title: "Architectural Web Design", desc: "For those who realize template sites are business suicide.", icon: "💎" },
                { title: "Psychological Ad Creatives", desc: "High-ROI assets designed to manipulate... I mean, influence.", icon: "🧠" },
                { title: "E-Commerce Dominance", desc: "Showcases that make your products look like they belong in a museum.", icon: "🏛️" },
                { title: "Luxury UI/UX Engineering", desc: "Interfaces so smooth they should be illegal.", icon: "⚡" }
              ].map((srv, index) => (
                <div key={srv.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start", paddingBottom: index === 3 ? "0" : "16px", borderBottom: index === 3 ? "none" : "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: "18px", display: "grid", placeItems: "center", width: "36px", height: "36px", background: "rgba(168, 85, 247, 0.1)", borderRadius: "8px", border: "1px solid rgba(168, 85, 247, 0.2)", flexShrink: 0 }}>
                    {srv.icon}
                  </div>
                  <div>
                    <div style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>{srv.title}</div>
                    <div style={{ color: "#a1a1aa", fontSize: "13px", lineHeight: 1.4 }}>{srv.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "16px", borderTop: "1px dashed rgba(255,255,255,0.1)" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981", animation: "is-pulse-glow 2s infinite" }} />
              <div style={{ fontSize: "11px", color: "#10b981", fontFamily: "monospace", textTransform: "uppercase" }}>Accepting Projects</div>
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>SEC_004</div>
          </div>
        </div>
      </div>
    </div>
  );
}
