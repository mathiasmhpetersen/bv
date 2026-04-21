import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dobbelttjek from "./pages/Dobbelttjek";
import DobbelttjekV2 from "./pages/DobbelttjekV2";
import DobbelttjekV3 from "./pages/DobbelttjekV3";
import GoerDetSelv from "./pages/GoerDetSelv";
import Tilskud from "./pages/Tilskud";
import TilskudV2 from "./pages/TilskudV2";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dobbelttjek"} component={Dobbelttjek} />
      <Route path={"/dobbelttjek-v2"} component={DobbelttjekV2} />
      <Route path={"/dobbelttjek-v3"} component={DobbelttjekV3} />
      <Route path={"/goer-det-selv"} component={GoerDetSelv} />
      <Route path={"/tilskud"} component={Tilskud} />
      <Route path={"/tilskud-v2"} component={TilskudV2} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
