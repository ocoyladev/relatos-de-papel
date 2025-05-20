export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
  genre: string[];
  isbn: string;
  publicationDate: string;
  format: 'physical' | 'digital' | 'both';
  stockStatus: 'in stock' | 'low stock' | 'out of stock';
  rating: number;
  featured?: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
  format: 'physical' | 'digital';
}

export interface Order {
  items: CartItem[];
  total: number;
  date: Date;
}