export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface ProductVariant {
  sizes: string[];
  colors: ProductColor[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  variants: ProductVariant;
  category: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Classic Linen Shirt",
    price: 89,
    description:
      "Cut from 100% European linen, this shirt breathes beautifully through warm days and softens with every wash. A relaxed fit through the body with a clean, unfussy collar — equally at home over swim shorts or tucked into tailored trousers.",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
    ],
    variants: {
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: [
        {
          name: "Ivory",
          hex: "#FAF7F0",
          images: [
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
          ],
        },
        {
          name: "Slate Blue",
          hex: "#6B7FA3",
          images: [
            "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
          ],
        },
        {
          name: "Sage",
          hex: "#8FAF8A",
          images: [
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
            "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
          ],
        },
      ],
    },
    category: "Tops",
  },
  {
    id: 2,
    title: "Slim Chino Trousers",
    price: 115,
    description:
      "A slim, tapered leg in a durable cotton-twill weave. These are the trousers you reach for first — smart enough for a dinner reservation, relaxed enough for a Saturday afternoon. Belt loops, side pockets, and a clean flat front.",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    ],
    variants: {
      sizes: ["28", "30", "32", "34", "36"],
      colors: [
        {
          name: "Tan",
          hex: "#C8A882",
          images: [
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
          ],
        },
        {
          name: "Navy",
          hex: "#1B2A4A",
          images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
          ],
        },
        {
          name: "Olive",
          hex: "#6B7346",
          images: [
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
          ],
        },
      ],
    },
    category: "Bottoms",
  },
  {
    id: 3,
    title: "Merino Crew Sweater",
    price: 145,
    description:
      "Knitted from grade-A merino wool, this crew neck is feather-light but genuinely warm. The fabric regulates temperature naturally, resists odour, and gets softer with wear. A wardrobe workhorse that earns its keep year-round.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
    variants: {
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: [
        {
          name: "Camel",
          hex: "#C19A6B",
          images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
          ],
        },
        {
          name: "Charcoal",
          hex: "#3D3D3D",
          images: [
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
          ],
        },
        {
          name: "Rust",
          hex: "#B7472A",
          images: [
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
          ],
        },
        {
          name: "Forest",
          hex: "#355E3B",
          images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
          ],
        },
      ],
    },
    category: "Knitwear",
  },
  {
    id: 4,
    title: "Leather Derby Shoes",
    price: 295,
    description:
      "Handcrafted from full-grain calfskin leather on a classic last, with a Goodyear-welted sole that can be resoled as many times as you need. These shoes are built to be worn for decades, not seasons.",
    images: [
      "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80",
    ],
    variants: {
      sizes: ["40", "41", "42", "43", "44", "45"],
      colors: [
        {
          name: "Cognac",
          hex: "#9E4F2A",
          images: [
            "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
          ],
        },
        {
          name: "Black",
          hex: "#1A1A1A",
          images: [
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80",
            "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80",
          ],
        },
      ],
    },
    category: "Footwear",
  },
  {
    id: 5,
    title: "Canvas Tote Bag",
    price: 55,
    description:
      "Heavy-duty 12oz cotton canvas with reinforced stitching at every stress point. Roomy enough for a weekend market run, sturdy enough to last years. The interior has a zip pocket and a key clip — because thoughtful details matter.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    ],
    variants: {
      sizes: ["One Size"],
      colors: [
        {
          name: "Natural",
          hex: "#EDE9DC",
          images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&q=80",
          ],
        },
        {
          name: "Black",
          hex: "#1A1A1A",
          images: [
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
          ],
        },
        {
          name: "Denim",
          hex: "#3B5998",
          images: [
            "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&q=80",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
          ],
        },
      ],
    },
    category: "Accessories",
  },
  {
    id: 6,
    title: "Wool Overcoat",
    price: 385,
    description:
      "A single-breasted overcoat cut from a dense Italian wool-blend cloth that holds its shape beautifully. The silhouette is long and clean, with a notched lapel, flap pockets, and a half-canvas construction that drapes rather than hangs.",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
    variants: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        {
          name: "Camel",
          hex: "#C19A6B",
          images: [
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
            "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
          ],
        },
        {
          name: "Charcoal",
          hex: "#3D3D3D",
          images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
          ],
        },
        {
          name: "Navy",
          hex: "#1B2A4A",
          images: [
            "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
          ],
        },
      ],
    },
    category: "Outerwear",
  },
];
