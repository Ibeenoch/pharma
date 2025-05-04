import  { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { getContactMessage,  getTotalContactPage,  selectUser } from '../../../features/user/userSlice'
import MessageCard from './MessageCard';
import Pagination from '../../Pagination';
import ContactMsg from '../../common/animations/ContactMsgSkeleton';
import ContactMsgSkeleton from '../../common/animations/ContactMsgSkeleton';

const UserMessage = () => {
  const dispatch = useAppDispatch();
  const { contacts, status, totalContactPage  } = useAppSelector(selectUser);
  const [pageNum, setPageNum] = useState<number>(0);
  const [currPage, setcurrPage] = useState<number>(0);

  useEffect(() => {
    dispatch(getTotalContactPage())
  }, [])

  useEffect(() => {
    dispatch(getContactMessage(pageNum));
  }, [pageNum])

  const handlePageClick = (i: number) => {
    setcurrPage(i);
    setPageNum(i)
  }

  return (
    <>
    {
      status === 'loading' ? (
        <>
        <ContactMsgSkeleton />
        </>
      ) : (
      <div className='mt-20 md:grid grid-cols-2 gap-2'>
      {
        contacts && Array.isArray(contacts) && contacts.map((c) => (
          <>
          <MessageCard key={c.$id} email={c.email} fullname={`${c.firstName} ${c.lastName}`} message={c.message} phone={c.phone} />
          </>
        ))
      }
      <Pagination itemPerPage={6} currentPage={currPage} totalPages={totalContactPage} onPageChange={(i) => {
        handlePageClick(i)
      }} />
      </div>
      )
    }


    </> 
  )
}

export default UserMessage