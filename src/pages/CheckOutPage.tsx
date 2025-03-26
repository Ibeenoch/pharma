import { pageSpacing } from '../constants/appText'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CheckOut from '../features/cart/CheckOut'

const CheckOutPage = () => {
  return (
     <main className={`sm:px-8 mt-10 ${pageSpacing}`}>
          <Header />
          <CheckOut />
          <Footer />
        </main>
  )
}

export default CheckOutPage