export type HoursRow = {
  label: string;
  value: string;
};

export type Restaurant = {
  name: string;
  fullName: string;
  tagline: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  neighbourhood: string;
  city: string;
  postcode: string;
  country: string;
  mapsUrl: string;
  michelinUrl: string;
  hours: HoursRow[];
  chef: string;
  award: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  highlight?: boolean;
  image?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  intro: string;
  items: MenuItem[];
};

export type Signature = {
  id: string;
  name: string;
  price: number;
  note: string;
  image: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export type NavLink = {
  href: string;
  label: string;
};

export type SiteData = {
  restaurant: Restaurant;
  menuCategories: MenuCategory[];
  signatures: Signature[];
  testimonials: Testimonial[];
  navLinks: NavLink[];
};
