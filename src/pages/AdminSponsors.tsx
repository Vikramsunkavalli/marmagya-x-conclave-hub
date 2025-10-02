import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Upload,
  ExternalLink
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { STORAGE_BUCKETS } from '@/config/constants';
import { useAuth } from '@/contexts/AuthContext';

type Sponsor = Tables<'sponsors'>;

const AdminSponsors = () => {
  const { isAuthenticated } = useAuth();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    website_url: '',
    sponsor_level: 'bronze' as 'platinum' | 'gold' | 'silver' | 'bronze',
    description: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .order('sponsor_level', { ascending: true });

      if (error) throw error;
      setSponsors(data || []);
    } catch (error) {
      console.error('Error fetching sponsors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!isAuthenticated) {
        console.error('User not authenticated');
        return;
      }

      if (editingSponsor) {
        // Update existing sponsor
        const { error } = await supabase
          .from('sponsors')
          .update(formData)
          .eq('id', editingSponsor.id);

        if (error) throw error;
      } else {
        // Create new sponsor
        const { error } = await supabase
          .from('sponsors')
          .insert([formData]);

        if (error) throw error;
      }

      await fetchSponsors();
      setShowModal(false);
      setEditingSponsor(null);
      setFormData({
        name: '',
        logo_url: '',
        website_url: '',
        sponsor_level: 'bronze',
        description: ''
      });
      setUploading(false);
    } catch (error) {
      console.error('Error saving sponsor:', error);
    }
  };

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setFormData({
      name: sponsor.name,
      logo_url: sponsor.logo_url || '',
      website_url: sponsor.website_url || '',
      sponsor_level: sponsor.sponsor_level as 'platinum' | 'gold' | 'silver' | 'bronze',
      description: sponsor.description || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this sponsor?')) {
      try {
        if (!isAuthenticated) {
          console.error('User not authenticated');
          return;
        }

        const { error } = await supabase
          .from('sponsors')
          .delete()
          .eq('id', id);

        if (error) throw error;
        await fetchSponsors();
      } catch (error) {
        console.error('Error deleting sponsor:', error);
      }
    }
  };

  const handleLogoUpload = async (file: File, sponsorId: string) => {
    try {
      if (!isAuthenticated) {
        console.error('User not authenticated');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${sponsorId}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKETS.sponsorLogos)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(STORAGE_BUCKETS.sponsorLogos)
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('sponsors')
        .update({ logo_url: data.publicUrl })
        .eq('id', sponsorId);

      if (updateError) throw updateError;
      await fetchSponsors();
    } catch (error) {
      console.error('Error uploading logo:', error);
    }
  };

  const handleLogoUploadForNew = async (file: File) => {
    try {
      if (!isAuthenticated) {
        console.error('User not authenticated');
        return;
      }

      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `temp-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKETS.sponsorLogos)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(STORAGE_BUCKETS.sponsorLogos)
        .getPublicUrl(fileName);

      setFormData({ ...formData, logo_url: data.publicUrl });
    } catch (error) {
      console.error('Error uploading logo:', error);
    } finally {
      setUploading(false);
    }
  };

  const getSponsorLevelColor = (level: string) => {
    switch (level) {
      case 'platinum': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                <Building2 className="mr-2" size={24} />
                Manage Sponsors
              </h1>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 bg-golden text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <Plus size={20} />
              <span>Add Sponsor</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-golden mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading sponsors...</p>
            </div>
          ) : (
            sponsors.map((sponsor) => (
              <div key={sponsor.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 flex-shrink-0">
                      {sponsor.logo_url ? (
                        <img
                          src={sponsor.logo_url}
                          alt={sponsor.name}
                          className="w-12 h-12 object-contain rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{sponsor.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSponsorLevelColor(sponsor.sponsor_level)}`}>
                        {sponsor.sponsor_level.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(sponsor)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(sponsor.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {sponsor.description && (
                  <p className="text-gray-600 text-sm mb-4">{sponsor.description}</p>
                )}

                {sponsor.website_url && (
                  <a
                    href={sponsor.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Visit Website
                  </a>
                )}

                {/* Logo Upload */}
                <div className="mt-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Upload Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleLogoUpload(file, sponsor.id);
                    }}
                    className="text-xs"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && sponsors.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sponsors yet</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first sponsor.</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-golden text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Add Sponsor
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingSponsor(null);
                    setFormData({
                      name: '',
                      logo_url: '',
                      website_url: '',
                      sponsor_level: 'bronze',
                      description: ''
                    });
                    setUploading(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                  <input
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor Level</label>
                  <select
                    value={formData.sponsor_level}
                    onChange={(e) => setFormData({ ...formData, sponsor_level: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
                  >
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
                    placeholder="Brief description of the sponsor..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (editingSponsor) {
                          handleLogoUpload(file, editingSponsor.id);
                        } else {
                          handleLogoUploadForNew(file);
                        }
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
                    disabled={uploading}
                  />
                  {uploading && (
                    <p className="text-sm text-gray-600 mt-1">Uploading logo...</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Upload a logo image file (JPG, PNG, etc.)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Or Logo URL</label>
                  <input
                    type="url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
                    placeholder="https://example.com/logo.png"
                  />
                  <p className="text-xs text-gray-500 mt-1">Alternative: Paste a direct URL to the logo image</p>
                </div>

                {formData.logo_url && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Logo Preview:</p>
                    <img
                      src={formData.logo_url}
                      alt="Logo preview"
                      className="w-24 h-24 object-contain rounded border bg-gray-50"
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-golden text-white rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    {editingSponsor ? 'Update Sponsor' : 'Add Sponsor'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSponsors;
