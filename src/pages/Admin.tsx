import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  Building2, 
  Image, 
  MessageSquare, 
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import { APP_CONFIG } from '@/config/constants';
import { useAuth } from '@/contexts/SimpleAuthContext';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    speakers: 0,
    events: 0,
    sponsors: 0,
    gallery: 0,
    messages: 0
  });
  const [loading, setLoading] = useState(true);

  const adminNavItems = [
    { name: 'Dashboard', href: '/admin', icon: Settings },
    { name: 'Speakers', href: '/admin/speakers', icon: Users },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Sponsors', href: '/admin/sponsors', icon: Building2 },
    { name: 'Gallery', href: '/admin/gallery', icon: Image },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  ];

  useEffect(() => {
    fetchStats();
    
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

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch all stats in parallel
      const [speakersResult, eventsResult, sponsorsResult, galleryResult, messagesResult] = await Promise.all([
        (supabase as any).from('speakers').select('*', { count: 'exact' }),
        (supabase as any).from('events').select('*', { count: 'exact' }),
        (supabase as any).from('sponsors').select('*', { count: 'exact' }),
        (supabase as any).from('gallery').select('*', { count: 'exact' }),
        (supabase as any).from('contact_messages').select('*', { count: 'exact' })
      ]);

      setStats({
        speakers: speakersResult.count || 0,
        events: eventsResult.count || 0,
        sponsors: sponsorsResult.count || 0,
        gallery: galleryResult.count || 0,
        messages: messagesResult.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Home size={20} />
                <span>Back to Site</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-900">
                <span className="text-golden">Marmagya</span> Admin Panel
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name}
              </span>
              <button 
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-golden text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
              <p className="text-gray-600">Manage your conference content and data</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Speakers</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? '...' : stats.speakers}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Events</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? '...' : stats.events}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Sponsors</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? '...' : stats.sponsors}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Image className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Gallery Items</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? '...' : stats.gallery}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  to="/admin/speakers"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Manage Speakers</p>
                    <p className="text-sm text-gray-600">Add, edit, or remove speakers</p>
                  </div>
                </Link>

                <Link
                  to="/admin/events"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Calendar className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Manage Events</p>
                    <p className="text-sm text-gray-600">Update agenda and schedule</p>
                  </div>
                </Link>

                <Link
                  to="/admin/gallery"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Image className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Manage Gallery</p>
                    <p className="text-sm text-gray-600">Upload and organize images</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
