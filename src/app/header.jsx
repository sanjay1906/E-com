import { getMenu } from '../../lib/shopify'
import Navigation from '@/components/Navigation';

export default async function Header() {
  const menuItems = await getMenu('main-menu') || [];

  return (
    <Navigation menuItems={menuItems}/>
  )
}
