import heroImage from '@/assets/hero-bg.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="fade-in in-view">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[hsl(var(--primary-foreground))] mb-6 leading-tight">
            <span className="text-golden">Marmagya</span> 10.0
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[hsl(var(--primary-foreground))] mb-4">
            Annual Business Conclave
          </h2>
          <p className="text-lg sm:text-xl text-[hsl(var(--primary-foreground))] mb-8 opacity-90 max-w-3xl mx-auto">
            Join us for the most prestigious business conclave at IIM Sambalpur. Where innovation meets excellence, and leaders shape the future of business.
          </p>
          
          {/* Event Dates */}
          <div className="mb-12">
            <div className="inline-block bg-[hsl(var(--card))] bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4 border border-[hsl(var(--golden))] border-opacity-30">
              <p className="text-[hsl(var(--golden))] font-semibold text-lg sm:text-xl">
                March 15-16, 2024 | IIM Sambalpur
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-hero">
              Register Now
            </button>
            <button className="btn-primary">
              View Agenda
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-[hsl(var(--golden))] border-opacity-30 rotate-45 hidden lg:block"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-[hsl(var(--golden))] border-opacity-30 rotate-12 hidden lg:block"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-[hsl(var(--golden))] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[hsl(var(--golden))] rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;