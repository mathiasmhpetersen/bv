import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Phone,
  Shield,
  Star,
  HandCoins,
  Sparkles,
  MapPin,
  Clock,
  AlertTriangle,
  Quote,
  Flame,
  Leaf,
  FileText,
  Wallet,
  PhoneCall,
  ArrowRight,
} from "lucide-react";

// ─── Brand Assets ────────────────────────────────────────────────
const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/hero-house-heatpump-ihVZgyscJpE8VmEuqigtXu.webp",
  family:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/happy-family-home-BroX8spFkM8eBq3b8GQzRm.webp",
  technician:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/technician-install-Mj88npoE9GRKNVo3BuHHgr.webp",
  heatpump:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/heatpump-closeup-7ha7wnuAVACjRiB85e2Vdj.webp",
};

const C = {
  blue: "#2e8bcb",
  blueLight: "#e8f4fc",
  gold: "#d4a24c",
  goldLight: "#fbf4e6",
  green: "#2e9958",
  greenLight: "#eaf7ef",
  greenDark: "#1e6b3d",
  navy: "#0f1b33",
  navyDark: "#0a1326",
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
    q: "Hvor realistiske er de 27.000 kr?",
    a: "Det fulde beløb opnås ved skift fra oliefyr i en bolig over 150 m². Typiske udbetalinger ligger mellem 18.000 og 25.000 kr, afhængigt af dit udgangspunkt og boligens størrelse.",
  },
  {
    q: "Er der en risiko for at puljen lukker?",
    a: "Ja. Energistyrelsens pulje tømmes typisk før årets udgang. I 2024 lukkede den allerede i oktober, og hvis du først søger når puljen er tom, kan du ikke få tilskud.",
  },
  {
    q: "Hvor lang tid tager selve telefonsamtalen?",
    a: "Cirka 8-10 minutter. Vi spørger ind til dit hus, dit nuværende varmesystem og dine behov, og vender tilbage med et skræddersyet tilskudsestimat samme eller næste dag.",
  },
  {
    q: "Skal jeg bruge noget før opkaldet?",
    a: "Ingenting. Bare tag telefonen når vi ringer. Vi guider dig igennem alt, og du behøver ikke at finde papirer frem på forhånd.",
  },
  {
    q: "Hvad koster det at få hjælp?",
    a: "Ingenting. Vores rådgivning og ansøgningshjælp er gratis, når du køber din varmepumpe hos os. Vi tjener vores penge på pumpen, ikke på dig.",
  },
  {
    q: "Hvornår ser jeg pengene på min konto?",
    a: "Typisk 4-8 uger efter installationen er godkendt af Energistyrelsen. Tilskuddet overføres direkte til din NemKonto uden gebyrer.",
  },
];

// ─── FAQ Item ────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="py-5 border-b"
      style={{ borderColor: "rgba(255,255,255,0.1)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <span
          className="text-base md:text-lg font-bold pr-4"
          style={{ color: C.white }}
        >
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180" : ""}`}
          style={{ color: C.gold }}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p
          className="pt-4 text-base leading-relaxed"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {a}
        </p>
      </motion.div>
    </div>
  );
}

