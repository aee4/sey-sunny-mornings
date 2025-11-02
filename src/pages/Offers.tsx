import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, Gift, Calendar, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Offers = () => {
  const navigate = useNavigate();

  const offers = [
    {
      title: "First Order Discount",
      code: "GOODMORNING10",
      description: "Get 10% off your first order! Perfect for trying out our delicious breakfast menu.",
      discount: "10% OFF",
      icon: Tag,
      color: "text-secondary",
    },
    {
      title: "Good Morning Club",
      code: "LOYALTY",
      description: "Order 6 breakfasts and get your 7th meal absolutely free! Join our loyalty program today.",
      discount: "7TH FREE",
      icon: Gift,
      color: "text-primary",
    },
    {
      title: "Friday Special",
      code: "FRIDAYVIBES",
      description: "Every Friday, enjoy our special combo deals. Get a main meal plus a smoothie at a discounted price.",
      discount: "15% OFF",
      icon: Calendar,
      color: "text-secondary",
    },
    {
      title: "Smoothie Refill",
      code: "REFILL20",
      description: "Bring back your smoothie jar for a refill and save 20% on your next smoothie purchase.",
      discount: "20% OFF",
      icon: Percent,
      color: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in">Special Offers</h1>
          <p className="text-base md:text-xl text-muted-foreground animate-fade-in px-4">
            Save more on your favorite breakfast meals with our exclusive deals!
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {offers.map((offer, index) => {
              const Icon = offer.icon;
              return (
                <Card 
                  key={index} 
                  className="p-5 md:p-8 hover:scale-105 transition-smooth card-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <Icon className={`${offer.color} w-8 h-8 md:w-12 md:h-12`} />
                    <div className="bg-secondary/20 text-secondary px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-bold text-xs md:text-sm">
                      {offer.discount}
                    </div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-primary">{offer.title}</h3>
                  
                  <div className="mb-3 md:mb-4">
                    <span className="text-xs md:text-sm text-muted-foreground">Code: </span>
                    <span className="font-mono font-bold text-base md:text-lg">{offer.code}</span>
                  </div>
                  
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">{offer.description}</p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full text-sm md:text-base"
                    onClick={() => navigate("/menu")}
                  >
                    Order Now
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-12 text-primary px-4">How to Use Your Promo Code</h2>
          <div className="grid sm:grid-cols-3 gap-6 md:gap-8 text-center">
            <div className="space-y-2 md:space-y-3">
              <div className="text-3xl md:text-4xl mb-2">1️⃣</div>
              <h3 className="font-semibold text-sm md:text-base">Choose Your Meal</h3>
              <p className="text-xs md:text-sm text-muted-foreground px-2">Browse our menu and select your favorite breakfast items</p>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="text-3xl md:text-4xl mb-2">2️⃣</div>
              <h3 className="font-semibold text-sm md:text-base">Enter Code</h3>
              <p className="text-xs md:text-sm text-muted-foreground px-2">Apply the promo code at checkout to get your discount</p>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="text-3xl md:text-4xl mb-2">3️⃣</div>
              <h3 className="font-semibold text-sm md:text-base">Enjoy!</h3>
              <p className="text-xs md:text-sm text-muted-foreground px-2">Sit back and enjoy your delicious breakfast</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offers;
