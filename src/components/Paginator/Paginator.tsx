import s from "../Users/Users.module.css";
import React, {FC, useState} from "react";

type PaginatorType = {
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    pages: Array<number>
}

const Paginator: FC<PaginatorType> = ({onPageChanged, currentPage, pages}) => {

    let [portionNumber, setPortionNumber] = useState(1);
    let portionSize = 10;
    let leftPortionBorder = (portionNumber - 1) * portionSize + 1;
    let rightPortionBorder = portionNumber * portionSize;

    return <div>
        { portionNumber > 1 &&
        <button onClick={() => setPortionNumber(portionNumber - 1)} className={s.button} >Back</button>
        }
        {
            pages.filter(p => p >= leftPortionBorder && p <= rightPortionBorder)
                .map(p => {
                    return <span onClick={() => onPageChanged(p)}
                                 className={currentPage === p ? s.currentPage : s.span}>{p}</span>
                })
        }
        { portionNumber !== portionSize &&
        <button onClick={() => setPortionNumber(portionNumber + 1)} className={s.button} >Next</button>
        }
    </div>
}

export default Paginator