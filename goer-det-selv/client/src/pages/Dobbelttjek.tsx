import { useState } from "react";
import { motion } from "framer-motion";
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
  Award,
  Clock,
  MapPin,
} from "lucide-react";

// ─── Brand Assets ────────────────────────────────────────────────
const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/hero-house-heatpump-ihVZgyscJpE8VmEuqigtXu.webp",
  heatpump: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/heatpump-closeup-7ha7wnuAVACjRiB85e2Vdj.webp",
  family: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/happy-family-home-BroX8spFkM8eBq3b8GQzRm.webp",
  technician: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/technician-install-Mj88npoE9GRKNVo3BuHHgr.webp",
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

// ─── Animation Variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

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
  {
    q: "Hvad er forskellen på jeres pris og en samlet løsning?",
    a: "Når du køber en samlet løsning, betaler du ofte en stor avance på montagen. Hos os køber du pumpen til den rigtige pris og finder selv montør – eller vi hjælper dig. Det sparer typisk 20.000-60.000 kr.",
  },
  {
    q: "Hvor lang tid tager en installation?",
    a: "En typisk installation tager 1-2 dage. Selve varmepumpen kan leveres inden for 1-2 uger efter bestilling.",
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
    <div
      className="border-b transition-colors"
      style={{ borderColor: "#dce6f0" }}
    >
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
export default function Dobbelttjek() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    homeSize: "",
    heatingType: "",
    insulation: "",
    quotedPrice: "",
    name: "",
    email: "",
    phone: "",
    postnummer: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setFormStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setFormStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead submitted:", formData);
    setFormStep(5); // success state
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
        {/* Background image */}
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-6"
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
                <span style={{ color: '#0193f4' }}>på 100.000 kr?</span>
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

              <motion.div variants={fadeUp} className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=80&h=80&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&h=80&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Kunde"
                      className="w-10 h-10 rounded-full border-2 object-cover"
                      style={{ borderColor: C.white }}
                    />
                  ))}
                </div>
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
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                    4.7/5 baseret på 10.000+ kunder
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div
                className="rounded-2xl p-6 sm:p-8 shadow-2xl"
                style={{ backgroundColor: C.white }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: C.blueLight }}
                  >
                    <Zap className="w-5 h-5" style={{ color: C.blue }} />
                  </div>
                  <div>
                    <p className="font-bold text-lg" style={{ color: C.dark }}>
                      Få et gratis pristjek
                    </p>
                    <p className="text-sm" style={{ color: C.gray }}>
                      Svar på {formStep < 5 ? "4" : ""} spørgsmål – det tager 2 min.
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                {formStep < 5 && (
                  <div className="flex gap-1.5 mb-6">
                    {[1, 2, 3, 4].map((s) => (
                      <div
                        key={s}
                        className="h-1.5 rounded-full flex-1 transition-all duration-300"
                        style={{
                          backgroundColor: s <= formStep ? C.blue : "#e0e7f1",
                        }}
                      />
                    ))}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Home size */}
                  {formStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <label className="block font-bold text-base" style={{ color: C.dark }}>
                        Hvor mange m² er din bolig?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["Under 100 m²", "100-150 m²", "150-200 m²", "Over 200 m²"].map(
                          (opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                handleChange("homeSize", opt);
                                nextStep();
                              }}
                              className="p-4 rounded-xl border-2 text-left font-bold text-sm transition-all hover:shadow-md"
                              style={{
                                borderColor:
                                  formData.homeSize === opt ? C.blue : "#dce6f0",
                                backgroundColor:
                                  formData.homeSize === opt ? C.blueLight : C.white,
                                color: C.dark,
                              }}
                            >
                              {opt}
                            </button>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Heating type */}
                  {formStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <label className="block font-bold text-base" style={{ color: C.dark }}>
                        Hvordan er din bolig opvarmet?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["Radiator", "Gulvvarme", "Kombination", "Ved ikke"].map(
                          (opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                handleChange("heatingType", opt);
                                nextStep();
                              }}
                              className="p-4 rounded-xl border-2 text-left font-bold text-sm transition-all hover:shadow-md"
                              style={{
                                borderColor:
                                  formData.heatingType === opt ? C.blue : "#dce6f0",
                                backgroundColor:
                                  formData.heatingType === opt ? C.blueLight : C.white,
                                color: C.dark,
                              }}
                            >
                              {opt}
                            </button>
                          )
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={prevStep}
                        className="text-sm font-bold mt-2"
                        style={{ color: C.blue }}
                      >
                        ← Tilbage
                      </button>
                    </motion.div>
                  )}

                  {/* Step 3: Insulation */}
                  {formStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <label className="block font-bold text-base" style={{ color: C.dark }}>
                        Hvor godt er dit hus isoleret? (gulv, væg og loft)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["0-100 mm", "100-250 mm", "300 mm og over", "Ved ikke"].map(
                          (opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                handleChange("insulation", opt);
                                nextStep();
                              }}
                              className="p-4 rounded-xl border-2 text-left font-bold text-sm transition-all hover:shadow-md"
                              style={{
                                borderColor:
                                  formData.insulation === opt ? C.blue : "#dce6f0",
                                backgroundColor:
                                  formData.insulation === opt ? C.blueLight : C.white,
                                color: C.dark,
                              }}
                            >
                              {opt}
                            </button>
                          )
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={prevStep}
                        className="text-sm font-bold mt-2"
                        style={{ color: C.blue }}
                      >
                        ← Tilbage
                      </button>
                    </motion.div>
                  )}

                  {/* Step 4: Contact info */}
                  {formStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <label className="block font-bold text-base" style={{ color: C.dark }}>
                        Hvor skal vi sende dit pristjek?
                      </label>
                      <input
                        type="text"
                        placeholder="Dit navn"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                        style={{ borderColor: "#dce6f0" }}
                        required
                      />
                      <input
                        type="email"
                        placeholder="Din email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                        style={{ borderColor: "#dce6f0" }}
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Dit telefonnummer"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                        style={{ borderColor: "#dce6f0" }}
                        required
                      />

                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg active:scale-[0.98]"
                        style={{ backgroundColor: C.orange, color: C.white }}
                      >
                        Få dit gratis pristjek →
                      </button>
                      <button
                        type="button"
                        onClick={prevStep}
                        className="text-sm font-bold"
                        style={{ color: C.blue }}
                      >
                        ← Tilbage
                      </button>
                    </motion.div>
                  )}

                  {/* Step 5: Success */}
                  {formStep === 5 && (
                    <motion.div
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
                </form>

                {formStep < 5 && (
                  <p className="text-xs text-center mt-4" style={{ color: C.gray }}>
                    Uforpligtende · Svar inden for 24 timer · Ingen binding
                  </p>
                )}
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
            {/* Their price */}
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

            {/* Savings arrow */}
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

            {/* Our price */}
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
              <p className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: C.blue, fontSize: "55px" }}>
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

      {/* ─── PROBLEM / SOLUTION ─────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.grayLight }}>
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
                style={{ color: C.orange }}
              >
                Problemet
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl mb-6"
                style={{ color: C.dark }}
              >
                Hvorfor betaler du for meget?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-lg leading-relaxed mb-8"
                style={{ color: C.gray }}
              >
                Det sker for rigtig mange. En samlet pris med montage, tilbehør og
                finansiering kan hurtigt se overvældende ud – men selve varmepumpen
                behøver ikke koste det.
              </motion.p>
              <motion.div variants={fadeUp} className="space-y-4">
                {[
                  "Montøren lægger stor avance oveni pumpen",
                  "Du betaler for ting du ikke har brug for",
                  "Prisen er uigennemsigtig og svær at sammenligne",
                  "Mange firmaer udnytter at du ikke kender markedsprisen",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#fde8e8" }}
                    >
                      <span className="text-xs font-bold" style={{ color: "#c0392b" }}>
                        !
                      </span>
                    </div>
                    <p className="text-base" style={{ color: C.dark }}>
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
              className="relative"
            >
              <img
                src={IMAGES.heatpump}
                alt="Varmepumpe closeup"
                className="rounded-2xl shadow-xl w-full"
              />
              <div
                className="absolute -bottom-6 -left-6 rounded-xl p-5 shadow-lg"
                style={{ backgroundColor: C.white }}
              >
                <p className="text-sm font-bold" style={{ color: C.gray }}>
                  Gennemsnitlig besparelse
                </p>
                <p className="text-3xl font-bold" style={{ color: C.green }}>
                  37.500 kr
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SOLUTION ───────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.white }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <img
                src={IMAGES.technician}
                alt="Montør installerer varmepumpe"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="order-1 lg:order-2"
            >
              <motion.p
                variants={fadeUp}
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: C.green }}
              >
                Løsningen
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl mb-6"
                style={{ color: C.dark }}
              >
                Samme varmepumpe. Helt anden pris.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-lg leading-relaxed mb-8"
                style={{ color: C.gray }}
              >
                Vi sælger den samme varmepumpe du blev tilbudt – fra de samme
                mærker (Panasonic, Bosch og Metro Therm) – med samme garanti.
                Bare uden den store avance.
              </motion.p>
              <motion.div variants={fadeUp} className="space-y-4">
                {[
                  { text: "Varmepumper fra 26.000 kr", icon: <Zap className="w-5 h-5" /> },
                  { text: "3-5 års garanti på alle produkter", icon: <Shield className="w-5 h-5" /> },
                  { text: "Vi hjælper dig med at finde montør", icon: <Users className="w-5 h-5" /> },
                  { text: "Op til 27.000 kr i energitilskud", icon: <Award className="w-5 h-5" /> },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: C.greenLight, color: C.green }}
                    >
                      {item.icon}
                    </div>
                    <p className="text-base font-bold" style={{ color: C.dark }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
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
                    <p className="text-sm flex items-center gap-1" style={{ color: C.gray }}>
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

      {/* ─── SOCIAL PROOF IMAGE ─────────────────────────────── */}
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
              <a href="tel:+4591552277" className="text-sm font-bold flex items-center gap-1" style={{ color: C.blue }}>
                <Phone className="w-4 h-4" /> 91 55 22 77
              </a>
              <a href="https://billigventilation.dk" className="text-sm font-bold" style={{ color: C.blue }}>
                billigventilation.dk
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
