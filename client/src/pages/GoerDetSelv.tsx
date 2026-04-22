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
  Wrench,
  HardHat,
  AlertTriangle,
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

// ─── Installation Timeline Data ─────────────────────────────────
const TIMELINE_STEPS = [
  {
    hours: "Time 1-3",
    title: "Udpakning, planering og gennemboring",
    desc: "Udpakning af varer, planering af underlag til udedel, gennemboring til rørtræk.",
    diy: true,
    note: null,
  },
  {
    hours: "Time 3-5",
    title: "Bortskaffelse af eksisterende fyr",
    desc: "Fjernelse af gammelt fyr. Kan tage op til 2 timer ekstra.",
    diy: false,
    note: "Anbefales at benytte autoriseret VVS. Krav til VVS-autorisation ved f.eks. gas.",
  },
  {
    hours: "Time 3-4",
    title: "Stille ude- og indedel på plads",
    desc: "Placering af udendørs- og indendørsenhed på de rigtige positioner.",
    diy: true,
    note: null,
  },
  {
    hours: "Time 4-8",
    title: "Vandrørsføring",
    desc: "Føring af vandrør mellem ude- og indedel.",
    diy: true,
    note: null,
  },
  {
    hours: "Time 8-10",
    title: "Elkabelføring",
    desc: "Føring af elkabler til varmepumpen.",
    diy: true,
    note: null,
  },
  {
    hours: "Time 10-12",
    title: "Montering af VVS-ventiler",
    desc: "Montering af nødvendige ventiler i VVS-systemet.",
    diy: true,
    note: null,
  },
  {
    hours: "Time 12-14",
    title: "Elskabskobling, sikkerhedsafbryder og bimåler",
    desc: "Tilslutning til elskab med sikkerhedsafbryder og bimåler.",
    diy: false,
    note: "Anbefales at benytte autoriseret elektriker. Næsten altid krav.",
  },
  {
    hours: "Time 14-15",
    title: "Koldtvandstilslutning VVS",
    desc: "Tilslutning af koldt vand til varmepumpens VVS-system.",
    diy: false,
    note: "Krav til at benytte autoriseret VVS.",
  },
  {
    hours: "Time 15-17",
    title: "Udluftning af centralvarmekreds",
    desc: "Udluftning af hele centralvarmekredsen for optimal drift.",
    diy: true,
    note: null,
  },
  {
    hours: "Time 17-19",
    title: "Isolering af rør",
    desc: "Isolering af alle rør for at minimere varmetab.",
    diy: true,
    note: null,
  },
  {
    hours: "Time 19-20",
    title: "Opstart og indregulering",
    desc: "Opstart af varmepumpen og indregulering af systemet.",
    diy: true,
    note: "Anbefales at benytte producenten til opstart så vidt muligt.",
  },
  {
    hours: "Time 20-21",
    title: "Oprydning",
    desc: "Oprydning og færdiggørelse af installationen.",
    diy: true,
    note: null,
  },
];

// ─── FAQ Data ────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    q: "Er det lovligt at montere en varmepumpe selv?",
    a: "Ja, du må selv lave størstedelen af arbejdet. Kun el-tilslutning (elskab, sikkerhedsafbryder) kræver autoriseret elektriker, og visse VVS-opgaver kræver autoriseret VVS'er. Alt det øvrige – rørtræk, isolering, placering – kan du sagtens klare selv.",
  },
  {
    q: "Hvor meget kan jeg spare ved gør-det-selv?",
    a: "De fleste sparer mellem 20.000 og 50.000 kr. på montagen. En typisk montør tager 40.000-60.000 kr. for en komplet installation. Ved at gøre det meste selv, betaler du kun for de timer der kræver autorisation.",
  },
  {
    q: "Hvad hvis jeg laver en fejl?",
    a: "De fleste trin er relativt enkle og kan rettes. Det vigtige er, at de autoriserede opgaver (el og VVS-tilslutning) udføres af fagfolk. Vi guider dig igennem hele processen, og du kan altid ringe til os for hjælp.",
  },
  {
    q: "Hvor lang tid tager det at montere selv?",
    a: "Hele processen tager ca. 21 timer fordelt over 2-3 weekender. De fleste af vores kunder er færdige på under 3 weekender. Du behøver ikke gøre det hele på én gang.",
  },
  {
    q: "Mister jeg garantien ved selv-montage?",
    a: "Nej. Garantien på selve varmepumpen gælder stadig. Det vigtige er, at de autoriserede dele af installationen udføres korrekt af fagfolk. Vi hjælper dig med at sikre dette.",
  },
  {
    q: "Kan I hjælpe mig med at finde en montør til de autoriserede dele?",
    a: "Ja! Vi har et netværk af autoriserede elektrikere og VVS'ere, der kan tage de opgaver der kræver autorisation. De kender vores varmepumper og kan hurtigt udføre arbejdet.",
  },
  {
    q: "Hvilke værktøjer skal jeg bruge?",
    a: "Grundlæggende håndværktøj: boremaskine, vaterpas, skruetrækkere, rørtang og et sæt gaffelnøgler. Du behøver ikke specialværktøj – alt kan klares med standard DIY-udstyr.",
  },
  {
    q: "Får jeg stadig energitilskud?",
    a: "Ja, du kan stadig få op til 27.000 kr. i energitilskud fra staten. Tilskuddet afhænger af varmepumpen – ikke af hvem der monterer den. Vi hjælper dig med ansøgningen.",
  },
];

