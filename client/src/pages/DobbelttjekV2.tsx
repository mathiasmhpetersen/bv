import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Phone,
  Shield,
  Star,
  TrendingDown,
  Calculator,
  PiggyBank,
  FileCheck,
  HandCoins,
  Sparkles,
  ArrowRight,
  MapPin,
  BadgePercent,
} from "lucide-react";

// ─── Brand Assets ────────────────────────────────────────────────
const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/hero-house-heatpump-ihVZgyscJpE8VmEuqigtXu.webp",
  heatpump:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/heatpump-closeup-7ha7wnuAVACjRiB85e2Vdj.webp",
  family:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/happy-family-home-BroX8spFkM8eBq3b8GQzRm.webp",
};

const C = {
  blue: "#2e8bcb",
  blueDark: "#1a5f8a",
  blueLight: "#e8f4fc",
  orange: "#FF9500",
  orangeLight: "#fff8ee",
  green: "#2e9958",
  greenLight: "#eaf7ef",
  greenDark: "#1e6b3d",
  navy: "#0f1b33",
  dark: "#1a1a2e",
  gray: "#5a6b7d",
  grayLight: "#f5f8fb",
  cream: "#fdfaf4",
  white: "#ffffff",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

// ─── FAQ ─────────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    q: "Hvor præcist er jeres pristjek?",
    a: "Vi baserer vores estimat på din bolig, dit varmebehov og aktuelle markedspriser fra Panasonic, Bosch og Metro Therm. I 9 ud af 10 tilfælde rammer vi inden for ±5% af den endelige pris.",
  },
  {
    q: "Koster det noget at få pristjekket?",
    a: "Nej. Pristjekket er 100% gratis og helt uforpligtende. Du skal ikke betale eller binde dig til noget.",
  },
  {
    q: "Hvor hurtigt får jeg svar?",
    a: "Du får dit skræddersyede pristjek inden for 24 timer. På hverdage er vi typisk tilbage samme dag.",
  },
  {
    q: "Hvad hvis jeg allerede har skrevet under?",
    a: "Så længe varmepumpen ikke er installeret endnu, har du 14 dages fortrydelsesret i mange tilfælde. Vi hjælper dig med at gennemgå dit tilbud.",
  },
  {
    q: "Kan jeg bruge min egen montør?",
    a: "Ja. Du bestemmer selv, hvem der skal installere pumpen. Vi kan også anbefale en godkendt montør i dit område, hvis du ønsker det.",
  },
  {
    q: "Hvor meget kan jeg realistisk spare?",
    a: "Vores kunder sparer typisk 30.000–60.000 kr i forhold til et samlet tilbud – afhængigt af boligstørrelse og valgt pumpe.",
  },
];

// ─── Testimonials ────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Anders Christensen",
    location: "Odense",
    quoted: 130000,
    paid: 84000,
    text: "Jeg fik et tilbud på 130.000 kr. fra et lokalt firma. Hos BilligVentilation købte jeg den samme Panasonic-pumpe og fandt selv en montør. Sparede 46.000 kr.",
    rating: 5,
  },
  {
    name: "Maria Rasmussen",
    location: "Aarhus",
    quoted: 118000,
    paid: 79000,
    text: "Fantastisk service. De hjalp mig med at finde den rigtige størrelse og satte mig i kontakt med en dygtig montør. Alt gik nemt og smertefrit.",
    rating: 5,
  },
  {
    name: "Thomas Nielsen",
    location: "Roskilde",
    quoted: 115000,
    paid: 79500,
    text: "Var skeptisk i starten, men efter at have sammenlignet priserne var valget nemt. Samme Bosch-pumpe, men 35.500 kr. billigere.",
    rating: 5,
  },
];

// ─── FAQ Item ─────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "#dce6f0" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-lg font-bold" style={{ color: C.dark }}>
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: C.green }}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-base leading-relaxed" style={{ color: C.gray }}>
          {a}
        </p>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT — Dobbelttjek V2 (Calculator-first design)
