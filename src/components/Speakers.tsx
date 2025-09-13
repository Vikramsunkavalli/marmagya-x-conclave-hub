const Speakers = () => {
  const speakers = [
    {
      name: "Dr. Rajesh Sharma",
      title: "CEO, TechForward Inc.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Keynote Speaker - Future of Business Leadership",
      category: "keynote"
    },
    {
      name: "Ms. Priya Nair", 
      title: "Chief AI Officer, Global Tech",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop&crop=face",
      bio: "Keynote Speaker - AI and Future of Work",
      category: "keynote"
    },
    {
      name: "Mr. Arjun Kumar",
      title: "Managing Director, Innovation Labs",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Digital Transformation Expert",
      category: "panelist"
    },
    {
      name: "Dr. Meera Gupta",
      title: "Sustainability Director, EcoVentures",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      bio: "Sustainable Business Practices",
      category: "panelist"
    },
    {
      name: "Mr. Vikram Singh",
      title: "Founder & CEO, StartupHub",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
      bio: "Entrepreneurship & Innovation",
      category: "panelist"
    },
    {
      name: "Ms. Neha Agarwal",
      title: "Investment Director, Capital Partners",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      bio: "Financial Markets & Investment",
      category: "panelist"
    }
  ];

  const keynotes = speakers.filter(speaker => speaker.category === 'keynote');
  const panelists = speakers.filter(speaker => speaker.category === 'panelist');

  return (
    <section id="speakers" className="py-20 bg-[hsl(var(--secondary))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
            Our <span className="text-golden">Speakers</span>
          </h2>
          <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            Industry leaders and visionaries sharing their insights and expertise
          </p>
        </div>

        {/* Keynote Speakers */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-[hsl(var(--primary))] text-center mb-8">
            Keynote Speakers
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {keynotes.map((speaker, index) => (
              <div key={index} className="card-hover text-center group">
                <div className="relative mb-6">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[hsl(var(--golden))] group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-[hsl(var(--golden))] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-xl font-semibold text-[hsl(var(--primary))] mb-2">
                  {speaker.name}
                </h4>
                <p className="text-golden font-medium mb-3">{speaker.title}</p>
                <p className="text-[hsl(var(--muted-foreground))]">{speaker.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Panel Speakers */}
        <div>
          <h3 className="text-2xl font-semibold text-[hsl(var(--primary))] text-center mb-8">
            Panel Speakers
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {panelists.map((speaker, index) => (
              <div key={index} className="card-hover text-center group">
                <div className="relative mb-4">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-3 border-[hsl(var(--golden))] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-lg font-semibold text-[hsl(var(--primary))] mb-1">
                  {speaker.name}
                </h4>
                <p className="text-sm text-golden font-medium mb-2">{speaker.title}</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{speaker.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-[hsl(var(--muted-foreground))] mb-6">
            Want to join our distinguished panel of speakers?
          </p>
          <button className="btn-hero">
            Become a Speaker
          </button>
        </div>
      </div>
    </section>
  );
};

export default Speakers;