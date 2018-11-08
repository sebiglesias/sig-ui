export class Product {
  id: number;
  name: string;
}

export class ProductQuantity {
  id: number;
  product: Product;
  quantityInTons: number;
}
