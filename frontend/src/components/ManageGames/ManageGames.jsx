import React, { useState } from "react";
import { fetchGames, deleteGame } from "../../helper/adminhelper";
import TableRenderProp from "../RenderProp/TableRenderProp";
import toast from "react-hot-toast";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddGame from "../AddGame/AddGame";

const ManageGames = () => {
  const [events, setEvents] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [popUpAddEvent, setPopUpAddEvent] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const resetPage = async () => {
    setCurrentPage(0);
  };

  const fetchEvents = async () => {
    try {
      const events = await fetchGames();
      setLoading(false);
      setEvents(events);
      setTotalElements(events.length);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
    }
  };

  const handleClick = () => {
    setEditEvent(false);
    setPopUpAddEvent(!popUpAddEvent);
  };

  const tableHeading = ["Game Id", "Game Name", "Genre", "Action"];

  const handleUpdateEvent = (item) => {
    setEditEvent(true);
    setItem(item);
    setPopUpAddEvent(!popUpAddEvent);
  };

  const handleDeleteEvent = async (gameId) => {
    const token = localStorage.getItem("admin_token");
    try {
      await deleteGame(gameId, token);
      toast.success("Event deleted successfully");

      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  const renderRows = (event) => {
    return event.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-4 h-16 items-center border-b-2 border-b-secondary_text text-sm"
      >
        <p className="text-center">{item.gameId}</p>
        <p className="text-center">{item.gameName}</p>
        <p className="text-center">{item.genre}</p>
        <div className="justify-center flex gap-5">
          <MdOutlineEdit
            className="text-xl text-[#E1BE43] cursor-pointer"
            onClick={() => handleUpdateEvent(item)}
          />
          <RiDeleteBin6Line
            className="text-xl text-custom_red cursor-pointer"
            onClick={() => handleDeleteEvent(item.gameId)}
          />
        </div>
      </div>
    ));
  };

  return (
    <div>
      <TableRenderProp
        tableHeading={tableHeading}
        render={renderRows}
        handleClick={handleClick}
        heading={"Game Details"}
        buttonName={"New Game"}
        page={"Manage Games"}
        fetchEvents={fetchEvents}
        events={events}
        totalElements={totalElements}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loading={loading}
      />
      {popUpAddEvent && (
        <AddGame
          onClose={handleClick}
          editEvent={editEvent}
          item={item}
          fetchEvents={fetchEvents}
          resetPage={resetPage}
        />
      )}
    </div>
  );
};

export default ManageGames;
