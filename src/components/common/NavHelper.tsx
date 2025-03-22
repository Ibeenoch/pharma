import ArrowUp from '../../assets/icons/arrow-up.svg?react';

const NavHelper = () => {
    const navigateToTop = () => {
        window.scrollTo(0,0);
    }
  return (
    <div onClick={navigateToTop} className="fixed right-10 p-6 bottom-10 bg-amber-500 flex items-center cursor-pointer justify-center rounded-full w-8 h-8">
       <div>
            <ArrowUp className='w-5 h-5 z-40' /> 
        </div> 
    </div>
  )
}

export default NavHelper