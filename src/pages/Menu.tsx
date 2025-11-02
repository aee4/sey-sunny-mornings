import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus, X } from "lucide-react";
import kokoImage from "@/assets/menu-koko.jpg";
import smoothiesImage from "@/assets/menu-smoothies.jpg";
import sandwichImage from "@/assets/menu-sandwich.jpg";
import { toast } from "sonner";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  priceDisplay: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Menu = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({ phone: "", location: "" });
  const navigate = useNavigate();

  // Extract all menu items
  const allMenuItems: MenuItem[] = [
    {
      id: "1",
      name: "Millet Delight (Koko)",
      description: "Creamy millet porridge with a coconut milk twist",
      price: 22,
      priceDisplay: "GH₵22",
    },
    {
      id: "2",
      name: "Tombrown Classic",
      description: "Smooth roasted corn porridge with a touch of milk and spice",
      price: 18,
      priceDisplay: "GH₵18",
    },
    {
      id: "3",
      name: "Morning Glow Smoothie",
      description: "Banana, oats, and honey blend for natural energy",
      price: 35,
      priceDisplay: "GH₵35",
    },
    {
      id: "4",
      name: "Berry Burst Smoothie",
      description: "Strawberries, yogurt, and a hint of vanilla",
      price: 30,
      priceDisplay: "GH₵30",
    },
    {
      id: "5",
      name: "Egg & Avocado Sandwich",
      description: "Soft wheat bread with boiled egg and avocado",
      price: 25,
      priceDisplay: "GH₵25",
    },
    {
      id: "6",
      name: "Tropical Fruit Cup",
      description: "Fresh mix of pineapple, watermelon, and banana",
      price: 18,
      priceDisplay: "GH₵18",
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

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemById = (id: string) => {
    return allMenuItems.find((item) => item.id === id);
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

  const menuPages = [
    {
      type: "intro",
      content: (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 md:p-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-primary">Our Breakfast Menu</h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-md px-4">
            Discover our selection of fresh, locally-sourced breakfast items made with love every morning.
          </p>
        </div>
      ),
    },
    {
      type: "spread",
      left: {
        image: true,
        content: (
          <div className="h-full relative overflow-hidden">
            <img 
              src={kokoImage} 
              alt="Millet porridge and Tombrown" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-lg text-white font-medium">Locally sourced ingredients</p>
            </div>
          </div>
        ),
      },
      right: {
        itemIds: ["1", "2"],
      },
    },
    {
      type: "spread",
      left: {
        itemIds: ["3", "4"],
      },
      right: {
        image: true,
        content: (
          <div className="h-full relative overflow-hidden">
            <img 
              src={smoothiesImage} 
              alt="Fresh smoothies" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-lg text-white font-medium">Fresh smoothies daily</p>
            </div>
          </div>
        ),
      },
    },
    {
      type: "spread",
      left: {
        image: true,
        content: (
          <div className="h-full relative overflow-hidden">
            <img 
              src={sandwichImage} 
              alt="Egg and avocado sandwich" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-lg text-white font-medium">Filling sandwiches</p>
            </div>
          </div>
        ),
      },
      right: {
        itemIds: ["5", "6"],
      },
    },
    {
      type: "outro",
      content: (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 md:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4 text-primary px-4">
            All meals are freshly made every morning
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 px-4">
            Available for pickup or delivery in Accra
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4">
            <Button variant="cta" size="lg" onClick={handleOrder} className="w-full sm:w-auto">
              Order Now
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/contact")} className="w-full sm:w-auto">
              Contact Us
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const nextPage = () => {
    if (currentPage < menuPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderMenuItem = (itemId: string) => {
    const item = getItemById(itemId);
    if (!item) return null;

    return (
      <div key={item.id} className="space-y-2 md:space-y-3">
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-bold text-primary">{item.name}</h3>
          <p className="text-sm md:text-base text-muted-foreground">{item.description}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2">
            <p className="text-2xl md:text-3xl font-bold text-secondary">{item.priceDisplay}</p>
            <Button
              variant="cta"
              size="sm"
              onClick={() => addToCart(item)}
              className="gap-2 w-full sm:w-auto"
            >
              <Plus size={14} className="md:w-4 md:h-4" />
              <span className="text-xs md:text-sm">Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderPage = (page: any) => {
    if (page.type === "intro" || page.type === "outro") {
      return (
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-background rounded-2xl warm-shadow">
          {page.content}
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 w-full">
        {/* Left Page */}
        <Card className="h-[500px] md:h-[600px] rounded-2xl warm-shadow overflow-hidden animate-slide-in-left">
          {page.left.image ? (
            page.left.content
          ) : (
            <div className="p-6 md:p-12 h-full flex flex-col justify-center space-y-6 md:space-y-8 overflow-y-auto">
              {page.left.itemIds?.map((itemId: string) => renderMenuItem(itemId))}
            </div>
          )}
        </Card>

        {/* Right Page */}
        <Card className="h-[500px] md:h-[600px] rounded-2xl warm-shadow overflow-hidden animate-slide-in-right">
          {page.right.image ? (
            page.right.content
          ) : (
            <div className="p-6 md:p-12 h-full flex flex-col justify-center space-y-6 md:space-y-8 overflow-y-auto">
              {page.right.itemIds?.map((itemId: string) => renderMenuItem(itemId))}
            </div>
          )}
        </Card>
      </div>
    );
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Cart Button - Fixed position */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
            <Button
              variant="cta"
              size="lg"
              onClick={handleOrder}
              className="gap-2 shadow-lg text-sm md:text-base"
            >
              <ShoppingCart size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Cart ({cartItemCount})</span>
              <span className="sm:hidden">({cartItemCount})</span>
              <span className="ml-1 md:ml-2">• GH₵{getTotal()}</span>
            </Button>
          </div>
        )}

        {/* Menu Booklet */}
        <div className="relative">
          {renderPage(menuPages[currentPage])}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 md:mt-8 gap-2">
            <Button
              variant="outline"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="gap-1 md:gap-2 text-xs md:text-sm"
            >
              <ChevronLeft size={16} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <div className="text-xs md:text-sm text-muted-foreground">
              Page {currentPage + 1} of {menuPages.length}
            </div>

            <Button
              variant="outline"
              onClick={nextPage}
              disabled={currentPage === menuPages.length - 1}
              className="gap-1 md:gap-2 text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={16} className="md:w-5 md:h-5" />
            </Button>
          </div>

          {/* Page Indicators */}
          <div className="flex justify-center space-x-2 mt-4 md:mt-6">
            {menuPages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  currentPage === idx ? "bg-primary w-8" : "bg-border"
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        </div>

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
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 md:h-8 md:w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={12} className="md:w-3.5 md:h-3.5" />
                        </Button>
                        <span className="w-6 md:w-8 text-center font-semibold text-sm md:text-base">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 md:h-8 md:w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={12} className="md:w-3.5 md:h-3.5" />
                        </Button>
                      </div>
                      <div className="text-right min-w-[60px] md:min-w-[80px]">
                        <p className="font-bold text-sm md:text-base">GH₵{item.price * item.quantity}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 md:h-8 md:w-8 text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
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
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-2">
                  Delivery Location
                </label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter your location in Accra"
                  value={orderForm.location}
                  onChange={(e) => setOrderForm({ ...orderForm, location: e.target.value })}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOrderDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="cta">
                  Place Order
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Menu;