// ═══════════════════════════════════════════════════════════════════
export default function DobbelttjekV2() {
  const [quotedPrice, setQuotedPrice] = useState(120000);
  const [homeSize, setHomeSize] = useState<"small" | "medium" | "large">("medium");
  const [leadStep, setLeadStep] = useState<"input" | "submitted">("input");
  const [contact, setContact] = useState({ name: "", email: "", phone: "", postnummer: "" });

  // Simple savings estimator: our price roughly scales with home size
  const ourEstimate = useMemo(() => {
    const base = { small: 62000, medium: 74000, large: 92000 }[homeSize];
    return base;
  }, [homeSize]);

  const savings = Math.max(0, quotedPrice - ourEstimate);
  const savingsPct = quotedPrice > 0 ? Math.round((savings / quotedPrice) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("V2 Lead submitted:", { quotedPrice, homeSize, ...contact });
    setLeadStep("submitted");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream }}>
      {/* ─── Top Bar ───────────────────────────────── */}
      <div
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: "rgba(253,250,244,0.95)",
          borderColor: "#e8e0d0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <span className="text-lg font-bold tracking-tight" style={{ color: C.navy }}>
            BilligVentilation.dk
          </span>
          <div className="flex items-center gap-4">
            <span
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: C.greenLight, color: C.greenDark }}
            >
              <Sparkles className="w-3 h-3" /> Gratis pristjek
            </span>
            <a
              href="tel:+4591552277"
              className="text-sm font-bold flex items-center gap-1.5"
              style={{ color: C.green }}
            >
              <Phone className="w-4 h-4" /> 91 55 22 77
            </a>
          </div>
        </div>
      </div>

      {/* ─── HERO — Calculator First ────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(circle at 15% 20%, ${C.greenLight} 0%, transparent 50%), radial-gradient(circle at 85% 80%, ${C.blueLight} 0%, transparent 50%)`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-6"
                style={{ backgroundColor: C.greenLight, color: C.greenDark }}
              >
                <BadgePercent className="w-4 h-4" />
                Pristjek på 30 sekunder
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-6"
              style={{ color: C.navy }}
            >
              Se din besparelse{" "}
              <span
                className="relative inline-block"
                style={{ color: C.green }}
              >
                med det samme
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 2 5 Q 100 0, 198 5"
                    stroke={C.green}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                </svg>
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: C.gray }}
            >
              Indtast dit tilbud og boligstørrelse. Vi viser dig lige nu, hvor
              meget du kan spare på den samme varmepumpe hos os.
            </motion.p>
          </motion.div>

          {/* Calculator Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div
              className="rounded-3xl shadow-2xl overflow-hidden border"
              style={{ backgroundColor: C.white, borderColor: "#e8e0d0" }}
            >
              <div className="grid md:grid-cols-[1.1fr_1fr]">
                {/* Inputs */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: C.greenLight }}
                    >
                      <Calculator className="w-5 h-5" style={{ color: C.green }} />
                    </div>
                    <div>
                      <p className="font-bold text-lg" style={{ color: C.dark }}>
                        Din besparelseskalkulator
                      </p>
                      <p className="text-sm" style={{ color: C.gray }}>
                        Resultatet opdateres, når du taster
                      </p>
                    </div>
                  </div>

                  {/* Quoted price slider */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <label className="font-bold text-sm" style={{ color: C.dark }}>
                        Dit tilbud fra et andet firma
                      </label>
                      <span
                        className="text-lg font-bold"
                        style={{ color: C.navy }}
                      >
                        {quotedPrice.toLocaleString("da-DK")} kr
                      </span>
                    </div>
                    <input
                      type="range"
                      min={60000}
                      max={200000}
                      step={1000}
                      value={quotedPrice}
                      onChange={(e) => setQuotedPrice(Number(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${C.green} 0%, ${C.green} ${((quotedPrice - 60000) / 140000) * 100}%, #e5e7eb ${((quotedPrice - 60000) / 140000) * 100}%, #e5e7eb 100%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs mt-1" style={{ color: C.gray }}>
                      <span>60.000 kr</span>
                      <span>200.000 kr</span>
                    </div>
                  </div>

                  {/* Home size */}
                  <div className="mb-2">
                    <label className="font-bold text-sm block mb-3" style={{ color: C.dark }}>
                      Boligstørrelse
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: "small" as const, label: "Under 120 m²" },
                        { key: "medium" as const, label: "120–180 m²" },
                        { key: "large" as const, label: "Over 180 m²" },
                      ].map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setHomeSize(opt.key)}
                          className="py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all"
                          style={{
                            borderColor: homeSize === opt.key ? C.green : "#e0e7f1",
                            backgroundColor: homeSize === opt.key ? C.greenLight : C.white,
                            color: homeSize === opt.key ? C.greenDark : C.dark,
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results + lead */}
                <div
                  className="p-6 md:p-8 relative"
                  style={{ backgroundColor: C.navy }}
                >
                  {leadStep === "input" ? (
                    <>
                      <p
                        className="text-xs font-bold uppercase tracking-widest mb-3"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        Din estimerede besparelse
                      </p>
                      <div className="mb-5">
                        <div className="flex items-baseline gap-2">
                          <span
                            className="text-5xl md:text-6xl font-bold"
                            style={{ color: "#7ed9a0" }}
                          >
                            {savings.toLocaleString("da-DK")}
                          </span>
                          <span className="text-xl font-bold" style={{ color: C.white }}>
                            kr
                          </span>
                        </div>
                        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                          Det er {savingsPct}% under dit nuværende tilbud
                        </p>
                      </div>

                      <div
                        className="rounded-xl p-3 mb-5 flex items-center justify-between"
                        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                      >
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                          Vores pris for samme pumpe
                        </span>
                        <span className="text-sm font-bold" style={{ color: C.white }}>
                          ~{ourEstimate.toLocaleString("da-DK")} kr
                        </span>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-2.5">
                        <input
                          type="email"
                          placeholder="Din email"
                          value={contact.email}
                          onChange={(e) => setContact({ ...contact, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.95)",
                            color: C.dark,
                          }}
                          required
                        />
                        <input
                          type="tel"
                          placeholder="Telefonnummer"
                          value={contact.phone}
                          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.95)",
                            color: C.dark,
                          }}
                          required
                        />
                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-xl font-bold text-base transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                          style={{ backgroundColor: C.orange, color: C.white }}
                        >
                          Send mit skræddersyede pristjek
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>

                      <p
                        className="text-xs text-center mt-3"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        Uforpligtende · Svar inden for 24 timer
                      </p>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-8">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: C.green }}
                      >
                        <CheckCircle2 className="w-8 h-8" style={{ color: C.white }} />
                      </div>
                      <h3
                        className="text-2xl font-bold mb-2"
                        style={{ color: C.white }}
                      >
                        Tak!
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.8)" }}>
                        Vi sender dit pristjek med en besparelse på ca.{" "}
                        <span className="font-bold" style={{ color: "#7ed9a0" }}>
                          {savings.toLocaleString("da-DK")} kr
                        </span>{" "}
                        inden for 24 timer.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Trust row below calculator */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold" style={{ color: C.gray }}>
                  10.000+ kunder
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: C.orange }} />
                ))}
                <span className="text-sm font-bold ml-1" style={{ color: C.gray }}>
                  4.7/5
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" style={{ color: C.green }} />
                <span className="text-sm font-bold" style={{ color: C.gray }}>
                  3–5 års garanti
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── What You Get ────────────────────────────────────────── */}
      <section className="py-20 md:py-24" style={{ backgroundColor: C.white }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: C.green }}
            >
              Hvad du får
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.navy }}
            >
              Tre ting, du modtager med dit pristjek
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <FileCheck className="w-6 h-6" />,
                title: "Detaljeret prissammenligning",
                desc: "Dit tilbud holdt op mod vores markedspris – med en forklaring på, hvor forskellen ligger.",
              },
              {
                icon: <HandCoins className="w-6 h-6" />,
                title: "Tilskudsberegning",
                desc: "Vi viser præcis, hvor meget energitilskud du kan få (op til 27.000 kr).",
              },
              {
                icon: <PiggyBank className="w-6 h-6" />,
                title: "Din samlede besparelse",
                desc: "Et klart tal på, hvad du sparer samlet – inkl. tilskud, pumpe og montage separat.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl p-7 border transition-all hover:shadow-lg hover:-translate-y-1"
                style={{ borderColor: "#e8e0d0", backgroundColor: C.cream }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: C.greenLight, color: C.green }}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: C.navy }}>
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: C.gray }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Real Customer Comparisons ──────────────────────────── */}
      <section className="py-20 md:py-24" style={{ backgroundColor: C.grayLight }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: C.green }}
            >
              Faktiske sager
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.navy }}
            >
              Se hvad andre sparede
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t) => {
              const diff = t.quoted - t.paid;
              return (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  className="rounded-2xl overflow-hidden border transition-all hover:shadow-lg"
                  style={{ borderColor: "#dce6f0", backgroundColor: C.white }}
                >
                  <div className="p-7">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-current"
                          style={{ color: C.orange }}
                        />
                      ))}
                    </div>
                    <p className="text-base leading-relaxed mb-6" style={{ color: C.gray }}>
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                        style={{ backgroundColor: C.greenLight, color: C.greenDark }}
                      >
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="font-bold" style={{ color: C.dark }}>
                          {t.name}
                        </p>
                        <p className="text-xs flex items-center gap-1" style={{ color: C.gray }}>
                          <MapPin className="w-3 h-3" /> {t.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-2 border-t"
                    style={{ borderColor: "#dce6f0" }}
                  >
                    <div className="p-4 text-center border-r" style={{ borderColor: "#dce6f0" }}>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: C.gray }}>
                        Tilbud
                      </p>
                      <p className="text-base font-bold line-through" style={{ color: "#c0392b" }}>
                        {t.quoted.toLocaleString("da-DK")}
                      </p>
                    </div>
                    <div
                      className="p-4 text-center"
                      style={{ backgroundColor: C.greenLight }}
                    >
                      <p
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: C.greenDark }}
                      >
                        Sparede
                      </p>
                      <p className="text-base font-bold" style={{ color: C.greenDark }}>
                        {diff.toLocaleString("da-DK")} kr
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Big Savings Banner ─────────────────────────────────── */}
      <section className="py-20 md:py-24" style={{ backgroundColor: C.white }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <img
                  src={IMAGES.heatpump}
                  alt="Varmepumpe closeup"
                  className="rounded-2xl shadow-xl w-full"
                />
                <div
                  className="absolute -bottom-6 -right-6 rounded-2xl p-6 shadow-xl"
                  style={{ backgroundColor: C.green }}
                >
                  <div className="flex items-center gap-3">
                    <TrendingDown className="w-10 h-10" style={{ color: C.white }} />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.8)" }}>
                        Gennemsnit
                      </p>
                      <p className="text-3xl font-bold" style={{ color: C.white }}>
                        37.500 kr
                      </p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
                        sparet pr. kunde
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: C.green }}
              >
                Samme pumpe. Helt anden pris.
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl mb-6"
                style={{ color: C.navy }}
              >
                Hvorfor betaler du for mere end du behøver?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-lg leading-relaxed mb-8"
                style={{ color: C.gray }}
              >
                Vi sælger de samme varmepumper som dit lokale firma – Panasonic,
                Bosch, Metro Therm – med samme garanti. Vi har bare fjernet den
                skjulte avance på montagen.
              </motion.p>
              <motion.div variants={fadeUp} className="space-y-3">
                {[
                  "Gennemsigtige priser – se alt, inden du beslutter",
                  "Vælg selv montør eller lad os finde en til dig",
                  "Fuld garanti direkte fra producenten",
                  "Hjælp til at søge op til 27.000 kr i energitilskud",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: C.greenLight }}
                    >
                      <CheckCircle2 className="w-4 h-4" style={{ color: C.green }} />
                    </div>
                    <p className="text-base font-bold" style={{ color: C.dark }}>
                      {item}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Process Steps ──────────────────────────────────────── */}
      <section className="py-20 md:py-24" style={{ backgroundColor: C.navy }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#7ed9a0" }}
            >
              Så enkelt er det
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.white }}
            >
              Fra pristjek til ny varmepumpe
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-4 gap-5"
          >
            {[
              { n: "1", t: "Udfyld pristjek", d: "30 sekunder. Helt gratis." },
              { n: "2", t: "Modtag sammenligning", d: "Indenfor 24 timer." },
              { n: "3", t: "Vælg din pumpe", d: "Panasonic, Bosch eller Metro Therm." },
              { n: "4", t: "Vi finder montør", d: "Eller brug din egen." },
            ].map((item) => (
              <motion.div
                key={item.n}
                variants={fadeUp}
                className="rounded-2xl p-6 relative"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-4"
                  style={{ backgroundColor: "#7ed9a0", color: C.navy }}
                >
                  {item.n}
                </div>
                <h3 className="text-lg font-bold mb-1.5" style={{ color: C.white }}>
                  {item.t}
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {item.d}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24" style={{ backgroundColor: C.cream }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: C.green }}
            >
              Spørgsmål og svar
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.navy }}
            >
              Alt du bør vide om pristjekket
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {FAQ_DATA.map((faq) => (
              <motion.div key={faq.q} variants={fadeUp}>
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Final CTA ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0">
          <img src={IMAGES.family} alt="" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,27,51,0.92) 0%, rgba(46,153,88,0.85) 100%)",
            }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl mb-5"
              style={{ color: C.white }}
            >
              Klar til at se din besparelse?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg mb-8 max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Det tager 30 sekunder. Vi vender tilbage med et konkret tal
              indenfor 24 timer.
            </motion.p>
            <motion.button
              variants={fadeUp}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg active:scale-[0.98]"
              style={{ backgroundColor: C.orange, color: C.white }}
            >
              Dobbelttjek min pris gratis
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────── */}
      <footer className="py-10 border-t" style={{ backgroundColor: C.white, borderColor: "#e8e0d0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: C.gray }}>
              &copy; {new Date().getFullYear()} BilligVentilation.dk – Alle rettigheder forbeholdes
            </p>
            <div className="flex items-center gap-6">
              <a
                href="tel:+4591552277"
                className="text-sm font-bold flex items-center gap-1"
                style={{ color: C.green }}
              >
                <Phone className="w-4 h-4" /> 91 55 22 77
              </a>
              <a
                href="https://billigventilation.dk"
                className="text-sm font-bold"
                style={{ color: C.green }}
              >
                billigventilation.dk
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
