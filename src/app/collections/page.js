import { getCollections } from '../../../lib/shopify'
import CollectionList from '@/components/CollectionList';

export default async function Collections() {
  const collections = await getCollections() || [];

  return (
    <CollectionList collections={collections}/>
  )
}
