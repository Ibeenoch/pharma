import { Suspense } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import CursorColor from "./components/common/CursorColor";
import PageLoadingDisplay from "./components/common/PageLoadingDisplay";

function App() {
  return (
    <>
      <div>
        {/* <h1 className='text-3xl font-bold underline'>company</h1> */}
        <Suspense fallback={<PageLoadingDisplay />}>
          <CursorColor />
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </>
  );
}

export default App;
