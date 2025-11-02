import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Instagram, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    // Show success message
    toast.success("Message sent! We'll get back to you soon.");
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: "Accra, Ghana",
      link: null,
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@seygoodmorning.com",
      link: "mailto:info@seygoodmorning.com",
    },
    {
      icon: Instagram,
      title: "Instagram",
      content: "@seygoodmorning",
      link: "https://instagram.com/seygoodmorning",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+233 59 607 3900",
      link: "tel:+233 59 607 3473",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in">Let's Talk Breakfast</h1>
          <p className="text-base md:text-xl text-muted-foreground animate-fade-in px-4">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <Card className="p-4 md:p-8 card-shadow animate-fade-in">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-primary">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none"
                  />
                </div>
                
                <Button type="submit" variant="cta" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-4 md:space-y-6 animate-fade-in">
              <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-primary">Get in Touch</h2>
              <div className="space-y-3 md:space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card key={index} className="p-4 md:p-6 card-shadow hover:scale-105 transition-smooth">
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <div className="bg-muted p-2 md:p-3 rounded-lg flex-shrink-0">
                          <Icon className="text-secondary" size={20} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-xs md:text-sm text-muted-foreground mb-1">
                            {info.title}
                          </h3>
                          {info.link ? (
                            <a 
                              href={info.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm md:text-base text-primary hover:text-secondary transition-smooth break-all"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-sm md:text-base text-primary">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Additional Info */}
              <Card className="p-4 md:p-6 bg-muted/50 border-secondary/20 card-shadow">
                <h3 className="font-semibold mb-2 text-primary">Business Hours</h3>
                <p className="text-sm text-muted-foreground mb-1">Monday - Friday: 6:00 AM - 11:00 AM</p>
                <p className="text-sm text-muted-foreground mb-1">Saturday: 7:00 AM - 12:00 PM</p>
                <p className="text-sm text-muted-foreground">Sunday: 7:00 AM - 11:00 AM</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
