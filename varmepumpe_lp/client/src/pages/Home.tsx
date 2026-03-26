import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, Check, X, Users, Star, MapPin, Phone, Shield, Zap, Leaf, TrendingDown, AlertCircle, Calculator } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [priceCheckOpen, setPriceCheckOpen] = useState(false);
  const [yourPrice, setYourPrice] = useState("");
  const [savings, setSavings] = useState<number | null>(null);

  const handlePriceCheck = () => {
    const price = parseFloat(yourPrice);
    if (price > 0) {
      const averagePrice = 75000;
      const potentialSavings = Math.max(0, price - averagePrice);
      setSavings(potentialSavings);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Main Value Prop */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white py-16 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Varmepumpe til den rigtige pris
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Vidste du, at 100 m² koster ca. <span className="font-bold">4.000 kr. om året</span> at opvarme med varmepumpe?
            </p>
            <p className="text-lg text-blue-100">
              Køb pumpen hos os. Find montør selv – eller vi hjælper dig. Spar 20.000-50.000 kr.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg">
                Tjek din pris (2 min)
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-blue-600 px-8 py-3 rounded-lg font-bold text-lg">
                Ring: +45 91 55 22 77
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Price Verification */}
      <section className="py-16 md:py-24 bg-red-50 border-t-4 border-red-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4 mb-6">
              <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Blev du tilbudt en varmepumpe til over 100.000 kr?
                </h2>
                <p className="text-xl text-gray-700 mb-6">
                  Dobbeltjek prisen – det tager 2 minutter.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-red-200 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tjek din pris her</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Hvad blev du tilbudt for i alt? (inkl. montage, tilbehør, finansiering)
                  </label>
                  <div className="flex gap-3">
                    <Input
                      type="number"
                      placeholder="f.eks. 125000"
                      value={yourPrice}
                      onChange={(e) => setYourPrice(e.target.value)}
                      className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-lg"
                    />
                    <Button
                      onClick={handlePriceCheck}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold"
                    >
                      Tjek
                    </Button>
                  </div>
                </div>

                {savings !== null && (
                  <div className={`p-6 rounded-lg ${savings > 0 ? 'bg-green-50 border-2 border-green-500' : 'bg-blue-50 border-2 border-blue-500'}`}>
                    {savings > 0 ? (
                      <div>
                        <p className="text-green-700 font-bold text-lg mb-2">
                          ✅ Du kan spare ca. {savings.toLocaleString('da-DK')} kr!
                        </p>
                        <p className="text-green-600">
                          Ved at købe pumpen hos os og finde montør separat, kan du få den samme varmepumpe til en meget lavere pris.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-blue-700 font-bold text-lg mb-2">
                          ✅ Du har fået en god pris!
                        </p>
                        <p className="text-blue-600">
                          Din pris er konkurrencedygtig. Vi kan stadig hjælpe dig med at verificere pumpen og garantivilkårene.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">Problemet</h4>
                <p className="text-gray-700">
                  Tusindvis af danskere opdager hvert år, at de betaler alt for meget for deres varmepumpe. En samlet pris med montage, tilbehør og finansiering kan hurtigt se overvældende ud.
                </p>
              </Card>
              <Card className="p-6 border-2 border-blue-200 bg-blue-50">
                <h4 className="font-bold text-blue-900 mb-3 text-lg">Løsningen</h4>
                <p className="text-blue-700">
                  Vi sælger den samme varmepumpe du blev tilbudt – til den rigtige pris. Montøren finder du selv eller vi hjælper dig. Mange af vores kunder sparer 20.000-50.000 kr.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Model Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            Du behøver ikke betale 50.000 kr. for en montage
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Vi viser dig hvordan. Varmepumpen køber du hos os. Montøren finder du selv – eller vi hjælper dig med det.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                number: "1",
                title: "Køb pumpen hos os",
                desc: "Vi sælger varmepumper til konkurrencedygtige priser – uden montageomkostninger.",
                icon: "🛒",
              },
              {
                number: "2",
                title: "Find montør selv eller via os",
                desc: "Du kan finde en lokal montør selv, eller vi hjælper dig med at få kontakt til godkendte montører.",
                icon: "🔍",
              },
              {
                number: "3",
                title: "Samme resultat, lavere pris",
                desc: "Samme varmepumpe, samme kvalitet – men du sparer 20.000-50.000 kr. ved at adskille køb og montage.",
                icon: "💰",
              },
            ].map((step, idx) => (
              <Card key={idx} className="p-8 border-2 border-blue-200 hover:border-blue-400 transition-colors">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-700">{step.desc}</p>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 rounded-lg p-8 border-2 border-blue-200 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Vores kunder monterer selv og bruger kun en montør til det nødvendige</h3>
            <p className="text-gray-700 text-lg mb-6">
              Det er faktisk ikke så svært, som du tror. Mange af vores kunder klarer det selv eller med minimal professionel hjælp.
            </p>
            <div className="space-y-3">
              {[
                "✔ Køb pumpen hos os",
                "✔ Find montør selv eller via os",
                "✔ Samme resultat, lavere pris",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-700 font-semibold">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Government Subsidy Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Staten betaler op til 27.000 kr. af din varmepumpe
              </h2>
              <p className="text-xl text-gray-700">
                Hvad venter du på?
              </p>
            </div>

            <Card className="p-8 border-2 border-green-300 bg-white mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Hvorfor tilskuddet?</h3>
              <p className="text-gray-700 text-lg mb-6">
                Tilskuddet er der, fordi varmepumpe er den mest energieffektive opvarmning du kan vælge. Det sparer både dine penge og miljøet.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: "✅", title: "Find den rigtige varmepumpe", desc: "Vi hjælper dig med at vælge den perfekte pumpe til dit hus" },
                  { icon: "✅", title: "Kontakt godkendt montør", desc: "Vi forbinder dig med en montør, der kan håndtere tilskuddet" },
                  { icon: "✅", title: "Spar 50-70% fra dag ét", desc: "Reducer din varmeregning drastisk med det samme" },
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="bg-green-100 border-2 border-green-600 rounded-lg p-6 text-center">
              <p className="text-green-900 font-bold text-lg mb-4">
                Tilskuddet kan dække op til 50% af pumpeprisen!
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold text-lg">
                Se om du er berettiget
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            Hvorfor vælge os?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: "✅",
                title: "Samme kvalitetsmærker",
                desc: "Vi sælger de samme mærker som alle andre – Panasonic, Daikin, Mitsubishi, etc.",
              },
              {
                icon: "✅",
                title: "Bedre garantivilkår",
                desc: "Vores garantier er lige så gode eller bedre end hvad du får andre steder.",
              },
              {
                icon: "✅",
                title: "Bedre priser",
                desc: "Ved at adskille køb og montage, sparer du 20.000-50.000 kr.",
              },
              {
                icon: "✅",
                title: "Du ved hvad du skal have på 5 minutter",
                desc: "Simpel og transparent prisning – ingen skjulte omkostninger.",
              },
            ].map((item, idx) => (
              <Card key={idx} className="p-8 border-2 border-gray-200 hover:border-blue-400 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Klik her og dobbeltjek prisen
          </h2>
          <p className="text-xl text-blue-100 mb-4">
            Det tager 2 minutter
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg">
              Tjek pris nu
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-blue-600 px-8 py-3 rounded-lg font-bold text-lg">
              📞 +45 91 55 22 77
            </Button>
          </div>
          <p className="text-blue-100">
            Eller ring til os direkte – vi er her for at hjælpe
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            Sammenligning: Vores model vs. Traditionel
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Kriterium</th>
                  <th className="text-center py-4 px-4 font-bold text-blue-600">Vores model</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-500">Traditionel</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Pumpepris", ours: "35.000-55.000 kr", traditional: "35.000-55.000 kr" },
                  { label: "Montagepris", ours: "15.000-25.000 kr", traditional: "40.000-60.000 kr" },
                  { label: "Tilbehør & installation", ours: "5.000-10.000 kr", traditional: "Inkluderet" },
                  { label: "Total pris", ours: "55.000-90.000 kr", traditional: "100.000-150.000 kr" },
                  { label: "Besparelse", ours: "20.000-50.000 kr", traditional: "0 kr" },
                  { label: "Kvalitet", ours: "Samme", traditional: "Samme" },
                  { label: "Garanti", ours: "Fuld", traditional: "Fuld" },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700 font-semibold">{row.label}</td>
                    <td className="py-4 px-4 text-center text-blue-600 font-bold">{row.ours}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            Ofte stillede spørgsmål
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "Hvorfor er det billigere at købe pumpen separat?",
              "Kan jeg montere varmepumpen selv?",
              "Hvad hvis jeg ikke kan finde en montør?",
              "Får jeg samme garanti som ved traditionel køb?",
              "Hvordan fungerer statens tilskud?",
              "Hvor lang tid tager det at få varmepumpen installeret?",
              "Hvad hvis noget går galt efter installation?",
              "Kan jeg få hjælp til at finde en montør?",
            ].map((question, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">{question}</p>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 text-center">
            {[
              { icon: Users, label: "5000+", desc: "Tilfredse kunder" },
              { icon: Star, label: "4.9/5", desc: "TrustPilot rating" },
              { icon: TrendingDown, label: "30.000 kr", desc: "Gennemsnitlig besparelse" },
              { icon: Phone, label: "24/7", desc: "Kundesupport" },
              { icon: Shield, label: "10 år", desc: "Garanti" },
            ].map((item, idx) => (
              <div key={idx}>
                <item.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <p className="font-bold text-gray-900 text-sm md:text-base">{item.label}</p>
                <p className="text-xs md:text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Gør det i dag
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Tjek din pris, få et gratis tilbud, og start med at spare penge på din varmeregning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg">
              Tjek pris (2 min)
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-blue-600 px-8 py-3 rounded-lg font-bold text-lg">
              Ring: +45 91 55 22 77
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Om os</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Vores mission</a></li>
                <li><a href="#" className="hover:text-white">Hvordan det virker</a></li>
                <li><a href="#" className="hover:text-white">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Varmepumper</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Luft-til-luft</a></li>
                <li><a href="#" className="hover:text-white">Luft-til-vand</a></li>
                <li><a href="#" className="hover:text-white">Jordvarme</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Vejledning</a></li>
                <li><a href="#" className="hover:text-white">Montører</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Juridisk</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Privatlivspolitik</a></li>
                <li><a href="#" className="hover:text-white">Betingelser</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Varmepumpe Tilbud. Alle rettigheder forbeholdt.</p>
            <p className="mt-2">📞 +45 91 55 22 77 | 📧 info@varmepumpetilbud.dk</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
