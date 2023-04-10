import React, { useEffect, useState } from 'react'
import { FaAngleLeft ,FaAngleRight} from "react-icons/fa";

const calculatePagesCount = (pageSize, totalCount) => {
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
};

const Pagination = ({ totalPosts,setCurrentPage ,currentPage}) => {
    const [pages, setPages] = useState([1,2,3]);
    const [totalPage, setTotalPage] = useState(0);
    const handleNextPrevButton = (page, action) => {
        const arr = pages;
        if(action === "next" && (page-1) === arr[2]){
         arr.push(arr[2]+1);
         arr.shift();
        }
        else if(action === "prev" && arr[0] !== 1 ){
         arr.unshift(arr[0]-1);
         arr.pop();
        }
        setPages([...arr]);
        setCurrentPage(page);
    }

    useEffect(()=>{
        setTotalPage(calculatePagesCount(5, totalPosts))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='pagination'>
            {/* {currentPage} */}
            <button onClick={()=>handleNextPrevButton(currentPage-1, "prev")} disabled={currentPage === 1 ? true:false}>{<FaAngleLeft/>}</button>
            {
                
                pages.map((page, index) => (
                    <button 
                    key={index} onClick={()=>{
                        setCurrentPage(page);
                    }}
                    className={page===currentPage ? "active" : ""}
                    >{page}</button>
                    
                    
                ))
            }
            <button onClick={()=>handleNextPrevButton(currentPage+1, "next")} disabled={currentPage === totalPage ? true:false}>{
            <FaAngleRight/>}</button>
        </div>
    )
}

export default Pagination
