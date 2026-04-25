import { useState } from "react";
import { PRODUCTS, Product } from "@/lib/data";
import { ProductModal } from "@/components/ProductModal";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface HomeProps {
  cartCount: number;
  setCartCount: (count: number) => void;
}

export default function Home({ cartCount, setCartCount }: HomeProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartCount(cartCount + quantity);
    setSelectedProduct(null);
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.title} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="text-3xl font-serif font-semibold tracking-tight text-primary">Aura.</h1>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">SS26 Collection</span>
            <button 
              className="relative p-2 text-foreground hover:bg-muted rounded-full transition-colors"
              data-testid="button-cart"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && (
                <span 
                  className="absolute 0 right-0 top-0 translate-x-1/4 -translate-y-1/4 bg-primary text-primary-foreground text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-background"
                  data-testid="badge-cart-count"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-muted py-20 px-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h2 className="text-5xl md:text-6xl font-serif font-medium text-foreground max-w-3xl mx-auto leading-tight">
            Curated essentials for the modern wardrobe.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
            Discover our latest collection of thoughtfully designed pieces crafted from premium materials.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-serif font-medium">New Arrivals</h3>
          <span className="text-sm text-muted-foreground">{PRODUCTS.length} products</span>
        </div>

        {PRODUCTS.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-3xl border border-border/50 border-dashed" data-testid="empty-state">
            <h3 className="text-xl font-serif mb-2">No products available</h3>
            <p className="text-muted-foreground">Check back later for new arrivals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col"
                data-testid={`card-product-${product.id}`}
              >
                {/* Product Image */}
                <div 
                  className="relative aspect-[3/4] overflow-hidden bg-muted rounded-2xl mb-5 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-background/90 backdrop-blur text-foreground px-6 py-3 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Quick View
                    </span>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-foreground shadow-sm border-0 text-xs font-medium tracking-wide uppercase">
                    {product.category}
                  </Badge>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-serif text-lg text-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => setSelectedProduct(product)}>
                        {product.title}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm font-medium">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {product.variants.colors.map((c) => (
                      <span
                        key={c.name}
                        title={c.name}
                        className="w-4 h-4 rounded-full border border-border shadow-sm"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">
                      {product.variants.colors.length} Colors
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif font-semibold text-primary">Aura.</div>
          <p className="text-sm text-muted-foreground">© 2026 Aura Clothing. All rights reserved.</p>
        </div>
      </footer>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(qty) => handleAddToCart(selectedProduct, qty)}
        />
      )}
    </div>
  );
}
