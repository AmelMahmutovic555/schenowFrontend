import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/authContext/AuthContext";
import "./style/Schedule.css";
import axios from "axios";
export default function Habits() {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <article className="home">
      <section className="scheduleParent">
        <div className="headingSchedule">
          <h1>ScheNow</h1>
          <p>Schedule your next adventure</p>
        </div>
        <div className="scheduleBtnParent">
          <div>
            <a href="/availableDate">
              <button>Add an Available Date</button>
            </a>
          </div>

          {/* <div>
          <a href="/book">
            <button>Book a Schedule Date</button>
          </a>
        </div> */}

          <div>
            <a href="/book">
              <button>All Available Dates</button>
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
