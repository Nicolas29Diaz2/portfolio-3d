import { HttpClient } from "@/core/api/httpClient";
import { isErr, ok, type Result } from "@/core/api/result";
import type { AppError } from "@/core/api/errors";
import type {
  FakeStoreProduct,
  FakeStoreProductApiResponse,
} from "@/features/products/types/products.types";

const fakeStoreClient = new HttpClient({
  baseUrl: "https://fakestoreapi.com",
});

export async function fetchFakeProducts(): Promise<
  Result<readonly FakeStoreProduct[], AppError>
> {
  const result =
    await fakeStoreClient.get<readonly FakeStoreProductApiResponse[]>(
      "/products",
    );

  if (isErr(result)) {
    return result;
  }

  const products: FakeStoreProduct[] = result.value.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: {
      rate: product.rating.rate,
      count: product.rating.count,
    },
  }));

  return ok(products);
}
