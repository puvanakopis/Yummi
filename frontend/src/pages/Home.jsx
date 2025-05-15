import Bannar from "../components/Home/Banner"
import Features from '../components/Home/Features'
import Offers from '../components/Home/Offers'
import HomeMenu from '../components/Home/HomeMenu'
import FeedBack from '../components/Home/FeedBack'

const Home = () => {
  return (
    <div>
      <Bannar/>
      <Features/>
      <Offers/>
      <HomeMenu/>
      <FeedBack/>
    </div>
  )
}

export default Home