import ProductDetails from "@/components/ProductDetails"
import { getProduct } from "../../../../../lib/shopify";
export default async function Product({ params }) {
  const product = await getProduct(params.handle);

  return (
    <ProductDetails product={product}/>
  )
}
