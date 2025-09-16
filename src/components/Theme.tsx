import { useEffect } from 'react';

const Theme = () => {
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
    <section id="theme" className="py-20 bg-[hsl(var(--background))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
                Event <span className="text-golden">Theme</span>
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
              <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                Innovation, Leadership, and Growth in the Digital Age
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="fade-in">
                <h3 className="text-3xl font-bold text-[hsl(var(--primary))] mb-6">
                  Shaping the Future of Business
                </h3>
                <p className="text-lg text-[hsl(var(--muted-foreground))] mb-6">
                  In today's rapidly evolving business landscape, innovation and leadership 
                  are more important than ever. Marmagya 10.0 brings together thought leaders, 
                  entrepreneurs, and industry experts to explore the challenges and opportunities 
                  of the digital age.
                </p>
                <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8">
                  Our theme focuses on three key pillars: Innovation, Leadership, and Growth. 
                  Through keynote speeches, panel discussions, and interactive workshops, 
                  we'll dive deep into how these elements shape successful businesses.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-sm">1</span>
                    </div>
                    <span className="text-[hsl(var(--primary))] font-medium">Innovation in Technology</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-sm">2</span>
                    </div>
                    <span className="text-[hsl(var(--primary))] font-medium">Leadership Excellence</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-sm">3</span>
                    </div>
                    <span className="text-[hsl(var(--primary))] font-medium">Sustainable Growth</span>
                  </div>
                </div>
              </div>

              <div className="fade-in">
                <div className="bg-gradient-to-br from-[hsl(var(--golden))] to-yellow-600 rounded-lg p-8 text-white">
                  <h4 className="text-2xl font-bold mb-4">Key Focus Areas</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                      Digital Transformation
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                      Sustainable Business Practices
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                      Emerging Technologies
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                      Leadership Development
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                      Market Innovation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
};

export default Theme;
