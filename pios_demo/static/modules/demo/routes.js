import ShopList from './components/ShopList'
import ShopDes from './components/ShopDes'
import ShopWinList from './components/ShopWinList'
import ShopTag from './components/ShopTag'
import ShopSearch from './components/ShopSearch'
import FoodQualification from './components/FoodQualification'

export default [
  {
    path: '/shopList',
    name: 'shopList',
    alias: '/',
    component: ShopList
  },
  {
    path: '/shopDes',
    name: 'shopDes',
    component: ShopDes
  },
  {
    path: '/ShopWinList',
    name: 'ShopWinList',
    component: ShopWinList
  },
  {
    path: '/ShopTag',
    name: 'ShopTag',
    component: ShopTag
  },
  {
    path: '/ShopSearch',
    name: 'ShopSearch',
    component: ShopSearch
  },
  {
    path: '/FoodQualification',
    name: 'FoodQualification',
    component: FoodQualification
  }
]