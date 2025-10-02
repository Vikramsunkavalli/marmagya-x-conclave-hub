import { useEffect } from 'react';

const About = () => {
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
    <section id="about" className="py-20 bg-[hsl(var(--background))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
                About <span className="text-golden">Marmagya</span>
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
              <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                Marmagya is the annual business conclave of IIM Sambalpur, a flagship event that brings together prominent leaders, policymakers, entrepreneurs, and academicians from across the globe. This prestigious forum serves as a platform for insightful discussions on contemporary business trends, economic challenges, and future growth opportunities.
                <br /><br />
                Each year, Marmagya focuses on a unique theme relevant to the evolving business landscape, fostering a rich exchange of ideas and knowledge. It provides students with a unique opportunity to engage directly with industry stalwarts, gaining practical perspectives that complement their academic learning. The conclave features keynote addresses, panel discussions, and interactive sessions, making it a cornerstone of IIM Sambalpur's commitment to creating future-ready business leaders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="text-center fade-in">
                <div className="w-16 h-16 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-[hsl(var(--primary))] mb-2">Vision</h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  To create a platform where business leaders and students can connect, 
                  learn, and grow together.
                </p>
              </div>

              <div className="text-center fade-in">
                <div className="w-16 h-16 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-[hsl(var(--primary))] mb-2">Mission</h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  To foster innovation, entrepreneurship, and knowledge sharing 
                  among the business community.
                </p>
              </div>

              <div className="text-center fade-in">
                <div className="w-16 h-16 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-[hsl(var(--primary))] mb-2">Values</h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  Innovation, collaboration, and excellence in everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>
  );
};

export default About;
