import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { pageSpacing } from '../constants/appText'
import OrderHistory from '../features/order/OrderHistory'

const OrderHistoryPage = () => {
  return (
    <main className={`${pageSpacing}`}>
    <Header />
    <OrderHistory />
    <Footer />
  </main>
  )
}

export default OrderHistoryPage