import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', organization: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary-foreground))] mb-6">
            Get in <span className="text-golden">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
          <p className="text-lg text-[hsl(var(--primary-foreground))] opacity-90 max-w-3xl mx-auto">
            Have questions? Want to partner with us? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-[hsl(var(--card))] bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-[hsl(var(--golden))] border-opacity-20 h-fit">
              <h3 className="text-2xl font-bold text-[hsl(var(--primary-foreground))] mb-8">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[hsl(var(--golden))] bg-opacity-20 p-3 rounded-lg">
                    <MapPin className="text-golden" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[hsl(var(--primary-foreground))] mb-1">Address</h4>
                    <p className="text-[hsl(var(--primary-foreground))] opacity-80">
                      IIM Sambalpur<br />
                      Jyoti Vihar, Burla<br />
                      Sambalpur, Odisha 768019
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[hsl(var(--golden))] bg-opacity-20 p-3 rounded-lg">
                    <Phone className="text-golden" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[hsl(var(--primary-foreground))] mb-1">Phone</h4>
                    <p className="text-[hsl(var(--primary-foreground))] opacity-80">
                      +91 9876543210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[hsl(var(--golden))] bg-opacity-20 p-3 rounded-lg">
                    <Mail className="text-golden" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[hsl(var(--primary-foreground))] mb-1">Email</h4>
                    <p className="text-[hsl(var(--primary-foreground))] opacity-80">
                      marmagya@iimsambalpur.ac.in
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-8 pt-8 border-t border-[hsl(var(--golden))] border-opacity-30">
                <h4 className="font-semibold text-[hsl(var(--primary-foreground))] mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="w-full text-left text-[hsl(var(--primary-foreground))] opacity-80 hover:opacity-100 hover:text-golden transition-colors">
                    Download Event Brochure
                  </button>
                  <button className="w-full text-left text-[hsl(var(--primary-foreground))] opacity-80 hover:opacity-100 hover:text-golden transition-colors">
                    Media & Press Kit
                  </button>
                  <button className="w-full text-left text-[hsl(var(--primary-foreground))] opacity-80 hover:opacity-100 hover:text-golden transition-colors">
                    Accommodation Guide
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[hsl(var(--card))] bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-[hsl(var(--golden))] border-opacity-20">
              <h3 className="text-2xl font-bold text-[hsl(var(--primary-foreground))] mb-8">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[hsl(var(--primary-foreground))] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[hsl(var(--card))] bg-opacity-50 border border-[hsl(var(--border))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--golden))] focus:border-transparent text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))]"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[hsl(var(--primary-foreground))] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[hsl(var(--card))] bg-opacity-50 border border-[hsl(var(--border))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--golden))] focus:border-transparent text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))]"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-[hsl(var(--primary-foreground))] mb-2">
                    Organization/Institution
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[hsl(var(--card))] bg-opacity-50 border border-[hsl(var(--border))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--golden))] focus:border-transparent text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))]"
                    placeholder="Your organization or institution"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[hsl(var(--primary-foreground))] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[hsl(var(--card))] bg-opacity-50 border border-[hsl(var(--border))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--golden))] focus:border-transparent text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-hero w-full flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;