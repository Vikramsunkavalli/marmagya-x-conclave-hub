import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { DEFAULT_IMAGES } from '@/config/constants';

type Speaker = Tables<'speakers'>;

const SpeakersPage = () => {
  const [keynoteSpeakers, setKeynoteSpeakers] = useState<Speaker[]>([]);
  const [panelSpeakers, setPanelSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpeakers();
  }, []);

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

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, [keynoteSpeakers, panelSpeakers]); // Re-run when speakers change

  const fetchSpeakers = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('speakers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Separate keynote and panel speakers
      const keynotes = data?.filter(speaker => speaker.speaker_type === 'keynote') || [];
      const panels = data?.filter(speaker => speaker.speaker_type === 'panel') || [];
      
      // console.log('Fetched speakers:', data);
      // console.log('Keynote speakers:', keynotes);
      // console.log('Panel speakers:', panels);
      
      setKeynoteSpeakers(keynotes);
      setPanelSpeakers(panels);
    } catch (error) {
      console.error('Error fetching speakers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group panel speakers by panel title
  const groupedPanelSpeakers = panelSpeakers.reduce((acc, speaker) => {
    const panelTitle = speaker.panel_title || 'Other';
    if (!acc[panelTitle]) {
      acc[panelTitle] = [];
    }
    acc[panelTitle].push(speaker);
    return acc;
  }, {} as Record<string, Speaker[]>);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <section id="speakers" className="py-20 bg-[hsl(var(--secondary))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
                Our <span className="text-golden">Speakers</span>
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
              <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                Industry leaders and visionaries sharing their insights and expertise
              </p>
              
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading speakers...</p>
              </div>
            ) : (
              <>
                {/* Keynote Speakers */}
                {keynoteSpeakers.length > 0 && (
                  <div className="mb-16 fade-in">
                    <h3 className="text-2xl font-semibold text-[hsl(var(--primary))] text-center mb-8">
                      Keynote Speakers
                    </h3>
                    <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                      {keynoteSpeakers.map((speaker) => (
                        <div key={speaker.id} className="card-hover text-center group p-6">
                          <div className="relative mb-8">
                            <img
                              src={speaker.image_url || DEFAULT_IMAGES.speaker}
                              alt={speaker.name}
                              className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-[hsl(var(--golden))] group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                console.error('Failed to load speaker image for', speaker.name, ':', speaker.image_url);
                                e.currentTarget.src = DEFAULT_IMAGES.speaker;
                              }}
                            />
                            <div className="absolute inset-0 w-40 h-40 rounded-full mx-auto bg-[hsl(var(--golden))] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                          </div>
                          <h4 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-3">
                            {speaker.name}
                          </h4>
                          <p className="text-golden font-medium mb-4 text-lg">{speaker.title}</p>
                          {speaker.bio && (
                            <p className="text-[hsl(var(--muted-foreground))] text-base">{speaker.bio}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Panel Speakers */}
                {panelSpeakers.length > 0 && (
                  <div className="fade-in">
                    <h3 className="text-2xl font-semibold text-[hsl(var(--primary))] text-center mb-12">
                      Panel Speakers
                    </h3>
                    <div className="space-y-16">
                      {Object.keys(groupedPanelSpeakers).length > 0 ? (
                        Object.entries(groupedPanelSpeakers).map(([panelTitle, speakers]) => (
                          <div key={panelTitle} className="fade-in">
                            <h4 className="text-xl font-semibold text-[hsl(var(--primary))] text-center mb-8">
                              {panelTitle}
                            </h4>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                              {speakers.map((speaker) => (
                                <div key={speaker.id} className="card-hover text-center group p-4">
                                  <div className="relative mb-6">
                                    <img
                                      src={speaker.image_url || DEFAULT_IMAGES.panelSpeaker}
                                      alt={speaker.name}
                                      className="w-28 h-28 rounded-full mx-auto object-cover border-3 border-[hsl(var(--golden))] group-hover:scale-105 transition-transform duration-300"
                                      onError={(e) => {
                                        console.error('Failed to load panel speaker image for', speaker.name, ':', speaker.image_url);
                                        e.currentTarget.src = DEFAULT_IMAGES.panelSpeaker;
                                      }}
                                    />
                                  </div>
                                  <h5 className="text-lg font-semibold text-[hsl(var(--primary))] mb-2">
                                    {speaker.name}
                                  </h5>
                                  <p className="text-sm text-golden font-medium">{speaker.title}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="fade-in">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {panelSpeakers.map((speaker) => (
                              <div key={speaker.id} className="card-hover text-center group p-4">
                                <div className="relative mb-6">
                                  <img
                                    src={speaker.image_url || DEFAULT_IMAGES.panelSpeaker}
                                    alt={speaker.name}
                                    className="w-28 h-28 rounded-full mx-auto object-cover border-3 border-[hsl(var(--golden))] group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                      console.error('Failed to load panel speaker image for', speaker.name, ':', speaker.image_url);
                                      e.currentTarget.src = DEFAULT_IMAGES.panelSpeaker;
                                    }}
                                  />
                                </div>
                                <h5 className="text-lg font-semibold text-[hsl(var(--primary))] mb-2">
                                  {speaker.name}
                                </h5>
                                <p className="text-sm text-golden font-medium">{speaker.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SpeakersPage;
