import React, { useState } from "react";
import Dropdown from "react-dropdown";
import { useFetch } from "./hooks";
import "react-dropdown/style.css";

export default function Form() {
  let courseOptions = [];
  const [courseName, setCourseName] = useState("");
  const [courseDate, setCourseDate] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [dateSlots, setdateSlots] = useState([]);
  const [timeSlots, settimeSlots] = useState([]);

  // Load the data from the API and set in "courseOptions" array
  const [data, hasLoaded] = useFetch(
    "https://script.google.com/macros/s/AKfycbzJ8Nn2ytbGO8QOkGU1kfU9q50RjDHje4Ysphyesyh-osS76wep/exec"
  );
  if (hasLoaded) {
    for (var i = 0; i < data.length; i++) {
      courseOptions.push(data[i]["course_name"]);
    }
  }

  // Set Course Name and set all the available dates in "dateSlots" array
  const handleCourseName = (e) => {
    setCourseName(e.value);
    let course = data.filter((obj) => obj["course_name"] === e.value);
    for (var i = 0; i < course[0].slots.length; i++) {
      if (
        course[0].slots[i].instructor_count > 0 &&
        new Date(parseInt(course[0].slots[i].slot)) <
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) &&
        new Date(parseInt(course[0].slots[i].slot)) >
          new Date(Date.now() + 4 * 60 * 60 * 1000)
      ) {
        let date = new Date(parseInt(course[0].slots[i].slot)).toDateString();
        setdateSlots(dateSlots.push(date));
      }
    }
    setdateSlots(Array.from(new Set(dateSlots)));
  };

  // Set Course Date and set all the available times in "timeSlots" array
  const handleCourseDate = (e) => {
    setCourseDate(e.value);
    let course = data.filter((obj) => obj["course_name"] === courseName);
    for (var i = 0; i < course[0].slots.length; i++) {
      if (
        new Date(parseInt(course[0].slots[i].slot)).toDateString() === e.value
      ) {
      }
      if (
        course[0].slots[i].instructor_count > 0 &&
        new Date(parseInt(course[0].slots[i].slot)).toDateString() ===
          e.value &&
        new Date(parseInt(course[0].slots[i].slot)) >
          new Date().setHours(new Date().getHours() + 4)
      ) {
        let time = new Date(parseInt(course[0].slots[i].slot)).toTimeString();
        settimeSlots(timeSlots.push(time));
      }
    }
    settimeSlots(Array.from(new Set(timeSlots)));
  };

  // Set Course Time
  const handleCourseTime = (e) => {
    setCourseTime(e);
  };

  return (
    <form>
      <div className="form-group">
        <label>Your Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Michael Scott"
          autoComplete="false"
        />
      </div>

      <div className="form-group">
        <label>Your Contact Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-control"
          pattern="[0-9]{10}"
          placeholder="123-45-67890"
        />
      </div>
      <div className="form-group">
        <label>Your Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="name@address.com"
          autoComplete="false"
        />
      </div>
      <div className="form-group">
        <label>Your Child's Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Michael Scott's Child"
          autoComplete="false"
        />
      </div>
      <div className="form-group">
        <label>Your Child's Age</label>
        <input
          type="number"
          className="form-control"
          placeholder="0"
          autoComplete="false"
          min={1}
          defaultValue={1}
        />
      </div>
      <div className="form-group">
        <label>Course Name</label>
        <Dropdown
          options={courseOptions}
          className="form-control"
          onChange={handleCourseName}
          value={courseName}
          placeholder="Select an option"
        />
      </div>
      <div className="form-group">
        <label>Date of Trial Class</label>
        <Dropdown
          options={dateSlots}
          className="form-control"
          onChange={handleCourseDate}
          value={courseDate}
          placeholder="Select an option"
        />
      </div>
      <div className="form-group">
        <label>Time of Trial Class</label>
        <Dropdown
          options={timeSlots}
          className="form-control"
          onChange={handleCourseTime}
          value={courseTime}
          placeholder="Select an option"
        />
      </div>
      <button className="btn btn-lg btn-block btn-primary mb-5">
        Book Now!
      </button>
    </form>
  );
}
