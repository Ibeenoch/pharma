import { useEffect, useState } from "react";
import { UserDataProps, UserMappedProps } from "../../../types/auth/UserData";
import { mappedUser } from "../../../utils/admin/user/mappedUser";
import { allUsersColumn, } from "../../../utils/admin/user/users";
import Table from "../../common/Table";
import DateFilter from "../DateFilter";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { TransactionDateFilterProps } from "../../../types/payment/FlutterwavePaymentType";
import { UserDateFilterProps } from "../../../types/user/contact";
import { getAllUser, getAllUsersWithDateFilter, selectAuth } from "../../../features/auth/authSlice";
import Pagination from "../../pagination";

interface UserAdminProps {
  users: UserDataProps[]
}

const UserAdmin: React.FC<UserAdminProps> = ({ users }) => {
    const [started, setStarted] = useState<string>("");
    const [ended, setEnded] = useState<string>("");
    const [currNum, setCurrNum] = useState<number>(0); 
    const [pageNum, setPageNum] = useState<number>(0); 
    const dispatch = useAppDispatch();
    const { totalUserPage } = useAppSelector(selectAuth);
  
  const filteredData: UserMappedProps[] = users && Array.isArray(users) ? mappedUser(users) : [];

    const handleUserFilter = () => {
      if(!started || !ended) return;
  
        setPageNum(0);
        setCurrNum(0);
        const start = new Date(started).toISOString();
        const end = new Date(ended).toISOString();
        
        const data: UserDateFilterProps = { end, start, pageNum: 0}
        dispatch(getAllUsersWithDateFilter(data)).then((res) => console.log('all user filterde by date ', res.payload));
    }
  
    useEffect(() => {
      dispatch(getAllUser(pageNum)).then((res) => console.log('lojmk ', res.payload))
    }, [pageNum])

    const handlePageClicked = (i: number) => {
      setPageNum(i)
    }

  return (
    <section>
      <DateFilter ended={ended} started={started} setEnded={setEnded} setStarted={setStarted} applyCallback={handleUserFilter} />
      <div className="p-4 my-3 bg-white rounded-xl">
     {  filteredData && Array.isArray(filteredData) &&  (   
      <Table
          columns={allUsersColumn}
          data={filteredData}
          tableHeaderTxtColor="text-black"
          whichTable="user"
        />)}
        <Pagination currentPage={currNum} onPageChange={(i) => {
          handlePageClicked(i)
        }} totalPages={totalUserPage} />
      </div>
    </section>
  );
};

export default UserAdmin;
