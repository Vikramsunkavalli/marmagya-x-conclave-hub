const Theme = () => {
  return (
    <section id="theme" className="py-20 gradient-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary-foreground))] mb-6">
            Theme: <span className="text-golden">Future Forward</span>
          </h2>
          <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[hsl(var(--card))] bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-[hsl(var(--golden))] border-opacity-20">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[hsl(var(--primary-foreground))] mb-6">
                Navigating Tomorrow's Business Landscape
              </h3>
            </div>

            <div className="space-y-6 text-lg text-[hsl(var(--primary-foreground))] leading-relaxed">
              <p className="opacity-90">
                In an era of unprecedented technological advancement and global transformation, 
                businesses face both extraordinary opportunities and complex challenges. Marmagya 10.0 
                explores the theme "Future Forward" – a call to embrace innovation, adaptability, 
                and visionary leadership in shaping tomorrow's business ecosystem.
              </p>

              <p className="opacity-90">
                Our discussions will delve into emerging technologies, sustainable business practices, 
                the evolving nature of work, and the fundamental shifts in consumer behavior that 
                are reshaping industries worldwide. We'll examine how leaders can foster innovation 
                while maintaining human-centric values, creating organizations that are not just 
                profitable, but purposeful.
              </p>

              <p className="opacity-90">
                Join us as we explore the intersection of technology and humanity, where artificial 
                intelligence meets emotional intelligence, where data-driven decisions complement 
                intuitive leadership, and where global connectivity enhances local impact. Together, 
                we'll chart a course toward a future where business serves as a force for positive 
                transformation in society.
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <div className="inline-flex items-center px-6 py-3 bg-[hsl(var(--golden))] bg-opacity-20 rounded-full border border-[hsl(var(--golden))] border-opacity-40">
                <span className="text-golden font-semibold">"Building Tomorrow, Today"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Theme;