// ─── Countdown to end of year ────────────────────────────────────
function useDaysLeft() {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const end = new Date(now.getFullYear(), 11, 31);
      const diff = Math.ceil(
        (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );
      setDays(Math.max(diff, 0));
    };
    calc();
    const id = setInterval(calc, 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return days;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════
export default function TilskudV3() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const daysLeft = useDaysLeft();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("TilskudV3 lead submitted:", { phone });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.navyDark }}>
      {/* ─── Sticky Top Bar ──────────────────────────────── */}
      <div
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: "rgba(10,19,38,0.85)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: C.white }}
          >
            BilligVentilation<span style={{ color: C.gold }}>.dk</span>
          </span>
          <div className="flex items-center gap-3">
            <span
              className="hidden sm:inline text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
              style={{
                backgroundColor: "rgba(212,162,76,0.15)",
                color: C.gold,
              }}
            >
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              {daysLeft} dage til puljen lukker
            </span>
            <a
              href="tel:+4591552277"
              className="text-sm font-bold flex items-center gap-1"
              style={{ color: C.gold }}
            >
              <Phone className="w-4 h-4" /> 91 55 22 77
            </a>
          </div>
        </div>
      </div>

      {/* ─── HERO ────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Dansk hus med varmepumpe"
            className="w-full h-full object-cover opacity-40"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${C.navyDark} 10%, rgba(10,19,38,0.85) 60%, ${C.navyDark} 100%)`,
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-8"
          >
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold"
                style={{
                  backgroundColor: "rgba(212,162,76,0.15)",
                  color: C.gold,
                  border: `1px solid rgba(212,162,76,0.3)`,
                }}
              >
                <Sparkles className="w-4 h-4" /> Energitilskud 2026 · Pulje åben
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-4xl mx-auto"
              style={{ color: C.white }}
            >
              Staten betaler
              <br />
              <span style={{ color: C.gold }}>op til 27.000 kr</span>
              <br />
              <span className="italic" style={{ color: "rgba(255,255,255,0.7)" }}>
                af din varmepumpe
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Ring til vores tilskudseksperter. På 10 minutter får du præcis
              at vide hvor meget <strong style={{ color: C.white }}>du</strong>{" "}
              kan få udbetalt – gratis og uforpligtende.
            </motion.p>

            {/* Simple phone form */}
            <motion.div variants={fadeUp} className="max-w-md mx-auto pt-4">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div
                    className="flex items-center gap-2 p-2 rounded-2xl"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <div className="flex-1 flex items-center gap-3 px-4">
                      <Phone
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: C.gold }}
                      />
                      <input
                        type="tel"
                        placeholder="Dit telefonnummer"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-transparent py-3 focus:outline-none"
                        style={{ color: C.white }}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl font-bold text-base transition-all hover:shadow-xl active:scale-[0.97] flex items-center gap-2 whitespace-nowrap"
                      style={{ backgroundColor: C.gold, color: C.navyDark }}
                    >
                      Ring mig op
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Vi ringer inden for 24 timer · Helt gratis · Ingen binding
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: "rgba(46,153,88,0.15)",
                    border: "1px solid rgba(46,153,88,0.35)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: C.green }}
                  >
                    <CheckCircle2
                      className="w-6 h-6"
                      style={{ color: C.white }}
                    />
                  </div>
                  <p className="font-bold text-lg" style={{ color: C.white }}>
                    Vi ringer dig op inden for 24 timer
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Klar med dit skræddersyede tilskudsestimat.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-6 pt-6"
            >
              {[
                { icon: <Shield className="w-4 h-4" />, label: "95% godkendt" },
                { icon: <Clock className="w-4 h-4" />, label: "Svar samme dag" },
                { icon: <HandCoins className="w-4 h-4" />, label: "Gratis ansøgning" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  <span style={{ color: C.gold }}>{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── URGENCY / COUNTDOWN BAR ──────────────────────── */}
      <section
        className="py-8 border-y"
        style={{
          backgroundColor: "rgba(212,162,76,0.05)",
          borderColor: "rgba(212,162,76,0.2)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 flex-wrap text-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(212,162,76,0.15)" }}
            >
              <AlertTriangle className="w-5 h-5" style={{ color: C.gold }} />
            </div>
            <div className="text-left">
              <p className="font-bold" style={{ color: C.white }}>
                Puljen tømmes som regel i oktober
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                I 2024 lukkede energitilskudspuljen tidligere end forventet.
                Søger du nu, er du sikker på at få din del.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CUSTOMER STORY ───────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: C.navyDark }}>
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
              style={{ color: C.gold }}
            >
              En kundes rejse
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl mb-4"
              style={{ color: C.white }}
            >
              Peter, 58 – fra oliefyr til 26.000 kr i hånden
            </motion.h2>
          </motion.div>

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
                alt="Peter og hans familie"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div
                className="absolute -bottom-6 -right-6 rounded-2xl p-6 shadow-xl max-w-xs"
                style={{
                  backgroundColor: C.gold,
                  color: C.navyDark,
                }}
              >
                <p className="text-xs font-bold uppercase tracking-wider mb-1">
                  Udbetalt til Peter
                </p>
                <p className="text-4xl font-bold">26.400 kr</p>
                <p className="text-xs mt-1 opacity-80">
                  direkte på NemKonto
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="space-y-6"
            >
              <motion.div variants={fadeUp}>
                <Quote
                  className="w-10 h-10 mb-4"
                  style={{ color: C.gold }}
                />
                <p
                  className="text-xl md:text-2xl leading-relaxed italic"
                  style={{ color: C.white }}
                >
                  &ldquo;Jeg havde fyret med olie i 22 år. Da jeg endelig skiftede,
                  fik jeg ikke bare en billigere varmeregning – jeg fik også
                  <span style={{ color: C.gold }}> 26.400 kr tilbage </span>
                  fra staten. Det var faktisk nemmere end at skifte bank.&rdquo;
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="pt-4 border-t"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                <p className="font-bold text-lg" style={{ color: C.white }}>
                  Peter Hansen
                </p>
                <p
                  className="text-sm flex items-center gap-1"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  <MapPin className="w-3 h-3" /> Skanderborg · Skiftede fra
                  oliefyr
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-3 gap-3 pt-4"
              >
                {[
                  { value: "22 år", label: "Med oliefyr" },
                  { value: "8 min", label: "På telefonen" },
                  { value: "6 uger", label: "Til udbetaling" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl p-4 text-center"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <p
                      className="text-xl font-bold mb-1"
                      style={{ color: C.gold }}
                    >
                      {item.value}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 4 STEPS ──────────────────────────────────────── */}
      <section
        className="py-24 relative"
        style={{ backgroundColor: C.navy }}
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
              style={{ color: C.gold }}
            >
              Sådan gør vi det nemt
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.white }}
            >
              4 trin – og pengene står på kontoen
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
                n: "01",
                title: "Skriv dit nummer",
                desc: "Vi ringer dig op på et tidspunkt der passer dig.",
                icon: <PhoneCall className="w-6 h-6" />,
              },
              {
                n: "02",
                title: "Rådgivning på 10 min",
                desc: "Vores tilskudsekspert beregner dit præcise beløb.",
                icon: <Sparkles className="w-6 h-6" />,
              },
              {
                n: "03",
                title: "Vi ansøger for dig",
                desc: "Vi udfylder og sender alt til Energistyrelsen.",
                icon: <FileText className="w-6 h-6" />,
              },
              {
                n: "04",
                title: "Pengene udbetales",
                desc: "Tilskuddet overføres til din NemKonto efter installation.",
                icon: <Wallet className="w-6 h-6" />,
              },
            ].map((item) => (
              <motion.div
                key={item.n}
                variants={fadeUp}
                className="rounded-2xl p-6 relative"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p
                  className="text-6xl font-bold leading-none mb-4 opacity-20"
                  style={{ color: C.gold }}
                >
                  {item.n}
                </p>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: "rgba(212,162,76,0.15)",
                    color: C.gold,
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: C.white }}>
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── HEATING SOURCES TABLE ────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: C.navyDark }}>
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
              style={{ color: C.gold }}
            >
              Hvad får du?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.white }}
            >
              Dit tilskud afhænger af din nuværende opvarmning
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              {
                icon: <Flame className="w-5 h-5" />,
                source: "Oliefyr",
                desc: "Største CO2-besparelse – størst tilskud",
                amount: "25.000 – 27.000 kr",
                highlight: true,
              },
              {
                icon: <Flame className="w-5 h-5" />,
                source: "Gasfyr",
                desc: "God besparelse når fossil erstattes",
                amount: "20.000 – 24.000 kr",
                highlight: false,
              },
              {
                icon: <Sparkles className="w-5 h-5" />,
                source: "Elvarme",
                desc: "Direkte elvarme og elradiatorer",
                amount: "15.000 – 20.000 kr",
                highlight: false,
              },
              {
                icon: <Leaf className="w-5 h-5" />,
                source: "Træpiller",
                desc: "Skift til mere effektiv varmepumpe",
                amount: "12.000 – 17.000 kr",
                highlight: false,
              },
            ].map((row, i) => (
              <motion.div
                key={row.source}
                variants={fadeUp}
                className={`grid grid-cols-[auto_1fr_auto] gap-4 md:gap-6 items-center p-5 md:p-6 ${i > 0 ? "border-t" : ""}`}
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  backgroundColor: row.highlight
                    ? "rgba(212,162,76,0.05)"
                    : "transparent",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: row.highlight
                      ? C.gold
                      : "rgba(255,255,255,0.06)",
                    color: row.highlight ? C.navyDark : C.gold,
                  }}
                >
                  {row.icon}
                </div>
                <div className="min-w-0">
                  <p
                    className="font-bold text-base md:text-lg"
                    style={{ color: C.white }}
                  >
                    {row.source}
                  </p>
                  <p
                    className="text-sm truncate md:whitespace-normal"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {row.desc}
                  </p>
                </div>
                <p
                  className="font-bold text-right text-sm md:text-xl whitespace-nowrap"
                  style={{ color: row.highlight ? C.gold : C.white }}
                >
                  {row.amount}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS WALL ────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: C.navy }}>
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
              style={{ color: C.gold }}
            >
              Danskere der allerede har fået pengene
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.white }}
            >
              Over 10.000 tilfredse kunder
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
                name: "Gitte Madsen",
                location: "Svendborg",
                grant: "24.500 kr",
                text: "Simpelt og gnidningsfrit. De tog sig af alt, jeg skulle bare godkende med MitID.",
                rating: 5,
              },
              {
                name: "Bjarne Olsen",
                location: "Randers",
                grant: "22.800 kr",
                text: "Skeptisk i starten, men pengene stod på kontoen præcis som lovet. Kan varmt anbefales.",
                rating: 5,
              },
              {
                name: "Mette Larsen",
                location: "Næstved",
                grant: "19.200 kr",
                text: "Fik hjælp til både valg af pumpe, montør og tilskud. Alt i ét opkald.",
                rating: 5,
              },
              {
                name: "Klaus Thomsen",
                location: "Vejle",
                grant: "27.000 kr",
                text: "Fik maksimalt tilskud efter skift fra oliefyr. Sparer nu 15.000 kr om året på varme.",
                rating: 5,
              },
              {
                name: "Susanne Nielsen",
                location: "Holbæk",
                grant: "20.600 kr",
                text: "Fantastisk rådgivning – de ringede tilbage inden for en time og tog sig af alt papirarbejde.",
                rating: 5,
              },
              {
                name: "Finn Pedersen",
                location: "Frederikshavn",
                grant: "25.900 kr",
                text: "Var bekymret for papirarbejdet, men det klarede de jo selv. Meget professionelt.",
                rating: 5,
              },
            ].map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="rounded-2xl p-6 flex flex-col"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      style={{ color: C.gold }}
                    />
                  ))}
                </div>
                <p
                  className="text-base leading-relaxed mb-5 flex-1"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div
                  className="flex items-center justify-between pt-4 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                >
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: C.white }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-xs flex items-center gap-1"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      <MapPin className="w-3 h-3" /> {t.location}
                    </p>
                  </div>
                  <div
                    className="px-3 py-1 rounded-lg text-xs font-bold"
                    style={{
                      backgroundColor: "rgba(212,162,76,0.15)",
                      color: C.gold,
                    }}
                  >
                    {t.grant}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: C.navyDark }}>
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
              style={{ color: C.gold }}
            >
              Ofte stillede spørgsmål
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.white }}
            >
              Alt om tilskudsansøgningen
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
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: C.gold }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
          }}
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
              style={{ color: C.navyDark }}
            >
              Klar til at komme i gang?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl mb-6"
              style={{ color: C.navyDark }}
            >
              Tag telefonen – vi klarer resten
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg mb-8 max-w-xl mx-auto"
              style={{ color: "rgba(15,27,51,0.8)" }}
            >
              Ét opkald og du ved præcis hvor meget staten betaler af din
              nye varmepumpe.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-2xl active:scale-[0.98]"
                style={{ backgroundColor: C.navyDark, color: C.white }}
              >
                Bliv ringet op
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="tel:+4591552277"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-white/20"
                style={{
                  backgroundColor: "transparent",
                  color: C.navyDark,
                  border: `2px solid ${C.navyDark}`,
                }}
              >
                <Phone className="w-5 h-5" />
                91 55 22 77
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────── */}
      <footer
        className="py-10 border-t"
        style={{
          backgroundColor: C.navyDark,
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              &copy; {new Date().getFullYear()} BilligVentilation.dk &mdash;
              Alle rettigheder forbeholdes
            </p>
            <div className="flex items-center gap-6">
              <a
                href="tel:+4591552277"
                className="text-sm font-bold flex items-center gap-1"
                style={{ color: C.gold }}
              >
                <Phone className="w-4 h-4" /> 91 55 22 77
              </a>
              <a
                href="https://billigventilation.dk"
                className="text-sm font-bold"
                style={{ color: C.gold }}
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
