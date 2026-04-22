import { motion } from "framer-motion";
import { ArrowRight, Wrench, type LucideIcon } from "lucide-react";
import { Link } from "wouter";

const C = {
  blue: "#2e8bcb",
  blueDark: "#1a5f8a",
  blueLight: "#e8f4fc",
  navy: "#1a2b4a",
  dark: "#1a1a2e",
  gray: "#5a6b7d",
  grayLight: "#f5f8fb",
  white: "#ffffff",
};

type IconTone = "blue" | "orange" | "green";

const TONES: Record<IconTone, { bg: string; fg: string }> = {
  blue: { bg: "#e8f4fc", fg: "#2e8bcb" },
  orange: { bg: "#fff4e5", fg: "#FF9500" },
  green: { bg: "#e8f7ea", fg: "#4CAF50" },
};

type LandingPageCard = {
  slug: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  tone: IconTone;
};

const LANDING_PAGES: LandingPageCard[] = [
  {
    slug: "goer-det-selv",
    tag: "Spar tusindvis ved at gøre det selv",
    title: "Gør-det-selv varmepumpe",
    description:
      "For dig der vil spare endnu mere ved selv at stå for dele af installationen. Køb pumpen hos os og find en montør til tilslutningen.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451266806/BrHGMBfJn8M7kqFwYYaDiY/hero-house-heatpump-ihVZgyscJpE8VmEuqigtXu.webp",
    icon: Wrench,
    tone: "orange",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function LandingHub() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.white }}>
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
          <span className="text-sm font-bold" style={{ color: C.blue }}>
            Tlf: 91 55 22 77
          </span>
        </div>
      </div>

      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: C.grayLight }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: C.blue }}
            >
              Varmepumper til den rigtige pris
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
              style={{ color: C.dark }}
            >
              Landingssider fra{" "}
              <span style={{ color: C.blue }}>BilligVentilation</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
              style={{ color: C.gray }}
            >
              Vælg den landingsside der passer til dig. Klik på et kort
              herunder for at se den fulde side.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: C.white }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-14">
          {LANDING_PAGES.map((page, idx) => (
            <LandingCard key={page.slug} page={page} index={idx} />
          ))}
        </div>
      </section>

      <footer className="py-10 border-t" style={{ borderColor: "#dce6f0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm" style={{ color: C.gray }}>
            &copy; {new Date().getFullYear()} BilligVentilation.dk — Alle
            rettigheder forbeholdes
          </p>
        </div>
      </footer>
    </div>
  );
}

function LandingCard({
  page,
  index,
}: {
  page: LandingPageCard;
  index: number;
}) {
  const Icon = page.icon;
  const tone = TONES[page.tone];
  const reverse = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl transition-shadow"
      style={{ borderColor: "#dce6f0", backgroundColor: C.white }}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <Link
          href={`/${page.slug}`}
          className="relative block aspect-[4/3] lg:aspect-auto overflow-hidden group"
        >
          <img
            src={page.image}
            alt={page.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(46,139,203,0.12) 0%, rgba(26,43,74,0.08) 100%)",
            }}
          />
        </Link>

        <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
            style={{ backgroundColor: tone.bg, color: tone.fg }}
          >
            <Icon className="w-7 h-7" />
          </div>

          <p
            className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: C.blue }}
          >
            {page.tag}
          </p>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4"
            style={{ color: C.dark }}
          >
            {page.title}
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed mb-6"
            style={{ color: C.gray }}
          >
            {page.description}
          </p>

          <Link
            href={`/${page.slug}`}
            className="inline-flex items-center gap-2 font-bold text-base group/link"
            style={{ color: C.blue }}
          >
            Se landingsside
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
