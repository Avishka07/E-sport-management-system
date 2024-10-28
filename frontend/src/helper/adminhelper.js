import axios from "axios";
import { jwtDecode } from "jwt-decode";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** Admin login function */
export async function adminLogin(credentials) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5002/admin/login",
      credentials
    );
    const { data, status } = response;

    if (status === 200) {
      return Promise.resolve(data);
    }
  } catch (error) {
    return Promise.reject({
      error: error.response.data.message || "Login failed",
    });
  }
}

/** Create a new event */
export const createAdminEvent = async (eventData, token) => {
  console.log(eventData);
  try {
    const response = await axios.post(
      "http://127.0.0.1:5002/event/create",
      eventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json", // Ensure JSON content type
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response
      ? error.response.data
      : { message: "Event creation failed" };
  }
};

/** Fetch events */
export const fetchAdminEvents = async () => {
  try {

    const response = await axios.get("http://127.0.0.1:5002/event/events");

    const sortedEvents = response.data.events.sort(
      (a, b) => a.eventid - b.eventid
    );

    return sortedEvents;

  } catch (error) {
    throw error;
  }
};

/** Delete an event */
export const deleteEvent = async (eventId, token) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:5002/event/delete/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Event deletion failed" };
  }
};

/** Update an event */
export const updateEvent = async (eventId, updatedEventData, token) => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:5002/event/update/${eventId}`,
      updatedEventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error : ", error);
    throw error.response
      ? error.response.data
      : { message: "Event update failed" };
  }
};

/** Create a new game */
export const createAdminGame = async (eventData, token) => {
  try {
    const response = await axios.post(

      "http://127.0.0.1:5002/recommendation/addgame",
      eventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Game creation failed" };
  }
};

/** Fetch games */
export const fetchGames = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5002/recommendation/getallgames"
    );
    const sortedEvents = response.data.sort((a, b) => a.gameId - b.gameId);
    return sortedEvents;
  } catch (error) {
    throw error;
  }
};

/** Delete a game */
export const deleteGame = async (gameId, token) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:5002/recommendation/deletegame/${gameId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Game deletion failed" };
  }
};

/** Update a game */
export const updateGame = async (gameId, updatedGameData, token) => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:5002/recommendation/updategame/${gameId}`,
      updatedGameData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Game update failed" };
  }
};

/** Download registrations details  */
export const downloadRegistration = async (eventId) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:5002/event/event_registrations/${eventId}`
    );
    return response.json();
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Game update failed" };
  }
};
