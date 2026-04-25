import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!selectedSize && product.variants.sizes.length > 0) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    if (!selectedColor && product.variants.colors.length > 0) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }
    onAddToCart(quantity);
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden rounded-2xl border border-border shadow-2xl">
        <div className="flex flex-col md:flex-row h-full bg-background max-h-[90vh]">
          {/* Images */}
          <div className="md:w-1/2 bg-muted/30 flex flex-col">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted flex-grow">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIdx}
                  src={product.images[selectedImageIdx]}
                  alt={product.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full object-cover absolute inset-0"
                  data-testid="img-modal-main"
                />
              </AnimatePresence>
              <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-foreground shadow-sm border-0 font-medium tracking-wide uppercase text-xs">
                {product.category}
              </Badge>
            </div>
            <div className="flex gap-3 p-4 overflow-x-auto bg-background/50 border-t border-border/50">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIdx(i)}
                  className={`relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImageIdx === i
                      ? "border-primary shadow-sm"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  data-testid={`button-thumbnail-${i}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="md:w-1/2 p-8 flex flex-col gap-8 overflow-y-auto">
            <DialogHeader className="text-left space-y-2">
              <DialogTitle className="text-3xl font-serif text-foreground leading-tight">
                {product.title}
              </DialogTitle>
              <p className="text-2xl font-sans font-medium text-muted-foreground">${product.price}</p>
            </DialogHeader>

            {/* Colors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Color
                </p>
                <span className="text-sm font-medium text-foreground">
                  {selectedColor?.name || "Select a color"}
                </span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {product.variants.colors.map((color) => (
                  <button
                    key={color.name}
                    title={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                      selectedColor?.name === color.name
                        ? "border-primary scale-110 shadow-sm"
                        : "border-border hover:border-muted-foreground/50"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    data-testid={`button-color-${color.name}`}
                  >
                    {selectedColor?.name === color.name && (
                      <div className={`w-3 h-3 rounded-full ${color.hex === '#FAF7F0' || color.hex === '#EDE9DC' || color.hex === '#1A1A1A' ? 'bg-primary/20 backdrop-invert' : 'bg-white/30 backdrop-blur-sm'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Size
                </p>
                <span className="text-sm font-medium text-foreground">
                  {selectedSize || "Select a size"}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.variants.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 text-sm rounded-xl border transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                    data-testid={`button-size-${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-xl bg-background overflow-hidden p-1 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    data-testid="button-decrease-quantity"
                  >
                    <svg width="14" height="2" viewBox="0 0 14 2" fill="currentColor"><path d="M14 2H0V0H14V2Z"/></svg>
                  </button>
                  <span className="w-12 text-center text-base font-medium text-foreground" data-testid="text-quantity">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    data-testid="button-increase-quantity"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M14 6H8V0H6V6H0V8H6V14H8V8H14V6Z"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-auto pt-6 border-t border-border">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl font-medium text-base transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                data-testid="button-add-to-cart"
              >
                Add to Cart <span className="opacity-60 text-sm font-normal ml-2">|</span> <span className="ml-2 font-semibold">${product.price * quantity}</span>
              </button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Complimentary shipping & returns on all orders over $150.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
