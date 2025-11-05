import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Lock, ChefHat, Video, Users, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import kokoImage from "@/assets/menu-koko.jpg";

const Recipes = () => {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"mobile-money" | "card">("mobile-money");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false); // In production, this would check payment status

  const sampleRecipe = {
    title: "Millet Delight (Koko)",
    description: "A creamy, comforting porridge that's perfect for starting your day. This traditional Ghanaian breakfast brings warmth and energy with every spoonful.",
    image: kokoImage,
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: "2-3 servings",
    ingredients: [
      { name: "Millet", amount: "1 cup", preview: true },
      { name: "Coconut milk", amount: "2 cups", preview: true },
      { name: "Water", amount: "3 cups", preview: true },
      { name: "Ginger", amount: "1 inch piece, grated", preview: true },
      { name: "Salt", amount: "To taste", preview: true },
      { name: "Sugar or honey", amount: "To taste", preview: false },
      { name: "Cinnamon", amount: "1 pinch", preview: false },
      { name: "Vanilla extract", amount: "1/2 tsp", preview: false },
    ],
    steps: [
      { number: 1, instruction: "Wash the millet thoroughly and soak in water for 30 minutes. Drain and set aside.", preview: true },
      { number: 2, instruction: "In a medium pot, combine the soaked millet with 3 cups of water. Bring to a boil over medium heat.", preview: true },
      { number: 3, instruction: "Reduce heat to low and simmer for 15 minutes, stirring occasionally to prevent sticking.", preview: true },
      { number: 4, instruction: "Add the coconut milk and grated ginger. Continue cooking for another 10 minutes until creamy.", preview: false },
      { number: 5, instruction: "Stir in salt, sugar (or honey), cinnamon, and vanilla extract. Adjust sweetness to your preference.", preview: false },
      { number: 6, instruction: "Serve hot in a bowl, garnished with a sprinkle of cinnamon or fresh fruit if desired.", preview: false },
    ],
  };

  const features = [
    {
      icon: ChefHat,
      title: "Chef AI Guidance",
      description: "Get real-time cooking advice, ingredient substitutions, and personalized tips from our AI chef assistant.",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides for every recipe, showing you exactly how to achieve perfect results.",
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Join a members-only community of food lovers. Share your creations, get feedback, and discover new favorites.",
    },
    {
      icon: Sparkles,
      title: "Plating Tips & Tricks",
      description: "Learn professional presentation techniques to make your dishes look as good as they taste.",
    },
  ];

  const handleUnlock = () => {
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "mobile-money" && !phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }
    
    // Simulate payment processing
    toast.success("Payment processed successfully!", {
      description: "Welcome to the Recipes Club! You now have full access.",
      duration: 5000,
    });
    
    setIsPaymentDialogOpen(false);
    setIsUnlocked(true);
    setPhoneNumber("");
  };

  const PreviewOverlay = () => (
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
      <div className="text-center text-white p-6 md:p-8 max-w-md">
        <Lock className="mx-auto mb-4 w-12 h-12 md:w-16 md:h-16" />
        <h3 className="text-2xl md:text-3xl font-bold mb-3">Unlock Full Recipe</h3>
        <p className="text-base md:text-lg mb-6 opacity-90">
          Get access to complete instructions, video tutorials, and exclusive cooking features.
        </p>
        <Button variant="cta" size="lg" onClick={handleUnlock} className="gap-2">
          <Sparkles className="w-4 h-4" />
          Unlock for GH₵49
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in">
            Premium Recipes Collection
          </h1>
          <p className="text-base md:text-xl text-muted-foreground animate-fade-in px-4">
            Master the art of breakfast cooking with our exclusive recipes, video tutorials, and chef guidance.
          </p>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            What You Get with Full Access
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 md:p-8 text-center hover:scale-105 transition-smooth card-shadow border-secondary/20"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-secondary/20">
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-primary">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recipe Preview Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-primary">
              Sample Recipe Preview
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Get a taste of what's inside — unlock full recipes, videos, and more
            </p>
          </div>

          <Card className="overflow-hidden rounded-2xl warm-shadow">
            <div className="relative">
              <img
                src={sampleRecipe.image}
                alt={sampleRecipe.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              {!isUnlocked && <PreviewOverlay />}
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-primary">{sampleRecipe.title}</h3>
                <p className="text-base md:text-lg text-muted-foreground mb-4">{sampleRecipe.description}</p>
                <div className="flex flex-wrap gap-4 text-sm md:text-base text-muted-foreground">
                  <span>⏱️ {sampleRecipe.prepTime}</span>
                  <span>🔥 {sampleRecipe.cookTime}</span>
                  <span>👥 {sampleRecipe.servings}</span>
                </div>
              </div>

              {/* Ingredients Preview */}
              <div className="mb-8">
                <h4 className="text-xl md:text-2xl font-bold mb-4 text-primary">Ingredients</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {sampleRecipe.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        ingredient.preview ? "bg-muted/50" : "bg-muted/20 opacity-60"
                      }`}
                    >
                      <div className="mt-1">
                        {ingredient.preview ? (
                          <Check className="w-5 h-5 text-secondary" />
                        ) : (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-primary">{ingredient.name}</span>
                        <span className="text-muted-foreground ml-2">
                          {ingredient.preview ? ingredient.amount : "—"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {!isUnlocked && (
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    🔒 {sampleRecipe.ingredients.filter((i) => !i.preview).length} more ingredients locked
                  </p>
                )}
              </div>

              {/* Steps Preview */}
              <div>
                <h4 className="text-xl md:text-2xl font-bold mb-4 text-primary">Instructions</h4>
                <div className="space-y-4">
                  {sampleRecipe.steps.map((step) => (
                    <div
                      key={step.number}
                      className={`relative p-4 rounded-lg border-l-4 ${
                        step.preview
                          ? "bg-muted/50 border-secondary"
                          : "bg-muted/20 border-muted opacity-60"
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              step.preview
                                ? "bg-secondary text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {step.preview ? step.number : <Lock className="w-4 h-4" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          {step.preview ? (
                            <p className="text-base md:text-lg">{step.instruction}</p>
                          ) : (
                            <p className="text-muted-foreground italic">
                              Unlock full recipe to see this step
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {!isUnlocked && (
                  <div className="mt-8 text-center">
                    <Button variant="cta" size="lg" onClick={handleUnlock} className="gap-2">
                      <Lock className="w-4 h-4" />
                      Unlock Full Recipe & Access
                    </Button>
                  </div>
                )}
              </div>

              {/* Unlocked Content */}
              {isUnlocked && (
                <div className="mt-8 p-6 bg-secondary/10 rounded-xl border border-secondary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Check className="w-6 h-6 text-secondary" />
                    <h4 className="text-xl font-bold text-primary">Full Access Unlocked!</h4>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <Button variant="outline" className="gap-2 justify-start">
                      <Video className="w-4 h-4" />
                      Watch Video Tutorial
                    </Button>
                    <Button variant="outline" className="gap-2 justify-start">
                      <ChefHat className="w-4 h-4" />
                      Ask Chef AI
                    </Button>
                    <Button variant="outline" className="gap-2 justify-start">
                      <Users className="w-4 h-4" />
                      Join Community
                    </Button>
                    <Button variant="outline" className="gap-2 justify-start">
                      <Sparkles className="w-4 h-4" />
                      Plating Tips
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      {!isUnlocked && (
        <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-muted/30 to-white">
          <div className="container mx-auto max-w-3xl text-center">
            <Card className="p-8 md:p-12 warm-shadow border-secondary/20">
              <Sparkles className="mx-auto mb-4 w-12 h-12 md:w-16 md:h-16 text-secondary" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                One-Time Payment, Lifetime Access
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                Pay once and unlock all recipes, video tutorials, Chef AI guidance, community access, and plating tips forever.
              </p>
              <div className="mb-8">
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">GH₵49</div>
                <p className="text-sm text-muted-foreground">One-time payment • No subscription</p>
              </div>
              <Button variant="cta" size="lg" onClick={handleUnlock} className="gap-2">
                <Lock className="w-4 h-4" />
                Unlock Premium Recipes
              </Button>
            </Card>
          </div>
        </section>
      )}

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Unlock Premium Recipes</DialogTitle>
            <DialogDescription>
              Complete your payment to access all recipes, videos, and exclusive features.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("mobile-money")}
                  className={`p-4 rounded-lg border-2 transition-smooth ${
                    paymentMethod === "mobile-money"
                      ? "border-secondary bg-secondary/10"
                      : "border-border hover:border-secondary/50"
                  }`}
                >
                  <div className="font-semibold text-primary mb-1">Mobile Money</div>
                  <div className="text-xs text-muted-foreground">MTN, Vodafone, AirtelTigo</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-lg border-2 transition-smooth ${
                    paymentMethod === "card"
                      ? "border-secondary bg-secondary/10"
                      : "border-border hover:border-secondary/50"
                  }`}
                >
                  <div className="font-semibold text-primary mb-1">Card Payment</div>
                  <div className="text-xs text-muted-foreground">Visa, Mastercard</div>
                </button>
              </div>
            </div>

            {/* Phone Number Input (for Mobile Money) */}
            {paymentMethod === "mobile-money" && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-secondary">GH₵49</span>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="cta" className="gap-2">
                <Lock className="w-4 h-4" />
                Pay & Unlock
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Recipes;

