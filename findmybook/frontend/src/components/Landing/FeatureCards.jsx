const features = [
  {
    icon: "🔍",
    title: "Title Search",
    desc: "Find any book in the collection instantly by title.",
  },
  {
    icon: "🗺️",
    title: "Visual Map",
    desc: "Follow a step-by-step path directly to the shelf.",
  },
  {
    icon: "📍",
    title: "Your Location",
    desc: "Start from the entrance, elevator, or staircase.",
  },
];

function FeatureCards() {
  return (
    <section className="features-wrapper">
      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.title} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureCards;