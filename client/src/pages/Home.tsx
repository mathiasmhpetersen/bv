import { Link } from "wouter";
import { ArrowRight, Zap, Wrench, Calculator, Ruler, HandCoins } from "lucide-react";
import { motion } from "framer-motion";

const C = {
  blue: "#2e8bcb",
  blueLight: "#e8f4fc",
  orange: "#FF9500",
  orangeLight: "#fff8ee",
  green: "#2e9958",
  greenLight: "#eaf7ef",
  navy: "#1a2b4a",
  dark: "#1a1a2e",
  gray: "#5a6b7d",
  grayLight: "#f5f8fb",
  white: "#ffffff",
};

const pages = [
  {
    path: "/dobbelttjek",
    title: "Dobbelttjek din pris",
    subtitle: "Fik du et tilbud på 100.000 kr?",
    description:
      "For dig der allerede har fået et tilbud på en varmepumpe og vil vide om du betaler for meget. Sammenlign din pris og spar op til 60.000 kr.",
    icon: <Zap className="w-6 h-6" />,
    color: C.blue,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/hero-house-heatpump-ihVZgyscJpE8VmEuqigtXu.webp",
  },
  {
    path: "/dobbelttjek-v2",
    title: "Dobbelttjek din pris (v2)",
    subtitle: "Ny version med besparelseskalkulator",
    description:
      "Ny version af dobbelttjek-siden med interaktiv kalkulator, der viser din besparelse live. Grønt, minimalistisk design med fokus på transparente priser.",
    icon: <Calculator className="w-6 h-6" />,
    color: C.green,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/happy-family-home-BroX8spFkM8eBq3b8GQzRm.webp",
  },
  {
    path: "/dobbelttjek-v3",
    title: "Dobbelttjek din pris (v3)",
    subtitle: "Med kW-beregner og pumpe-pakker",
    description:
      "Samme side som den originale Dobbelttjek, men med en 3-trins formular: boligoplysninger → beregnet kW-behov + anbefalede varmepumpe-pakker → kontaktformular.",
    icon: <Ruler className="w-6 h-6" />,
    color: C.blue,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/heatpump-closeup-7ha7wnuAVACjRiB85e2Vdj.webp",
  },
  {
    path: "/goer-det-selv",
    title: "Gør-det-selv varmepumpe",
    subtitle: "Spar tusindvis ved at gøre det selv",
    description:
      "For dig der vil spare endnu mere ved selv at stå for dele af installationen. Køb pumpen hos os og find en montør til tilslutningen.",
    icon: <Wrench className="w-6 h-6" />,
    color: C.orange,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/technician-install-Mj88npoE9GRKNVo3BuHHgr.webp",
  },
  {
    path: "/tilskud",
    title: "Energitilskud til varmepumpe",
    subtitle: "Få op til 27.000 kr fra staten",
    description:
      "Staten betaler en del af din nye varmepumpe. Vi hjælper dig gratis med ansøgningen, så du får hele tilskuddet udbetalt direkte til din NemKonto.",
    icon: <HandCoins className="w-6 h-6" />,
    color: C.green,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/happy-family-home-BroX8spFkM8eBq3b8GQzRm.webp",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.grayLight }}>
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
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
          <span className="text-sm font-bold" style={{ color: C.blue }}>
            Tlf: 91 55 22 77
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="text-center"
          >
            <p
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: C.blue }}
            >
              Varmepumper til den rigtige pris
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
              style={{ color: C.dark }}
            >
              Landingssider fra
              <br />
              <span style={{ color: C.blue }}>BilligVentilation</span>
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: C.gray }}
            >
              Vælg den landingsside der passer til dig. Klik på et kort
              herunder for at se den fulde side.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Landing Page Cards */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {pages.map((page, i) => (
              <motion.div
                key={page.path}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
              >
                <Link href={page.path}>
                  <div
                    className="group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 hover:shadow-xl cursor-pointer"
                    style={{
                      borderColor: "#dce6f0",
                      backgroundColor: C.white,
                    }}
                  >
                    <div className="grid md:grid-cols-[1.2fr_1fr] gap-0">
                      {/* Image */}
                      <div className="relative h-64 md:h-80 overflow-hidden">
                        <img
                          src={page.image}
                          alt={page.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/90 md:block hidden" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent md:hidden" />
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-10 flex flex-col justify-center relative">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{
                            backgroundColor:
                              page.color === C.blue
                                ? C.blueLight
                                : page.color === C.green
                                ? C.greenLight
                                : C.orangeLight,
                            color: page.color,
                          }}
                        >
                          {page.icon}
                        </div>
                        <p
                          className="text-xs font-bold uppercase tracking-widest mb-2"
                          style={{ color: page.color }}
                        >
                          {page.subtitle}
                        </p>
                        <h2
                          className="text-2xl md:text-3xl font-bold tracking-tight mb-4 transition-colors duration-300"
                          style={{ color: C.dark }}
                        >
                          {page.title}
                        </h2>
                        <p
                          className="leading-relaxed mb-6"
                          style={{ color: C.gray }}
                        >
                          {page.description}
                        </p>
                        <div
                          className="flex items-center gap-2 font-bold text-sm"
                          style={{ color: page.color }}
                        >
                          <span>Se landingsside</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t" style={{ borderColor: "#dce6f0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm" style={{ color: C.gray }}>
            &copy; {new Date().getFullYear()} BilligVentilation.dk &mdash; Alle
            rettigheder forbeholdes
          </p>
        </div>
      </footer>
    </div>
  );
}
