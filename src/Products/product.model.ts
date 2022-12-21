export class Product {
    id: string;
    title: string;
    price: number;
    description: string;

    constructor(id: string, title: string, description: string, price: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
    }
}