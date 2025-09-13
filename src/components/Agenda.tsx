const Agenda = () => {
  const agendaData = {
    day1: {
      date: "March 15, 2024",
      events: [
        {
          time: "09:00 AM",
          title: "Registration & Welcome Coffee",
          type: "general"
        },
        {
          time: "10:00 AM",
          title: "Opening Keynote: The Future of Business Leadership",
          speaker: "Dr. Rajesh Sharma, CEO TechForward Inc.",
          type: "keynote"
        },
        {
          time: "11:30 AM",
          title: "Panel 1: Digital Transformation in Traditional Industries",
          subtitle: "Bridging the Old and New",
          type: "panel"
        },
        {
          time: "01:00 PM",
          title: "Lunch & Networking",
          type: "break"
        },
        {
          time: "02:30 PM",
          title: "Panel 2: Sustainable Business Practices",
          subtitle: "Profit with Purpose",
          type: "panel"
        },
        {
          time: "04:00 PM",
          title: "Panel 3: The Rise of Entrepreneurship",
          subtitle: "From Idea to IPO",
          type: "panel"
        },
        {
          time: "06:00 PM",
          title: "Evening Gala & Awards Ceremony",
          type: "general"
        }
      ]
    },
    day2: {
      date: "March 16, 2024",
      events: [
        {
          time: "09:30 AM",
          title: "Morning Coffee & Networking",
          type: "general"
        },
        {
          time: "10:30 AM",
          title: "Keynote: AI and the Future of Work",
          speaker: "Ms. Priya Nair, Chief AI Officer, Global Tech",
          type: "keynote"
        },
        {
          time: "12:00 PM",
          title: "Panel 4: Financial Markets & Investment Trends",
          subtitle: "Navigating Market Volatility",
          type: "panel"
        },
        {
          time: "01:30 PM",
          title: "Lunch Break",
          type: "break"
        },
        {
          time: "02:45 PM",
          title: "Panel 5: Healthcare Innovation",
          subtitle: "Technology Meets Wellness",
          type: "panel"
        },
        {
          time: "04:15 PM",
          title: "Panel 6: Global Supply Chain Resilience",
          subtitle: "Building Robust Networks",
          type: "panel"
        },
        {
          time: "05:45 PM",
          title: "Closing Ceremony & Way Forward",
          type: "general"
        }
      ]
    }
  };

  const getEventTypeClass = (type: string) => {
    switch (type) {
      case 'keynote':
        return 'bg-[hsl(var(--golden))] bg-opacity-20 border-[hsl(var(--golden))]';
      case 'panel':
        return 'bg-[hsl(var(--primary))] bg-opacity-10 border-[hsl(var(--primary))]';
      case 'break':
        return 'bg-[hsl(var(--muted))] border-[hsl(var(--border))]';
      default:
        return 'bg-[hsl(var(--card))] border-[hsl(var(--border))]';
    }
  };

  return (
    <section id="agenda" className="py-20 bg-[hsl(var(--background))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
            Event <span className="text-golden">Agenda</span>
          </h2>
          <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            Two days of insightful discussions, networking, and knowledge sharing
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Day 1 */}
          <div className="fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[hsl(var(--primary))] mb-2">Day 1</h3>
              <p className="text-golden font-semibold">{agendaData.day1.date}</p>
            </div>
            
            <div className="space-y-4">
              {agendaData.day1.events.map((event, index) => (
                <div key={index} className={`p-6 rounded-lg border-l-4 ${getEventTypeClass(event.type)} transition-all duration-300 hover:shadow-lg`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <div className="text-sm font-semibold text-golden mb-2 sm:mb-0">
                      {event.time}
                    </div>
                    {event.type === 'panel' && (
                      <button className="btn-primary text-sm px-4 py-2 self-start">
                        Register
                      </button>
                    )}
                  </div>
                  <h4 className="font-semibold text-[hsl(var(--foreground))] mb-1">
                    {event.title}
                  </h4>
                  {event.subtitle && (
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
                      {event.subtitle}
                    </p>
                  )}
                  {event.speaker && (
                    <p className="text-sm text-[hsl(var(--primary))] font-medium">
                      {event.speaker}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Day 2 */}
          <div className="fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[hsl(var(--primary))] mb-2">Day 2</h3>
              <p className="text-golden font-semibold">{agendaData.day2.date}</p>
            </div>
            
            <div className="space-y-4">
              {agendaData.day2.events.map((event, index) => (
                <div key={index} className={`p-6 rounded-lg border-l-4 ${getEventTypeClass(event.type)} transition-all duration-300 hover:shadow-lg`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <div className="text-sm font-semibold text-golden mb-2 sm:mb-0">
                      {event.time}
                    </div>
                    {event.type === 'panel' && (
                      <button className="btn-primary text-sm px-4 py-2 self-start">
                        Register
                      </button>
                    )}
                  </div>
                  <h4 className="font-semibold text-[hsl(var(--foreground))] mb-1">
                    {event.title}
                  </h4>
                  {event.subtitle && (
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
                      {event.subtitle}
                    </p>
                  )}
                  {event.speaker && (
                    <p className="text-sm text-[hsl(var(--primary))] font-medium">
                      {event.speaker}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Agenda;