export interface Sale {
    _id: string;
    purchaseMethod: string;
    items: Array<ItemSale>;
    customer: Customer;
    storeLocation: string;
}

export interface Customer {
    email: string;
    age: number;
    gender: string;
    satisfaction: number;
}

export interface ItemSale {
    name: string;
    price: { $numberDecimal: string };
    quantity: number;
    tags: any;
}
