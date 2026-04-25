import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductVariant {
  sizes: string[];
  colors: { name: string; hex: string }[];
}

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  variants: ProductVariant;
  category: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Classic Linen Shirt",
    price: 89,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    ],
    variants: {
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "Ivory", hex: "#FAF7F0" },
        { name: "Slate Blue", hex: "#6B7FA3" },
        { name: "Sage", hex: "#8FAF8A" },
      ],
    },
    category: "Tops",
  },
  {
    id: 2,
    title: "Slim Chino Trousers",
    price: 115,
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    ],
    variants: {
      sizes: ["28", "30", "32", "34", "36"],
      colors: [
        { name: "Tan", hex: "#C8A882" },
        { name: "Navy", hex: "#1B2A4A" },
        { name: "Olive", hex: "#6B7346" },
      ],
    },
    category: "Bottoms",
  },
  {
    id: 3,
    title: "Merino Crew Sweater",
    price: 145,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    ],
    variants: {
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: [
        { name: "Camel", hex: "#C19A6B" },
        { name: "Charcoal", hex: "#3D3D3D" },
        { name: "Rust", hex: "#B7472A" },
        { name: "Forest", hex: "#355E3B" },
      ],
    },
    category: "Knitwear",
  },
  {
    id: 4,
    title: "Leather Derby Shoes",
    price: 295,
    images: [
      "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80",
    ],
    variants: {
      sizes: ["40", "41", "42", "43", "44", "45"],
      colors: [
        { name: "Cognac", hex: "#9E4F2A" },
        { name: "Black", hex: "#1A1A1A" },
      ],
    },
    category: "Footwear",
  },
  {
    id: 5,
    title: "Canvas Tote Bag",
    price: 55,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    ],
    variants: {
      sizes: ["One Size"],
      colors: [
        { name: "Natural", hex: "#EDE9DC" },
        { name: "Black", hex: "#1A1A1A" },
        { name: "Denim", hex: "#3B5998" },
      ],
    },
    category: "Accessories",
  },
  {
    id: 6,
    title: "Wool Overcoat",
    price: 385,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    ],
    variants: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Camel", hex: "#C19A6B" },
        { name: "Charcoal", hex: "#3D3D3D" },
        { name: "Navy", hex: "#1B2A4A" },
      ],
    },
    category: "Outerwear",
  },
];

function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        <div className="flex flex-col md:flex-row h-full">
          {/* Images */}
          <div className="md:w-1/2 bg-stone-50">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.images[selectedImageIdx]}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <Badge className="absolute top-3 left-3 bg-white text-stone-700 shadow-sm border-0 font-medium">
                {product.category}
              </Badge>
            </div>
            <div className="flex gap-2 p-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIdx(i)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIdx === i
                      ? "border-stone-800 shadow-md scale-105"
                      : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="md:w-1/2 p-6 flex flex-col gap-5 overflow-y-auto max-h-[580px]">
            <DialogHeader className="text-left space-y-1">
              <DialogTitle className="text-2xl font-semibold text-stone-900 leading-tight">
                {product.title}
              </DialogTitle>
              <p className="text-2xl font-bold text-stone-800">${product.price}</p>
            </DialogHeader>

            {/* Colors */}
            <div>
              <p className="text-sm font-semibold text-stone-600 uppercase tracking-wider mb-2">
                Color{selectedColor ? ` — ${selectedColor.name}` : ""}
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.variants.colors.map((color) => (
                  <button
                    key={color.name}
                    title={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor?.name === color.name
                        ? "border-stone-800 scale-110 shadow-md"
                        : "border-stone-200 hover:border-stone-400"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-sm font-semibold text-stone-600 uppercase tracking-wider mb-2">
                Size
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.variants.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-sm rounded-lg border font-medium transition-all ${
                      selectedSize === size
                        ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                        : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm font-semibold text-stone-600 uppercase tracking-wider mb-2">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:border-stone-400 hover:bg-stone-50 transition-all text-lg font-medium"
                >
                  −
                </button>
                <span className="w-8 text-center text-lg font-semibold text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:border-stone-400 hover:bg-stone-50 transition-all text-lg font-medium"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-auto pt-2">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200 ${
                  added
                    ? "bg-green-600 text-white scale-[0.98]"
                    : "bg-stone-900 text-white hover:bg-stone-700 active:scale-[0.98]"
                }`}
              >
                {added ? "✓ Added to Cart" : `Add to Cart · $${product.price * quantity}`}
              </button>
              <p className="text-xs text-stone-400 text-center mt-3">
                Free shipping on orders over $150
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="border-b border-stone-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-900 tracking-tight">Collection</h1>
            <p className="text-xs text-stone-400">{PRODUCTS.length} items</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-500">Spring / Summer 2026</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-600 shadow-sm border-0 text-xs font-medium">
                  {product.category}
                </Badge>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div className="space-y-0.5">
                  <h3 className="font-semibold text-stone-900 text-sm leading-snug">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    {product.variants.colors.map((c) => (
                      <span
                        key={c.name}
                        title={c.name}
                        className="w-3 h-3 rounded-full border border-stone-200"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-stone-800">${product.price}</span>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-xs font-semibold text-stone-600 border border-stone-200 rounded-lg px-3 py-1.5 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-200"
                  >
                    Show Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
