import {PagingWrap, TablePageNationWrap} from "@components/Table/style.tsx";
import { LuChevronsLeft } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";
import { LuChevronsRight } from "react-icons/lu";




const TablePageNation = ({currentPage, totalCount, limit, offsetFunc}) => {
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    return(
        <TablePageNationWrap>

            <div
                className={`control-btn ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => offsetFunc(1)}
            >
                <LuChevronsLeft size={18}/>
            </div>
            <div
                className={`control-btn ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => offsetFunc(currentPage - 1)}
            >
                <LuChevronLeft size={18}/>
            </div>
            <PagingWrap>
                {Array.from({length: totalPages}, (_, index) => {
                    const page = index + 1;
                    const isActive = page === currentPage;

                    return (
                        <div
                            key={page}
                            onClick={() => offsetFunc(page)}
                            className={`page ${isActive ? "active" : ""}`}>
                            {page}
                        </div>
                    );
                })}
            </PagingWrap>

            <div
                className={`control-btn ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => offsetFunc(currentPage + 1)}
            >
                <LuChevronRight size={18}/>
            </div>
            <div
                className={`control-btn ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => offsetFunc(totalPages)}
            >
                <LuChevronsRight size={18}/>
            </div>

        </TablePageNationWrap>
    )
}
export default TablePageNation;