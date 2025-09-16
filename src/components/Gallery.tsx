import { useEffect } from 'react';

const Gallery = () => {
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
    <section id="gallery" className="py-20 bg-[hsl(var(--background))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
                Event <span className="text-golden">Gallery</span>
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
              <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                Relive the moments from Marmagya 10.0
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="fade-in">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                      <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-lg">Image {item}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[hsl(var(--primary))] mb-2">
                        Event Moment {item}
                      </h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        Capturing the essence of Marmagya 10.0
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

export default Gallery;
