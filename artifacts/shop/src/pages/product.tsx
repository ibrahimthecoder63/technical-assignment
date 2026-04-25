import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { PRODUCTS, Product, ProductColor } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailPageProps {
  cartCount: number;
  setCartCount: (count: number) => void;
}

export default function ProductDetailPage({ cartCount, setCartCount }: ProductDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const product: Product | undefined = PRODUCTS.find((p) => p.id === Number(id));

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product?.variants.colors[0] ?? null
  );
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const displayImages = selectedColor ? selectedColor.images : product?.images ?? [];

  useEffect(() => {
    setActiveImageIdx(0);
  }, [selectedColor]);

  useEffect(() => {
    thumbnailRefs.current[activeImageIdx]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeImageIdx]);

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

  const handleAddToCart = () => {
    if (!selectedSize && product.variants.sizes.length > 1) {
      toast({ title: "Please select a size", variant: "destructive" });
      return;
    }
    setCartCount(cartCount + quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity}× ${product.title}${selectedColor ? ` in ${selectedColor.name}` : ""} added.`,
    });
  };

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="text-3xl font-serif font-semibold tracking-tight text-primary"
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Collection
            </button>
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

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4 w-full">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <button onClick={() => setLocation("/")} className="hover:text-foreground transition-colors">
            Collection
          </button>
          <span>/</span>
          <span className="text-foreground font-medium">{product.category}</span>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{product.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 pb-16 w-full">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* ── LEFT: Vertical Image Slider ── */}
          <div className="lg:w-[55%] flex gap-4" data-testid="image-slider">
            {/* Thumbnail strip — vertical scroll */}
            <div className="flex flex-col gap-3 w-20 flex-shrink-0 max-h-[680px] overflow-y-auto scrollbar-thin">
              {displayImages.map((img, i) => (
                <button
                  key={`${selectedColor?.name}-${i}`}
                  ref={(el) => { thumbnailRefs.current[i] = el; }}
                  onClick={() => setActiveImageIdx(i)}
                  className={`relative w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    activeImageIdx === i
                      ? "border-primary shadow-md scale-[1.03]"
                      : "border-transparent opacity-55 hover:opacity-80"
                  }`}
                  data-testid={`button-thumbnail-${i}`}
                >
                  <img src={img} alt={`${product.title} view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative rounded-2xl overflow-hidden bg-muted aspect-[3/4] max-h-[680px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${selectedColor?.name}-${activeImageIdx}`}
                  src={displayImages[activeImageIdx]}
                  alt={product.title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full h-full object-cover absolute inset-0"
                  data-testid="img-product-main"
                />
              </AnimatePresence>
              <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-foreground shadow-sm border-0 text-xs font-medium tracking-wide uppercase">
                {product.category}
              </Badge>

              {/* Prev / Next arrows */}
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIdx((i) => Math.max(0, i - 1))}
                    disabled={activeImageIdx === 0}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center shadow-sm disabled:opacity-20 hover:bg-background transition-colors"
                    data-testid="button-prev-image"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveImageIdx((i) => Math.min(displayImages.length - 1, i + 1))}
                    disabled={activeImageIdx === displayImages.length - 1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center shadow-sm disabled:opacity-20 hover:bg-background transition-colors"
                    data-testid="button-next-image"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ── RIGHT: Product Details ── */}
          <div className="lg:w-[45%] flex flex-col gap-8 lg:pt-4">

            {/* Title & Price */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                {product.category}
              </p>
              <h1
                className="text-4xl font-serif font-medium text-foreground leading-tight"
                data-testid="text-product-title"
              >
                {product.title}
              </h1>
              <p
                className="text-2xl font-sans font-semibold text-foreground mt-3"
                data-testid="text-product-price"
              >
                ${product.price}
              </p>
            </div>

            {/* Description */}
            <p
              className="text-muted-foreground leading-relaxed text-[15px]"
              data-testid="text-product-description"
            >
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.variants.colors.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Color
                  </p>
                  {selectedColor && (
                    <span className="text-sm font-medium text-foreground" data-testid="text-selected-color">
                      {selectedColor.name}
                    </span>
                  )}
                </div>
                <div className="flex gap-3 flex-wrap">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color.name}
                      title={color.name}
                      onClick={() => handleColorSelect(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200 relative ${
                        selectedColor?.name === color.name
                          ? "border-primary scale-110 shadow-md"
                          : "border-border hover:border-muted-foreground/60"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      data-testid={`button-color-${color.name}`}
                    >
                      {selectedColor?.name === color.name && (
                        <span className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-primary/40" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.variants.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Size
                  </p>
                  {selectedSize && (
                    <span className="text-sm font-medium text-foreground">{selectedSize}</span>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm rounded-xl border transition-all duration-200 font-medium ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/40"
                      }`}
                      data-testid={`button-size-${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Picker */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Quantity
              </p>
              <div className="flex items-center border border-border rounded-xl bg-background overflow-hidden p-1 shadow-sm w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  data-testid="button-decrease-quantity"
                >
                  <svg width="14" height="2" viewBox="0 0 14 2" fill="currentColor">
                    <path d="M14 2H0V0H14V2Z" />
                  </svg>
                </button>
                <span
                  className="w-12 text-center text-base font-semibold text-foreground"
                  data-testid="text-quantity"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  data-testid="button-increase-quantity"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M14 6H8V0H6V6H0V8H6V14H8V8H14V6Z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                data-testid="button-add-to-cart"
              >
                Add to Cart
                <span className="opacity-50 text-sm font-normal">|</span>
                <span>${product.price * quantity}</span>
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Complimentary shipping and returns on all orders over $150.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
