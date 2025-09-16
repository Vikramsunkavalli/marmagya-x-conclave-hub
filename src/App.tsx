import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/SimpleAuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Theme from "./pages/Theme";
import Agenda from "./pages/Agenda";
import Speakers from "./pages/Speakers";
import Games from "./pages/Games";
import Sponsors from "./pages/Sponsors";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminSpeakers from "./pages/AdminSpeakers";
import AdminEvents from "./pages/AdminEvents";
import AdminSponsors from "./pages/AdminSponsors";
import AdminGallery from "./pages/AdminGallery";
import AdminMessages from "./pages/AdminMessages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/theme" element={<Theme />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/games" element={<Games />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/admin/speakers" element={
              <ProtectedRoute>
                <AdminSpeakers />
              </ProtectedRoute>
            } />
            <Route path="/admin/events" element={
              <ProtectedRoute>
                <AdminEvents />
              </ProtectedRoute>
            } />
            <Route path="/admin/sponsors" element={
              <ProtectedRoute>
                <AdminSponsors />
              </ProtectedRoute>
            } />
            <Route path="/admin/gallery" element={
              <ProtectedRoute>
                <AdminGallery />
              </ProtectedRoute>
            } />
            <Route path="/admin/messages" element={
              <ProtectedRoute>
                <AdminMessages />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
