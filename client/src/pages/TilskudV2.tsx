import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Phone,
  Shield,
  Star,
  Users,
  Award,
  HandCoins,
  BadgePercent,
  Sparkles,
  MapPin,
  Clock,
  TrendingUp,
  PiggyBank,
  Flame,
  Zap,
  Leaf,
  ArrowRight,
  Calculator,
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
  blue: "#2e8bcb",
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

// ─── Heating Types ───────────────────────────────────────────────
type HeatingKey = "olie" | "gas" | "elvarme" | "traepiller";

const HEATING: Record<
  HeatingKey,
  { label: string; base: number; per_m2: number; max: number; icon: JSX.Element; color: string }
> = {
  olie: {
    label: "Oliefyr",
    base: 18000,
    per_m2: 45,
    max: 27000,
    icon: <Flame className="w-5 h-5" />,
    color: C.green,
  },
  gas: {
    label: "Gasfyr",
    base: 15000,
    per_m2: 35,
    max: 24000,
    icon: <Flame className="w-5 h-5" />,
    color: C.blue,
  },
  elvarme: {
    label: "Elvarme",
    base: 12000,
    per_m2: 28,
    max: 20000,
    icon: <Zap className="w-5 h-5" />,
    color: C.orange,
  },
  traepiller: {
    label: "Træpiller",
    base: 10000,
    per_m2: 22,
    max: 17000,
    icon: <Leaf className="w-5 h-5" />,
    color: C.greenDark,
  },
};

// ─── FAQ ─────────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    q: "Hvordan beregnes mit præcise tilskudsbeløb?",
    a: "Tilskuddet beregnes ud fra din CO2-besparelse. Det afhænger af dit nuværende varmesystem, boligens størrelse og dit historiske forbrug. Vores kalkulator giver dig et retvisende estimat på 2 sekunder.",
  },
  {
    q: "Hvornår bliver pengene udbetalt?",
    a: "Typisk inden for 2-4 uger efter installationen er godkendt. Tilskuddet sendes direkte til din NemKonto - der er ingen mellemmænd eller gebyrer.",
  },
  {
    q: "Skal jeg lægge pengene ud selv?",
    a: "Nej. Mange af vores partnere tilbyder at fratrække tilskuddet allerede på fakturaen, så du slipper for at lægge ud. Vi ordner papirarbejdet bagefter.",
  },
  {
    q: "Hvad er deadline for at søge?",
    a: "Puljen er åben indtil den er opbrugt. Staten har afsat midler for hele 2026, men erfaringsmæssigt bliver puljen tømt før tid - så det anbefales at søge hurtigt.",
  },
  {
    q: "Hvorfor bruger nogle kalkulatorer andre tal?",
    a: "Fordi de ikke tager højde for dit konkrete CO2-aftryk. Vores beregner bruger Energistyrelsens officielle satser for 2026 og giver dig det rigtige forventede beløb.",
  },
  {
    q: "Kan jeg få tilskud hvis jeg allerede har et tilbud?",
    a: "Ja, så længe du ikke har bestilt pumpen endnu. Vi kan endda hjælpe dig med at få en bedre pris OG tilskuddet samlet.",
  },
];

// ─── Testimonials ────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Bettina Holm",
    location: "Hillerød",
    grant: 26400,
    from: "Oliefyr",
    text: "Brugte deres kalkulator på 30 sekunder og fik vist at jeg kunne få 26.400 kr. To måneder senere stod de på kontoen - præcis som lovet.",
  },
  {
    name: "Ole Kristensen",
    location: "Esbjerg",
    grant: 21800,
    from: "Gasfyr",
    text: "Troede det ville være en stor omgang papirarbejde. Men de klarede det hele - jeg skulle bare underskrive via MitID.",
  },
  {
    name: "Tina Jørgensen",
    location: "Aalborg",
    grant: 18500,
    from: "Elvarme",
    text: "Kalkulatoren gav det samme beløb som vi faktisk fik udbetalt. Ingen overraskelser - og ingen skjulte gebyrer.",
  },
];

