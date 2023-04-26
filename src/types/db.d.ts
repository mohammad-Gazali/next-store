export interface Product {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export interface ProductImage {
    id: number;
    created_at: string;
    product: string;
    image_url: string;
    is_main: boolean;
    is_featured: boolean;
}

export interface ProductWithImages extends Product {
    images: Image[];
}


export interface Review {
    id: number;
    created_at: string;
    updated_at: string;
    user: string;
    product: string;
    value: number;
    text: string;
}

export interface ReviewUser {
    name: string;
    email: string;
    avatar_url: string;
}

export interface ReviewWithUser extends Review {
    user: ReviewUser
}