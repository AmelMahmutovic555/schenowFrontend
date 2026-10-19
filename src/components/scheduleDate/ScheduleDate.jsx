import { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./style/ScheduleDate.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function ScheduleDate() {
  const { message, setMessage, apiUrl } = useContext(AuthContext);

  const [availableDates, setAvailableDates] = useState(null);

  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  const ref = useRef(null);

  const handleDates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/timeslot/all`);
      setAvailableDates(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    handleDates();
  }, [handleDates]);

  function handleChange(e, id) {
    setUserInfo((prevState) => ({
      ...prevState,
      [id]: e.target.value,
    }));
  }

  function openDialog(s) {
    setSelectedDate(s);
    ref.current?.showModal();
  }

  function closeDialog() {
    setSelectedDate(null);
    ref.current?.close();
  }

  async function handleBooking(e) {
    e.preventDefault();

    if (!userInfo.name || !userInfo.email) {
      return;
    }

    const booked = {
      name: userInfo.name,
      email: userInfo.email,
      available: false,
    };
    try {
      setMessage(null);

      const res = await axios.put(
        `${apiUrl}/timeslot/book/${selectedDate.date}/${selectedDate.from}/${selectedDate.to}`,
        booked,
      );

      setMessage(res.data);
      ref.current?.close();
      handleDates();
    } catch (error) {}
  }
  return (
    <article className="articleParentBooking">
      <div>
        <h1>Book a Meeting</h1>
        <p>
          Choose from the available spots and book your meeting with just a few
          clicks.
        </p>
      </div>
      <div className="parentBooking">
        {message && <div id="mess">{message}</div>}

        <div id="parentAvaDates">
          {loading ? (
            <div>Loading...</div>
          ) : (
            availableDates &&
            availableDates.map((ad) => {
              return ad.available === true ? (
                <>
                  <div key={ad.id} className="cardDates">
                    <h3 className="headingAvaSpot">Available Spot</h3>

                    <div className="avaSpotParent">
                      <p className="date">
                        <span>Date</span>
                        <div>{ad.date}</div>
                      </p>
                      <p className="time">
                        <span>Time</span>
                        <div>
                          {ad.from.split(":")[0] + ":" + ad.from.split(":")[1]}-
                          {ad.to.split(":")[0] + ":" + ad.to.split(":")[1]}
                        </div>
                      </p>

                      <p className="time">
                        <span>Duration</span>
                        <div>
                          {parseInt(
                            (ad.to.split(":")[0] - ad.from.split(":")[0]) * 60 +
                              (ad.to.split(":")[1] - ad.from.split(":")[1]),
                          )}{" "}
                          min
                        </div>
                      </p>
                      <button
                        className="btnBookNow"
                        onClick={() => openDialog(ad)}
                      >
                        Book Now
                      </button>
                      {/* <p></p> */}
                    </div>
                  </div>

                  <dialog key={ad.id} ref={ref} id="dialog">
                    <div className="headerDialogParent">
                      <div>
                        <h3>Book Meeting</h3>
                        <p>Complete your details to confirm this time slot.</p>
                      </div>
                      <button onClick={closeDialog} className="x">
                        X
                      </button>
                    </div>

                    <div className="dateTimeParent">
                      <p className="dialogDate">
                        <span>Date</span> <br />
                        <div>{selectedDate?.date}</div>
                      </p>
                      <p className="dialogTime">
                        <span>Time</span> <br />
                        <div>
                          {selectedDate?.from.split(":")[0] +
                            ":" +
                            selectedDate?.from.split(":")[1]}
                          -
                          {selectedDate?.to.split(":")[0] +
                            ":" +
                            selectedDate?.to.split(":")[1]}
                        </div>
                      </p>
                      <p className="dialogTime">
                        <span>Duration</span>
                        <div>
                          {parseInt(
                            (selectedDate?.to.split(":")[0] -
                              selectedDate?.from.split(":")[0]) *
                              60 +
                              (selectedDate?.to.split(":")[1] -
                                selectedDate?.from.split(":")[1]),
                          )}{" "}
                          min
                        </div>
                      </p>
                    </div>
                    <label>Name</label>
                    <input
                      type="name"
                      name="name"
                      value={userInfo.name}
                      onChange={(e) => handleChange(e, "name")}
                      placeholder="Enter your name"
                      required
                    />
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      onChange={(e) => handleChange(e, "email")}
                      placeholder="Enter your email address"
                      required
                    />

                    <div className="dialog-btn-parent">
                      <button onClick={closeDialog} className="dialogCancel">
                        Cancel
                      </button>
                      <button onClick={handleBooking} className="dialogConfirm">
                        Confirm Booking
                      </button>
                    </div>
                  </dialog>
                </>
              ) : (
                <div key={ad.id} className="cardDates">
                  <div className="bookedMark">Booked</div>

                  <div className="avaSpotParent">
                    <p className="date">
                      <span>Date</span>
                      <div>{ad.date}</div>
                    </p>
                    <p className="time">
                      <span>Time</span>
                      <div>
                        {ad.from.split(":")[0] + ":" + ad.from.split(":")[1]}-
                        {ad.to.split(":")[0] + ":" + ad.to.split(":")[1]}
                      </div>
                    </p>

                    <p className="time">
                      <span>Duration</span>
                      <div>
                        {parseInt(
                          (ad.to.split(":")[0] - ad.from.split(":")[0]) * 60 +
                            (ad.to.split(":")[1] - ad.from.split(":")[1]),
                        )}{" "}
                        min
                      </div>
                    </p>
                    <button className="btnBookNowDisabled" disabled>
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </article>
  );
}
