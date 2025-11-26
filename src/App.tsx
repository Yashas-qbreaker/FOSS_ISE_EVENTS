import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventOne from "./pages/EventOne";
import EventTwo from "./pages/EventTwo";
import Register from "./pages/Register";
import Confirm from "./pages/Confirm";
import NotFound from "./pages/NotFound";
import { PIXEL2PORTAL_CONFIG, BLIND_CODE_GOLF_CONFIG } from "./lib/eventConfig";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/event-one" element={<EventOne />} />
          <Route path="/event-two" element={<EventTwo />} />
          <Route path="/register-pixel2portal" element={<Register config={PIXEL2PORTAL_CONFIG} />} />
          <Route path="/confirm-pixel2portal" element={<Confirm config={PIXEL2PORTAL_CONFIG} />} />
          <Route path="/register-blind-code-golf" element={<Register config={BLIND_CODE_GOLF_CONFIG} />} />
          <Route path="/confirm-blind-code-golf" element={<Confirm config={BLIND_CODE_GOLF_CONFIG} />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
