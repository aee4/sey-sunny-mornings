import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Tag, Gift } from "lucide-react";
import heroImage from "@/assets/hero-breakfast.jpg";

const Home = () => {
  const navigate = useNavigate();

  const featuredItems = [
    {
      name: "Millet Delight (Koko)",
      description: "Creamy millet porridge with a coconut milk twist",
      price: "GH₵22",
    },
    {
      name: "Morning Glow Smoothie",
      description: "Banana, oats, and honey blend for natural energy",
      price: "GH₵18",
    },
    {
      name: "Egg & Avocado Sandwich",
      description: "Soft wheat bread with boiled egg and avocado",
      price: "GH₵25",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Start Smart. <br />
                Eat Fresh. <br />
                <span className="text-primary">Sey Good Morning.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Fresh, healthy, and affordable morning meals delivered to your doorstep in Accra.
              </p>
              
              {/* Offer Cards */}
              <div className="space-y-4 mb-8">
                <Card className="p-4 bg-muted/50 border-secondary/20 card-shadow">
                  <div className="flex items-start space-x-3">
                    <Tag className="text-secondary mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-primary">Use code <span className="text-secondary">GOODMORNING10</span></p>
                      <p className="text-sm text-muted-foreground">Get 10% off your first order</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-muted/50 border-secondary/20 card-shadow">
                  <div className="flex items-start space-x-3">
                    <Gift className="text-secondary mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-primary">Join the Good Morning Club</p>
                      <p className="text-sm text-muted-foreground">Order 6 breakfasts, get the 7th free!</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Button 
                variant="cta" 
                size="lg"
                onClick={() => navigate("/menu")}
              >
                Order Now
              </Button>
            </div>

            <div className="animate-fade-in">
              <img 
                src={heroImage} 
                alt="Fresh breakfast spread" 
                className="rounded-2xl warm-shadow w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Breakfast Items</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <Card 
                key={index} 
                className="p-6 hover:scale-105 transition-smooth card-shadow cursor-pointer"
                onClick={() => navigate("/menu")}
              >
                <h3 className="text-xl font-semibold mb-2 text-primary">{item.name}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <p className="text-2xl font-bold text-secondary">{item.price}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => navigate("/menu")}>
              View Full Menu
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
