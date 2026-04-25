import { useState } from "react";
import { useLocation } from "wouter";
import { PRODUCTS, Product } from "@/lib/data";
import { ProductModal } from "@/components/ProductModal";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface HomeProps {
  cartCount: number;
  setCartCount: (count: number) => void;
}

function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        data-testid="lightbox-overlay"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          data-testid="button-close-lightbox"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <motion.img
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          src={src}
          alt={alt}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          data-testid="img-lightbox"
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default function Home({ cartCount, setCartCount }: HomeProps) {
  const [, setLocation] = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 bg-primary text-primary-foreground text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-background"
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
      <section className="bg-muted py-10 px-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground max-w-3xl mx-auto leading-tight">
            Curated essentials for the modern wardrobe.
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-sans">
            Discover our latest collection of thoughtfully designed pieces crafted from premium materials.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full">
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
                {/* Product Image — click opens lightbox */}
                <div
                  className="relative aspect-[3/4] overflow-hidden bg-muted rounded-2xl mb-5 cursor-zoom-in"
                  onClick={() => setLightboxImage({ src: product.images[0], alt: product.title })}
                  data-testid={`button-quick-view-${product.id}`}
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
                  <div>
                    <h3 className="font-serif text-lg text-foreground" data-testid={`text-title-${product.id}`}>
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm font-medium" data-testid={`text-price-${product.id}`}>
                      ${product.price}
                    </p>
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

                  {/* Show Details — navigates to full product detail page */}
                  <button
                    onClick={() => setLocation(`/product/${product.id}`)}
                    className="w-full mt-1 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 active:scale-[0.98]"
                    data-testid={`button-show-details-${product.id}`}
                  >
                    Show Details
                  </button>
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

      {/* Image Lightbox */}
      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      )}

      {/* Full Detail Modal */}
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
