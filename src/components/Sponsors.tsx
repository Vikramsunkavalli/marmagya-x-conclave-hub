import { useEffect } from 'react';

const Sponsors = () => {
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

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const sponsors = [
    {
      id: 1,
      name: 'Tech Corp',
      logo: '/api/placeholder/200/100',
      level: 'platinum'
    },
    {
      id: 2,
      name: 'Innovation Inc',
      logo: '/api/placeholder/200/100',
      level: 'gold'
    },
    {
      id: 3,
      name: 'Global Co',
      logo: '/api/placeholder/200/100',
      level: 'silver'
    }
  ];

  return (
    <section id="sponsors" className="py-20 bg-[hsl(var(--background))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
                Our <span className="text-golden">Sponsors</span>
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
              <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                We thank our valued partners for making Marmagya 10.0 possible
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="fade-in">
                  <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="mb-4">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="h-16 mx-auto object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-[hsl(var(--primary))] mb-2">
                      {sponsor.name}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      sponsor.level === 'platinum' ? 'bg-gray-100 text-gray-800' :
                      sponsor.level === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {sponsor.level.charAt(0).toUpperCase() + sponsor.level.slice(1)} Sponsor
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  );
};

export default Sponsors;