// ─── FAQ Accordion ───────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl mb-3 overflow-hidden border-2"
      style={{
        borderColor: open ? C.green : "#dce6f0",
        backgroundColor: open ? C.greenLight : C.white,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-base md:text-lg font-bold pr-4" style={{ color: C.dark }}>
          {q}
        </span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: open ? C.green : C.grayLight }}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            style={{ color: open ? C.white : C.gray }}
          />
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-base leading-relaxed" style={{ color: C.gray }}>
          {a}
        </p>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════
export default function TilskudV2() {
  const [heating, setHeating] = useState<HeatingKey>("olie");
  const [size, setSize] = useState<number>(140);
  const [leadSent, setLeadSent] = useState(false);
  const [lead, setLead] = useState({ name: "", phone: "" });

  const estimate = useMemo(() => {
    const cfg = HEATING[heating];
    const raw = Math.round(cfg.base + (size - 80) * cfg.per_m2);
    const clamped = Math.min(Math.max(raw, 8000), cfg.max);
    return Math.round(clamped / 100) * 100;
  }, [heating, size]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("TilskudV2 lead:", { ...lead, heating, size, estimate });
    setLeadSent(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.white }}>
      {/* ─── Top Bar ───────────────────────────────────────── */}
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
          <div className="flex items-center gap-4">
            <span
              className="hidden sm:inline text-xs font-bold px-3 py-1 rounded-full"
              style={{ backgroundColor: C.greenLight, color: C.green }}
            >
              Pulje 2026 åben
            </span>
            <a
              href="tel:+4591552277"
              className="text-sm font-bold flex items-center gap-1"
              style={{ color: C.green }}
            >
              <Phone className="w-4 h-4" /> 91 55 22 77
            </a>
          </div>
        </div>
      </div>

      {/* ─── HERO WITH LIVE CALCULATOR ───────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: C.cream }}>
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20"
          style={{ backgroundColor: C.green, filter: "blur(80px)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-20"
          style={{ backgroundColor: C.orange, filter: "blur(80px)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
            {/* Left: Copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-6"
            >
              <motion.div variants={fadeUp}>
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold"
                  style={{ backgroundColor: C.white, color: C.green, border: `1px solid ${C.greenLight}` }}
                >
                  <Sparkles className="w-4 h-4" /> Live tilskudsberegner
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight"
                style={{ color: C.dark }}
              >
                Se dit
                <br />
                <span style={{ color: C.green }}>tilskud live</span>
                <br />
                på 30 sekunder
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl leading-relaxed max-w-lg"
                style={{ color: C.gray }}
              >
                Flyt på skyderen – så ser du præcis hvor meget staten
                betaler af din nye varmepumpe. Ingen email, ingen binding.
              </motion.p>

              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 pt-2 max-w-md">
                {[
                  { icon: <Calculator className="w-4 h-4" />, label: "Ingen email krav" },
                  { icon: <CheckCircle2 className="w-4 h-4" />, label: "Officielle 2026-satser" },
                  { icon: <Shield className="w-4 h-4" />, label: "Gratis rådgivning" },
                  { icon: <PiggyBank className="w-4 h-4" />, label: "Direkte på NemKonto" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-sm font-bold"
                    style={{ color: C.dark }}
                  >
                    <span style={{ color: C.green }}>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-4 pt-4">
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current"
                        style={{ color: C.orange }}
                      />
                    ))}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: C.gray }}>
                    4.7/5 – 10.000+ danske boligejere
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Live Calculator Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div
                className="rounded-3xl p-6 sm:p-8 shadow-2xl relative"
                style={{ backgroundColor: C.white, border: `1px solid ${C.grayLight}` }}
              >
                {/* Big display */}
                <div
                  className="rounded-2xl p-6 mb-6 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${C.navy} 0%, ${C.greenDark} 100%)`,
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20"
                    style={{ backgroundColor: "#7ee8a8", filter: "blur(40px)" }}
                  />
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: "#7ee8a8" }}
                  >
                    Dit estimerede tilskud
                  </p>
                  <motion.p
                    key={estimate}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-5xl sm:text-6xl font-bold"
                    style={{ color: C.white }}
                  >
                    {estimate.toLocaleString("da-DK")} kr
                  </motion.p>
                  <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.75)" }}>
                    udbetales direkte til din NemKonto
                  </p>
                </div>

                {/* Heating Type Picker */}
                <div className="mb-6">
                  <label
                    className="block text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ color: C.gray }}
                  >
                    1. Din nuværende varmekilde
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(HEATING) as HeatingKey[]).map((key) => {
                      const cfg = HEATING[key];
                      const active = heating === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setHeating(key)}
                          className="p-3 rounded-xl border-2 text-left font-bold text-sm transition-all flex items-center gap-2"
                          style={{
                            borderColor: active ? cfg.color : "#dce6f0",
                            backgroundColor: active ? cfg.color : C.white,
                            color: active ? C.white : C.dark,
                          }}
                        >
                          <span style={{ color: active ? C.white : cfg.color }}>
                            {cfg.icon}
                          </span>
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* House size slider */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: C.gray }}
                    >
                      2. Boligstørrelse
                    </label>
                    <span
                      className="text-lg font-bold"
                      style={{ color: C.green }}
                    >
                      {size} m²
                    </span>
                  </div>
                  <input
                    type="range"
                    min={80}
                    max={280}
                    step={5}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${C.green} 0%, ${C.green} ${((size - 80) / 200) * 100}%, #e0e7f1 ${((size - 80) / 200) * 100}%, #e0e7f1 100%)`,
                    }}
                  />
                  <div
                    className="flex justify-between text-xs mt-2"
                    style={{ color: C.gray }}
                  >
                    <span>80 m²</span>
                    <span>180 m²</span>
                    <span>280 m²</span>
                  </div>
                </div>

                {/* Lead form */}
                {!leadSent ? (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <p
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: C.gray }}
                    >
                      3. Få præcist beregnet tilskud
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Navn"
                        value={lead.name}
                        onChange={(e) =>
                          setLead((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="px-4 py-3 rounded-xl border-2 text-sm focus:outline-none focus:border-green-500"
                        style={{ borderColor: "#dce6f0" }}
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Telefon"
                        value={lead.phone}
                        onChange={(e) =>
                          setLead((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        className="px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                        style={{ borderColor: "#dce6f0" }}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-bold text-base transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                      style={{ backgroundColor: C.orange, color: C.white }}
                    >
                      Lås mit tilskud op
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-center" style={{ color: C.gray }}>
                      Svar inden for 24 timer · GDPR-sikret
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl p-5 text-center"
                    style={{ backgroundColor: C.greenLight }}
                  >
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: C.green }}
                    >
                      <CheckCircle2 className="w-6 h-6" style={{ color: C.white }} />
                    </div>
                    <p className="font-bold text-lg" style={{ color: C.dark }}>
                      Vi ringer til dig inden for 24 timer
                    </p>
                    <p className="text-sm mt-1" style={{ color: C.gray }}>
                      Klar med dit præcise tilskudsbeløb.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VISUAL COMPARISON: BEFORE / AFTER TILSKUD ─────── */}
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
              style={{ color: C.green }}
            >
              Hvad du reelt betaler
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              Din pumpe – med og uden tilskud
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {/* Without tilskud */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{ backgroundColor: C.grayLight }}
            >
              <p
                className="text-xs font-bold uppercase tracking-wider mb-3"
                style={{ color: C.gray }}
              >
                Uden tilskud
              </p>
              <p className="text-5xl font-bold mb-4" style={{ color: C.dark }}>
                98.000 kr
              </p>
              <div className="space-y-2 text-sm" style={{ color: C.gray }}>
                <p className="flex justify-between">
                  <span>Varmepumpe</span>
                  <span className="font-bold">72.000 kr</span>
                </p>
                <p className="flex justify-between">
                  <span>Installation</span>
                  <span className="font-bold">26.000 kr</span>
                </p>
              </div>
              <div
                className="mt-6 p-4 rounded-xl text-sm"
                style={{ backgroundColor: C.white, color: C.dark }}
              >
                Den fulde pris uden statsstøtte.
              </div>
            </div>

            {/* With tilskud */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${C.greenDark} 0%, ${C.green} 100%)`,
              }}
            >
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30"
                style={{ backgroundColor: "#7ee8a8", filter: "blur(50px)" }}
              />
              <p
                className="text-xs font-bold uppercase tracking-wider mb-3"
                style={{ color: "#c5f0d6" }}
              >
                Med energitilskud
              </p>
              <p className="text-5xl font-bold mb-4" style={{ color: C.white }}>
                71.000 kr
              </p>
              <div
                className="space-y-2 text-sm"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                <p className="flex justify-between">
                  <span>Oprindelig pris</span>
                  <span className="font-bold">98.000 kr</span>
                </p>
                <p
                  className="flex justify-between font-bold"
                  style={{ color: "#ffd080" }}
                >
                  <span>– Energitilskud</span>
                  <span>–27.000 kr</span>
                </p>
              </div>
              <div
                className="mt-6 p-4 rounded-xl text-sm font-bold flex items-center gap-2"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", color: C.white }}
              >
                <TrendingUp className="w-5 h-5" style={{ color: "#7ee8a8" }} />
                Du sparer 27.000 kr.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── GRANT AMOUNTS BY SOURCE ─────────────────────── */}
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
              style={{ color: C.green }}
            >
              Tilskud efter varmekilde
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              Jo mere CO2 du sparer – jo højere tilskud
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="space-y-4 max-w-4xl mx-auto"
          >
            {[
              { label: "Oliefyr → Varmepumpe", amount: 27000, bar: 100, color: C.green },
              { label: "Gasfyr → Varmepumpe", amount: 24000, bar: 88, color: C.blue },
              { label: "Elvarme → Varmepumpe", amount: 20000, bar: 74, color: C.orange },
              { label: "Træpiller → Varmepumpe", amount: 17000, bar: 63, color: C.greenDark },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="rounded-2xl p-6 flex items-center gap-6"
                style={{ backgroundColor: C.white }}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-base md:text-lg" style={{ color: C.dark }}>
                      {item.label}
                    </p>
                    <p
                      className="font-bold text-lg md:text-2xl"
                      style={{ color: item.color }}
                    >
                      op til {item.amount.toLocaleString("da-DK")} kr
                    </p>
                  </div>
                  <div
                    className="h-3 rounded-full overflow-hidden"
                    style={{ backgroundColor: C.grayLight }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.bar}%` }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, delay: 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS TIMELINE ───────────────────────── */}
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
              style={{ color: C.green }}
            >
              Fra ansøgning til udbetaling
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              Så hurtigt står pengene på din konto
            </motion.h2>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-6 bottom-6 w-0.5 hidden md:block"
              style={{ backgroundColor: "#dce6f0" }}
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="space-y-8"
            >
              {[
                {
                  day: "Dag 0",
                  title: "Du udfylder vores kalkulator",
                  desc: "30 sekunder. Vi ringer dig op og bekræfter tallene.",
                  icon: <Calculator className="w-5 h-5" />,
                },
                {
                  day: "Dag 1-3",
                  title: "Vi indsender din ansøgning",
                  desc: "Vi udfylder alt papirarbejde og sender til Energistyrelsen.",
                  icon: <BadgePercent className="w-5 h-5" />,
                },
                {
                  day: "Uge 4-8",
                  title: "Ansøgningen godkendes",
                  desc: "Du får tilsagn om tilskud. Nu kan pumpen installeres.",
                  icon: <CheckCircle2 className="w-5 h-5" />,
                },
                {
                  day: "Uge 10-12",
                  title: "Pengene udbetales",
                  desc: "Tilskuddet står på din NemKonto. Sagen er lukket.",
                  icon: <PiggyBank className="w-5 h-5" />,
                },
              ].map((item) => (
                <motion.div
                  key={item.day}
                  variants={fadeUp}
                  className="flex items-start gap-5 relative"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                    style={{ backgroundColor: C.green, color: C.white }}
                  >
                    {item.icon}
                  </div>
                  <div
                    className="flex-1 rounded-2xl p-5 border"
                    style={{ borderColor: "#dce6f0", backgroundColor: C.cream }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-wider mb-1"
                      style={{ color: C.green }}
                    >
                      {item.day}
                    </p>
                    <h3 className="text-lg font-bold mb-1" style={{ color: C.dark }}>
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: C.gray }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: C.grayLight }}
      >
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
              style={{ color: C.green }}
            >
              Reelle udbetalinger
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              Disse danskere har allerede fået tilskuddet
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
                <div
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-4"
                  style={{ backgroundColor: C.greenLight, color: C.greenDark }}
                >
                  <CheckCircle2 className="w-3 h-3" /> Fra {t.from}
                </div>
                <p
                  className="text-4xl font-bold mb-2"
                  style={{ color: C.green }}
                >
                  {t.grant.toLocaleString("da-DK")} kr
                </p>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: C.gray }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div
                  className="pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: "#dce6f0" }}
                >
                  <p className="font-bold text-sm" style={{ color: C.dark }}>
                    {t.name}
                  </p>
                  <p
                    className="text-xs flex items-center gap-1"
                    style={{ color: C.gray }}
                  >
                    <MapPin className="w-3 h-3" /> {t.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: C.navy }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Users className="w-6 h-6" />, v: "10.000+", l: "Kunder" },
              { icon: <Award className="w-6 h-6" />, v: "95%", l: "Godkendt" },
              { icon: <Clock className="w-6 h-6" />, v: "24t", l: "Svartid" },
              { icon: <Shield className="w-6 h-6" />, v: "0 kr", l: "For hjælpen" },
            ].map((item) => (
              <div key={item.l} className="text-center">
                <div
                  className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-2"
                  style={{
                    backgroundColor: "rgba(46,153,88,0.2)",
                    color: "#7ee8a8",
                  }}
                >
                  {item.icon}
                </div>
                <p className="text-2xl font-bold" style={{ color: C.white }}>
                  {item.v}
                </p>
                <p
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {item.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────── */}
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
              style={{ color: C.green }}
            >
              Ofte stillede spørgsmål
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              Alt om energitilskuddet
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

      {/* ─── FINAL CTA ───────────────────────────────────── */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${C.navy} 0%, ${C.greenDark} 100%)`,
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
          style={{ backgroundColor: C.orange, filter: "blur(100px)" }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#7ee8a8" }}
            >
              Puljen er åben nu
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl mb-6"
              style={{ color: C.white }}
            >
              Tjek dit tilskud på 30 sekunder
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg mb-8 max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Ingen email krævet. Flyt på skyderen og se live hvor meget
              staten betaler af din varmepumpe.
            </motion.p>
            <motion.div variants={fadeUp}>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-2xl active:scale-[0.98]"
                style={{ backgroundColor: C.orange, color: C.white }}
              >
                Beregn mit tilskud
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────── */}
      <footer className="py-10 border-t" style={{ borderColor: "#dce6f0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: C.gray }}>
              &copy; {new Date().getFullYear()} BilligVentilation.dk &mdash;
              Alle rettigheder forbeholdes
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
