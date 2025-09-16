import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

type GalleryItem = Tables<'gallery'>;

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryItems();
    
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

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <section id="gallery" className="py-20 bg-[hsl(var(--secondary))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
                Event <span className="text-golden">Gallery</span>
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
              <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                Capturing the best moments from our conference
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading gallery...</p>
              </div>
            ) : galleryItems.length > 0 ? (
              <div className="relative">
                {/* Main Gallery Display */}
                <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img
                      src={galleryItems[currentSlide]?.image_url}
                      alt={galleryItems[currentSlide]?.title}
                      className="w-full h-96 object-cover"
                    />
                    {galleryItems[currentSlide]?.image_type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-4">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Image Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[hsl(var(--primary))] mb-2">
                      {galleryItems[currentSlide]?.title}
                    </h3>
                    {galleryItems[currentSlide]?.description && (
                      <p className="text-[hsl(var(--muted-foreground))]">
                        {galleryItems[currentSlide]?.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
                >
                  <ChevronRight className="h-6 w-6 text-gray-700" />
                </button>

                {/* Thumbnail Navigation */}
                <div className="mt-8 flex justify-center space-x-2 overflow-x-auto pb-2">
                  {galleryItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => goToSlide(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentSlide
                          ? 'border-[hsl(var(--golden))] scale-105'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Slide Counter */}
                <div className="text-center mt-4">
                  <span className="text-sm text-[hsl(var(--muted-foreground))]">
                    {currentSlide + 1} of {galleryItems.length}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📸</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No gallery items yet</h3>
                <p className="text-gray-600">Gallery items will appear here once they're added.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
