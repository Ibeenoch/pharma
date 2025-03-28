import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { pageSpacing } from '../constants/appText'
import AccountCreated from '../features/auth/AccountCreated'

const AccountCreatedPage = () => {
  return (
    <main className={`sm:px-8 mt-10 ${pageSpacing}`}>
    <Header />
    <AccountCreated />
    <Footer />
  </main>
  )
}

export default AccountCreatedPage