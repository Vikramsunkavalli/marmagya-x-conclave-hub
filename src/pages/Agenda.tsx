import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { Clock, MapPin, Users } from 'lucide-react';

type Event = Tables<'events'>;

const AgendaPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
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
  }, [events]); // Re-run when events change

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('events')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'keynote': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'panel': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'break': return 'bg-green-100 text-green-800 border-green-200';
      case 'session': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'networking': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'keynote': return '🎤';
      case 'panel': return '👥';
      case 'break': return '☕';
      case 'session': return '📚';
      case 'networking': return '🤝';
      default: return '📅';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <section id="agenda" className="py-20 bg-[hsl(var(--secondary))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
                Conference <span className="text-golden">Agenda</span>
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
              <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                Join us for an exciting day of learning, networking, and innovation
              </p>
              
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading agenda...</p>
              </div>
            ) : events.length > 0 ? (
              <div className="max-w-4xl mx-auto">
                <div className="space-y-6">
                  {events.map((event, index) => (
                    <div key={event.id} className="fade-in">
                      <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-golden rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {index + 1}
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-2xl">{getEventTypeIcon(event.event_type)}</span>
                                  <h3 className="text-xl font-semibold text-[hsl(var(--primary))]">
                                    {event.title}
                                  </h3>
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getEventTypeColor(event.event_type)}`}>
                                    {event.event_type}
                                  </span>
                                </div>
                                
                                {event.description && (
                                  <p className="text-[hsl(var(--muted-foreground))] mb-4">
                                    {event.description}
                                  </p>
                                )}
                                
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <Clock size={16} />
                                    <span>
                                      {formatTime(event.start_time)} - {formatTime(event.end_time)}
                                    </span>
                                  </div>
                                  
                                  {event.location && (
                                    <div className="flex items-center space-x-1">
                                      <MapPin size={16} />
                                      <span>{event.location}</span>
                                    </div>
                                  )}
                                  
                                  {event.speaker_ids && event.speaker_ids.length > 0 && (
                                    <div className="flex items-center space-x-1">
                                      <Users size={16} />
                                      <span>{event.speaker_ids.length} speaker(s)</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No events scheduled yet</h3>
                <p className="text-gray-600">The conference agenda will appear here once events are added.</p>
              </div>
            )}

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-white rounded-lg shadow-sm border p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-4">
                  Stay Updated
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                  Don't miss out on any updates. Register now to secure your spot at this amazing conference.
                </p>
                <button className="btn-hero">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AgendaPage;
