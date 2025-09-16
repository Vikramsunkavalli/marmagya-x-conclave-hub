import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Sponsor = Tables<'sponsors'>;

const SponsorsPage = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSponsors();
  }, []);

  useEffect(() => {
    // Add scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, [sponsors]); // Re-run when sponsors change

  const fetchSponsors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .order('sponsor_level', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      setSponsors(data || []);
      setLoading(false); // Move this here to ensure it's set
    } catch (error) {
      console.error('Error fetching sponsors:', error);
      setLoading(false); // Also set here in case of error
    }
  };

  // Group sponsors by level
  const groupedSponsors = sponsors.reduce((acc, sponsor) => {
    if (!acc[sponsor.sponsor_level]) {
      acc[sponsor.sponsor_level] = [];
    }
    acc[sponsor.sponsor_level].push(sponsor);
    return acc;
  }, {} as Record<string, Sponsor[]>);


  const getSponsorLevelTitle = (level: string) => {
    switch (level) {
      case 'platinum': return 'Platinum Sponsors';
      case 'gold': return 'Gold Sponsors';
      case 'silver': return 'Silver Sponsors';
      case 'bronze': return 'Bronze Sponsors';
      default: return 'Sponsors';
    }
  };

  const getSponsorLevelColor = (level: string) => {
    switch (level) {
      case 'platinum': return 'text-gray-600';
      case 'gold': return 'text-yellow-600';
      case 'silver': return 'text-gray-500';
      case 'bronze': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  // SponsorTier component for cleaner organization
  const SponsorTier = ({ title, sponsors: tierSponsors, className }: { 
    title: string; 
    sponsors: Sponsor[]; 
    className: string 
  }) => (
    <div className="mb-16 fade-in">
      <h3 className="text-3xl font-bold text-[hsl(var(--primary))] text-center mb-12 relative">
        {title} Sponsors
        <div className="w-16 h-1 bg-[hsl(var(--golden))] mx-auto mt-4"></div>
      </h3>
      <div className={`flex flex-wrap justify-center items-center gap-8 ${className}`}>
        {tierSponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden text-center p-6 min-w-[200px] max-w-[250px]"
          >
            <div className="p-6 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full ring-4 ring-[hsl(var(--golden))]/90 bg-white shadow-sm flex items-center justify-center overflow-hidden">
                {sponsor.logo_url ? (
                  <img
                    src={sponsor.logo_url}
                    alt={sponsor.name}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      console.error('Failed to load logo for', sponsor.name, ':', sponsor.logo_url);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-lg font-semibold text-[hsl(var(--primary))]">{sponsor.name}</span>
                )}
              </div>
            </div>
            <div className="px-4 pb-4">
              <h4 className="text-lg font-semibold text-[hsl(var(--primary))] mb-1">{sponsor.name}</h4>
              {sponsor.description && (
                <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2">{sponsor.description}</p>
              )}
              {sponsor.website_url && (
                <a
                  href={sponsor.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-[hsl(var(--golden))] hover:text-yellow-600 transition-colors"
                >
                  Visit Website →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <section id="sponsors" className="py-20 bg-[hsl(var(--background))] fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
                Our <span className="text-golden">Sponsors</span>
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
              <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                We thank our valued partners for making Marmagya 10.0 possible
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--golden))] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading sponsors...</p>
              </div>
            ) : sponsors.length > 0 ? (
              <div>
                {Object.entries(groupedSponsors).map(([level, levelSponsors]) => (
                  <SponsorTier 
                    key={level}
                    title={getSponsorLevelTitle(level).replace(' Sponsors', '')} 
                    sponsors={levelSponsors} 
                    className="" 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏢</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No sponsors yet</h3>
                <p className="text-gray-600">Sponsor information will appear here once added.</p>
              </div>
            )}

            {/* Become a Sponsor CTA */}
            <div className="text-center mt-16 fade-in">
              <div className="bg-[hsl(var(--secondary))] rounded-2xl p-8 border border-[hsl(var(--border))]">
                <h3 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">
                  Become a Sponsor
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6 max-w-2xl mx-auto">
                  Partner with us to reach a diverse audience of business leaders, students, and industry professionals. 
                  Multiple sponsorship packages available.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-hero">
                    Sponsorship Packages
                  </button>
                  <button className="btn-primary">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SponsorsPage;