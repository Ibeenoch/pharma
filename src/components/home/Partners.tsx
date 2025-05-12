import { lazy } from 'react';
import part1 from '../../assets/images/glove.png'
import part2 from '../../assets/images/chowdesk.png';
import part3 from '../../assets/images/errand360.png';
import part4 from '../../assets/images/gokada.png';
import part5 from '../../assets/images/dhl.png';
import part6 from '../../assets/images/gig.png';
import part7 from '../../assets/images/ups.png';
import part8 from '../../assets/images/redstarexpress.png';
import part9 from '../../assets/images/kwik.png';
import part10 from '../../assets/images/images-162.jpeg';
import part11 from '../../assets/images/nafdac.png';
import part12 from '../../assets/images/pcn.png';
const CustomText = lazy(() => import('../common/Text'))
import '../../styles/tailwind.css';


const Partners = () => {
    const Images = [
        part1, part2, part3, part4, part5, part6, part7, part8, part9, part10, part11, part12
    ]
  return (
    <div className='my-3 border-b border-black pb-10'>
     <CustomText text='Our Partners' textType='medium' weightType='bold' extraStyle='text-center mt-3 mb-5'/>
        <div className='slider' >
            <div className='list'>
                {
                    Images.map((img, i) => (
                        <div className='item' style={{ '--position': `${i + 1}` } as React.CSSProperties}>
                            <img src={img} alt={`our brand ${i}`} className='h-full bg-white rounded-md' />
                        </div>
                    ))
                }
              
            </div>
        </div>
    </div>
  )
}

export default Partners