// ─── Testimonials ────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Søren Henriksen",
    location: "Vejle",
    text: "Jeg var nervøs for at gøre det selv, men det var faktisk overraskende nemt. Sparede 42.000 kr. på montagen og brugte kun en elektriker i 3 timer. Bedste weekend-projekt nogensinde.",
    savings: "42.000 kr.",
    rating: 5,
  },
  {
    name: "Lene & Peter Sørensen",
    location: "Silkeborg",
    text: "Vi gjorde det sammen over 2 weekender. BilligVentilation guidede os hele vejen. Kun el-tilslutningen krævede en fagmand. Vi sparede over 35.000 kr.",
    savings: "35.000 kr.",
    rating: 5,
  },
  {
    name: "Mikkel Andersen",
    location: "Holbæk",
    text: "Som håndværker var det nemt, men selv min nabo uden erfaring klarede det med lidt hjælp. Tricket er at følge trin-for-trin guiden. Sparer kassen.",
    savings: "48.000 kr.",
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
export default function GoerDetSelv() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    homeSize: "",
    heatingType: "",
    experience: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setFormStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setFormStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead submitted:", formData);
    setFormStep(5);
  };

  const diyCount = TIMELINE_STEPS.filter((s) => s.diy).length;
  const proCount = TIMELINE_STEPS.filter((s) => !s.diy).length;

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
                "linear-gradient(135deg, rgba(26,43,74,0.90) 0%, rgba(46,139,203,0.78) 50%, rgba(26,43,74,0.88) 100%)",
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
                  Gør-det-selv montage
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
                style={{ color: C.white }}
              >
                Du behøver ikke betale
                <br />
                <span style={{ color: "#0193f4" }}>50.000 kr. for montage</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl leading-relaxed max-w-lg"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Vi viser dig hvordan. Varmepumpen køber du hos os.
                Montøren finder du selv – eller vi hjælper dig med det.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
                {[
                  "Køb pumpen hos os",
                  "Find montør selv eller via os",
                  "Samme resultat, lavere pris",
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
                    Vores kunder monterer selv og sparer tusindvis
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
                    style={{ backgroundColor: C.orangeLight }}
                  >
                    <Wrench className="w-5 h-5" style={{ color: C.orange }} />
                  </div>
                  <div>
                    <p className="font-bold text-lg" style={{ color: C.dark }}>
                      Start dit gør-det-selv projekt
                    </p>
                    <p className="text-sm" style={{ color: C.gray }}>
                      Svar på {formStep < 5 ? "4" : ""} spørgsmål – det tager 2 min.
                    </p>
                  </div>
                </div>

                {formStep < 5 && (
                  <div className="flex gap-1.5 mb-6">
                    {[1, 2, 3, 4].map((s) => (
                      <div
                        key={s}
                        className="h-1.5 rounded-full flex-1 transition-all duration-300"
                        style={{
                          backgroundColor: s <= formStep ? C.orange : "#e0e7f1",
                        }}
                      />
                    ))}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
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
                                  formData.homeSize === opt ? C.orange : "#dce6f0",
                                backgroundColor:
                                  formData.homeSize === opt ? C.orangeLight : C.white,
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

                  {formStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <label className="block font-bold text-base" style={{ color: C.dark }}>
                        Hvordan opvarmes din bolig nu?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["Oliefyr", "Gasfyr", "Elvarme", "Andet / Ved ikke"].map(
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
                                  formData.heatingType === opt ? C.orange : "#dce6f0",
                                backgroundColor:
                                  formData.heatingType === opt ? C.orangeLight : C.white,
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

                  {formStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <label className="block font-bold text-base" style={{ color: C.dark }}>
                        Har du erfaring med gør-det-selv?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["Ja, meget", "Lidt erfaring", "Nybegynder", "Vil have hjælp"].map(
                          (opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                handleChange("experience", opt);
                                nextStep();
                              }}
                              className="p-4 rounded-xl border-2 text-left font-bold text-sm transition-all hover:shadow-md"
                              style={{
                                borderColor:
                                  formData.experience === opt ? C.orange : "#dce6f0",
                                backgroundColor:
                                  formData.experience === opt ? C.orangeLight : C.white,
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

                  {formStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <label className="block font-bold text-base" style={{ color: C.dark }}>
                        Hvor skal vi sende din gør-det-selv guide?
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
                        Få din gratis montage-guide →
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
                        Tak! Din guide er på vej
                      </h3>
                      <p style={{ color: C.gray }}>
                        Vi sender din gør-det-selv montage-guide inden for 24 timer.
                      </p>
                    </motion.div>
                  )}
                </form>

                {formStep < 5 && (
                  <p className="text-xs text-center mt-4" style={{ color: C.gray }}>
                    Uforpligtende · Gratis guide · Ingen binding
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── DIY vs. PRO STATS ────────────────────────────────── */}
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
              style={{ color: C.orange }}
            >
              Det er ikke så svært som du tror
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              {diyCount} ud af {TIMELINE_STEPS.length} trin kan du selv
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg mt-4 max-w-2xl mx-auto"
              style={{ color: C.gray }}
            >
              Kun {proCount} trin kræver en autoriseret fagmand. Resten klarer du selv
              – og sparer 20.000-50.000 kr.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          >
            {/* Traditional price */}
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
                Fuld montage af firma
              </p>
              <p
                className="text-4xl sm:text-5xl font-bold mb-3"
                style={{ color: "#c0392b", fontSize: "55px" }}
              >
                40.000-60.000 kr
              </p>
              <p className="text-sm mb-6" style={{ color: C.gray }}>
                Typisk montagepris ved traditionelt firma
              </p>
              <div className="space-y-3">
                {[
                  "Betaler for timer du selv kan klare",
                  "Stor avance på simple opgaver",
                  "Ingen kontrol over processen",
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

            {/* Savings */}
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
                50.000 kr
              </p>
              <p className="text-sm mt-2" style={{ color: C.gray }}>
                ved at gøre det meste selv
              </p>
            </motion.div>

            {/* DIY price */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-8 border-2 relative overflow-hidden shadow-lg"
              style={{ borderColor: C.orange, backgroundColor: C.white }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: C.orange }}
              />
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: C.orangeLight, color: C.orange }}
              >
                Gør-det-selv
              </div>
              <p
                className="text-sm font-bold uppercase tracking-wider mb-2"
                style={{ color: C.orange }}
              >
                Din pris med gør-det-selv
              </p>
              <p className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: C.orange, fontSize: "55px" }}>
                5.000-15.000 kr
              </p>
              <p className="text-sm mb-6" style={{ color: C.gray }}>
                Kun betaling for autoriseret el og VVS
              </p>
              <div className="space-y-3">
                {[
                  "Du gør det meste selv",
                  "Kun fagmand til det nødvendige",
                  "Fuld kontrol over hele processen",
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

      {/* ─── INSTALLATION TIMELINE ────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.white }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              style={{ color: C.orange }}
            >
              Montage-guide
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              Montage af luft/vand varmepumpe
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg mt-4"
              style={{ color: C.gray }}
            >
              Time for time – så du ved præcis hvad du kan selv
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="space-y-4"
          >
            {TIMELINE_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="rounded-xl p-6 border-2 transition-all hover:shadow-md"
                style={{
                  borderColor: step.diy ? C.green : C.orange,
                  backgroundColor: step.diy ? C.greenLight : C.orangeLight,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: step.diy ? C.green : C.orange,
                      color: C.white,
                    }}
                  >
                    {step.diy ? (
                      <HardHat className="w-6 h-6" />
                    ) : (
                      <Shield className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: step.diy ? C.green : C.orange,
                          color: C.white,
                        }}
                      >
                        {step.hours}
                      </span>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: step.diy
                            ? "rgba(76,175,80,0.15)"
                            : "rgba(255,149,0,0.15)",
                          color: step.diy ? C.green : C.orange,
                        }}
                      >
                        {step.diy ? "Gør det selv" : "Kræver fagmand"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-1" style={{ color: C.dark }}>
                      {idx + 1}. {step.title}
                    </h3>
                    <p className="text-sm" style={{ color: C.gray }}>
                      {step.desc}
                    </p>
                    {step.note && (
                      <div className="flex items-start gap-2 mt-2">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.orange }} />
                        <p className="text-xs font-bold" style={{ color: C.orange }}>
                          {step.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mt-8 rounded-xl p-6 text-center"
            style={{ backgroundColor: C.greenLight, border: `2px solid ${C.green}` }}
          >
            <p className="text-lg font-bold" style={{ color: C.green }}>
              Total: ca. 21 timer over 2-3 weekender
            </p>
            <p className="text-sm mt-1" style={{ color: C.gray }}>
              {diyCount} trin selv · {proCount} trin med fagmand · Ingen erfaring nødvendig
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ───────────────────────────────────── */}
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
              Sådan kommer du i gang
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              3 enkle trin til din varmepumpe
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
                title: "Køb pumpen hos os",
                desc: "Vi sælger varmepumper fra Panasonic, Bosch og Metro Therm til konkurrencedygtige priser – uden dyr montagepakke.",
                icon: <Zap className="w-6 h-6" />,
                color: C.blue,
                bg: C.blueLight,
              },
              {
                step: "02",
                title: "Montér selv med vores guide",
                desc: "Følg vores trin-for-trin guide. Du klarer det meste selv – kun el og visse VVS-dele kræver en fagmand.",
                icon: <Wrench className="w-6 h-6" />,
                color: C.orange,
                bg: C.orangeLight,
              },
              {
                step: "03",
                title: "Find montør til det nødvendige",
                desc: "Vi hjælper dig med at finde en autoriseret elektriker og VVS'er til de få timer, der kræver en fagmand.",
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
                style={{ color: C.orange }}
              >
                Hvorfor gør-det-selv?
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl mb-6"
                style={{ color: C.dark }}
              >
                Montøren tager 50.000 kr. for 21 timers arbejde
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-lg leading-relaxed mb-8"
                style={{ color: C.gray }}
              >
                Det meste af arbejdet er faktisk ret enkelt – udpakning, placering,
                rørtræk og isolering. Du betaler en montør over 2.000 kr/time
                for ting, du sagtens kan klare selv.
              </motion.p>
              <motion.div variants={fadeUp} className="space-y-4">
                {[
                  "Montøren lægger stor avance på simple opgaver",
                  "Du betaler for timer du selv kan klare på en weekend",
                  "Kun 3-5 timer kræver faktisk en autoriseret fagmand",
                  "Resten er standard gør-det-selv arbejde",
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
                src={IMAGES.technician}
                alt="Montage af varmepumpe"
                className="rounded-2xl shadow-xl w-full"
              />
              <div
                className="absolute -bottom-6 -left-6 rounded-xl p-5 shadow-lg"
                style={{ backgroundColor: C.white }}
              >
                <p className="text-sm font-bold" style={{ color: C.gray }}>
                  Gns. besparelse på montage
                </p>
                <p className="text-3xl font-bold" style={{ color: C.green }}>
                  38.000 kr
                </p>
              </div>
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
              Gør-det-selv kunder
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              De gjorde det selv – og sparede tusindvis
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
              { icon: <Wrench className="w-7 h-7" />, value: "75%", label: "Monterer selv" },
              { icon: <Clock className="w-7 h-7" />, value: "21 timer", label: "Total montagetid" },
              { icon: <Shield className="w-7 h-7" />, value: "3-5 år", label: "Garanti" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div
                  className="w-14 h-14 rounded-xl mx-auto flex items-center justify-center mb-3"
                  style={{ backgroundColor: "rgba(255,149,0,0.2)", color: C.orange }}
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

      {/* ─── ENERGY SUBSIDY ───────────────────────────────────── */}
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
                Staten betaler op til 27.000 kr – også ved gør-det-selv
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-lg leading-relaxed mb-8"
                style={{ color: C.gray }}
              >
                Tilskuddet afhænger af varmepumpen – ikke af hvem der monterer den.
                Du får det fulde tilskud, uanset om du monterer selv eller bruger et firma.
              </motion.p>
              <motion.div variants={fadeUp} className="space-y-3">
                {[
                  "Op til 27.000 kr. i tilskud fra staten",
                  "Gælder også ved gør-det-selv montage",
                  "Vi hjælper dig med ansøgningen",
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
              Gør-det-selv FAQ
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
        style={{ backgroundColor: C.orange }}
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
              Klar til at spare 50.000 kr?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg mb-8 max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Få din gratis gør-det-selv montage-guide og se præcis
              hvad du kan klare selv – og hvad der kræver en fagmand.
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
                style={{ backgroundColor: C.white, color: C.orange }}
              >
                Få din gratis guide nu
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
