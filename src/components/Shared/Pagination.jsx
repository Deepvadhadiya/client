import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Maximum number of page links to show in the pagination bar
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = () => {
        if (totalPages <= maxPagesToShow) {
            return pageNumbers.map((page) => (
                <li
                    key={page}
                    className={`page-item ${currentPage === page ? 'active' : ''}`}
                >
                    <button className="page-link" onClick={() => onPageChange(page)}>
                        {page}
                    </button>
                </li>
            ));
        } else {
            let pagesToRender = [];

            if (currentPage <= halfMaxPages) {
                // If current page is near the beginning
                pagesToRender = pageNumbers.slice(0, maxPagesToShow);
            } else if (currentPage >= totalPages - halfMaxPages) {
                // If current page is near the end
                pagesToRender = pageNumbers.slice(totalPages - maxPagesToShow, totalPages);
            } else {
                // Display current page in the center
                const start = currentPage - halfMaxPages;
                const end = currentPage + halfMaxPages;
                pagesToRender = pageNumbers.slice(start - 1, end);
            }

            return pagesToRender.map((page) => (
                <li
                    key={page}
                    className={`page-item ${currentPage === page ? 'active' : ''}`}
                >
                    <button className="page-link" onClick={() => onPageChange(page)}>
                        {page}
                    </button>
                </li>
            ));
        }
    };

    return (
        <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => onPageChange(1)}>
                    First
                </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                    Previous
                </button>
            </li>
            {renderPageNumbers()}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                    Next
                </button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => onPageChange(totalPages)}>
                    Last
                </button>
            </li>
        </ul >
    );
}

export default Pagination
