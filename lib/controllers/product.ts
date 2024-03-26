import { products } from "lib/algolia";

export async function getProductById(productId) {
  const product = await products.getObject(productId);
  return product;
}
export async function searchProducts(q: string, limit: number, offset: number) {
  const result = await products.search(q, {
    hitsPerPage: limit,
    page: offset > 1 ? Math.floor(offset / limit) : 0,
  });
  return result;
}
