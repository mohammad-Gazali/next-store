export interface Product {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export interface Image {
    id: number;
    created_at: string;
    product: string;
    image_url: string;
    is_main: boolean;
}

export interface ProductWithImages extends Product {
    images: Image[];
}