import React, { useState, useEffect } from "react";
import {
  fetchAdminEvents,
  deleteEvent,
  downloadRegistration,
} from "../../helper/adminhelper";
import { fetchGameRegistrationCount } from "../../helper/helper";
import TableRenderProp from "../RenderProp/TableRenderProp";
import toast from "react-hot-toast";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineDownload } from "react-icons/hi";
import AddEvent from "../AddEvent/AddEvent";
import * as XLSX from "xlsx";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [popUpAddEvent, setPopUpAddEvent] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [registrationCounts, setRegistrationCounts] = useState({});

  const resetPage = async () => {
    setCurrentPage(0);
  };

  const fetchEvents = async () => {
    try {
      const events = await fetchAdminEvents();
      setEvents(events);
      setTotalElements(events.length);
      setLoading(false);

      const counts = {};
      await Promise.all(
        events.map(async (event) => {
          const count = await fetchGameRegistrationCount(event.eventid);
          counts[event.eventid] = count;
        })
      );
      setRegistrationCounts(counts);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
    }
  };

  const handleClick = () => {
    setEditEvent(false);
    setPopUpAddEvent(!popUpAddEvent);
  };

  const tableHeading = [
    "Events Id",
    "Game Name",
    "Country",
    "Organizer",
    "Number of Registration",
    "Location",
    <>
      Start Date <br /> Time
    </>,
    <>
      End Date <br /> Time
    </>,
    "Registration Closing Date",
    "Game Names",
    "Action",
  ];

  const handleUpdateEvent = (item) => {
    setEditEvent(true);
    setItem(item);
    setPopUpAddEvent(!popUpAddEvent);
  };

  const handleDownload = async (eventId) => {
    try {
      const response = await downloadRegistration(eventId);

      if (response.registrations && response.registrations.length > 0) {
        const formattedData = response.registrations.map((registration) => ({
          "User ID": registration.user_id,
          Nickname: registration.nickname,
          Gender: registration.gender,
          "Date of Birth": registration.date_of_birth,
          "Phone Number": registration.phone_number,
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

        XLSX.writeFile(workbook, `Event_${eventId}_Registrations.xlsx`);
        toast.success("Registrations downloaded successfully!");
      } else {
        toast.error("No registrations found for this event");
      }
    } catch (error) {
      console.error("Error downloading registrations:", error);
      toast.error("Failed to download registrations");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const token = localStorage.getItem("admin_token");
    console.log("clicked");
    try {
      await deleteEvent(eventId, token);
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
        className={`grid grid-cols-11 h-16 items-center border-b-2 border-b-secondary_text text-sm`}
      >
        <p className="text-center">{item.eventid}</p>
        <p className="text-center">{item.gamename}</p>
        <p className="text-center">{item.country}</p>
        <p className="text-center">{item.organizer}</p>
        <p className="text-center">{registrationCounts[item.eventid]}</p>
        <p className="text-center">{item.location}</p>
        <p className="text-center">
          {item.starting_date} <br /> {item.starting_time}
        </p>
        <p className="text-center">
          {item.end_date} <br /> {item.end_time}
        </p>
        <p className="text-center">{item.registration_closing}</p>
        <p className="text-center">{item.game_names.join(" , ")}</p>
        <div className="justify-center flex gap-5">
          <MdOutlineEdit
            className="text-xl text-[#E1BE43] cursor-pointer"
            onClick={() => handleUpdateEvent(item)}
          />
          <HiOutlineDownload
            className="text-xl text-name_background cursor-pointer"
            onClick={() => handleDownload(item.eventid)}
          />
          <RiDeleteBin6Line
            className="text-xl text-custom_red cursor-pointer"
            onClick={() => handleDeleteEvent(item.eventid)}
          />
        </div>
      </div>
    ));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <TableRenderProp
        tableHeading={tableHeading}
        render={renderRows}
        handleClick={handleClick}
        heading={"Event Details"}
        buttonName={"New Event"}


        page={"Manage Events"}

        fetchEvents={fetchEvents}
        events={events}
        totalElements={totalElements}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loading={loading}
      />
      {popUpAddEvent && (
        <AddEvent
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

export default ManageEvents;
