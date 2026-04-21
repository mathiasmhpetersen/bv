import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Phone,
  Star,
  FileCheck,
  HandCoins,
  BadgePercent,
  Sparkles,
  MapPin,
  Flame,
  Wind,
  Zap,
  Trees,
  ArrowRight,
  Calculator,
  TrendingUp,
} from "lucide-react";

// ─── Brand Assets ────────────────────────────────────────────────
const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/hero-house-heatpump-ihVZgyscJpE8VmEuqigtXu.webp",
  family:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/happy-family-home-BroX8spFkM8eBq3b8GQzRm.webp",
  heatpump:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/heatpump-closeup-7ha7wnuAVACjRiB85e2Vdj.webp",
};

const C = {
  amber: "#f5a524",
  amberDark: "#c77d04",
  amberLight: "#fff3d1",
  cream: "#fdf8ed",
  charcoal: "#1a1a1a",
  ink: "#0a0a0a",
  slate: "#2b3340",
  slateSoft: "#4a5568",
  gray: "#64748b",
  grayLight: "#f1f4f9",
  line: "#e2e8f0",
  white: "#ffffff",
  success: "#15803d",
  successLight: "#dcfce7",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

// ─── Grant matrix (kr) ─────────────────────────────────────────
// Rough estimate: baseHeating * sizeMultiplier
const BASE_GRANT: Record<string, number> = {
  Oliefyr: 27000,
  Gasfyr: 22000,
  Træpillefyr: 18000,
  Elvarme: 16000,
};

const SIZE_MULTIPLIER: Record<string, number> = {
  "Under 100 m²": 0.75,
  "100-150 m²": 0.9,
  "150-200 m²": 1.0,
  "Over 200 m²": 1.0,
};

const HEATING_OPTIONS = [
  { key: "Oliefyr", icon: <Flame className="w-5 h-5" /> },
  { key: "Gasfyr", icon: <Wind className="w-5 h-5" /> },
  { key: "Elvarme", icon: <Zap className="w-5 h-5" /> },
  { key: "Træpillefyr", icon: <Trees className="w-5 h-5" /> },
];

const SIZE_OPTIONS = Object.keys(SIZE_MULTIPLIER);

// ─── FAQ ─────────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    q: "Hvor præcist er jeres tilskudsberegner?",
    a: "Beregneren giver et realistisk estimat baseret på de oplyste parametre og Energistyrelsens satser. Det eksakte beløb afhænger af pumpens størrelse og boligens samlede energibehov, men vi rammer typisk inden for ±10%.",
  },
  {
    q: "Skal jeg selv ansøge om tilskuddet?",
    a: "Nej. Vi klarer hele ansøgningsprocessen for dig – gratis. Vores eksperter kender Energistyrelsens krav og sikrer at alt er udfyldt korrekt.",
  },
  {
    q: "Hvornår udbetales pengene?",
    a: "Efter installation er gennemført og dokumentationen godkendt, udbetales tilskuddet til din NemKonto – typisk inden for 4-8 uger.",
  },
  {
    q: "Kan jeg kombinere med håndværkerfradrag?",
    a: "Ja. Energitilskud og håndværkerfradrag er to forskellige ordninger, og du kan få begge. Samlet kan du spare op til 35.600 kr.",
  },
  {
    q: "Hvad sker der hvis jeg allerede har bestilt pumpen?",
    a: "Tilskuddet skal søges FØR pumpen bestilles. Hvis du allerede har underskrevet, kontakt os hurtigst muligt – der er ofte en fortrydelsesfrist, hvor vi kan hjælpe.",
  },
  {
    q: "Er sommerhuse omfattet?",
    a: "Nej. Ordningen gælder kun helårsboliger der opvarmes med olie, gas, elvarme eller træpiller.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: C.line }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-lg font-bold" style={{ color: C.charcoal }}>
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: C.amber }}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-base leading-relaxed" style={{ color: C.slateSoft }}>
          {a}
        </p>
      </motion.div>
    </div>
  );
}

