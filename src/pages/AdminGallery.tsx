import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Image, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Upload,
  Eye,
  Download
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { STORAGE_BUCKETS } from '@/config/constants';
import { useAuth } from '@/contexts/SimpleAuthContext';

type GalleryItem = Tables<'gallery'>;

const AdminGallery = () => {
  const { isAuthenticated } = useAuth();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    image_type: 'photo' as 'photo' | 'video'
  });

  useEffect(() => {
    fetchGalleryItems();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!isAuthenticated) {
        console.error('User not authenticated');
        return;
      }

      if (editingItem) {
        // Update existing item
        const { error } = await (supabase as any)
          .from('gallery')
          .update(formData)
          .eq('id', editingItem.id);

        if (error) throw error;
      } else {
        // Create new item
        const { error } = await (supabase as any)
          .from('gallery')
          .insert([formData]);

        if (error) throw error;
      }

      await fetchGalleryItems();
      setShowModal(false);
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        image_url: '',
        image_type: 'photo'
      });
    } catch (error) {
      console.error('Error saving gallery item:', error);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      image_url: item.image_url,
      image_type: item.image_type as 'photo' | 'video'
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
      try {
        if (!isAuthenticated) {
          console.error('User not authenticated');
          return;
        }

        const { error } = await supabase
          .from('gallery')
          .delete()
          .eq('id', id);

        if (error) throw error;
        await fetchGalleryItems();
      } catch (error) {
        console.error('Error deleting gallery item:', error);
      }
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      if (!isAuthenticated) {
        console.error('User not authenticated');
        return;
      }

      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKETS.galleryImages)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(STORAGE_BUCKETS.galleryImages)
        .getPublicUrl(fileName);

      setFormData({ ...formData, image_url: data.publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const getImageTypeColor = (type: string) => {
    switch (type) {
      case 'photo': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-purple-100 text-purple-800';
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
                <Image className="mr-2" size={24} />
                Manage Gallery
              </h1>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 bg-golden text-golden-foreground px-4 py-2 rounded-lg hover:bg-golden-dark transition-colors shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              <span>Add Item</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-golden mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading gallery...</p>
            </div>
          ) : (
            galleryItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <Image className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h3>
                    <div className="flex space-x-1 ml-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {item.description && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getImageTypeColor(item.image_type)}`}>
                      {item.image_type}
                    </span>
                    <div className="flex space-x-1">
                      <a
                        href={item.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye size={14} />
                      </a>
                      <a
                        href={item.image_url}
                        download
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Download size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && galleryItems.length === 0 && (
          <div className="text-center py-12">
            <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No gallery items yet</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first gallery item.</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-golden text-golden-foreground px-4 py-2 rounded-lg hover:bg-golden-dark transition-colors shadow-md hover:shadow-lg"
            >
              Add Item
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
                  {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    setFormData({
                      title: '',
                      description: '',
                      image_url: '',
                      image_type: 'photo'
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Media Type</label>
                  <select
                    value={formData.image_type}
                    onChange={(e) => setFormData({ ...formData, image_type: e.target.value as 'photo' | 'video' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
                  >
                    <option value="photo">Photo</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image/Video</label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
                    disabled={uploading}
                  />
                  {uploading && (
                    <p className="text-sm text-gray-600 mt-1">Uploading...</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Or Image/Video URL</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {formData.image_url && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded border"
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
                    className="px-4 py-2 bg-golden text-golden-foreground rounded-md hover:bg-golden-dark transition-colors shadow-md hover:shadow-lg"
                  >
                    {editingItem ? 'Update Item' : 'Add Item'}
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

export default AdminGallery;
