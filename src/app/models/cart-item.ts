export interface CartItem {
  name: string;
  price: number;
  isImported: boolean;
  category: string;
  quantity: number;
  canIncreaseQuantity: boolean;
}
