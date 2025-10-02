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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Day 1 */}
              <div className="fade-in">
                <div className="mb-6 bg-gradient-to-r from-[hsl(var(--golden))] to-yellow-500 rounded-lg p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">Day 1</h3>
                  <p className="text-lg opacity-90">March 15, 2024</p>
                  <p className="text-sm opacity-80 mt-1">Leadership & Innovation Focus</p>
                </div>
                
                <div className="space-y-4">
                  {/* Registration */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-[hsl(var(--primary))] mr-4">09:00 AM</span>
                      <div>
                        <h4 className="font-semibold text-[hsl(var(--primary))]">Registration & Welcome Coffee</h4>
                      </div>
                    </div>
                  </div>

                  {/* Opening Keynote */}
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-5 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white bg-black bg-opacity-20 px-2 py-1 rounded">10:00 AM</span>
                      <span className="text-xs text-white bg-black bg-opacity-20 px-2 py-1 rounded">KEYNOTE</span>
                    </div>
                    <h4 className="font-bold text-white mb-2 text-lg">Opening Keynote: The Future of Business Leadership</h4>
                    <p className="text-sm text-white opacity-90 mb-1">Dr. Rajesh Sharma, CEO TechForward Inc.</p>
                    <p className="text-xs text-white opacity-75">Exploring leadership paradigms in the digital age</p>
                  </div>

                  {/* Panel 1 */}
                  <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-5 shadow-lg text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold bg-white bg-opacity-20 px-2 py-1 rounded">11:30 AM</span>
                      <button className="text-xs bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-full font-medium transition-colors">Register</button>
                    </div>
                    <h4 className="font-semibold mb-2 text-lg">Panel 1: Digital Transformation in Traditional Industries</h4>
                    <p className="text-sm text-blue-200 mb-2">Bridging the Old and New</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Technology</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Innovation</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Leadership</span>
                    </div>
                  </div>

                  {/* Lunch */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-[hsl(var(--primary))] mr-4">01:00 PM</span>
                      <div>
                        <h4 className="font-semibold text-[hsl(var(--primary))]">Lunch & Networking</h4>
                      </div>
                    </div>
                  </div>

                  {/* Panel 2 */}
                  <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-5 shadow-lg text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold bg-white bg-opacity-20 px-2 py-1 rounded">02:30 PM</span>
                      <button className="text-xs bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-full font-medium transition-colors">Register</button>
                    </div>
                    <h4 className="font-semibold mb-2 text-lg">Panel 2: Sustainable Business Practices</h4>
                    <p className="text-sm text-blue-200 mb-2">Profit with Purpose</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Sustainability</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Business</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Purpose</span>
                    </div>
                  </div>

                  {/* Panel 3 */}
                  <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-5 shadow-lg text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold bg-white bg-opacity-20 px-2 py-1 rounded">04:00 PM</span>
                      <button className="text-xs bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-full font-medium transition-colors">Register</button>
                    </div>
                    <h4 className="font-semibold mb-2 text-lg">Panel 3: The Rise of Entrepreneurship</h4>
                    <p className="text-sm text-blue-200 mb-2">From Idea to IPO</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Entrepreneurship</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Startups</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Innovation</span>
                    </div>
                  </div>

                  {/* Evening Gala */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-[hsl(var(--primary))] mr-4">06:00 PM</span>
                      <div>
                        <h4 className="font-semibold text-[hsl(var(--primary))]">Evening Gala & Awards Ceremony</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Day 2 */}
              <div className="fade-in">
                <div className="mb-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">Day 2</h3>
                  <p className="text-lg opacity-90">March 16, 2024</p>
                  <p className="text-sm opacity-80 mt-1">Strategy & Future Focus</p>
                </div>
                
                <div className="space-y-4">
                  {/* Morning Coffee */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-[hsl(var(--primary))] mr-4">09:30 AM</span>
                      <div>
                        <h4 className="font-semibold text-[hsl(var(--primary))]">Morning Coffee & Networking</h4>
                      </div>
                    </div>
                  </div>

                  {/* Keynote */}
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-5 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white bg-black bg-opacity-20 px-2 py-1 rounded">10:30 AM</span>
                      <span className="text-xs text-white bg-black bg-opacity-20 px-2 py-1 rounded">KEYNOTE</span>
                    </div>
                    <h4 className="font-bold text-white mb-2 text-lg">Keynote: AI and the Future of Work</h4>
                    <p className="text-sm text-white opacity-90 mb-1">Ms. Priya Nair, Chief AI Officer, Global Tech</p>
                    <p className="text-xs text-white opacity-75">Transforming workplaces through artificial intelligence</p>
                  </div>

                  {/* Panel 4 */}
                  <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-5 shadow-lg text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold bg-white bg-opacity-20 px-2 py-1 rounded">12:00 PM</span>
                      <button className="text-xs bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-full font-medium transition-colors">Register</button>
                    </div>
                    <h4 className="font-semibold mb-2 text-lg">Panel 4: Financial Markets & Investment Trends</h4>
                    <p className="text-sm text-blue-200 mb-2">Navigating Market Volatility</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Finance</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Investment</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Markets</span>
                    </div>
                  </div>

                  {/* Lunch Break */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-[hsl(var(--primary))] mr-4">01:30 PM</span>
                      <div>
                        <h4 className="font-semibold text-[hsl(var(--primary))]">Lunch Break</h4>
                      </div>
                    </div>
                  </div>

                  {/* Panel 5 */}
                  <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-5 shadow-lg text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold bg-white bg-opacity-20 px-2 py-1 rounded">02:45 PM</span>
                      <button className="text-xs bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-full font-medium transition-colors">Register</button>
                    </div>
                    <h4 className="font-semibold mb-2 text-lg">Panel 5: Healthcare Innovation</h4>
                    <p className="text-sm text-blue-200 mb-2">Technology Meets Wellness</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Healthcare</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Technology</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Wellness</span>
                    </div>
                  </div>

                  {/* Panel 6 */}
                  <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-5 shadow-lg text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold bg-white bg-opacity-20 px-2 py-1 rounded">04:15 PM</span>
                      <button className="text-xs bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-full font-medium transition-colors">Register</button>
                    </div>
                    <h4 className="font-semibold mb-2 text-lg">Panel 6: Global Supply Chain Resilience</h4>
                    <p className="text-sm text-blue-200 mb-2">Building Robust Networks</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Supply Chain</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Resilience</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Networks</span>
                    </div>
                  </div>

                  {/* Closing Ceremony */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-[hsl(var(--primary))] mr-4">05:45 PM</span>
                      <div>
                        <h4 className="font-semibold text-[hsl(var(--primary))]">Closing Ceremony & Way Forward</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
};

export default Agenda;
