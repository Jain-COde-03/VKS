import Header from '../../navigation/components/Header'
import Navbar from '../../navigation/components/Navbar'
import CustomerReviewsSection from '../components/CustomerReviewsSection'
import FreshPicksSection from '../components/FreshPicksSection'
import HomeCtaSection from '../components/HomeCtaSection'
import HeroSection from '../components/HeroSection'
import InstantDealsSection from '../components/InstantDealsSection'
import WhyShopSection from '../components/WhyShopSection'

const HomePage = () => {
    return (
        <div>
            <Header />
            <Navbar />
            <HeroSection />
            <InstantDealsSection />
            <FreshPicksSection />
            <WhyShopSection />
            <CustomerReviewsSection />
            <HomeCtaSection />
        </div>
    )
}

export default HomePage
