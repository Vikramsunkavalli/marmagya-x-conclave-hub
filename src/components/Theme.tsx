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
                Defining the Decade: India Leading the Next Wave of Global Growth
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="fade-in mb-12">
                <h3 className="text-3xl font-bold text-[hsl(var(--primary))] mb-6">
                  Why?
                </h3>
                
                <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
                  The next ten years will be a period of unprecedented transformation. As global supply chains shift, technology reimagines daily life, climate initiatives reshape industries, and geopolitical landscapes evolve, one nation is positioned not just to adapt, but to lead. India stands at a unique moment of possibility, poised to define the next wave of global growth.
                </p>
                
                <h3 className="text-3xl font-bold text-[hsl(var(--primary))] mb-6">
                  A New Chapter in India's Growth Story
                </h3>
                
                <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
                  What makes India's rise so compelling is the sheer breadth of its strengths. The foundation of this growth is India's digital infrastructure, which is reshaping global perceptions of innovation. With its expansive e-commerce networks and advancements in artificial intelligence, India is no longer just a consumer of technology but it's becoming a global architect of digital solutions.
                </p>
                
                <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
                  At the same time, a new narrative is emerging in manufacturing. From semiconductors to EVs and auto components, India is solidifying its position on the global industrial map by building robust and resilient supply chains. This momentum also extends to the healthcare and biopharma sectors, where India is delivering affordable solutions and driving research for global benefit.
                </p>
                
                <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
                  At the very heart of this transformation is India's greatest strength: its people. The country's diverse talent and evolving workforce are forging institutions that are resilient, adaptive, and globally relevant.
                </p>
                
                <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
                  This powerful moment shows that India is not just catching up to the rest of the world, but is actively setting a new agenda for growth that is sustainable, inclusive, and future-ready.
                </p>
              </div>

              <div className="fade-in mb-12">
                <h4 className="text-3xl font-bold text-[hsl(var(--primary))] mb-6">Marmagya 10.0 - Leadership Dialogues</h4>
                <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
                  As Marmagya enters its 10th edition, its Leadership Dialogues are strategically designed to reflect the areas where India can create a significant global impact in the coming decade. The panels will facilitate meaningful conversations across four core pillars: technology, business, sustainability, and people. By exploring these key themes, Marmagya's vision aligns directly with India's evolving growth story. These discussions are intended to provide valuable insights and a forward-looking perspective on the nation's role in the global economy.
                </p>
                
                <div className="bg-gradient-to-br from-[hsl(var(--golden))] to-yellow-600 rounded-lg p-8 text-white mb-8">
                  <h5 className="text-2xl font-bold mb-6">Core Panels:</h5>
                  
                  <div className="space-y-6">
                    <div className="bg-white bg-opacity-10 rounded-lg p-6">
                      <h6 className="text-lg font-semibold mb-2">Leadership Dialogue 1: The Future of Work: Talent, Diversity & Leadership in the AI Era</h6>
                      <p className="text-sm">
                        Automation, robotics, and AI are disrupting industries, but India's true strength lies in its people. This panel will explore how companies can reskill talent, embrace diversity, empower women in leadership, and adapt to flexible work models-turning this demographic factor into a global advantage.
                      </p>
                    </div>
                    
                    <div className="bg-white bg-opacity-10 rounded-lg p-6">
                      <h6 className="text-lg font-semibold mb-2">Leadership Dialogue 2: Marketing in the Algorithmic Age: Data, Trust & Brand Bharat</h6>
                      <p className="text-sm">
                        In today's world of instant decisions and choices, algorithms decide what we see, buy, and believe. For brands, the real question is simple - how do we use data smartly, stay creative, and still earn people's trust? This conversation will explore how Indian companies can turn technology into meaningful connections-building Brand Bharat that is authentic, trusted, and ready for the world.
                      </p>
                    </div>
                    
                    <div className="bg-white bg-opacity-10 rounded-lg p-6">
                      <h6 className="text-lg font-semibold mb-2">Leadership Dialogue 3: Capital with Character: Fintech, ESG & Responsible Finance</h6>
                      <p className="text-sm">
                        India's fintech revolution is transforming payments, lending, and digital inclusion. At the same time, ESG-linked investing and global compliance demand ethical governance. This panel will explore how finance leaders can align speed with credibility, building systems that are both innovative and responsible.
                      </p>
                    </div>
                    
                    <div className="bg-white bg-opacity-10 rounded-lg p-6">
                      <h6 className="text-lg font-semibold mb-2">Leadership Dialogue 4: Future-Proofing India: Semiconductors to Sustainability</h6>
                      <p className="text-sm">
                        This panel will explore how India's industrial renaissance is merging with its clean energy goals, marking a new chapter in the nation's green growth story. The discussion will focus on strategically building resilient supply chains for key technologies like semiconductors and EVs, while also securing critical resources such as lithium for a self-reliant future. This session offers a forward-looking perspective on how India is navigating geopolitical shifts to achieve sustainable growth and secure its place as a trusted partner and global leader.
                      </p>
                    </div>
                    
                    <div className="bg-white bg-opacity-10 rounded-lg p-6">
                      <h6 className="text-lg font-semibold mb-2">Leadership Dialogue 5: Global Commerce, Local Brands: Navigating a New Era of Trade and Consumer Behavior</h6>
                      <p className="text-sm">
                        Amid shifting supply chains, global trade tensions, and evolving consumer values, Indian brands are at a pivotal moment. This panel will delve into strategies for building a global footprint while staying true to local roots. The discussion will cover the impact of digital platforms on export markets, the importance of brand storytelling that resonates internationally, the challenges of managing global logistics in a post-pandemic, geopolitically complex world, and navigating tariff wars that reshape market access and competitiveness.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[hsl(var(--golden))] to-yellow-600 rounded-lg p-8 text-white">
                  <h5 className="text-2xl font-bold mb-6">BA Panels:</h5>
                  
                  <div className="space-y-6">
                    <div className="bg-white bg-opacity-10 rounded-lg p-6">
                      <h6 className="text-lg font-semibold mb-2">Leadership Dialogue 1: Healthcare Horizons: Biopharma, Affordable Innovation & IP Models</h6>
                      <p className="text-sm">
                        India's healthcare and biopharma ecosystem is shaping global health outcomes. This panel will explore affordable innovation, vaccine and drug development, IP management, and scalable healthcare business models-highlighting how India can provide accessible solutions at global scale.
                      </p>
                    </div>
                    
                    <div className="bg-white bg-opacity-10 rounded-lg p-6">
                      <h6 className="text-lg font-semibold mb-2">Leadership Dialogue 2: Business Analytics: From Prediction to Strategic Impact</h6>
                      <p className="text-sm">
                        Predictive analytics and AI models derive everything from demand forecasting to pricing decisions. But true value comes from translating insights into strategic business outcomes. This panel will discuss how leaders can move beyond dashboards to real impact, combining machine intelligence with human judgment, ethics, and creativity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
};

export default Theme;
