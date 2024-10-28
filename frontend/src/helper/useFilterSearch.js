import { useEffect, useState } from "react";

function useFilterSearch(
  page,
  fetchEvents,
  events,
  currentPage,
  setCurrentPage
) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [perPageCount, setPerPageCount] = useState("10");

  useEffect(() => {
    const perPage =
      perPageCount === "10" ? 10 : perPageCount === "20" ? 20 : 30;
    const startIndex = currentPage * perPage;
    const paginatedData = events.slice(startIndex, startIndex + perPage);
    setData(paginatedData);
  }, [currentPage, perPageCount, events]);

  useEffect(() => {
    setCurrentPage(0);
    fetchEvents();
  }, [perPageCount]);

  const handleChange = () => {
    const newData = events.filter((oneData) => {
      switch (page) {
        case "Manage Events":
          return (
            oneData.gamename
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            oneData.eventid.toString().includes(search) ||
            oneData.country
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            oneData.location
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())
          );

        case "Manage Games":
          return (
            oneData.gameName.toString().includes(search.toLowerCase()) ||
            oneData.genre.toString().includes(search.toLowerCase()) ||
            oneData.gameId === parseInt(search)
          );
        default:
          return false;
      }
    });
    setData(newData);
  };

  return {
    handleChange,
    data,
    setSearch,
    setPerPageCount,
    currentPage,
    perPageCount,
    setCurrentPage,
  };
}

export default useFilterSearch;
