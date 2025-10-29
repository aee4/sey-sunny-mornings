import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import kokoImage from "@/assets/menu-koko.jpg";
import smoothiesImage from "@/assets/menu-smoothies.jpg";
import sandwichImage from "@/assets/menu-sandwich.jpg";

const Menu = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const menuPages = [
    {
      type: "intro",
      content: (
        <div className="h-full flex flex-col items-center justify-center text-center p-12">
          <h1 className="text-5xl font-bold mb-6 text-primary">Our Breakfast Menu</h1>
          <p className="text-xl text-muted-foreground max-w-md">
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
        items: [
          {
            name: "Millet Delight (Koko)",
            description: "Creamy millet porridge with a coconut milk twist",
            price: "GH₵15",
          },
          {
            name: "Tombrown Classic",
            description: "Smooth roasted corn porridge with a touch of milk and spice",
            price: "GH₵15",
          },
        ],
      },
    },
    {
      type: "spread",
      left: {
        items: [
          {
            name: "Morning Glow Smoothie",
            description: "Banana, oats, and honey blend for natural energy",
            price: "GH₵20",
          },
          {
            name: "Berry Burst Smoothie",
            description: "Strawberries, yogurt, and a hint of vanilla",
            price: "GH₵22",
          },
        ],
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
              <p className="text-lg text-white font-medium">Hearty sandwiches</p>
            </div>
          </div>
        ),
      },
      right: {
        items: [
          {
            name: "Egg & Avocado Sandwich",
            description: "Soft wheat bread with boiled egg and avocado",
            price: "GH₵25",
          },
          {
            name: "Tropical Fruit Cup",
            description: "Fresh mix of pineapple, watermelon, and banana",
            price: "GH₵18",
          },
        ],
      },
    },
    {
      type: "outro",
      content: (
        <div className="h-full flex flex-col items-center justify-center text-center p-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            All meals are freshly made every morning
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Available for pickup or delivery in Accra
          </p>
          <div className="flex space-x-4">
            <Button variant="cta" size="lg">Order Now</Button>
            <Button variant="outline" size="lg">Contact Us</Button>
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

  const renderPage = (page: any) => {
    if (page.type === "intro" || page.type === "outro") {
      return (
        <div className="w-full h-[600px] bg-background rounded-2xl warm-shadow">
          {page.content}
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 gap-8 w-full">
        {/* Left Page */}
        <Card className="h-[600px] rounded-2xl warm-shadow overflow-hidden animate-slide-in-left">
          {page.left.image ? (
            page.left.content
          ) : (
            <div className="p-12 h-full flex flex-col justify-center space-y-8">
              {page.left.items?.map((item: any, idx: number) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary">{item.name}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  <p className="text-3xl font-bold text-secondary">{item.price}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Right Page */}
        <Card className="h-[600px] rounded-2xl warm-shadow overflow-hidden animate-slide-in-right">
          {page.right.image ? (
            page.right.content
          ) : (
            <div className="p-12 h-full flex flex-col justify-center space-y-8">
              {page.right.items?.map((item: any, idx: number) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary">{item.name}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  <p className="text-3xl font-bold text-secondary">{item.price}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Menu Booklet */}
        <div className="relative">
          {renderPage(menuPages[currentPage])}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="gap-2"
            >
              <ChevronLeft size={20} />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {menuPages.length}
            </div>

            <Button
              variant="outline"
              onClick={nextPage}
              disabled={currentPage === menuPages.length - 1}
              className="gap-2"
            >
              Next
              <ChevronRight size={20} />
            </Button>
          </div>

          {/* Page Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
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
      </div>
    </div>
  );
};

export default Menu;
