import { lazy, Suspense } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
// import CursorColor from "./components/common/CursorColor";
const CursorColor =  lazy(() => import("./components/common/CursorColor"));
const PageLoadingDisplay =  lazy(() => import("./components/common/PageLoadingDisplay"));
// import PageLoadingDisplay from "./components/common/PageLoadingDisplay";

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
