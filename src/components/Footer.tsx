import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/industry-relations-committee-iim-sambalpur/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/industryrelations_iimsbp?igsh=MW1oNjJpNzV6dHgyag==', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const quickLinks = [
    { name: 'Registration', href: '/contact' },
    { name: 'Agenda', href: '/agenda' },
    { name: 'Speakers', href: '/speakers' },
    { name: 'Sponsors', href: '/sponsors' }
  ];


  return (
    <footer className="bg-[hsl(var(--primary-dark))] text-[hsl(var(--primary-foreground))] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Event Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-golden">Marmagya</span> 10.0
            </h3>
            <p className="text-[hsl(var(--primary-foreground))] opacity-80 mb-6 leading-relaxed">
              The premier business conclave of IIM Sambalpur, bringing together 
              industry leaders and visionaries to shape the future of business.
            </p>
            <div className="text-sm text-[hsl(var(--primary-foreground))] opacity-70">
              <p className="mb-1">📅 October 25-26, 2025</p>
              <p>📍 IIM Sambalpur, Odisha</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-golden">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[hsl(var(--primary-foreground))] opacity-80 hover:opacity-100 hover:text-golden transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Social Media & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-golden">Stay Connected</h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-[hsl(var(--primary))] bg-opacity-50 p-3 rounded-full hover:bg-[hsl(var(--golden))] hover:bg-opacity-20 transition-colors group"
                >
                  <social.icon className="w-5 h-5 text-[hsl(var(--primary-foreground))] group-hover:text-golden transition-colors" />
                </a>
              ))}
            </div>
            
            {/* Newsletter Signup */}
            <div>
              <p className="text-sm text-[hsl(var(--primary-foreground))] opacity-80 mb-3">
                Subscribe for updates
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-[hsl(var(--primary))] bg-opacity-50 border border-[hsl(var(--border))] rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--golden))] text-[hsl(var(--primary-foreground))] placeholder-[hsl(var(--primary-foreground))] placeholder-opacity-60"
                />
                <button className="px-4 py-2 bg-[hsl(var(--golden))] text-[hsl(var(--golden-foreground))] rounded-r-lg hover:bg-[hsl(var(--golden-dark))] transition-colors text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[hsl(var(--primary))] border-opacity-30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-[hsl(var(--primary-foreground))] opacity-70 text-center md:text-left">
              <p>© 2024 Marmagya 10.0, IIM Sambalpur. All rights reserved.</p>
              <p className="mt-1">
                Organized by{' '}
                <a href="#" className="text-golden hover:underline">
                  Indian Institute of Management Sambalpur
                </a>
              </p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-[hsl(var(--primary-foreground))] opacity-70 hover:opacity-100 hover:text-golden transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[hsl(var(--primary-foreground))] opacity-70 hover:opacity-100 hover:text-golden transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-[hsl(var(--primary-foreground))] opacity-70 hover:opacity-100 hover:text-golden transition-colors">
                Code of Conduct
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;