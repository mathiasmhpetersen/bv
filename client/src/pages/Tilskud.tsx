import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Phone,
  Shield,
  Star,
  Users,
  Award,
  FileCheck,
  HandCoins,
  BadgePercent,
  Sparkles,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react";

// ─── Brand Assets ────────────────────────────────────────────────
const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/hero-house-heatpump-ihVZgyscJpE8VmEuqigtXu.webp",
  family:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/happy-family-home-BroX8spFkM8eBq3b8GQzRm.webp",
  technician:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/technician-install-Mj88npoE9GRKNVo3BuHHgr.webp",
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

// ─── FAQ ─────────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    q: "Hvor meget kan jeg få i energitilskud?",
    a: "Du kan typisk få mellem 15.000 og 27.000 kr. i tilskud, afhængigt af pumpens størrelse, dit nuværende varmesystem og dit tidligere varmeforbrug. Jo større besparelse i CO2, jo højere tilskud.",
  },
  {
    q: "Hvem kan søge tilskud?",
    a: "Alle private boligejere kan søge. Dit hus skal være helårsbolig og opvarmes med olie, gas, elvarme eller træpiller. Sommerhuse og fjernvarme-huse er ikke omfattet af ordningen.",
  },
  {
    q: "Hvornår skal jeg søge tilskuddet?",
    a: "Du skal ansøge om tilskuddet FØR du bestiller varmepumpen. Vi hjælper dig med ansøgningen, så du ikke mister muligheden for tilskud.",
  },
  {
    q: "Hvor lang er sagsbehandlingstiden?",
    a: "Energistyrelsen behandler typisk ansøgninger inden for 4-8 uger. Vi indsender ansøgningen for dig og følger op undervejs.",
  },
  {
    q: "Hvad hvis min ansøgning bliver afvist?",
    a: "Det er meget sjældent, når ansøgningen er korrekt udfyldt. Vi har over 95% succesrate, og vores eksperter sikrer at alt er på plads før indsendelse.",
  },
  {
    q: "Kan jeg kombinere tilskuddet med håndværkerfradrag?",
    a: "Ja. Du kan både få energitilskud og håndværkerfradrag på arbejdslønnen. Samlet kan du spare op til 35.000 kr. mellem de to ordninger.",
  },
  {
    q: "Koster det noget at få hjælp til ansøgningen?",
    a: "Nej. Vi hjælper dig gratis med hele ansøgningen, når du køber din varmepumpe hos os. Du skal ikke betale ekstra for assistancen.",
  },
  {
    q: "Udbetales tilskuddet direkte til mig?",
    a: "Ja, tilskuddet udbetales direkte til din NemKonto, når installationen er afsluttet og dokumentationen er godkendt af Energistyrelsen.",
  },
];

// ─── Testimonials ────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Lars Mikkelsen",
    location: "Viborg",
    text: "Vidste ikke engang at tilskuddet fandtes, før jeg kontaktede BilligVentilation. De hjalp mig med hele ansøgningen, og jeg fik 24.500 kr. retur. Super service.",
    grant: "24.500 kr.",
    rating: 5,
  },
  {
    name: "Hanne Poulsen",
    location: "Horsens",
    text: "De gjorde det hele for mig – udfyldte papirerne, sendte ansøgningen ind og holdt mig opdateret. 6 uger efter lå de 22.000 kr. på min konto.",
    grant: "22.000 kr.",
    rating: 5,
  },
  {
    name: "Jens Sørensen",
    location: "Silkeborg",
    text: "Fik det fulde beløb på 27.000 kr. Havde ikke troet at staten ville betale så meget, men det gør de faktisk når man skifter fra oliefyr til varmepumpe.",
    grant: "27.000 kr.",
    rating: 5,
  },
];

