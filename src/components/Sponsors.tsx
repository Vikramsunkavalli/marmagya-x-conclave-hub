const Sponsors = () => {
  const sponsors = {
    title: [
      { name: "TechForward Inc.", logo: "https://via.placeholder.com/200x80/1e40af/ffffff?text=TechForward" },
      { name: "Global Innovations", logo: "https://via.placeholder.com/200x80/dc2626/ffffff?text=Global+Innovations" }
    ],
    platinum: [
      { name: "Future Corp", logo: "https://via.placeholder.com/160x60/059669/ffffff?text=Future+Corp" },
      { name: "Digital Solutions", logo: "https://via.placeholder.com/160x60/7c3aed/ffffff?text=Digital+Solutions" },
      { name: "Innovation Labs", logo: "https://via.placeholder.com/160x60/ea580c/ffffff?text=Innovation+Labs" }
    ],
    gold: [
      { name: "Smart Systems", logo: "https://via.placeholder.com/140x50/0891b2/ffffff?text=Smart+Systems" },
      { name: "NextGen Tech", logo: "https://via.placeholder.com/140x50/be123c/ffffff?text=NextGen+Tech" },
      { name: "Business Hub", logo: "https://via.placeholder.com/140x50/16a34a/ffffff?text=Business+Hub" },
      { name: "Startup Ventures", logo: "https://via.placeholder.com/140x50/9333ea/ffffff?text=Startup+Ventures" }
    ],
    silver: [
      { name: "Tech Minds", logo: "https://via.placeholder.com/120x40/374151/ffffff?text=Tech+Minds" },
      { name: "Growth Partners", logo: "https://via.placeholder.com/120x40/1f2937/ffffff?text=Growth+Partners" },
      { name: "Innovation Co", logo: "https://via.placeholder.com/120x40/6b7280/ffffff?text=Innovation+Co" },
      { name: "Future Vision", logo: "https://via.placeholder.com/120x40/4b5563/ffffff?text=Future+Vision" },
      { name: "Digital Edge", logo: "https://via.placeholder.com/120x40/374151/ffffff?text=Digital+Edge" },
      { name: "Business Pro", logo: "https://via.placeholder.com/120x40/1f2937/ffffff?text=Business+Pro" }
    ]
  };

  const SponsorTier = ({ title, sponsors: tierSponsors, className }: { title: string; sponsors: Array<{name: string; logo: string}>; className: string }) => (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold text-[hsl(var(--primary))] text-center mb-8">
        {title} Sponsors
      </h3>
      <div className={`flex flex-wrap justify-center items-center gap-8 ${className}`}>
        {tierSponsors.map((sponsor, index) => (
          <div
            key={index}
            className="bg-[hsl(var(--card))] rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-105 p-6 border border-[hsl(var(--border))]"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="sponsors" className="py-20 bg-[hsl(var(--background))]">
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

        <SponsorTier title="Title" sponsors={sponsors.title} className="" />
        <SponsorTier title="Platinum" sponsors={sponsors.platinum} className="" />
        <SponsorTier title="Gold" sponsors={sponsors.gold} className="" />
        <SponsorTier title="Silver" sponsors={sponsors.silver} className="" />

        {/* Become a Sponsor CTA */}
        <div className="text-center mt-16">
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
  );
};

export default Sponsors;