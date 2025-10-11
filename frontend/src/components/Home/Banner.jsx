import './banner.css'
import {assets} from '../../assets/assets.js'

const banner = () => {
  return (
    <div className='home-bannar'>
      <img src={assets.Banner} alt="" />
    </div>
  )
}

export default banner