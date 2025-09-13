const About = () => {
  return (
    <section id="about" className="py-20 bg-[hsl(var(--secondary))]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
            About <span className="text-golden">Marmagya</span>
          </h2>
          <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h3 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6">
              A Decade of Excellence
            </h3>
            <p className="text-lg text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed">
              Marmagya, the flagship business conclave of IIM Sambalpur, has been a beacon of 
              intellectual discourse and business innovation for over a decade. Our annual gathering 
              brings together industry leaders, visionary entrepreneurs, and brilliant minds to explore 
              the evolving landscape of modern business.
            </p>
            <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
              From humble beginnings to becoming one of the most anticipated business events in 
              Eastern India, Marmagya continues to foster meaningful connections and drive 
              transformative conversations that shape the future of business.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="card-hover text-center">
              <div className="text-3xl font-bold text-golden mb-2">10+</div>
              <p className="text-[hsl(var(--muted-foreground))]">Years of Legacy</p>
            </div>
            <div className="card-hover text-center">
              <div className="text-3xl font-bold text-golden mb-2">50+</div>
              <p className="text-[hsl(var(--muted-foreground))]">Industry Leaders</p>
            </div>
            <div className="card-hover text-center">
              <div className="text-3xl font-bold text-golden mb-2">2000+</div>
              <p className="text-[hsl(var(--muted-foreground))]">Participants</p>
            </div>
            <div className="card-hover text-center">
              <div className="text-3xl font-bold text-golden mb-2">100+</div>
              <p className="text-[hsl(var(--muted-foreground))]">Companies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;