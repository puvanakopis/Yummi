import Bannar from "../../components/customer/Home/Banner"
import Features from '../../components/customer/Home/Features'
import Offers from '../../components/customer/Home/Offers'
import HomeMenu from '../../components/customer/Home/HomeMenu'
import FeedBack from '../../components/customer/Home/FeedBack'

const Home = () => {
  return (
    <div>
      <Bannar />
      <Features />
      <Offers />
      <HomeMenu />
      <FeedBack />
    </div>
  )
}

export default Home