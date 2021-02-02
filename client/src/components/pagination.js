import React, { useEffect, useState, useMemo } from "react";

const PaginationComponent = ({
    total = 0,
    itemsPerPage = 10,
    currentPage = 1,
    onPageChange
}) => {
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (total > 0 && itemsPerPage > 0)
            setTotalPages(Math.ceil(total / itemsPerPage));
    }, [total, itemsPerPage]);

    const paginationItems = useMemo(() => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li className={i === currentPage ? "page-item active" : "page-item"}
                    key={i}
                    onClick={() => onPageChange(i)}
                >
                    <span className="page-link">
                    {i}
                    </span>
                </li>
            );
        }

        return pages;
    }, [totalPages, currentPage]);

    if (totalPages === 0) return null;

    return (
        <div className="col-md-9">
        <ul className="pagination">
          <li className={ currentPage === 1 ? "page-item disabled" : "page-item"} >
            <span className="page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</span>
          </li>
            {paginationItems}
          <li className={currentPage === totalPages ? "page-item disabled" : "page-item"} >
            <a className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next</a>
          </li>
        </ul>
      </div>
    );
};

export default PaginationComponent;