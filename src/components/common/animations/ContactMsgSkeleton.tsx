import React from 'react'

const ContactMsgSkeleton = () => {
  return (
    <div className='mt-20 md:grid grid-cols-2 gap-2'>
      {
        Array.from( { length : 4 }, (_ , i) => (

        <div className='p-4 rounded-xl bg-white m-2 animate-pulse'>
          <div className='flex gap-2 items-center'>
            <div className='w-8 h-8 rounded-full p-2 flex justify-center items-center bg-gray-200'></div>

            <div className=''>
              <div className='w-30 h-4 rounded-md bg-gray-200'></div>
            <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1 my-2'>
                  <div className='w-30 h-4 rounded-md bg-gray-200'></div>
                </div>
                <div className='flex items-center gap-1'>
                  <div className='w-30 h-4 rounded-md bg-gray-200'></div>
                </div>
              </div>

            </div>
          </div>
          <div className='my-2 h-4 bg-gray-200 rounded-xl p-4'>
          </div>
        </div>
        ))
      }
    
      </div>
  )
}

export default ContactMsgSkeleton