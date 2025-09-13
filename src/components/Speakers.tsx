const Speakers = () => {
  const keynotes = [
    {
      name: "Dr. Rajesh Sharma",
      title: "CEO, TechForward Inc.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Future of Business Leadership"
    },
    {
      name: "Ms. Priya Nair", 
      title: "Chief AI Officer, Global Tech",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop&crop=face",
      bio: "AI and Future of Work"
    }
  ];

  const panels = [
    {
      title: "Panel 1: Digital Transformation in Traditional Industries",
      speakers: [
        {
          name: "Mr. Arjun Kumar",
          title: "Managing Director, Innovation Labs",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Dr. Savita Reddy",
          title: "CTO, Legacy Systems Corp",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Mr. Rohit Mehta",
          title: "Digital Strategy Head, Manufacturing Plus",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Ms. Ananya Joshi",
          title: "Transformation Lead, Banking Solutions",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Dr. Kiran Patel",
          title: "Industry 4.0 Expert, Tech Innovations",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face"
        }
      ]
    },
    {
      title: "Panel 2: Sustainable Business Practices",
      speakers: [
        {
          name: "Dr. Meera Gupta",
          title: "Sustainability Director, EcoVentures",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Mr. Aditya Singh",
          title: "Green Finance Head, Impact Capital",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Ms. Riya Sharma",
          title: "ESG Consultant, Future Earth",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Dr. Vikram Rao",
          title: "Climate Tech Researcher, GreenLabs",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Ms. Pooja Nair",
          title: "Circular Economy Expert, ReGen Corp",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face"
        }
      ]
    },
    {
      title: "Panel 3: The Rise of Entrepreneurship",
      speakers: [
        {
          name: "Mr. Vikram Singh",
          title: "Founder & CEO, StartupHub",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Ms. Divya Krishnan",
          title: "Managing Partner, Venture Catalyst",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Dr. Rahul Agarwal",
          title: "Startup Accelerator Head, Innovation Hub",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Ms. Shreya Kapoor",
          title: "Angel Investor, Early Stage Ventures",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Mr. Nitin Goel",
          title: "Serial Entrepreneur, TechCrunch",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face"
        }
      ]
    },
    {
      title: "Panel 4: Financial Markets & Investment Trends",
      speakers: [
        {
          name: "Ms. Neha Agarwal",
          title: "Investment Director, Capital Partners",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Dr. Sameer Jain",
          title: "Portfolio Manager, Wealth Advisory",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Mr. Arpit Gupta",
          title: "Market Analyst, Financial Insights",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Ms. Kavya Desai",
          title: "Fintech Innovation Lead, Digital Finance",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Dr. Manish Kumar",
          title: "Risk Management Expert, Global Markets",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face"
        }
      ]
    },
    {
      title: "Panel 5: Healthcare Innovation",
      speakers: [
        {
          name: "Dr. Priyanka Thakur",
          title: "Chief Medical Officer, HealthTech Solutions",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Mr. Abhishek Sharma",
          title: "Digital Health Director, MedInnovate",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Dr. Shalini Rao",
          title: "Biotech Researcher, Life Sciences Corp",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Ms. Tanvi Singh",
          title: "Healthcare Analytics Lead, Data Medicine",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Dr. Rajat Verma",
          title: "Telemedicine Expert, Remote Care",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
        }
      ]
    },
    {
      title: "Panel 6: Global Supply Chain Resilience",
      speakers: [
        {
          name: "Mr. Suresh Iyer",
          title: "Supply Chain Director, Global Logistics",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Ms. Deepika Nair",
          title: "Operations Head, International Trade",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Dr. Ashwin Reddy",
          title: "Logistics Innovation Expert, SmartChain",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Mr. Gaurav Malhotra",
          title: "Procurement Strategy Lead, Global Sources",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
        },
        {
          name: "Ms. Nisha Patel",
          title: "Risk Mitigation Specialist, Resilient Networks",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop&crop=face"
        }
      ]
    }
  ];

  return (
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

        {/* Keynote Speakers */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-[hsl(var(--primary))] text-center mb-8">
            Keynote Speakers
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {keynotes.map((speaker, index) => (
              <div key={index} className="card-hover text-center group">
                <div className="relative mb-6">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[hsl(var(--golden))] group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-[hsl(var(--golden))] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-xl font-semibold text-[hsl(var(--primary))] mb-2">
                  {speaker.name}
                </h4>
                <p className="text-golden font-medium mb-3">{speaker.title}</p>
                <p className="text-[hsl(var(--muted-foreground))]">{speaker.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Panel Speakers */}
        <div>
          <h3 className="text-2xl font-semibold text-[hsl(var(--primary))] text-center mb-12">
            Panel Speakers
          </h3>
          <div className="space-y-16">
            {panels.map((panel, panelIndex) => (
              <div key={panelIndex} className="fade-in">
                <h4 className="text-xl font-semibold text-[hsl(var(--primary))] text-center mb-8">
                  {panel.title}
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {panel.speakers.map((speaker, speakerIndex) => (
                    <div key={speakerIndex} className="card-hover text-center group">
                      <div className="relative mb-4">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-[hsl(var(--golden))] group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h5 className="text-sm font-semibold text-[hsl(var(--primary))] mb-1">
                        {speaker.name}
                      </h5>
                      <p className="text-xs text-golden font-medium">{speaker.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-[hsl(var(--muted-foreground))] mb-6">
            Want to join our distinguished panel of speakers?
          </p>
          <button className="btn-hero">
            Become a Speaker
          </button>
        </div>
      </div>
    </section>
  );
};

export default Speakers;