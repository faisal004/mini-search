import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

const TOTAL_PRODUCTS = 50000;

function createProduct() {
    return {
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price({ min: 10, max: 2000 })),
        discountPercentage: faker.number.float({ min: 0, max: 30, precision: 0.01 }),
        rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        stock: faker.number.int({ min: 0, max: 500 }),
        brand: faker.company.name(),
        category: faker.commerce.department(),
        thumbnail: faker.image.urlLoremFlickr({ category: "product" }),
        images: Array.from({ length: 4 }, () =>
            faker.image.urlLoremFlickr({ category: "product" })
        ),
        createdAt: faker.date.past(),
    };
}

console.time("Generating products");

const products = Array.from(
    { length: TOTAL_PRODUCTS },
    createProduct
);

const dataPath = path.join(process.cwd(), 'data', 'products.json');

fs.writeFileSync(
    dataPath,
    JSON.stringify(products, null, 2)
);

console.timeEnd("Generating products");
console.log(`✅ 50,000 products generated at ${dataPath}`);
