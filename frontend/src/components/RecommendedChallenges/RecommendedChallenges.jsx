import React, { useState, useEffect } from "react";
import { fetchRecommandedEvents } from "../../helper/helper";
import EventCard from "../EventCard/EventCard";
import { Toaster, toast } from "react-hot-toast";
import { useRef } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useAuthStore } from "../../store/store"; // Zustand store for auth state

const RecommandedChallenges = () => {
  const [events, setEvents] = useState([]);
  const { auth } = useAuthStore(); // Access Zustand store

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
        const [fetchedEvents] = await Promise.all([fetchRecommandedEvents()]);
        if (fetchedEvents != "No events to fetch") {
          setEvents(fetchedEvents);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch data");
      }
    };

    if (auth.active) {
      fetchData();
    }
  }, []);

  // Optionally, filter events by selectedGame and selectedCountry
  const filteredEvents = events.filter((event) => {
    return <></>;
  });

  return (
    <>
      {auth.active ? (
        <section className="flex flex-col w-full bg-primary_bg pb-12 sm:px-16 lg:px-24">
          <Toaster />
          <div className="flex flex-row-2">
            <div className="flex justify-start w-full items-center mb-8">
              <h2 className="text-3xl font-bold text-primary_text mr-10">
                <span className="border-l-4 border-blue-500 pl-2">
                  RECOMMANDAD CHALLENGES
                </span>
              </h2>
              <a
                href="#"
                className="text-blue-500 hover:underline items-center"
              >
                VIEW ALL CHALLENGES &rarr;
              </a>
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
      ) : (
        <></>
      )}
    </>
  );
};

export default RecommandedChallenges;
