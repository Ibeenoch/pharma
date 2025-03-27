import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { MARGIN_TOP, pageSpacing } from '../constants/appText'
import PaymentStatus from '../features/cart/PaymentStatus'

const PaymentStatusPage = () => {
  return (
    <main className={`${MARGIN_TOP} ${pageSpacing }`}>
      <Header />
      <PaymentStatus />
      <Footer />
    </main>
  )
}

export default PaymentStatusPage