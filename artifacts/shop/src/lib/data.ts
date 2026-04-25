export interface ProductVariant {
  sizes: string[];
  colors: { name: string; hex: string }[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  variants: ProductVariant;
  category: string;
}

export const PRODUCTS: Product[] = [
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
