// Routes Calendar DB queries for will go here
import express from "express";
import {
  getCalendars,
  getCalendar,
  deleteCalendar,
  addCalendar,
  updateCalendar,
  editCalendar,
  updateHatch,
} from "../controllers/calendarControllers";

const router = express.Router();

// -----------------------------------------------------------------------------------------------------------------------------------------------------

// Route to retrieve all calendars for a user

router.get(
  "/getcalendars/:uid", // Handled by controller
  getCalendars
);

// Retrieve a specific calendar

router.get(
  "/getcalendar/:uid/:calendarId", // Handled by controller
  getCalendar
);

// delete a specific calendar

router.delete(
  "/deletecalendar/:uid/:calendarId", // Handled by controller
  deleteCalendar
);

// create a new calendar for a user with the next number

router.post(
  "/addcalendar/:uid", // Handled by controller
  addCalendar
);

// Update a specific calendar

router.put(
  "/updatecalendar/:uid/:calendarId", // Handled by controller
  updateCalendar
);

// Route to uppdate a specific calendar for a user from edit page

router.put(
  "/editcalendar/:uid/:calendarId", // Handled by controller
  editCalendar
);

// Update hatch status of a specific calendar

router.put(
  "/updatehatch/:uid/:calendarId", // Handled by controller
  updateHatch
);

export default router;
