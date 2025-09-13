import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const galleryItems = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      title: 'Marmagya 9.0 Opening Ceremony',
      description: 'Grand opening with distinguished guests'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&h=600&fit=crop',
      title: 'Panel Discussion - Digital Innovation',
      description: 'Industry leaders sharing insights on digital transformation'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
      title: 'Networking Session',
      description: 'Participants engaging in meaningful conversations'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
      title: 'Keynote Presentation',
      description: 'Inspiring talks from business visionaries'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
      title: 'Awards Ceremony',
      description: 'Recognizing excellence and innovation'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=600&fit=crop',
      title: 'Workshop Sessions',
      description: 'Interactive learning and skill development'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="gallery" className="py-20 bg-[hsl(var(--secondary))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
            Event <span className="text-golden">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            Capturing moments from previous Marmagya events
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative mb-8">
          <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-elegant)]">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {galleryItems.map((item, index) => (
                <div key={index} className="flex-shrink-0 w-full relative">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-[60vh] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-lg opacity-90">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[hsl(var(--card))] bg-opacity-20 backdrop-blur-sm hover:bg-opacity-40 text-white p-3 rounded-full transition-all duration-300 border border-white/20"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[hsl(var(--card))] bg-opacity-20 backdrop-blur-sm hover:bg-opacity-40 text-white p-3 rounded-full transition-all duration-300 border border-white/20"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-[hsl(var(--golden))] scale-125'
                    : 'bg-[hsl(var(--border))] hover:bg-[hsl(var(--golden))] hover:bg-opacity-60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryItems.map((item, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative overflow-hidden rounded-lg group transition-all duration-300 ${
                index === currentSlide 
                  ? 'ring-4 ring-[hsl(var(--golden))] scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
              </div>
            </button>
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-12">
          <button className="btn-hero">
            View Full Gallery
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;