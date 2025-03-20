import prescription from '../../assets/images/prescription.png'
import CustomButton from '../common/Button'
import CustomText from '../common/Text'

const Banner = () => {
  return (
    <div  style={{ backgroundImage: `url(${prescription})` }} className={`w-full h-[350px] my-8  bg-cover bg-center bg-opacity-50 p-8 `}>
        <CustomText text="Need a Doctor's prescription?" textType='huge' weightType='bold' color='text-amber-500' extraStyle='my-4'  />
        <CustomButton text='Ask Now' textSize='large' showArrow={true} />
    </div>
  )
}

export default Banner