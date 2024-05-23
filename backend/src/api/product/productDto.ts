// Assuming the file path for ProductDto is `backend/src/api/product/productDto.ts`
export default interface ProductDto {
    id?: string;
    user?: string;
    name: string;
    price: number;
    categories?: string[];
    status?: boolean;
    // deletedAt?: Date;
    desc?: string | null | undefined; // Adjusted to match the MongoDB model
    imagePath?: string | null | undefined; 
}

