import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import PaginationButton from "../PaginationButton/PaginationButton";
import useFilterSearch from "../../helper/useFilterSearch";
import ClipLoading from "../ClipLoading/ClipLoading";

function TableRenderProp({
  handleClick,
  tableHeading,
  render,
  heading,
  buttonName,
  fetchEvents,
  page,
  events,
  totalElements,
  currentPage,
  setCurrentPage,
  loading,
}) {
  const { handleChange, data, setSearch, setPerPageCount, perPageCount } =
    useFilterSearch(page, fetchEvents, events, currentPage, setCurrentPage);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const perPage = Number(perPageCount);
    const pages = Math.ceil(events.length / perPage);
    setTotalPages(pages);
    setCurrentPage(0);
  }, [events, perPageCount]);

  return (
    <section
      className={`flex flex-col justify-center mx-10 mt-16 ${
        page == "Manage Games" ? "min-w-[1080px]" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[24px] font-[600px]">{heading}</span>
          <div>
            <select
              name="perpagecount"
              id="perpagecount"
              onChange={(e) => setPerPageCount(e.target.value)}
              className="rounded border border-name_background px-2"
              value={perPageCount}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <span className="pl-2">entries per page</span>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <span className="pr-2 text-base">Search:</span>
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-organizer_background py-2 px-4"
          />
          <div
            className="mx-2 p-3 hover:text-name_background border bg-organizer_background text-primary_text hover:bg-background rounded-full hover:border-name_background border-[#F1E3E0]"
            onClick={handleChange}
          >
            <IoSearch />
          </div>
          <div className="ml-3 bg-organizer_background rounded py-2 px-4 font-bold text-primary_text">
            <button
              className="flex justify-center items-center space-x-3"
              onClick={handleClick}
            >
              <span className="text-lg">+</span>
              <span className="text-base">{buttonName}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="h-[500px] border-2 mt-4 rounded-lg border-event_text overflow-x-auto overflow-y-auto">
        {tableHeading.length > 0 && (
          <div
            className={`sticky top-0 bg-background grid grid-cols-${tableHeading.length} h-16 items-center border-b-2 border-b-event_text font-bold`}
          >
            {tableHeading.map((heading, index) => (
              <p key={index} className="text-center">
                {heading}
              </p>
            ))}
          </div>
        )}
        {loading ? (
          <div className="flex pt-48 justify-center items-center">
            <ClipLoading />
          </div>
        ) : (
          data.length > 0 && render(data)
        )}
      </div>

      <div className="flex justify-between p-3">
        <div className="p-3">
          <p>
            Showing {currentPage * Number(perPageCount) + 1} to{" "}
            {Math.min((currentPage + 1) * Number(perPageCount), totalElements)}{" "}
            of {totalElements} entries
          </p>
        </div>
        <div>
          <PaginationButton
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}

export default TableRenderProp;
