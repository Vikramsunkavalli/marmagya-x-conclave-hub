import { useEffect } from 'react';

const Speakers = () => {
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

  const speakers = [
    {
      id: 1,
      name: 'John Doe',
      title: 'CEO, Tech Corp',
      bio: 'Industry leader with 20+ years of experience',
      image: '/api/placeholder/300/300'
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'CTO, Innovation Inc',
      bio: 'Technology visionary and startup advisor',
      image: '/api/placeholder/300/300'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      title: 'VP Marketing, Global Co',
      bio: 'Marketing expert and brand strategist',
      image: '/api/placeholder/300/300'
    }
  ];

  return (
    <section id="speakers" className="py-20 bg-[hsl(var(--background))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
                Our <span className="text-golden">Speakers</span>
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
              <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                Meet the industry leaders and visionaries who will share their insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {speakers.map((speaker) => (
                <div key={speaker.id} className="fade-in">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[hsl(var(--primary))] mb-2">
                        {speaker.name}
                      </h3>
                      <p className="text-[hsl(var(--golden))] font-medium mb-2">
                        {speaker.title}
                      </p>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm">
                        {speaker.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  );
};

export default Speakers;
