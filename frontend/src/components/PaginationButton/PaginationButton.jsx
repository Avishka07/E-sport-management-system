import ReactPaginate from "react-paginate";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const PaginationButton = ({ totalPages, currentPage, setCurrentPage }) => {
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;

  return (
    <div>
      <ReactPaginate
        breakLabel={<span className="mx-3">...</span>}
        nextLabel={
          showNextButton ? (
            <span className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-300">
              <FaAnglesRight />
            </span>
          ) : null
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel={
          showPrevButton ? (
            <span className="w-10 h-10 flex items-center justify-center hover:bg-gray-300 rounded-md">
              <FaAnglesLeft />
            </span>
          ) : null
        }
        containerClassName="flex items-center justify-center mb-4"
        pageClassName="block border-solid border-gray-300 hover:bg-gray-300 mx-0.5 w-10 h-10 flex items-center justify-center rounded-md"
        activeClassName="bg-event_text text-primary_text hover:text-black"
      />
    </div>
  );
};

export default PaginationButton;
