import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { PRODUCTS, ProductColor } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface ProductDetailPageProps {
  cartCount: number;
  setCartCount: (count: number) => void;
}

export default function ProductDetailPage({ cartCount, setCartCount }: ProductDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product?.variants.colors[0] ?? null
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedColor(product?.variants.colors[0] ?? null);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-serif">Product not found</h2>
          <button
            onClick={() => setLocation("/")}
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Back to collection
          </button>
        </div>
      </div>
    );
  }

  const displayImages = selectedColor?.images ?? product.images ?? [];

  const handleAddToCart = () => {
    setCartCount(cartCount + quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity}× ${product.title}${selectedColor ? ` in ${selectedColor.name}` : ""} added.`,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="text-2xl font-serif font-semibold tracking-tight text-primary"
            data-testid="link-home"
          >
            Aura.
          </button>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setLocation("/")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              data-testid="link-back-collection"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Collection
            </button>
            <button
              className="relative p-2 text-foreground hover:bg-muted rounded-full transition-colors"
              data-testid="button-cart"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

      {/* Page body: always side-by-side */}
      <div className="flex flex-row flex-1 w-full">

        {/* ── LEFT: Vertical Image Slider ── */}
        <div
          className="w-[55%] overflow-y-auto h-[calc(100vh-65px)] sticky top-[65px]"
          data-testid="image-slider"
        >
          <div className="flex flex-col">
            {displayImages.map((img, i) => (
              <motion.div
                key={`${selectedColor?.name ?? "default"}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
                className="w-full"
                data-testid={`slide-image-${i}`}
              >
                <img
                  src={img}
                  alt={`${product.title} — view ${i + 1}`}
                  className="w-full object-cover block"
                  style={{ aspectRatio: "4/5" }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Product Details (sticky) ── */}
        <div className="w-[45%] h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto">
          <div className="px-8 py-10 flex flex-col gap-7">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <button onClick={() => setLocation("/")} className="hover:text-foreground transition-colors">
                Collection
              </button>
              <span>/</span>
              <span>{product.category}</span>
              <span>/</span>
              <span className="text-foreground font-medium truncate">{product.title}</span>
            </div>

            {/* Title & Price */}
            <div className="space-y-2">
              <h1
                className="text-3xl font-serif font-medium text-foreground leading-snug"
                data-testid="text-product-title"
              >
                {product.title}
              </h1>
              <p
                className="text-2xl font-semibold text-foreground"
                data-testid="text-product-price"
              >
                ${product.price}
              </p>
            </div>

            {/* Description */}
            <p
              className="text-muted-foreground leading-relaxed text-sm"
              data-testid="text-product-description"
            >
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.variants.colors.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Color</p>
                  {selectedColor && (
                    <span className="text-sm text-foreground" data-testid="text-selected-color">
                      {selectedColor.name}
                    </span>
                  )}
                </div>
                <div className="flex gap-3 flex-wrap">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color.name}
                      title={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 rounded-full border-2 transition-all duration-200 relative ${
                        selectedColor?.name === color.name
                          ? "border-primary scale-110 shadow-md"
                          : "border-transparent ring-1 ring-border hover:ring-muted-foreground"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      data-testid={`button-color-${color.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Quantity Picker */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    data-testid="button-decrease-quantity"
                  >
                    <svg width="12" height="2" viewBox="0 0 12 2" fill="currentColor">
                      <rect width="12" height="2" />
                    </svg>
                  </button>
                  <span
                    className="w-12 text-center text-base font-semibold text-foreground border-x border-border h-11 flex items-center justify-center"
                    data-testid="text-quantity"
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    data-testid="button-increase-quantity"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M12 5H7V0H5V5H0V7H5V12H7V7H12V5Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.99] flex items-center justify-center gap-3"
              data-testid="button-add-to-cart"
            >
              Add to Cart
              <span className="opacity-40 font-light">|</span>
              <span>${product.price * quantity}</span>
            </button>

            <p className="text-xs text-muted-foreground text-center -mt-3">
              Complimentary shipping on all orders over $150.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
