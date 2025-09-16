import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Upload,
  X
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { STORAGE_BUCKETS, DEFAULT_IMAGES } from '@/config/constants';
import { useAuth } from '@/contexts/SimpleAuthContext';

type Speaker = Tables<'speakers'>;

const AdminSpeakers = () => {
  const { isAuthenticated } = useAuth();
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    speaker_type: 'panel' as 'keynote' | 'panel',
    panel_title: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('speakers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSpeakers(data || []);
    } catch (error) {
      console.error('Error fetching speakers:', error);
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

      setUploading(true);

      if (editingSpeaker) {
        // Update existing speaker
        const { error } = await (supabase as any)
          .from('speakers')
          .update({
            name: formData.name,
            title: formData.title,
            bio: formData.bio || null,
            speaker_type: formData.speaker_type,
            panel_title: formData.panel_title || null
          })
          .eq('id', editingSpeaker.id);

        if (error) throw error;

        // Upload image if selected
        if (selectedImage) {
          await handleImageUpload(selectedImage, editingSpeaker.id);
        }
      } else {
        // Create new speaker
        const { data: newSpeaker, error } = await (supabase as any)
          .from('speakers')
          .insert([{
            name: formData.name,
            title: formData.title,
            bio: formData.bio || null,
            speaker_type: formData.speaker_type,
            panel_title: formData.panel_title || null
          }])
          .select()
          .single();

        if (error) throw error;

        // Upload image if selected
        if (selectedImage && newSpeaker) {
          await handleImageUpload(selectedImage, newSpeaker.id);
        }
      }

      await fetchSpeakers();
      resetForm();
    } catch (error) {
      console.error('Error saving speaker:', error);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setEditingSpeaker(null);
    setFormData({
      name: '',
      title: '',
      bio: '',
      speaker_type: 'panel',
      panel_title: ''
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (speaker: Speaker) => {
    setEditingSpeaker(speaker);
    setFormData({
      name: speaker.name,
      title: speaker.title,
      bio: speaker.bio || '',
      speaker_type: speaker.speaker_type,
      panel_title: speaker.panel_title || ''
    });
    setImagePreview(speaker.image_url);
    setSelectedImage(null);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this speaker?')) {
      try {
        if (!isAuthenticated) {
          console.error('User not authenticated');
          return;
        }

        const { error } = await supabase
          .from('speakers')
          .delete()
          .eq('id', id);

        if (error) throw error;
        await fetchSpeakers();
      } catch (error) {
        console.error('Error deleting speaker:', error);
      }
    }
  };

  const handleImageUpload = async (file: File, speakerId: string) => {
    try {
      if (!isAuthenticated) {
        console.error('User not authenticated');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${speakerId}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKETS.speakerImages)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(STORAGE_BUCKETS.speakerImages)
        .getPublicUrl(fileName);

      const { error: updateError } = await (supabase as any)
        .from('speakers')
        .update({ image_url: data.publicUrl })
        .eq('id', speakerId);

      if (updateError) throw updateError;
      await fetchSpeakers();
    } catch (error) {
      console.error('Error uploading image:', error);
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
                <Users className="mr-2" size={24} />
                Manage Speakers
              </h1>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 bg-golden text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <Plus size={20} />
              <span>Add Speaker</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        {/* Speakers List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">All Speakers ({speakers.length})</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-golden mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading speakers...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Panel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {speakers.map((speaker) => (
                    <tr key={speaker.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            {speaker.image_url ? (
                              <img
                                className="h-12 w-12 rounded-full object-cover"
                                src={speaker.image_url}
                                alt={speaker.name}
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <Users className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{speaker.name}</div>
                            <div className="text-sm text-gray-500">{speaker.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          speaker.speaker_type === 'keynote' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {speaker.speaker_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {speaker.panel_title || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(speaker)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(speaker.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingSpeaker ? 'Edit Speaker' : 'Add New Speaker'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    {imagePreview ? (
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[hsl(var(--golden))]">
                        <img
                          src={imagePreview}
                          alt="Speaker preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                        <Users className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <label className="cursor-pointer">
                      <div className="flex items-center space-x-2 px-4 py-2 bg-[hsl(var(--golden))] text-white rounded-lg hover:bg-yellow-600 transition-colors">
                        <Upload size={16} />
                        <span>Upload Image</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      {selectedImage ? selectedImage.name : 'No image selected'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--golden))]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--golden))]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--golden))]"
                    placeholder="Brief description about the speaker..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Speaker Type</label>
                    <select
                      value={formData.speaker_type}
                      onChange={(e) => setFormData({ ...formData, speaker_type: e.target.value as 'keynote' | 'panel' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--golden))]"
                    >
                      <option value="panel">Panel Speaker</option>
                      <option value="keynote">Keynote Speaker</option>
                    </select>
                  </div>

                  {formData.speaker_type === 'panel' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Panel Title</label>
                      <input
                        type="text"
                        value={formData.panel_title}
                        onChange={(e) => setFormData({ ...formData, panel_title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--golden))]"
                        placeholder="e.g., Technology Innovation Panel"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[hsl(var(--golden))] text-white rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    disabled={uploading}
                  >
                    {uploading && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    )}
                    <span>{editingSpeaker ? 'Update Speaker' : 'Add Speaker'}</span>
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

export default AdminSpeakers;
