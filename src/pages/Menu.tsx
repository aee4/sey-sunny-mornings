import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import kokoImage from "@/assets/menu-koko.jpg";
import smoothiesImage from "@/assets/menu-smoothies.jpg";
import sandwichImage from "@/assets/menu-sandwich.jpg";
import ReadyEat from "@/assets/ready-to-eat.jpg";
import RawMaterials from "@/assets/raw-materials.jpg";
import TombrownClassic from "@/assets/tombrown.jpg";
import BBSmoothie from "@/assets/bbsmoothie.jpg";
import TropicalCup from "@/assets/tropical-cup.jpg";
import { toast } from "sonner";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  priceDisplay: string;
  image: string;
  ingredients?: string[];
}

interface CartItem extends MenuItem {
  quantity: number;
}

type Category = "cooked" | "raw";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("cooked");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({ phone: "", location: "" });
  const navigate = useNavigate();

  const cookedMenuItems: MenuItem[] = [
    {
      id: "1",
      name: "Millet Delight (Koko)",
      description: "Creamy millet porridge with a coconut milk twist",
      price: 22,
      priceDisplay: "GH₵22",
      image: kokoImage,
      ingredients: ["Millet", "Coconut milk", "Water", "Spices", "Sugar (optional)"],
    },
    {
      id: "2",
      name: "Tombrown Classic",
      description: "Smooth roasted corn porridge with a touch of milk and spice",
      price: 18,
      priceDisplay: "GH₵18",
      image: TombrownClassic,
      ingredients: ["Roasted corn powder", "Milk", "Water", "Spices"],
    },
    {
      id: "3",
      name: "Morning Glow Smoothie",
      description: "Banana, oats, and honey blend for natural energy",
      price: 35,
      priceDisplay: "GH₵35",
      image: smoothiesImage,
      ingredients: ["Banana", "Oats", "Honey", "Yogurt", "Ice"],
    },
    {
      id: "4",
      name: "Berry Burst Smoothie",
      description: "Strawberries, yogurt, and a hint of vanilla",
      price: 30,
      priceDisplay: "GH₵30",
      image: BBSmoothie,
      ingredients: ["Strawberries", "Yogurt", "Vanilla", "Honey"]
    },
    {
      id: "5",
      name: "Egg & Avocado Sandwich",
      description: "Soft wheat bread with boiled egg and avocado",
      price: 25,
      priceDisplay: "GH₵25",
      image: sandwichImage,
      ingredients: ["Wheat bread", "Egg", "Avocado", "Salt", "Pepper"],
    },
    {
      id: "6",
      name: "Tropical Fruit Cup",
      description: "Fresh mix of pineapple, watermelon, and banana",
      price: 18,
      priceDisplay: "GH₵18",
      image: TropicalCup,
      ingredients: ["Pineapple", "Watermelon", "Banana"],
    },
  ];

  const rawMenuItems: MenuItem[] = [
    {
      id: "raw-1",
      name: "Millet",
      description: "Premium quality millet grains for porridge",
      price: 15,
      priceDisplay: "GH₵15",
      image: RawMaterials,
      ingredients: ["Millet grains"],
    },
    {
      id: "raw-2",
      name: "Roasted Corn Powder",
      description: "Finely ground roasted corn for tombrown",
      price: 12,
      priceDisplay: "GH₵12",
      image: RawMaterials,
      ingredients: ["Roasted corn powder"],
    },
    {
      id: "raw-3",
      name: "Fresh Bananas",
      description: "Ripe bananas for smoothies and breakfast",
      price: 8,
      priceDisplay: "GH₵8",
      image: RawMaterials,
      ingredients: ["Fresh bananas"],
    },
    {
      id: "raw-4",
      name: "Strawberries",
      description: "Fresh strawberries for smoothies",
      price: 20,
      priceDisplay: "GH₵20",
      image: RawMaterials,
      ingredients: ["Fresh strawberries"],
    },
    {
      id: "raw-5",
      name: "Wheat Bread",
      description: "Fresh baked wheat bread",
      price: 10,
      priceDisplay: "GH₵10",
      image: RawMaterials,
      ingredients: ["Wheat flour", "Yeast", "Water"],
    },
    {
      id: "raw-6",
      name: "Mixed Fruits",
      description: "Fresh pineapple, watermelon, and banana mix",
      price: 15,
      priceDisplay: "GH₵15",
      image: RawMaterials,
      ingredients: ["Pineapple", "Watermelon", "Banana"],
    },
  ];

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} added to cart`);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const getTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getFilteredItems = () => {
    if (selectedCategory === "cooked") return cookedMenuItems;
    return rawMenuItems;
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setIsOrderDialogOpen(true);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.phone || !orderForm.location) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsOrderDialogOpen(false);
    setCart([]);
    setOrderForm({ phone: "", location: "" });
    toast.success("Order placed! Your breakfast is on the way! 🍳", {
      description: `We'll contact you at ${orderForm.phone} for delivery to ${orderForm.location}`,
      duration: 5000,
    });
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderHero = () => (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <p className="text-center text-sm md:text-base text-muted-foreground mb-6 md:mb-8">Choose your craving — Ready-to-eat or ready-to-cook.</p>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
          <button
            onClick={() => setSelectedCategory("cooked")}
            className={`group relative rounded-2xl overflow-hidden h-48 md:h-64 warm-shadow transition-transform duration-300 ${selectedCategory === "cooked" ? "ring-2 ring-secondary" : ""}`}
            aria-label="Cooked Meals"
          >
            <img src={ReadyEat} alt="Cooked meals" className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white drop-shadow">
                <div className="text-2xl md:text-3xl font-bold">Cooked Meals 🍽️</div>
                <div className="mt-1 text-sm opacity-90">Warm plates, ready to enjoy</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedCategory("raw")}
            className={`group relative rounded-2xl overflow-hidden h-48 md:h-64 warm-shadow transition-transform duration-300 ${selectedCategory === "raw" ? "ring-2 ring-secondary" : ""}`}
            aria-label="Raw Materials"
          >
            <img src={RawMaterials} alt="Raw materials" className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white drop-shadow">
                <div className="text-2xl md:text-3xl font-bold">Raw Materials 🥬</div>
                <div className="mt-1 text-sm opacity-90">Fresh ingredients to cook</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );

  const renderCookedGrid = () => (
    <section className="py-12 md:py-16 px-4 bg-amber-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8 md:mb-12">Cooked Meals</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cookedMenuItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden rounded-2xl warm-shadow hover:shadow-xl transition-smooth">
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-semibold text-primary">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">{item.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xl md:text-2xl font-bold text-secondary">{item.priceDisplay}</div>
                  <Button variant="cta" size="sm" onClick={() => addToCart(item)} className="gap-2">
                    <Plus size={16} /> Add
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const renderRawGrid = () => (
    <section className="py-12 md:py-16 px-4 bg-yellow-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8 md:mb-12">Raw Materials / Ingredients</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {rawMenuItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden rounded-2xl warm-shadow hover:shadow-xl transition-smooth">
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-semibold text-primary">{item.name}</h3>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  {item.ingredients?.slice(0, 5).map((ing, idx) => (
                    <li key={idx} className="list-disc list-inside">{ing}</li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xl md:text-2xl font-bold text-secondary">{item.priceDisplay}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="cta" size="sm" onClick={() => addToCart(item)} className="gap-2">
                      <Plus size={16} /> Add
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen">
      {renderHero()}

      {/* Smooth transition between sections by keying category */}
      <div key={selectedCategory} className="animate-fade-in">
        {selectedCategory === "cooked" ? renderCookedGrid() : renderRawGrid()}
      </div>

      {/* CTA strip */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="cta" size="lg" onClick={handleOrder}>
              Proceed to Order
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/contact")}>Contact Us</Button>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
          <Button variant="cta" size="lg" onClick={handleOrder} className="gap-2 shadow-lg text-sm md:text-base">
            <ShoppingCart size={18} className="md:w-5 md:h-5" />
            <span className="hidden sm:inline">Cart ({cartItemCount})</span>
            <span className="sm:hidden">({cartItemCount})</span>
            <span className="ml-1 md:ml-2">• GH₵{getTotal()}</span>
          </Button>
        </div>
      )}

      {/* Order Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Place Your Order</DialogTitle>
            <DialogDescription>
              Review your cart and provide your contact details for delivery.
            </DialogDescription>
          </DialogHeader>

          {/* Cart Items */}
          <div className="space-y-3 md:space-y-4 max-h-[250px] md:max-h-[300px] overflow-y-auto">
            {cart.map((item) => (
              <Card key={item.id} className="p-3 md:p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm md:text-base text-primary">{item.name}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">{item.priceDisplay} each</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <div className="flex items-center gap-1 md:gap-2">
                      <Button variant="outline" size="icon" className="h-7 w-7 md:h-8 md:w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={12} className="md:w-3.5 md:h-3.5" />
                      </Button>
                      <span className="w-6 md:w-8 text-center font-semibold text-sm md:text-base">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7 md:h-8 md:w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={12} className="md:w-3.5 md:h-3.5" />
                      </Button>
                    </div>
                    <div className="text-right min-w-[60px] md:min-w-[80px]">
                      <p className="font-bold text-sm md:text-base">GH₵{item.price * item.quantity}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 text-destructive" onClick={() => removeFromCart(item.id)}>
                      <X size={12} className="md:w-3.5 md:h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-secondary">GH₵{getTotal()}</span>
          </div>

          {/* Order Form */}
          <form onSubmit={handleSubmitOrder} className="space-y-4 pt-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
              <Input id="phone" type="tel" placeholder="+233 XX XXX XXXX" value={orderForm.phone} onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })} required />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-2">Delivery Location</label>
              <Input id="location" type="text" placeholder="Enter your location in Accra" value={orderForm.location} onChange={(e) => setOrderForm({ ...orderForm, location: e.target.value })} required />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOrderDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="cta">Place Order</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Menu;
