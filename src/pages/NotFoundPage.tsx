import  { lazy } from 'react'
const NotFound = lazy(() =>import('../components/common/NotFound'));
const PageLayout = lazy(() =>import("../components/common/PageLayout"));


const NotFoundPage = () => {
  return (
    <PageLayout child={<NotFound />} />
  )
}

export default NotFoundPage