// ─── FAQ Accordion Item ──────────────────────────────────────────
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
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════
export default function Tilskud() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    currentHeating: "",
    homeSize: "",
    buildYear: "",
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
    console.log("Tilskud lead submitted:", formData);
    setFormStep(5);
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
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: C.navy }}
          >
            BilligVentilation.dk
          </span>
          <span className="text-sm font-bold" style={{ color: C.green }}>
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
                "linear-gradient(135deg, rgba(15,27,51,0.9) 0%, rgba(46,153,88,0.7) 50%, rgba(15,27,51,0.88) 100%)",
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
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4"
                  style={{
                    backgroundColor: "rgba(255,149,0,0.2)",
                    color: "#FFB74D",
                  }}
                >
                  <Sparkles className="w-4 h-4" /> Energitilskud 2026
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
                style={{ color: C.white }}
              >
                Få op til
                <br />
                <span style={{ color: "#7ee8a8" }}>27.000 kr</span> i tilskud
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl leading-relaxed max-w-lg"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Staten betaler en del af din nye varmepumpe. Vi hjælper dig
                gratis med ansøgningen, så du får hele tilskuddet udbetalt.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-4 pt-2"
              >
                {[
                  "Gratis ansøgningshjælp",
                  "95% bliver godkendt",
                  "Udbetaling på NemKonto",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 text-sm font-bold"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    <CheckCircle2
                      className="w-5 h-5"
                      style={{ color: "#7ee8a8" }}
                    />
                    {item}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-4 pt-4"
              >
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
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
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
                    style={{ backgroundColor: C.greenLight }}
                  >
                    <HandCoins className="w-5 h-5" style={{ color: C.green }} />
                  </div>
                  <div>
                    <p className="font-bold text-lg" style={{ color: C.dark }}>
                      Tjek dit tilskud – gratis
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
                          backgroundColor: s <= formStep ? C.green : "#e0e7f1",
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
                      <label
                        className="block font-bold text-base"
                        style={{ color: C.dark }}
                      >
                        Hvordan opvarmer du din bolig i dag?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["Oliefyr", "Gasfyr", "Elvarme", "Træpillefyr"].map(
                          (opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                handleChange("currentHeating", opt);
                                nextStep();
                              }}
                              className="p-4 rounded-xl border-2 text-left font-bold text-sm transition-all hover:shadow-md"
                              style={{
                                borderColor:
                                  formData.currentHeating === opt
                                    ? C.green
                                    : "#dce6f0",
                                backgroundColor:
                                  formData.currentHeating === opt
                                    ? C.greenLight
                                    : C.white,
                                color: C.dark,
                              }}
                            >
                              {opt}
                            </button>
                          ),
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
                      <label
                        className="block font-bold text-base"
                        style={{ color: C.dark }}
                      >
                        Hvor stor er din bolig?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          "Under 100 m²",
                          "100-150 m²",
                          "150-200 m²",
                          "Over 200 m²",
                        ].map((opt) => (
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
                                formData.homeSize === opt ? C.green : "#dce6f0",
                              backgroundColor:
                                formData.homeSize === opt
                                  ? C.greenLight
                                  : C.white,
                              color: C.dark,
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={prevStep}
                        className="text-sm font-bold mt-2"
                        style={{ color: C.green }}
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
                      <label
                        className="block font-bold text-base"
                        style={{ color: C.dark }}
                      >
                        Hvornår er dit hus bygget?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          "Før 1970",
                          "1970-1990",
                          "1990-2010",
                          "Efter 2010",
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              handleChange("buildYear", opt);
                              nextStep();
                            }}
                            className="p-4 rounded-xl border-2 text-left font-bold text-sm transition-all hover:shadow-md"
                            style={{
                              borderColor:
                                formData.buildYear === opt
                                  ? C.green
                                  : "#dce6f0",
                              backgroundColor:
                                formData.buildYear === opt
                                  ? C.greenLight
                                  : C.white,
                              color: C.dark,
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={prevStep}
                        className="text-sm font-bold mt-2"
                        style={{ color: C.green }}
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
                      <label
                        className="block font-bold text-base"
                        style={{ color: C.dark }}
                      >
                        Hvor skal vi sende dit tilskudstjek?
                      </label>
                      <input
                        type="text"
                        placeholder="Dit navn"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                        style={{ borderColor: "#dce6f0" }}
                        required
                      />
                      <input
                        type="email"
                        placeholder="Din email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                        style={{ borderColor: "#dce6f0" }}
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Dit telefonnummer"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                        style={{ borderColor: "#dce6f0" }}
                        required
                      />
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg active:scale-[0.98]"
                        style={{ backgroundColor: C.orange, color: C.white }}
                      >
                        Beregn mit tilskud →
                      </button>
                      <button
                        type="button"
                        onClick={prevStep}
                        className="text-sm font-bold"
                        style={{ color: C.green }}
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
                        <CheckCircle2
                          className="w-8 h-8"
                          style={{ color: C.green }}
                        />
                      </div>
                      <h3
                        className="text-2xl font-bold"
                        style={{ color: C.dark }}
                      >
                        Tak for din henvendelse!
                      </h3>
                      <p style={{ color: C.gray }}>
                        Vi sender dit skræddersyede tilskudstjek inden for 24
                        timer.
                      </p>
                    </motion.div>
                  )}
                </form>

                {formStep < 5 && (
                  <p
                    className="text-xs text-center mt-4"
                    style={{ color: C.gray }}
                  >
                    Uforpligtende · Svar inden for 24 timer · Ingen binding
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── GRANT BREAKDOWN ────────────────────────────────── */}
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
              Sådan fordeles tilskuddet
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              Hvor meget kan du få?
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {[
              {
                from: "Oliefyr",
                amount: "25.000-27.000 kr",
                desc: "Det højeste tilskud gives ved udskiftning af oliefyr, fordi CO2-besparelsen er størst.",
                color: C.green,
                bg: C.greenLight,
              },
              {
                from: "Gasfyr",
                amount: "20.000-24.000 kr",
                desc: "Udskifter du dit naturgasfyr med en varmepumpe, får du et betydeligt tilskud.",
                color: C.blue,
                bg: C.blueLight,
              },
              {
                from: "Elvarme",
                amount: "15.000-20.000 kr",
                desc: "Har du elradiatorer eller direkte elvarme, er du også berettiget til tilskud.",
                color: C.orange,
                bg: C.orangeLight,
              },
            ].map((item) => (
              <motion.div
                key={item.from}
                variants={fadeUp}
                className="rounded-2xl p-8 border-2 relative overflow-hidden transition-all hover:shadow-lg"
                style={{ borderColor: "#dce6f0", backgroundColor: C.white }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: item.color }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <HandCoins className="w-6 h-6" />
                </div>
                <p
                  className="text-sm font-bold uppercase tracking-wider mb-2"
                  style={{ color: C.gray }}
                >
                  Fra {item.from}
                </p>
                <p
                  className="text-3xl lg:text-4xl font-bold mb-3"
                  style={{ color: item.color }}
                >
                  {item.amount}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: C.gray }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
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
              style={{ color: C.green }}
            >
              Sådan foregår det
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              Vi klarer papirarbejdet for dig
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              {
                step: "01",
                title: "Tjek dit tilskud",
                desc: "Udfyld vores korte formular. Vi beregner hvor meget tilskud du kan få.",
                icon: <FileCheck className="w-6 h-6" />,
              },
              {
                step: "02",
                title: "Vi ansøger for dig",
                desc: "Vores eksperter udfylder og indsender ansøgningen til Energistyrelsen.",
                icon: <BadgePercent className="w-6 h-6" />,
              },
              {
                step: "03",
                title: "Montage af pumpen",
                desc: "Når tilskuddet er godkendt, bestiller du pumpen og vi sikrer installationen.",
                icon: <Shield className="w-6 h-6" />,
              },
              {
                step: "04",
                title: "Udbetaling",
                desc: "Tilskuddet udbetales direkte til din NemKonto inden for 4-8 uger.",
                icon: <HandCoins className="w-6 h-6" />,
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="relative rounded-2xl p-6 border transition-all hover:shadow-lg group"
                style={{ borderColor: "#dce6f0", backgroundColor: C.white }}
              >
                <span
                  className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: C.greenLight, color: C.green }}
                >
                  Trin {item.step}
                </span>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mt-2 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: C.greenLight, color: C.green }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: C.dark }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: C.gray }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── ELIGIBILITY ────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: C.grayLight }}
      >
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
                style={{ color: C.green }}
              >
                Er du berettiget?
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl mb-6"
                style={{ color: C.dark }}
              >
                Disse kan søge tilskud
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-lg leading-relaxed mb-8"
                style={{ color: C.gray }}
              >
                Energitilskuddet er for private boligejere med en helårsbolig
                opvarmet med fossile brændsler eller direkte elvarme. Her er
                hvad du skal vide.
              </motion.p>
              <motion.div variants={fadeUp} className="space-y-4">
                {[
                  "Du er ejer af en privat helårsbolig",
                  "Boligen opvarmes med olie, gas, elvarme eller træpiller",
                  "Du skifter til en luft-til-vand eller væske-til-vand varmepumpe",
                  "Du ansøger FØR du bestiller pumpen",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: C.greenLight }}
                    >
                      <CheckCircle2
                        className="w-4 h-4"
                        style={{ color: C.green }}
                      />
                    </div>
                    <p className="text-base" style={{ color: C.dark }}>
                      {item}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-8 p-5 rounded-xl border-2 flex items-start gap-3"
                style={{
                  borderColor: "#ffe5b3",
                  backgroundColor: C.orangeLight,
                }}
              >
                <AlertCircle
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: C.orange }}
                />
                <p className="text-sm" style={{ color: C.dark }}>
                  <span className="font-bold">Vigtigt:</span> Fjernvarme-huse og
                  sommerhuse er ikke omfattet af energitilskuddet.
                </p>
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
                alt="Dansk familie foran deres hus"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── COMBINED SAVINGS ───────────────────────────────── */}
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
              Samlet besparelse
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl mb-4"
              style={{ color: C.dark }}
            >
              Kombiner tilskud og håndværkerfradrag
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg max-w-2xl mx-auto"
              style={{ color: C.gray }}
            >
              Du kan både få energitilskud OG håndværkerfradrag. Samlet kan du
              spare op til 35.000 kr.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-8 border-2 shadow-lg"
              style={{ borderColor: C.green, backgroundColor: C.greenLight }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: C.white, color: C.green }}
              >
                <HandCoins className="w-7 h-7" />
              </div>
              <p
                className="text-sm font-bold uppercase tracking-wider mb-2"
                style={{ color: C.greenDark }}
              >
                Energitilskud
              </p>
              <p
                className="text-4xl font-bold mb-3"
                style={{ color: C.greenDark }}
              >
                Op til 27.000 kr
              </p>
              <p className="text-sm" style={{ color: C.gray }}>
                Udbetales direkte til din NemKonto efter installation.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-8 border-2 shadow-lg"
              style={{ borderColor: C.blue, backgroundColor: C.blueLight }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: C.white, color: C.blue }}
              >
                <BadgePercent className="w-7 h-7" />
              </div>
              <p
                className="text-sm font-bold uppercase tracking-wider mb-2"
                style={{ color: C.blue }}
              >
                Håndværkerfradrag
              </p>
              <p
                className="text-4xl font-bold mb-3"
                style={{ color: C.blue }}
              >
                Op til 8.600 kr
              </p>
              <p className="text-sm" style={{ color: C.gray }}>
                Fradrag for arbejdslønnen på selvangivelsen.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-10"
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg"
              style={{ backgroundColor: C.navy }}
            >
              <Sparkles
                className="w-6 h-6"
                style={{ color: "#FFB74D" }}
              />
              <p className="text-lg font-bold" style={{ color: C.white }}>
                Samlet besparelse:{" "}
                <span style={{ color: "#7ee8a8" }}>op til 35.600 kr</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────────── */}
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
              Kunder der har fået tilskud
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.dark }}
            >
              Pengene står allerede på deres konto
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
                    Fik {t.grant}
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
              {
                icon: <Users className="w-7 h-7" />,
                value: "10.000+",
                label: "Tilfredse kunder",
              },
              {
                icon: <Award className="w-7 h-7" />,
                value: "95%",
                label: "Bliver godkendt",
              },
              {
                icon: <MapPin className="w-7 h-7" />,
                value: "Hele DK",
                label: "Landsdækkende",
              },
              {
                icon: <Clock className="w-7 h-7" />,
                value: "4-8 uger",
                label: "Sagsbehandling",
              },
              {
                icon: <Shield className="w-7 h-7" />,
                value: "Gratis",
                label: "Ansøgningshjælp",
              },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div
                  className="w-14 h-14 rounded-xl mx-auto flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: "rgba(46,153,88,0.2)",
                    color: "#7ee8a8",
                  }}
                >
                  {item.icon}
                </div>
                <p className="text-2xl font-bold" style={{ color: C.white }}>
                  {item.value}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: C.grayLight }}
      >
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

      {/* ─── FINAL CTA ──────────────────────────────────────── */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ backgroundColor: C.green }}
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
              Tjek dit tilskud på 2 minutter
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg mb-8 max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Få beregnet præcis hvor meget tilskud du kan få – gratis og
              uforpligtende.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg active:scale-[0.98]"
                style={{ backgroundColor: C.orange, color: C.white }}
              >
                Beregn mit tilskud nu
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
              &copy; {new Date().getFullYear()} BilligVentilation.dk – Alle
              rettigheder forbeholdes
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
