import { getCollectionProducts } from "../../../../lib/shopify"
import ProductList from '@/components/ProductList'
export default async function Collections({params,searchParams}) {

  const products = await getCollectionProducts(params.handle,'COLLECTION_DEFAULT',false);
  
  return (
    <ProductList products={products}/>
  )
}