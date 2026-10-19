import "./App.css";
import { Routes, Route, Outlet } from "react-router";

import Habits from "./components/Habits";
import Navbar from "./components/Navbar";
import AvailableDate from "./components/availableDate/AvailableDate";
import ScheduleDate from "./components/scheduleDate/ScheduleDate";
function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
function App() {
  return (
    <>
      <AppLayout />
      <Routes>
        <Route path="/" element={<Habits />} />
        <Route path="/availableDate" element={<AvailableDate />} />
        <Route path="/book" element={<ScheduleDate />} />
      </Routes>
    </>
  );
}

export default App;
