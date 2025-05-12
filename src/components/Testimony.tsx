import test11 from '../assets/images/testi1.png';
import test12 from '../assets/images/testi2.png';
import test13 from '../assets/images/testi3.png';
import test14 from '../assets/images/testi4.png';
import test16 from '../assets/images/testi6.png';
import test17 from '../assets/images/testi7.png';
import BlockQuock from '../assets/icons/quote-block.svg?react';
import ArrowRight from '../assets/icons/arrow-right-circle.svg?react';
import ArrowLeft from '../assets/icons/arrow-left-circle.svg?react';
import CustomText from './common/Text';
import { useState } from 'react';

const Testimony = () => {
    const [imageIndex, setImageIndex] = useState<number>(3);
    const testmonyItems = [
        {
          name: 'Chimezie Ezeigwe',
          img: test11,
          testimony: 'I really love Chimark Pharmacy’s style of service; their customer care is very exceptional.',
          occupation: 'Optician',
        },
        {
          name: 'Ngozi Nwankwo',
          img: test17,
          testimony: 'Chimark’s delivery is fast and accurate. I always get my prescriptions on time without stress.',
          occupation: 'Nurse',
        },
        {
          name: 'Samuel Oladipo',
          img: test12,
          testimony: 'The eCommerce platform is seamless. I ordered from my phone and received everything within hours.',
          occupation: 'Software Developer',
        },
        {
          name: 'Amaka Obi',
          img: test16,
          testimony: 'Chimark Pharmacy’s app is easy to navigate and the discounts on drugs are impressive!',
          occupation: 'Teacher',
        },
        {
          name: 'Chima Obinna',
          img: test13,
          testimony: 'I’ve never had such an easy time buying medicine online. Chimark is the real deal.',
          occupation: 'Banker',
        },
        {
          name: 'Yetunde Balogun',
          img: test14,
          testimony: 'I’m really impressed with the professionalism of the team. Shopping with Chimark was convenient and satisfying.',
          occupation: 'Fashion Designer',
        }
      ];
      
  return (
    <section>
        <CustomText text='Testimonials' textType='normal' weightType='semibold' extraStyle='text-center'/>
        <CustomText text="Don't Take Our Word for it" textType='large' weightType='semibold' extraStyle='text-center'/>
        <CustomText text='See what our clients have to say about us.' textType='normal' weightType='semibold' color='text-gray-500' extraStyle='text-center mb-3'/>

        <div className='relative my-8'>
            <div className='gap-4 items-center hidden md:flex'>
                {/* left image  */}
                <div style={{ ...testmonyItems[imageIndex - 1]?.img && {backgroundImage: `url(${testmonyItems[imageIndex - 1].img})`} }} className="w-1/2 h-130 bg-amber-500 opacity-50 rounded-xl overflow-hidden bg-fit bg-left bg-no-repeat">
                </div>
                {/* right image  */}
                <div style={{  ...testmonyItems[imageIndex + 1]?.img && {backgroundImage: `url(${testmonyItems[imageIndex + 1].img})` }}} className="w-1/2 h-130 bg-amber-500 opacity-50 rounded-xl overflow-hidden bg-fit bg-right bg-no-repeat">
                </div>
            </div>
          {testmonyItems[imageIndex - 1]?.img && (  <div onClick={() => setImageIndex((prev) => prev <= 0 ? 0 : prev - 1)} className='z-40 hidden md:block absolute top-[50%] left-4 cursor-pointer'>
                <ArrowLeft className='w-20 h-20 hover:text-amber-500' />
            </div>)}
          { testmonyItems[imageIndex + 1]?.img && (  <div onClick={() => setImageIndex((curr) => curr >= testmonyItems.length - 1 ? testmonyItems.length - 1 : curr + 1)} className='z-40 hidden md:block absolute top-[50%] right-4 cursor-pointer'>
                <ArrowRight className='w-20 h-20  hover:text-amber-500' />
            </div>)}
            {/* current image  */}
            <div className='mx-4 md:mx-0 relative md:absolute md:-top-5 md:left-[10%] w-[90%] md:w-[70%] grid grid-cols-[60%_40%] md:grid-cols-[40%_60%] gap-4 items-center  bg-white p-4 rounded-xl'>
                <div>
                    <img src={testmonyItems[imageIndex].img} alt="current testimony" className='w-250 h-80 md:h-130 bg-amber-500 transform -skew-y-4' />
                </div>
                <div className='p-2'>
                    <div className='absolute top-5 right-5'>
                        <BlockQuock className='w-14 h-14 md:w-20 md:h-20 text-gray-400 ' />
                    </div>
                    <CustomText 
                    text={testmonyItems[imageIndex].testimony}
                    textType='normal'
                    color='text-gray-600'
                    weightType='medium'
                    extraStyle='my-3'
                    />
                    <CustomText 
                    text={testmonyItems[imageIndex].name}
                    textType='medium'
                    weightType='semibold'
                    extraStyle='mt-5'
                    />
                     <CustomText 
                    text={testmonyItems[imageIndex].occupation}
                    textType='normal'
                    color='text-gray-700'
                    weightType='medium'
                    />

                </div>
                {testmonyItems[imageIndex - 1]?.img && (  <div onClick={() => setImageIndex((prev) => prev <= 0 ? 0 : prev - 1)} className='md:hidden absolute top-[50%] left-4 cursor-pointer'>
                <ArrowLeft className='w-20 h-20 text-black/30' />
            </div>)}
          { testmonyItems[imageIndex + 1]?.img && (  <div onClick={() => setImageIndex((curr) => curr >= testmonyItems.length - 1 ? testmonyItems.length - 1 : curr + 1)} className='md:hidden absolute top-[50%] right-4 cursor-pointer'>
                <ArrowRight className='w-20 h-20 text-black/30' />
            </div>)}
            </div>
        </div>
    </section>
  )
}

export default Testimony