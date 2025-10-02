import { useEffect } from 'react';

const Contact = () => {
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

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="contact" className="py-20 bg-[hsl(var(--background))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
                Get in <span className="text-golden">Touch</span>
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
              <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                Have questions about Marmagya 10.0? We'd love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="fade-in">
                <h3 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white">📍</span>
                    </div>
                    <div>
                      <p className="font-medium text-[hsl(var(--primary))]">Address</p>
                      <p className="text-[hsl(var(--muted-foreground))]">
                        IIM Sambalpur<br />
                        near Ghoshala, Basantpur, Odisha 768025
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white">📱</span>
                    </div>
                    <div>
                      <p className="font-medium text-[hsl(var(--primary))]">Phone</p>
                      <p className="text-[hsl(var(--muted-foreground))]">+91 9791087276</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[hsl(var(--golden))] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white">📧</span>
                    </div>
                    <div>
                      <p className="font-medium text-[hsl(var(--primary))]">Email</p>
                      <p className="text-[hsl(var(--muted-foreground))]">industry@iimsambalpur.ac.in</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fade-in">
                <h3 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[hsl(var(--primary))] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--golden))] focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[hsl(var(--primary))] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--golden))] focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[hsl(var(--primary))] mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--golden))] focus:border-transparent"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[hsl(var(--golden))] text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
  );
};

export default Contact;
