import { IoGameControllerOutline } from "react-icons/io5";
import {
  MdOutlineEventNote,
  MdOutlineSettings,
  MdOutlineSpaceDashboard,
} from "react-icons/md";

const AdminSidebar = ({ activeTab, handleClicking, width }) => {
  return (
    <div
      className={`pt-24 h-screen bg-organizer_background text-primary_text fixed left-0 top-0`}
      style={{ width: `${width}px` }}
    >
      <ul>
        <li>
          <button
            onClick={() => handleClicking(1)}
            className={`pl-8 text-custom_textcolor w-full flex justify-start items-center rounded-none h-20 shadow-none ${
              activeTab === 1
                ? "bg-country_background"
                : "bg-organizer_background"
            }`}
          >
            <span className="mr-4 text-2xl">
              <MdOutlineSpaceDashboard />
            </span>
            Dashboard
          </button>
        </li>
        <li>
          <button
            onClick={() => handleClicking(2)}
            className={`pl-8 text-custom_textcolor w-full flex justify-start items-center rounded-none h-20 shadow-none ${
              activeTab === 2
                ? "bg-country_background"
                : "bg-organizer_background"
            }`}
          >
            <span className="mr-4 text-2xl">
              <MdOutlineEventNote />
            </span>
            Manage Events
          </button>
        </li>
        <li>
          <button
            onClick={() => handleClicking(3)}
            className={`pl-8 text-custom_textcolor w-full flex justify-start items-center rounded-none h-20 shadow-none ${
              activeTab === 3
                ? "bg-country_background"
                : "bg-organizer_background"
            }`}
          >
            <span className="mr-4 text-2xl">
              <IoGameControllerOutline />
            </span>
            Manage Games
          </button>
        </li>
        <li>
          <button
            // onClick={() => handleClicking(4)}
            className={`pl-8 text-custom_textcolor w-full flex justify-start items-center rounded-none h-20 shadow-none ${
              activeTab === 4
                ? "bg-country_background"
                : "bg-organizer_background"
            }`}
          >
            <span className={`mr-4 text-2xl`}>
              <MdOutlineSettings />
            </span>
            Settings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
