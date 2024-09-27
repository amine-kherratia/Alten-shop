export interface CartItem {
    productId: number;      
    quantity: number;      
}

export interface Cart {
    items: CartItem[];      
    totalQuantity: number;   
    totalPrice: number;     
}