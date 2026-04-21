import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Phone,
  Shield,
  Star,
  ThumbsUp,
  TrendingDown,
  Users,
  Zap,
  Clock,
  MapPin,
  Flame,
  Thermometer,
  Ruler,
  ShoppingBag,
  ArrowRight,
  Home as HomeIcon,
} from "lucide-react";

// ─── Brand Assets ────────────────────────────────────────────────
const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/hero-house-heatpump-ihVZgyscJpE8VmEuqigtXu.webp",
  heatpump:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/heatpump-closeup-7ha7wnuAVACjRiB85e2Vdj.webp",
  family:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/happy-family-home-BroX8spFkM8eBq3b8GQzRm.webp",
  technician:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/technician-install-Mj88npoE9GRKNVo3BuHHgr.webp",
};

const C = {
  blue: "#2e8bcb",
  blueDark: "#1a5f8a",
  blueLight: "#e8f4fc",
  orange: "#FF9500",
  orangeLight: "#fff8ee",
  green: "#4CAF50",
  greenLight: "#f0faf0",
  navy: "#1a2b4a",
  dark: "#1a1a2e",
  gray: "#5a6b7d",
  grayLight: "#f5f8fb",
  white: "#ffffff",
};

// ─── Pump Packages ───────────────────────────────────────────────
const PUMPS = [
  {
    name: "Cooper & Hunter R290 9 kW varmepumpe pakke",
    price: "58.950,00",
    image: IMAGES.heatpump,
    kw: 9,
  },
  {
    name: "Panasonic M-generation T-Cap Propan (R290) monoblock – 9 kW pakke",
    price: "57.539,00",
    image: IMAGES.heatpump,
    kw: 9,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

// ─── FAQ Data ────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    q: "Hvor stor skal min varmepumpe være?",
    a: "Det afhænger af dit hus' størrelse, isolering og varmebehov. Vi hjælper dig med at finde den rigtige størrelse baseret på dine oplysninger. En typisk bolig på 100-150 m² kræver en varmepumpe på 6-10 kW.",
  },
  {
    q: "Hvad koster en varmepumpe i drift?",
    a: "En luft-til-vand varmepumpe koster typisk 4.000-8.000 kr. om året i el for en gennemsnitlig dansk bolig. Det er markant billigere end olie- eller gasfyr.",
  },
  {
    q: "Kan man få en stille varmepumpe?",
    a: "Ja. Moderne varmepumper fra Panasonic, Bosch og Metro Therm har støjniveauer helt ned til 35 dB(A), hvilket svarer til en stille hvisken.",
  },
  {
    q: "Hvordan fungerer energitilskuddet?",
    a: "Staten giver op til 27.000 kr. i tilskud via energiselskaberne. Vi hjælper dig med at søge tilskuddet, så du får det fulde beløb.",
  },
  {
    q: "Kan jeg selv montere min varmepumpe?",
    a: "Du kan lave meget af forarbejdet selv, men selve tilslutningen skal udføres af en autoriseret montør. Mange af vores kunder sparer tusindvis af kroner ved at gøre det på denne måde.",
  },
  {
    q: "Hvilke mærker sælger I?",
    a: "Vi sælger varmepumper fra Panasonic, Bosch og Metro Therm – alle anerkendte kvalitetsmærker med dokumenteret holdbarhed og effektivitet.",
  },
];

// ─── Testimonials ────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Anders Christensen",
    location: "Odense",
    text: "Jeg fik et tilbud på 130.000 kr. fra et lokalt firma. Hos BilligVentilation købte jeg den samme Panasonic-pumpe og fandt selv en montør. Sparede over 45.000 kr.",
    savings: "45.000 kr.",
    rating: 5,
  },
  {
    name: "Maria Rasmussen",
    location: "Aarhus",
    text: "Fantastisk service. De hjalp mig med at finde den rigtige størrelse og satte mig i kontakt med en dygtig montør. Alt gik nemt og smertefrit.",
    savings: "38.000 kr.",
    rating: 5,
  },
  {
    name: "Thomas Nielsen",
    location: "Roskilde",
    text: "Var skeptisk i starten, men efter at have sammenlignet priserne var valget nemt. Samme Bosch-pumpe, men 35.000 kr. billigere. Kan varmt anbefales.",
    savings: "35.000 kr.",
    rating: 5,
  },
];

// ─── FAQ Accordion Item ──────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b transition-colors" style={{ borderColor: "#dce6f0" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-lg font-bold" style={{ color: C.dark }}>
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: C.blue }}
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
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════
export default function DobbelttjekV3() {
  const [formStep, setFormStep] = useState<1 | 2 | 3 | 4>(1);
  const [home, setHome] = useState({
    m2: "",
    heating: "" as "" | "Radiator" | "Gulvvarme" | "Kombination",
    insulation: "" as "" | "0-100 mm" | "100-250 mm" | "300 mm og over",
  });
  const [contact, setContact] = useState({
    fornavn: "",
    efternavn: "",
    adresse: "",
    postnummer: "",
    by: "",
    telefon: "",
    email: "",
  });

  // Rough kW estimate from m² + insulation
  const kwNeed = useMemo(() => {
    const m2 = parseInt(home.m2 || "0", 10);
    if (!m2) return 0;
    const factor =
      home.insulation === "0-100 mm"
        ? 0.1
        : home.insulation === "100-250 mm"
        ? 0.075
        : home.insulation === "300 mm og over"
        ? 0.06
        : 0.08;
    return Math.max(4, Math.round(m2 * factor));
  }, [home.m2, home.insulation]);

  const canCalculate =
    !!home.m2 && !!home.heating && !!home.insulation && parseInt(home.m2, 10) > 0;

  const handleContact = (field: keyof typeof contact, value: string) => {
    setContact((c) => ({ ...c, [field]: value }));
  };

  const handleCalculate = () => {
    if (!canCalculate) return;
    setFormStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("V3 Lead submitted:", { home, kwNeed, contact });
    setFormStep(4);
  };

  const heatingIcons: Record<"Radiator" | "Gulvvarme" | "Kombination", JSX.Element> = {
    Radiator: <Flame className="w-7 h-7" />,
    Gulvvarme: <Thermometer className="w-7 h-7" />,
    Kombination: <HomeIcon className="w-7 h-7" />,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.white }}>
      {/* ─── Sticky Top Bar ─────────────────────────────────── */}
      <div
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          borderColor: "#dce6f0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <span className="text-lg font-bold tracking-tight" style={{ color: C.navy }}>
            BilligVentilation.dk
          </span>
          <span className="text-sm font-bold" style={{ color: C.blue }}>
            Tlf: 91 55 22 77
          </span>
        </div>
      </div>

      {/* ─── HERO ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Dansk hus med varmepumpe"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(26,43,74,0.88) 0%, rgba(46,139,203,0.75) 50%, rgba(26,43,74,0.85) 100%)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-6 lg:sticky lg:top-20"
            >
              <motion.div variants={fadeUp}>
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4"
                  style={{ backgroundColor: "rgba(255,149,0,0.2)", color: "#FFB74D" }}
                >
                  Dobbeltjek din pris gratis
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
                style={{ color: C.white }}
              >
                Fik du også et tilbud
                <br />
                <span style={{ color: "#0193f4" }}>på 100.000 kr?</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl leading-relaxed max-w-lg"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Tusindvis af danskere betaler alt for meget for deres varmepumpe.
                Vi sælger den samme pumpe – til den rigtige pris.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
                {[
                  "Samme kvalitetsmærker",
                  "Spar op til 60.000 kr",
                  "Op til 27.000 kr i tilskud",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 text-sm font-bold"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    <CheckCircle2 className="w-5 h-5" style={{ color: C.green }} />
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Multi-step Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div
                className="rounded-2xl p-6 sm:p-8 shadow-2xl"
                style={{ backgroundColor: C.white }}
              >
                {/* Step indicator */}
                {formStep < 4 && (
                  <div className="flex items-center gap-2 mb-6">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center flex-1">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                          style={{
                            backgroundColor: s <= formStep ? C.blue : "#e0e7f1",
                            color: s <= formStep ? C.white : C.gray,
                          }}
                        >
                          {s}
                        </div>
                        {s < 3 && (
                          <div
                            className="flex-1 h-0.5 mx-2 transition-colors"
                            style={{
                              backgroundColor: s < formStep ? C.blue : "#e0e7f1",
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {/* ── STEP 1: Boliginfo ───────────────────── */}
                  {formStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold" style={{ color: C.dark }}>
                        Information omkring din bolig
                      </h3>

                      {/* m² input */}
                      <div>
                        <label
                          className="block font-bold text-sm mb-2"
                          style={{ color: C.dark }}
                        >
                          Hvor mange m² er din bolig?
                        </label>
                        <input
                          type="number"
                          inputMode="numeric"
                          min={20}
                          max={600}
                          value={home.m2}
                          onChange={(e) => setHome((h) => ({ ...h, m2: e.target.value }))}
                          placeholder="f.eks. 140"
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none focus:border-blue-400"
                          style={{ borderColor: "#dce6f0" }}
                        />
                      </div>

                      {/* Heating */}
                      <div>
                        <label
                          className="block font-bold text-sm mb-2"
                          style={{ color: C.dark }}
                        >
                          Hvordan er din bolig opvarmet?
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["Radiator", "Gulvvarme", "Kombination"] as const).map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setHome((h) => ({ ...h, heating: opt }))}
                              className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:shadow-md"
                              style={{
                                borderColor: home.heating === opt ? C.blue : "#dce6f0",
                                backgroundColor: home.heating === opt ? C.blueLight : C.white,
                                color: home.heating === opt ? C.blue : C.gray,
                              }}
                            >
                              {heatingIcons[opt]}
                              <span
                                className="text-xs font-bold"
                                style={{
                                  color: home.heating === opt ? C.dark : C.gray,
                                }}
                              >
                                {opt}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Insulation */}
                      <div>
                        <label
                          className="block font-bold text-sm mb-2"
                          style={{ color: C.dark }}
                        >
                          Hvor godt er dit hus isoleret? (gulv, væg og loft)
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["0-100 mm", "100-250 mm", "300 mm og over"] as const).map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setHome((h) => ({ ...h, insulation: opt }))}
                              className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:shadow-md"
                              style={{
                                borderColor: home.insulation === opt ? C.blue : "#dce6f0",
                                backgroundColor:
                                  home.insulation === opt ? C.blueLight : C.white,
                                color: home.insulation === opt ? C.blue : C.gray,
                              }}
                            >
                              <Ruler className="w-6 h-6" />
                              <span
                                className="text-xs font-bold text-center"
                                style={{
                                  color: home.insulation === opt ? C.dark : C.gray,
                                }}
                              >
                                {opt}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleCalculate}
                        disabled={!canCalculate}
                        className="px-6 py-3 rounded-full font-bold text-sm transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: C.green, color: C.white }}
                      >
                        Beregn kW
                      </button>
                    </motion.div>
                  )}

                  {/* ── STEP 2: Pump packages ──────────────── */}
                  {formStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div
                        className="rounded-xl px-4 py-3 border"
                        style={{ backgroundColor: C.blueLight, borderColor: "#cfe4f5" }}
                      >
                        <p className="text-base" style={{ color: C.dark }}>
                          Din bolig kræver:{" "}
                          <span className="font-bold">{kwNeed} kW</span>
                        </p>
                      </div>

                      <div>
                        <h3
                          className="text-lg font-bold mb-1"
                          style={{ color: C.dark }}
                        >
                          Varmepumpe pakker der passer til din bolig!
                        </h3>
                        <p className="text-sm" style={{ color: C.gray }}>
                          Klik på den{" "}
                          <span className="font-bold" style={{ color: C.green }}>
                            grønne købsknap
                          </span>{" "}
                          for at tilføje til kurven.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {PUMPS.map((p) => (
                          <div
                            key={p.name}
                            className="rounded-xl border overflow-hidden flex flex-col"
                            style={{ borderColor: "#dce6f0" }}
                          >
                            <div
                              className="aspect-square flex items-center justify-center p-4"
                              style={{ backgroundColor: C.grayLight }}
                            >
                              <img
                                src={p.image}
                                alt={p.name}
                                className="max-h-full object-contain"
                              />
                            </div>
                            <div className="p-3 flex flex-col flex-1">
                              <p
                                className="text-xs leading-snug mb-3 flex-1"
                                style={{ color: C.dark }}
                              >
                                {p.name}
                              </p>
                              <div className="flex items-center justify-between">
                                <span
                                  className="text-sm font-bold"
                                  style={{ color: C.blue }}
                                >
                                  {p.price}kr.
                                </span>
                                <button
                                  type="button"
                                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
                                  style={{ backgroundColor: C.green }}
                                >
                                  <ShoppingBag className="w-4 h-4" style={{ color: C.white }} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Two CTA banners */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div
                          className="rounded-xl p-4"
                          style={{ backgroundColor: C.blue }}
                        >
                          <p className="font-bold text-base" style={{ color: C.white }}>
                            Tilbud på montage?
                          </p>
                          <p
                            className="text-xs mb-3"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                          >
                            Se priseksempler på montage – klik her &gt;
                          </p>
                          <button
                            type="button"
                            onClick={() => setFormStep(3)}
                            className="px-4 py-2 rounded-full font-bold text-xs"
                            style={{ backgroundColor: C.dark, color: C.white }}
                          >
                            Bestil tilbud &gt;
                          </button>
                        </div>
                        <div
                          className="rounded-xl p-4"
                          style={{ backgroundColor: C.orange }}
                        >
                          <p className="font-bold text-base" style={{ color: C.white }}>
                            Brug for hjælp?
                          </p>
                          <p
                            className="text-xs mb-3"
                            style={{ color: "rgba(255,255,255,0.9)" }}
                          >
                            Har du svært ved at vælge varmepumpe?
                          </p>
                          <button
                            type="button"
                            onClick={() => setFormStep(3)}
                            className="px-4 py-2 rounded-full font-bold text-xs"
                            style={{ backgroundColor: C.dark, color: C.white }}
                          >
                            Bliv kontaktet &gt;
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className="text-sm font-bold"
                        style={{ color: C.blue }}
                      >
                        ← Tilbage
                      </button>
                    </motion.div>
                  )}

                  {/* ── STEP 3: Contact form ────────────────── */}
                  {formStep === 3 && (
                    <motion.form
                      key="step3"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3"
                    >
                      <h3 className="text-xl font-bold mb-1" style={{ color: C.dark }}>
                        Dine oplysninger
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Fornavn"
                          value={contact.fornavn}
                          onChange={(e) => handleContact("fornavn", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                          style={{ borderColor: "#dce6f0" }}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Efternavn"
                          value={contact.efternavn}
                          onChange={(e) => handleContact("efternavn", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                          style={{ borderColor: "#dce6f0" }}
                          required
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Adresse"
                        value={contact.adresse}
                        onChange={(e) => handleContact("adresse", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                        style={{ borderColor: "#dce6f0" }}
                        required
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Postnummer"
                          value={contact.postnummer}
                          onChange={(e) => handleContact("postnummer", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                          style={{ borderColor: "#dce6f0" }}
                          required
                        />
                        <input
                          type="text"
                          placeholder="By"
                          value={contact.by}
                          onChange={(e) => handleContact("by", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                          style={{ borderColor: "#dce6f0" }}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="tel"
                          placeholder="Telefon / Mobilnummer"
                          value={contact.telefon}
                          onChange={(e) => handleContact("telefon", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                          style={{ borderColor: "#dce6f0" }}
                          required
                        />
                        <input
                          type="email"
                          placeholder="E-mail"
                          value={contact.email}
                          onChange={(e) => handleContact("email", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                          style={{ borderColor: "#dce6f0" }}
                          required
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-full font-bold text-sm transition-all hover:shadow-lg active:scale-[0.98]"
                          style={{ backgroundColor: C.blue, color: C.white }}
                        >
                          Send formularen
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormStep(2)}
                          className="text-sm font-bold"
                          style={{ color: C.blue }}
                        >
                          ← Tilbage
                        </button>
                      </div>

                      <p className="text-xs" style={{ color: C.gray }}>
                        Uforpligtende · Svar inden for 24 timer · Ingen binding
                      </p>
                    </motion.form>
                  )}

                  {/* ── STEP 4: Success ────────────────────── */}
                  {formStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-4"
                    >
                      <div
                        className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                        style={{ backgroundColor: C.greenLight }}
                      >
                        <CheckCircle2 className="w-8 h-8" style={{ color: C.green }} />
                      </div>
                      <h3 className="text-2xl font-bold" style={{ color: C.dark }}>
                        Tak for din henvendelse!
                      </h3>
                      <p style={{ color: C.gray }}>
                        Vi sender dit skræddersyede pristjek inden for 24 timer.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PRICE COMPARISON ───────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.grayLight }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: C.blue }}
            >
              Prissammenligning
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              Se forskellen med det samme
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-8 border-2 relative overflow-hidden"
              style={{ borderColor: "#e0e0e0", backgroundColor: C.white }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: "#e0e0e0" }}
              />
              <p
                className="text-sm font-bold uppercase tracking-wider mb-2"
                style={{ color: C.gray }}
              >
                Typisk samlet tilbud
              </p>
              <p
                className="text-4xl sm:text-5xl font-bold mb-3"
                style={{ color: "#c0392b", fontSize: "55px" }}
              >
                100.000-150.000 kr
              </p>
              <p className="text-sm mb-6" style={{ color: C.gray }}>
                Samlet pris med montage, tilbehør og avance
              </p>
              <div className="space-y-3">
                {[
                  "Stor avance på montage",
                  "Uigennemsigtig prissætning",
                  "Bundet til ét firma",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                      style={{ backgroundColor: "#fde8e8", color: "#c0392b" }}
                    >
                      ✕
                    </div>
                    <span className="text-sm" style={{ color: C.gray }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center justify-center py-8"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg"
                style={{ backgroundColor: C.green }}
              >
                <TrendingDown className="w-10 h-10" style={{ color: C.white }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: C.green }}>
                Spar op til
              </p>
              <p className="text-5xl font-bold" style={{ color: C.green }}>
                60.000 kr
              </p>
              <p className="text-sm mt-2" style={{ color: C.gray }}>
                ved at købe pumpe og montage separat
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-8 border-2 relative overflow-hidden shadow-lg"
              style={{ borderColor: C.blue, backgroundColor: C.white }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: C.blue }}
              />
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: C.orangeLight, color: C.orange }}
              >
                Bedste pris
              </div>
              <p
                className="text-sm font-bold uppercase tracking-wider mb-2"
                style={{ color: C.blue }}
              >
                Vores pris
              </p>
              <p
                className="text-4xl sm:text-5xl font-bold mb-3"
                style={{ color: C.blue, fontSize: "55px" }}
              >
                60.000-80.000 kr
              </p>
              <p className="text-sm mb-6" style={{ color: C.gray }}>
                Pumpe fra 26.000 kr + montage separat
              </p>
              <div className="space-y-3">
                {[
                  "Samme kvalitetsmærker",
                  "Gennemsigtige priser",
                  "Frit montørvalg",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" style={{ color: C.green }} />
                    <span className="text-sm font-bold" style={{ color: C.dark }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ───────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.white }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: C.blue }}
            >
              Sådan fungerer det
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              3 enkle trin til en billigere varmepumpe
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "01",
                title: "Dobbeltjek din pris",
                desc: "Udfyld vores korte formular og fortæl os om din bolig. Vi sammenligner dit tilbud med vores priser.",
                icon: <Zap className="w-6 h-6" />,
                color: C.blue,
                bg: C.blueLight,
              },
              {
                step: "02",
                title: "Køb pumpen hos os",
                desc: "Vælg den rigtige varmepumpe fra Panasonic, Bosch eller Metro Therm til den rigtige pris.",
                icon: <Shield className="w-6 h-6" />,
                color: C.orange,
                bg: C.orangeLight,
              },
              {
                step: "03",
                title: "Find montør – eller vi hjælper",
                desc: "Du finder selv en montør, eller vi sætter dig i kontakt med en godkendt installatør i dit område.",
                icon: <ThumbsUp className="w-6 h-6" />,
                color: C.green,
                bg: C.greenLight,
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="relative rounded-2xl p-8 border transition-all hover:shadow-lg group"
                style={{ borderColor: "#dce6f0", backgroundColor: C.white }}
              >
                <span
                  className="absolute -top-4 left-8 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  Trin {item.step}
                </span>
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 mt-2 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: C.dark }}>
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

      {/* ─── TESTIMONIALS ───────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.grayLight }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: C.blue }}
            >
              Kundernes oplevelser
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              Det siger vores kunder
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="rounded-2xl p-8 border transition-all hover:shadow-lg"
                style={{ borderColor: "#dce6f0", backgroundColor: C.white }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-current"
                      style={{ color: C.orange }}
                    />
                  ))}
                </div>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: C.gray }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold" style={{ color: C.dark }}>
                      {t.name}
                    </p>
                    <p
                      className="text-sm flex items-center gap-1"
                      style={{ color: C.gray }}
                    >
                      <MapPin className="w-3 h-3" /> {t.location}
                    </p>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-lg text-sm font-bold"
                    style={{ backgroundColor: C.greenLight, color: C.green }}
                  >
                    Sparede {t.savings}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TRUST INDICATORS ───────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: C.navy }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { icon: <Users className="w-7 h-7" />, value: "10.000+", label: "Tilfredse kunder" },
              { icon: <Star className="w-7 h-7" />, value: "4.7/5", label: "På Trustpilot" },
              { icon: <MapPin className="w-7 h-7" />, value: "Hele DK", label: "Landsdækkende" },
              { icon: <Clock className="w-7 h-7" />, value: "24/7", label: "Support" },
              { icon: <Shield className="w-7 h-7" />, value: "3-5 år", label: "Garanti" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div
                  className="w-14 h-14 rounded-xl mx-auto flex items-center justify-center mb-3"
                  style={{ backgroundColor: "rgba(46,139,203,0.2)", color: C.blue }}
                >
                  {item.icon}
                </div>
                <p className="text-2xl font-bold" style={{ color: C.white }}>
                  {item.value}
                </p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENERGY TILSKUD ─────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.white }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: C.blue }}
              >
                Energitilskud
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl mb-6"
                style={{ color: C.dark }}
              >
                Staten betaler op til 27.000 kr af din varmepumpe
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-lg leading-relaxed mb-8"
                style={{ color: C.gray }}
              >
                Tilskuddet er der, fordi varmepumpen er den mest energieffektive
                opvarmning du kan vælge. Vi hjælper dig med at søge tilskuddet,
                så du får det fulde beløb.
              </motion.p>
              <motion.div variants={fadeUp} className="space-y-3">
                {[
                  "Find den rigtige varmepumpe til dit hus",
                  "Bliv sat i kontakt med en godkendt montør",
                  "Spar 50-70% på varmeregningen fra dag ét",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: C.green }} />
                    <p className="text-base font-bold" style={{ color: C.dark }}>
                      {item}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={IMAGES.family}
                alt="Glad dansk familie foran deres hus"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.grayLight }}>
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
              style={{ color: C.blue }}
            >
              Ofte stillede spørgsmål
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              Luft til varmepumpe FAQ
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

      {/* ─── FINAL CTA ──────────────────────────────────────── */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ backgroundColor: C.blue }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl mb-6"
              style={{ color: C.white }}
            >
              Se hvor meget du kan spare
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg mb-8 max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Dobbeltjek din pris, få et skræddersyet tilbud, og start med at
              spare penge på din varmeregning.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg active:scale-[0.98]"
                style={{ backgroundColor: C.orange, color: C.white }}
              >
                Tjek din pris nu – gratis
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────── */}
      <footer className="py-10 border-t" style={{ borderColor: "#dce6f0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: C.gray }}>
              &copy; {new Date().getFullYear()} BilligVentilation.dk – Alle rettigheder forbeholdes
            </p>
            <div className="flex items-center gap-6">
              <a
                href="tel:+4591552277"
                className="text-sm font-bold flex items-center gap-1"
                style={{ color: C.blue }}
              >
                <Phone className="w-4 h-4" /> 91 55 22 77
              </a>
              <a
                href="https://billigventilation.dk"
                className="text-sm font-bold"
                style={{ color: C.blue }}
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