function formatKr(value: number) {
  return value.toLocaleString("da-DK");
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════
export default function TilskudV2() {
  const [heating, setHeating] = useState<string>("Oliefyr");
  const [size, setSize] = useState<string>("100-150 m²");
  const [showLead, setShowLead] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const estimate = useMemo(() => {
    const base = BASE_GRANT[heating] ?? 0;
    const mult = SIZE_MULTIPLIER[size] ?? 1;
    return Math.round((base * mult) / 500) * 500;
  }, [heating, size]);

  const handverker = 8600;
  const total = estimate + handverker;

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("TilskudV2 lead:", { heating, size, estimate, ...leadData });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream }}>
      {/* ─── Top Bar ────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: "rgba(253,248,237,0.95)",
          borderColor: C.line,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: C.ink }}
          >
            BilligVentilation.dk
          </span>
          <a
            href="tel:+4591552277"
            className="text-sm font-bold flex items-center gap-1"
            style={{ color: C.amberDark }}
          >
            <Phone className="w-4 h-4" /> 91 55 22 77
          </a>
        </div>
      </div>

      {/* ─── HERO + CALCULATOR ──────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(245,165,36,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(21,128,61,0.3) 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            {/* Left: Copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-6 lg:pt-10"
            >
              <motion.div variants={fadeUp}>
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: C.amberLight,
                    color: C.amberDark,
                  }}
                >
                  <Sparkles className="w-4 h-4" /> Tilskudsberegner 2026
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight font-bold"
                style={{ color: C.ink }}
              >
                Se dit
                <br />
                <span style={{ color: C.amberDark }}>
                  tilskud
                </span>{" "}
                på
                <br />
                2 sekunder.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg leading-relaxed max-w-lg"
                style={{ color: C.slateSoft }}
              >
                Vælg dit nuværende varmesystem og din boligstørrelse – så
                beregner vi øjeblikkeligt hvor meget du kan få i energitilskud.
                Ingen ventetid, ingen email-krav.
              </motion.p>

              <motion.div variants={fadeUp} className="space-y-3 pt-2">
                {[
                  "Live beregning baseret på Energistyrelsens satser",
                  "Gratis ansøgningshjælp – vi klarer papirerne",
                  "95% af vores ansøgninger bliver godkendt",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: C.success }}
                    />
                    <p className="text-base" style={{ color: C.charcoal }}>
                      {item}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Interactive Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div
                className="rounded-3xl p-6 sm:p-8 shadow-2xl border-2"
                style={{ backgroundColor: C.white, borderColor: C.line }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: C.amberLight, color: C.amberDark }}
                  >
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-lg" style={{ color: C.ink }}>
                      Tilskudsberegner
                    </p>
                    <p className="text-sm" style={{ color: C.gray }}>
                      Juster nedenfor – resultatet opdateres live
                    </p>
                  </div>
                </div>

                {/* Current heating */}
                <div className="mb-6">
                  <label
                    className="text-sm font-bold uppercase tracking-wide mb-3 block"
                    style={{ color: C.slateSoft }}
                  >
                    Nuværende opvarmning
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {HEATING_OPTIONS.map((opt) => {
                      const active = heating === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setHeating(opt.key)}
                          className="p-3 rounded-xl border-2 flex items-center gap-2 font-bold text-sm transition-all"
                          style={{
                            borderColor: active ? C.amberDark : C.line,
                            backgroundColor: active ? C.amberLight : C.white,
                            color: active ? C.amberDark : C.charcoal,
                          }}
                        >
                          {opt.icon}
                          {opt.key}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Home size */}
                <div className="mb-6">
                  <label
                    className="text-sm font-bold uppercase tracking-wide mb-3 block"
                    style={{ color: C.slateSoft }}
                  >
                    Boligstørrelse
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SIZE_OPTIONS.map((opt) => {
                      const active = size === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSize(opt)}
                          className="p-3 rounded-xl border-2 font-bold text-sm transition-all"
                          style={{
                            borderColor: active ? C.amberDark : C.line,
                            backgroundColor: active ? C.amberLight : C.white,
                            color: active ? C.amberDark : C.charcoal,
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live result */}
                <motion.div
                  key={`${heating}-${size}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl p-5 mb-5"
                  style={{ backgroundColor: C.ink }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    Dit estimerede tilskud
                  </p>
                  <div className="flex items-baseline gap-2 mb-3">
                    <p
                      className="text-4xl sm:text-5xl font-bold tracking-tight"
                      style={{ color: C.amber }}
                    >
                      {formatKr(estimate)} kr
                    </p>
                  </div>
                  <div
                    className="flex items-center justify-between text-xs pt-3 border-t"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.65)" }}>
                      + Håndværkerfradrag
                    </span>
                    <span className="font-bold" style={{ color: C.white }}>
                      {formatKr(handverker)} kr
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-between text-sm pt-3 mt-2 border-t"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    <span
                      className="font-bold"
                      style={{ color: "rgba(255,255,255,0.9)" }}
                    >
                      Samlet besparelse
                    </span>
                    <span
                      className="font-bold text-lg"
                      style={{ color: "#7ee8a8" }}
                    >
                      {formatKr(total)} kr
                    </span>
                  </div>
                </motion.div>

                {!showLead && !submitted && (
                  <button
                    onClick={() => setShowLead(true)}
                    className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                    style={{ backgroundColor: C.amberDark, color: C.white }}
                  >
                    Ansøg om {formatKr(estimate)} kr{" "}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}

                {showLead && !submitted && (
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleLeadSubmit}
                    className="space-y-3"
                  >
                    <p className="text-sm font-bold" style={{ color: C.charcoal }}>
                      Hvor skal vi sende ansøgningen?
                    </p>
                    <input
                      type="text"
                      placeholder="Dit navn"
                      value={leadData.name}
                      onChange={(e) =>
                        setLeadData({ ...leadData, name: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                      style={{ borderColor: C.line }}
                    />
                    <input
                      type="email"
                      placeholder="Din email"
                      value={leadData.email}
                      onChange={(e) =>
                        setLeadData({ ...leadData, email: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                      style={{ borderColor: C.line }}
                    />
                    <input
                      type="tel"
                      placeholder="Dit telefonnummer"
                      value={leadData.phone}
                      onChange={(e) =>
                        setLeadData({ ...leadData, phone: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                      style={{ borderColor: C.line }}
                    />
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg active:scale-[0.98]"
                      style={{ backgroundColor: C.amberDark, color: C.white }}
                    >
                      Start min ansøgning →
                    </button>
                    <p
                      className="text-xs text-center pt-1"
                      style={{ color: C.gray }}
                    >
                      Uforpligtende · Gratis hjælp · Ingen binding
                    </p>
                  </motion.form>
                )}

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-3"
                  >
                    <div
                      className="w-14 h-14 rounded-full mx-auto flex items-center justify-center"
                      style={{ backgroundColor: C.successLight }}
                    >
                      <CheckCircle2
                        className="w-7 h-7"
                        style={{ color: C.success }}
                      />
                    </div>
                    <h3
                      className="text-xl font-bold"
                      style={{ color: C.ink }}
                    >
                      Tak! Vi kontakter dig inden for 24 timer.
                    </h3>
                    <p className="text-sm" style={{ color: C.gray }}>
                      Vores tilskudseksperter tager kontakt og starter din
                      ansøgning.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Floating badge */}
              <div
                className="hidden lg:flex absolute -top-4 -right-4 items-center gap-2 px-4 py-2 rounded-full shadow-lg"
                style={{ backgroundColor: C.amber, color: C.ink }}
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-bold">Live beregning</span>
              </div>
            </motion.div>
          </div>
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
              style={{ color: C.amberDark }}
            >
              Fra beregning til udbetaling
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ color: C.ink }}
            >
              4 trin – vi gør det tunge arbejde
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                n: "01",
                title: "Beregn dit tilskud",
                desc: "Vælg varmesystem og boligstørrelse i vores live beregner. Ingen email krævet.",
                icon: <Calculator className="w-6 h-6" />,
              },
              {
                n: "02",
                title: "Vi tager kontakt",
                desc: "Send dine kontaktoplysninger og en tilskudsekspert ringer inden for 24 timer.",
                icon: <Phone className="w-6 h-6" />,
              },
              {
                n: "03",
                title: "Ansøgning indsendes",
                desc: "Vi udfylder alle papirer og indsender ansøgningen til Energistyrelsen.",
                icon: <FileCheck className="w-6 h-6" />,
              },
              {
                n: "04",
                title: "Pengene på kontoen",
                desc: "Tilskuddet udbetales direkte til din NemKonto – typisk inden for 4-8 uger.",
                icon: <HandCoins className="w-6 h-6" />,
              },
            ].map((item) => (
              <motion.div
                key={item.n}
                variants={fadeUp}
                className="relative rounded-2xl p-6 border-2 transition-all hover:shadow-lg group"
                style={{ borderColor: C.line, backgroundColor: C.cream }}
              >
                <span
                  className="text-5xl font-bold opacity-10 absolute top-2 right-4"
                  style={{ color: C.amberDark }}
                >
                  {item.n}
                </span>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: C.amberLight, color: C.amberDark }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: C.ink }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: C.slateSoft }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── GRANT TABLE ───────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.cream }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
              style={{ color: C.amberDark }}
            >
              Satser 2026
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ color: C.ink }}
            >
              Hvad kan andre få?
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden border-2 shadow-lg"
            style={{ borderColor: C.line, backgroundColor: C.white }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-3 px-6 py-4 text-sm font-bold uppercase tracking-wide"
              style={{ backgroundColor: C.ink, color: C.white }}
            >
              <span>Nuværende varme</span>
              <span>Typisk tilskud</span>
              <span className="text-right">Maks tilskud</span>
            </div>
            {[
              { from: "Oliefyr", typical: "24.000 kr", max: "27.000 kr" },
              { from: "Gasfyr", typical: "20.000 kr", max: "24.000 kr" },
              { from: "Træpillefyr", typical: "17.000 kr", max: "20.000 kr" },
              { from: "Elvarme", typical: "15.000 kr", max: "18.000 kr" },
            ].map((row, idx) => (
              <div
                key={row.from}
                className="grid grid-cols-3 px-6 py-5 text-base items-center"
                style={{
                  backgroundColor: idx % 2 === 0 ? C.white : C.cream,
                  borderTop: idx === 0 ? "none" : `1px solid ${C.line}`,
                }}
              >
                <span className="font-bold" style={{ color: C.ink }}>
                  {row.from}
                </span>
                <span style={{ color: C.slateSoft }}>{row.typical}</span>
                <span
                  className="text-right font-bold"
                  style={{ color: C.amberDark }}
                >
                  {row.max}
                </span>
              </div>
            ))}
          </motion.div>

          <p
            className="text-xs text-center mt-4"
            style={{ color: C.gray }}
          >
            Tal baseret på Energistyrelsens tilskudssatser for varmepumper 2026.
            Faktisk tilskud kan variere.
          </p>
        </div>
      </section>

      {/* ─── COMBO STACK ───────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.white }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img
                src={IMAGES.family}
                alt="Dansk familie"
                className="rounded-3xl shadow-xl w-full"
              />
              <div
                className="absolute -bottom-6 -right-6 rounded-2xl p-5 shadow-2xl"
                style={{ backgroundColor: C.ink }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Samlet besparelse
                </p>
                <p className="text-3xl font-bold" style={{ color: C.amber }}>
                  35.600 kr
                </p>
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
                style={{ color: C.amberDark }}
              >
                Stak besparelserne
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl mb-6 font-bold"
                style={{ color: C.ink }}
              >
                Tilskud + fradrag = 35.600 kr
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-lg leading-relaxed mb-8"
                style={{ color: C.slateSoft }}
              >
                Energitilskuddet og håndværkerfradraget er to forskellige
                ordninger – du får begge. Kombineret med en billigere pumpe kan
                du spare over 60.000 kr i forhold til et samlet tilbud.
              </motion.p>

              <motion.div variants={fadeUp} className="space-y-3">
                {[
                  {
                    label: "Energitilskud",
                    value: "Op til 27.000 kr",
                    icon: <HandCoins className="w-5 h-5" />,
                  },
                  {
                    label: "Håndværkerfradrag",
                    value: "Op til 8.600 kr",
                    icon: <BadgePercent className="w-5 h-5" />,
                  },
                  {
                    label: "Rabat via os",
                    value: "20.000-60.000 kr",
                    icon: <TrendingUp className="w-5 h-5" />,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between p-4 rounded-xl border-2"
                    style={{ borderColor: C.line, backgroundColor: C.cream }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: C.amberLight,
                          color: C.amberDark,
                        }}
                      >
                        {item.icon}
                      </div>
                      <span className="font-bold" style={{ color: C.ink }}>
                        {item.label}
                      </span>
                    </div>
                    <span
                      className="font-bold text-lg"
                      style={{ color: C.ink }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL BAND ──────────────────────────────── */}
      <section
        className="py-20 md:py-24 relative overflow-hidden"
        style={{ backgroundColor: C.ink }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${IMAGES.hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(1)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.85) 100%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-current"
                  style={{ color: C.amber }}
                />
              ))}
            </div>
            <p
              className="text-2xl sm:text-3xl lg:text-4xl leading-tight mb-8 font-bold"
              style={{ color: C.white }}
            >
              &ldquo;Fik 27.000 kr i tilskud og 45.000 kr mindre for selve
              pumpen. I alt sparede jeg 72.000 kr uden at slække på
              kvaliteten.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=80&h=80&fit=crop&crop=face"
                alt="Jens Sørensen"
                className="w-12 h-12 rounded-full border-2"
                style={{ borderColor: C.amber }}
              />
              <div className="text-left">
                <p className="font-bold" style={{ color: C.white }}>
                  Jens Sørensen
                </p>
                <p
                  className="text-sm flex items-center gap-1"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  <MapPin className="w-3 h-3" /> Silkeborg
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TRUST ROW ─────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: C.cream }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10.000+", label: "Tilfredse kunder" },
              { value: "95%", label: "Godkendelsesrate" },
              { value: "4-8 uger", label: "Til udbetaling" },
              { value: "Gratis", label: "Ansøgningshjælp" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p
                  className="text-3xl lg:text-4xl font-bold mb-1"
                  style={{ color: C.ink }}
                >
                  {item.value}
                </p>
                <p className="text-sm" style={{ color: C.slateSoft }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.white }}>
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
              style={{ color: C.amberDark }}
            >
              Spørgsmål?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ color: C.ink }}
            >
              Det du skal vide om tilskud
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

      {/* ─── FINAL CTA ─────────────────────────────────────── */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ backgroundColor: C.ink }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(245,165,36,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(245,165,36,0.2) 0%, transparent 50%)",
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
              className="text-3xl sm:text-4xl lg:text-5xl mb-6 font-bold"
              style={{ color: C.white }}
            >
              Beregn dit tilskud – det tager 5 sekunder
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg mb-8"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Ingen binding · Gratis ansøgningshjælp · Svar på 24 timer
            </motion.p>
            <motion.div variants={fadeUp}>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg active:scale-[0.98]"
                style={{ backgroundColor: C.amber, color: C.ink }}
              >
                Åbn beregneren <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────── */}
      <footer
        className="py-10 border-t"
        style={{ borderColor: C.line, backgroundColor: C.cream }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: C.slateSoft }}>
              &copy; {new Date().getFullYear()} BilligVentilation.dk – Alle
              rettigheder forbeholdes
            </p>
            <div className="flex items-center gap-6">
              <a
                href="tel:+4591552277"
                className="text-sm font-bold flex items-center gap-1"
                style={{ color: C.amberDark }}
              >
                <Phone className="w-4 h-4" /> 91 55 22 77
              </a>
              <a
                href="https://billigventilation.dk"
                className="text-sm font-bold"
                style={{ color: C.amberDark }}
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
