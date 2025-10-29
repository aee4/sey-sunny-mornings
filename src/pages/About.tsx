import { Card } from "@/components/ui/card";
import aboutImage from "@/assets/about-illustration.jpg";

const About = () => {
  const values = [
    {
      title: "Fresh Every Morning",
      description: "We prepare all meals fresh each day using the finest local ingredients.",
      icon: "🌅",
    },
    {
      title: "Locally Sourced",
      description: "Supporting Ghanaian farmers by using locally grown produce and grains.",
      icon: "🌾",
    },
    {
      title: "Eco-Friendly",
      description: "Committed to sustainability with biodegradable packaging and minimal waste.",
      icon: "♻️",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">About Sey Good Morning</h1>
          <p className="text-xl text-muted-foreground animate-fade-in">
            Transforming breakfast in Ghana, one meal at a time.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img 
                src={aboutImage} 
                alt="Happy breakfast moment" 
                className="rounded-2xl warm-shadow w-full"
              />
            </div>
            <div className="animate-fade-in space-y-6">
              <h2 className="text-4xl font-bold text-primary">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Sey Good Morning, we believe every day should start with happiness, health, and good food. 
                We're transforming breakfast in Ghana with quick online ordering, eco-friendly packaging, 
                and nutritious meals made from locally sourced ingredients.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Born from a passion for Ghanaian flavors and a commitment to convenience, 
                we bring authentic breakfast experiences right to your doorstep. From traditional 
                Koko to modern smoothie bowls, every meal is crafted with care and delivered with love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="p-8 text-center hover:scale-105 transition-smooth card-shadow"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-primary">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            To make healthy, delicious, and affordable breakfast accessible to everyone in Ghana. 
            We're building a community that values good food, supports local farmers, 
            and starts each day with positivity and energy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
