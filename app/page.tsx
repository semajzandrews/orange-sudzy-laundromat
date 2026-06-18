"use client";

import { useEffect, useRef, useState } from "react";

// Sudzy — clean professional site: real top nav, one cinematic hero, smooth scroll.
const VID_HERO = "https://videos.pexels.com/video-files/4119968/4119968-hd_1920_1080_30fps.mp4";
const RED = "#c8332a", PAPER = "#f3ede1", STEEL = "#9aa3a7";
const PHONE = "(862) 252-7784", TEL = "+18622527784", ADDR = "51 Main St, City of Orange, NJ 07050";
const px = (id: number, w = 1000) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const LEVELS = ["", "Quiet", "Easy", "Steady", "Busy", "Packed"];
function busyness(day: number, hour: number) {
  let l = hour < 9 ? 1 : hour < 11 ? 2 : hour < 15 ? 3 : hour < 17 ? 2 : hour < 21 ? 4 : 3;
  if (day === 0 || day === 6) l += 1;
  if (day === 6 && hour >= 11 && hour <= 16) l = 5;
  return Math.max(1, Math.min(5, l));
}

export default function Page() {
  const [now, setNow] = useState<Date | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60000);
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.15 });
    root.current?.querySelectorAll(".fade").forEach((el) => io.observe(el));
    return () => { clearInterval(t); window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);
  const day = now?.getDay() ?? 2, hour = now?.getHours() ?? 9;
  const open = hour >= 6 && hour < 23, lvl = busyness(day, hour);

  return (
    <div ref={root}>
      {/* NAV — real top bar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "background .3s, border-color .3s",
        background: scrolled ? "rgba(14,11,10,0.85)" : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(243,237,225,0.1)" : "transparent"}` }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
          <a href="#top" className="fat" style={{ fontSize: 22, letterSpacing: "-0.02em", textDecoration: "none", color: PAPER }}>SUDZY</a>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <div className="navlinks">
              <a href="#services" className="mono" style={{ fontSize: 12, color: STEEL, textDecoration: "none", letterSpacing: "0.08em" }}>SERVICES</a>
              <a href="#busy" className="mono" style={{ fontSize: 12, color: STEEL, textDecoration: "none", letterSpacing: "0.08em" }}>BEST TIME</a>
              <a href="#visit" className="mono" style={{ fontSize: 12, color: STEEL, textDecoration: "none", letterSpacing: "0.08em" }}>VISIT</a>
            </div>
            <a href={`tel:${TEL}`} className="btn btn-solid" style={{ padding: "9px 18px", fontSize: 13 }}>Call</a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* HERO — one calm cinematic video */}
        <section style={{ position: "relative", height: "100svh", minHeight: 560, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
          <div className="shot" style={{ position: "absolute", inset: 0 }}>
            <video autoPlay muted loop playsInline poster={px(4700611, 1200)} style={{ height: "100%", width: "100%", objectFit: "cover" }}>
              <source src={VID_HERO} type="video/mp4" />
            </video>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(14,11,10,0.35) 0%, rgba(14,11,10,0.05) 40%, rgba(14,11,10,0.9) 100%)" }} />
          </div>
          <div className="wrap" style={{ position: "relative", paddingBottom: "clamp(48px,9vw,96px)" }}>
            <p className="eyebrow" style={{ color: "rgba(243,237,225,0.8)", marginBottom: 16 }}>City of Orange, NJ · Open since 2010</p>
            <h1 className="fat" style={{ fontSize: "clamp(3rem,12vw,7rem)", margin: 0, maxWidth: "12ch", color: PAPER }}>
              The cleanest corner on <span style={{ color: RED }}>Main St.</span>
            </h1>
            <p style={{ color: PAPER, opacity: 0.82, fontSize: "clamp(1rem,4vw,1.2rem)", maxWidth: 440, margin: "22px 0 30px", lineHeight: 1.55 }}>
              Self-service wash &amp; dry, plus wash-and-fold by the pound. Open early, open late, seven days a week.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={`tel:${TEL}`} className="btn btn-solid">Call {PHONE}</a>
              <a href="#busy" className="btn btn-line">When&apos;s it quiet?</a>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section" style={{ background: "var(--ink-2)" }}>
          <div className="wrap">
            <p className="eyebrow fade" style={{ marginBottom: 14 }}>What we do</p>
            <h2 className="display fade" style={{ fontSize: "clamp(2rem,7vw,3.2rem)", margin: "0 0 44px" }}>Three ways to get it clean.</h2>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,280px),1fr))" }}>
              {([
                { img: 4700411, t: "Self-service wash & dry", d: "Big Huebsch & Wascomat front-loaders. Clean machines, well kept.", tag: "$3–$10 / load" },
                { img: 4049148, t: "Wash, weigh & fold", d: "Drop it on the scale and walk away. We wash, dry and fold it by the pound.", tag: "95¢ / lb · 15 lb min" },
                { card: true, t: "Sudzy smart-card", d: "One tap runs every machine, no quarters to chase.", tag: "Load $20, get $5 free" },
              ] as Array<{ img?: number; card?: boolean; t: string; d: string; tag: string }>).map((c, i) => (
                <div key={c.t} className="fade" style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(243,237,225,0.1)", transitionDelay: `${i * 80}ms` }}>
                  {c.card ? (
                    <div style={{ aspectRatio: "16/11", display: "grid", placeItems: "center", background: "radial-gradient(120% 100% at 50% 0%, #1c1714, #0e0b0a)" }}>
                      <div style={{ width: "78%", aspectRatio: "1.586", borderRadius: 12, background: "linear-gradient(135deg, #c8332a, #7a160f)", boxShadow: "0 16px 40px -12px rgba(200,51,42,0.55)", padding: "15px 17px", display: "flex", flexDirection: "column", justifyContent: "space-between", color: PAPER }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="fat" style={{ fontSize: 17 }}>SUDZY</span>
                          <span className="mono" style={{ fontSize: 8, letterSpacing: "0.22em", opacity: 0.85 }}>VALUE CARD</span>
                        </div>
                        <div style={{ width: 32, height: 23, borderRadius: 4, background: "linear-gradient(135deg, #efe1ad, #c8a24a)" }} />
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", opacity: 0.92 }}>•••• 7784</span>
                          <span className="display" style={{ fontSize: 15 }}>$20 → $25</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="shot" style={{ aspectRatio: "16/11" }}><img src={px(c.img!, 800)} alt={c.t} loading="lazy" /></div>
                  )}
                  <div style={{ padding: "22px 22px 26px" }}>
                    <h3 className="display" style={{ fontSize: 23, margin: "0 0 10px" }}>{c.t}</h3>
                    <p style={{ color: STEEL, lineHeight: 1.55, fontSize: 15, margin: "0 0 16px" }}>{c.d}</p>
                    <span className="mono" style={{ fontSize: 12, color: PAPER, border: "1px solid rgba(243,237,225,0.18)", padding: "6px 12px", borderRadius: 6 }}>{c.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BEST TIME */}
        <section id="busy" className="section">
          <div className="wrap">
            <p className="eyebrow fade" style={{ marginBottom: 14 }}>Best time to come</p>
            <h2 className="display fade" style={{ fontSize: "clamp(2rem,7vw,3.2rem)", margin: "0 0 8px" }}>
              Always busy. <span style={{ color: RED }}>Beat the crowd.</span>
            </h2>
            <p className="fade" style={{ color: STEEL, maxWidth: 460, lineHeight: 1.6, margin: "0 0 34px" }}>
              Come on a weekday morning and you&apos;ll have your pick of machines. Here&apos;s how {now ? "today" : "a day"} usually fills up.
            </p>
            <div className="fade" style={{ border: "1px solid rgba(243,237,225,0.1)", borderRadius: 16, padding: "26px 22px", background: "var(--ink-2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
                <div className="display" style={{ fontSize: 28 }}>
                  {open ? <>{LEVELS[lvl]} <span className="mono" style={{ color: STEEL, fontSize: 15 }}>right now</span></> : <span className="mono" style={{ color: STEEL, fontSize: 16 }}>Closed · opens 6 AM</span>}
                </div>
                <span className="mono" style={{ fontSize: 12, color: RED }}>calmest: weekday mornings</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "2.5%", height: 140 }}>
                {Array.from({ length: 17 }, (_, i) => 6 + i).map((h) => {
                  const v = busyness(day, h), isNow = open && h === hour;
                  return (
                    <div key={h} style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", gap: 7 }}>
                      <div style={{ width: "100%", height: `${18 + v * 20}px`, borderRadius: 4, background: isNow ? RED : "rgba(243,237,225,0.16)", boxShadow: isNow ? `0 0 14px ${RED}` : "none" }} />
                      {h % 3 === 0 && <span className="mono" style={{ fontSize: 9, color: STEEL }}>{((h + 11) % 12) + 1}{h >= 12 ? "PM" : "AM"}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="section" style={{ background: "var(--ink-2)" }}>
          <div className="wrap">
            <p className="eyebrow fade" style={{ marginBottom: 28 }}>From the neighborhood</p>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,260px),1fr))" }}>
              {[
                { q: "Clean and well kept. Try to go when it's not too busy for a better experience.", a: "Google review" },
                { q: "Clean machines… if you think positive, then positive results will happen!", a: "Yanisa D." },
                { q: "Always busy. Early morning is best.", a: "Google review" },
              ].map((r, i) => (
                <figure key={i} className="fade" style={{ margin: 0, border: "1px solid rgba(243,237,225,0.1)", borderRadius: 14, padding: "26px 22px", transitionDelay: `${i * 80}ms` }}>
                  <blockquote className="display" style={{ margin: 0, fontSize: 19, lineHeight: 1.4, fontWeight: 500 }}>&ldquo;{r.q}&rdquo;</blockquote>
                  <figcaption className="mono" style={{ fontSize: 11, color: STEEL, marginTop: 16, letterSpacing: "0.1em" }}>— {r.a}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* VISIT */}
        <section id="visit" className="section">
          <div className="wrap" style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px),1fr))", alignItems: "center" }}>
            <div className="fade">
              <p className="eyebrow" style={{ marginBottom: 14 }}>Visit</p>
              <h2 className="display" style={{ fontSize: "clamp(2rem,7vw,3rem)", margin: "0 0 16px" }}>51 Main Street,<br />City of Orange.</h2>
              <p style={{ color: STEEL, lineHeight: 1.7, margin: "0 0 4px" }}>Open 7 days · 6 AM – 11 PM</p>
              <p style={{ color: STEEL, lineHeight: 1.7, margin: "0 0 24px" }}>Plenty of carts, folding space, and a place to wait.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={`tel:${TEL}`} className="btn btn-solid">Call {PHONE}</a>
                <a href={`https://www.google.com/maps?q=${encodeURIComponent(ADDR)}`} target="_blank" rel="noreferrer" className="btn btn-line">Directions</a>
              </div>
            </div>
            <div className="fade shot" style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(243,237,225,0.12)", aspectRatio: "4/3" }}>
              <iframe title={`Sudzy — ${ADDR}`} width="100%" height="100%" loading="lazy" style={{ border: 0, display: "block" }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(ADDR)}&z=15&output=embed`} referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid rgba(243,237,225,0.1)", padding: "48px 0 40px", background: "#0b0908" }}>
          <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div className="fat" style={{ fontSize: 30, color: PAPER }}>SUDZY</div>
              <p style={{ color: STEEL, margin: "10px 0 0", lineHeight: 1.7, fontSize: 14 }}>{ADDR}<br />{PHONE} · Open 6 AM – 11 PM daily</p>
            </div>
            <a href="https://bysemaj.com" target="_blank" rel="noreferrer" className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: STEEL, textDecoration: "none" }}>built by bysemaj.com</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
