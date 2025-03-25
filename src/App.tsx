import { Suspense, } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {

  return (
    <>
      <div>
        {/* <h1 className='text-3xl font-bold underline'>company</h1> */}
        <Suspense fallback={<div className="">Loading</div> }>
          <RouterProvider router={router} />
          </Suspense>
      </div>
    </>
  )
}

export default App
