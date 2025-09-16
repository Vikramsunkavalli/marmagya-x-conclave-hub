import { useEffect } from 'react';

const Agenda = () => {
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

  return (
    <section id="agenda" className="py-20 bg-[hsl(var(--background))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
                Event <span className="text-golden">Agenda</span>
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
              <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                Join us for an exciting day of learning, networking, and innovation
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6 fade-in">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">9:00</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[hsl(var(--primary))]">Registration & Welcome</h3>
                </div>
                <p className="text-[hsl(var(--muted-foreground))] ml-16">
                  Check-in, networking, and welcome refreshments
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 fade-in">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">10:00</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[hsl(var(--primary))]">Keynote Address</h3>
                </div>
                <p className="text-[hsl(var(--muted-foreground))] ml-16">
                  Inspiring keynote from industry leaders
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 fade-in">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">11:00</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[hsl(var(--primary))]">Panel Discussion</h3>
                </div>
                <p className="text-[hsl(var(--muted-foreground))] ml-16">
                  Interactive panel on current industry trends
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 fade-in">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">12:30</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[hsl(var(--primary))]">Lunch & Networking</h3>
                </div>
                <p className="text-[hsl(var(--muted-foreground))] ml-16">
                  Networking lunch with fellow attendees
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 fade-in">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">14:00</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[hsl(var(--primary))]">Workshops</h3>
                </div>
                <p className="text-[hsl(var(--muted-foreground))] ml-16">
                  Hands-on workshops and skill-building sessions
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 fade-in">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">16:00</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[hsl(var(--primary))]">Closing Ceremony</h3>
                </div>
                <p className="text-[hsl(var(--muted-foreground))] ml-16">
                  Awards, recognition, and closing remarks
                </p>
              </div>
            </div>
          </div>
        </section>
  );
};

export default Agenda;
