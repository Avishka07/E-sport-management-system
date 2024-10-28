import React, { useState, useEffect } from "react";
import { fetchUpcomingEvents, fetchCountries } from "../../helper/helper";
import { fetchGames } from "../../helper/adminhelper";
import EventCard from "../EventCard/EventCard";
import { Toaster, toast } from "react-hot-toast";
import { useRef } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const UpcomingChallenges = () => {
  const [events, setEvents] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [games, setGames] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedCountries, fetchedEvents, fetchGamesList] =
          await Promise.all([
            fetchCountries(),
            fetchUpcomingEvents(),
            fetchGames(),
          ]);
        console.log(fetchGamesList);
        setCountryList(fetchedCountries);
        setEvents(fetchedEvents);
        setGames(fetchGamesList);
        setLoading(true);
      } catch (error) {
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  // Optionally, filter events by selectedGame and selectedCountry
  const filteredEvents = events.filter((event) => {
    return (
      (selectedGame
        ? event.game_names
            .join(" ")
            .toLowerCase()
            .includes(selectedGame.toLowerCase())
        : true) && (selectedCountry ? event.country === selectedCountry : true)
    );
  });

  return (
    <section className="flex flex-col w-full bg-primary_bg pb-12 sm:px-16 lg:px-24">
      <Toaster />
      <div className="flex flex-row-2">
        <div className="flex justify-start w-full items-center mb-8">
          <h2 className="text-3xl font-bold text-primary_text mr-10">
            <span className="border-l-4 border-blue-500 pl-2">
              UPCOMING CHALLENGES
            </span>
          </h2>
          <a href="#" className="text-blue-500 hover:underline items-center">
            VIEW ALL CHALLENGES &rarr;
          </a>
        </div>

        {/* Filters Row */}
        <div className="flex justify-start w-full md:w-1/2 md:justify-end items-center mb-6 space-x-5">
          {/* Game Filter */}
          <div className="w-full">
            <select
              className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              aria-label="Filter by Game"
            >
              <option value="">Filter by Game</option>
              {loading &&
                games.map((game) => (
                  <option key={game.gameId} value={game.gameName}>
                    {game.gameName}
                  </option>
                ))}
            </select>
          </div>

          {/* Country Filter */}
          <div className="w-full">
            <select
              className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              aria-label="Filter by Country"
            >
              <option value="">Filter by Country</option>
              {countryList.map((country) => (
                <option key={country.name.common} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Challenges Row */}
      {filteredEvents.length ? (
        <div className="relative mx-1">
          {/* Left Scroll Button */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full"
            onClick={scrollLeft}
          >
            <FaChevronCircleLeft className="text-background text-xl" />
          </button>

          {/* Scrollable Events */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-1 scrollbar-hide mx-10"
            style={{ maxWidth: "100%" }}
          >
            {filteredEvents.map((event) => (
              <div
                key={event.eventid}
                className="flex-shrink-0 w-full md:w-1/2 xl:w-1/3 2xl:w-1/4"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full"
            onClick={scrollRight}
          >
            <FaChevronCircleRight className="text-background text-xl" />
          </button>
        </div>
      ) : (
        <p className="text-gray-500">No Challenges Available</p>
      )}
    </section>
  );
};

export default UpcomingChallenges;
