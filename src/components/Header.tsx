import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { APP_CONFIG } from '@/config/constants';
import { useAuth } from '@/contexts/SimpleAuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Theme', href: '/theme' },
    { name: 'Agenda', href: '/agenda' },
    { name: 'Speakers', href: '/speakers' },
    { name: 'Games', href: '/games' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[hsl(var(--primary))] shadow-[var(--shadow-elegant)]' 
          : 'bg-[hsl(var(--primary))] bg-opacity-95'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--golden))] transition-colors">
              <span className="text-golden">Marmagya</span> 10.0
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link px-4 py-3 text-base transition-colors ${
                    location.pathname === item.href 
                      ? 'text-[hsl(var(--golden))] font-semibold' 
                      : 'text-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--golden))]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  to="/admin"
                  className={`nav-link px-4 py-3 text-base transition-colors ${
                    location.pathname.startsWith('/admin')
                      ? 'text-[hsl(var(--golden))] font-semibold' 
                      : 'text-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--golden))]'
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--golden))] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[hsl(var(--primary-dark))] rounded-lg mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeMenu}
                  className={`nav-link block px-4 py-3 text-lg w-full text-left transition-colors ${
                    location.pathname === item.href 
                      ? 'text-[hsl(var(--golden))] font-semibold' 
                      : 'text-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--golden))]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className={`nav-link block px-4 py-3 text-lg w-full text-left transition-colors ${
                    location.pathname.startsWith('/admin')
                      ? 'text-[hsl(var(--golden))] font-semibold' 
                      : 'text-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--golden))]'
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;