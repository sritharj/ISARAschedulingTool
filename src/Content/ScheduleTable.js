import React, { useState, useEffect } from "react";
import ShiftCountTable from "./ShiftCountTable";

const staffList = ["X1", "X2", "X3", "X4", "X5", "X6", "X7"];
const workDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const shifts = [
  "Morning UpStairs",
  "Morning Down Stairs",
  "Morning Parking Lot",
  "Lunch A",
  "Lunch B",
  "Lunch C",
  "Lunch D",
  "Afternoon Up Stairs",
  "Afternoon Down Stairs",
  "Afternoon Parking Lot",
];

export default function ScheduleTable() {
  const [schedule, setSchedule] = useState({});
  const [selectedStaff, setSelectedStaff] = useState({});

  useEffect(() => {
    // Load shift data from local storage when the component is mounted
    const storedData = localStorage.getItem("shiftData");
    if (storedData) {
      setSelectedStaff(JSON.parse(storedData));
    }
  }, []);

  const handleStaffSelection = (staffName, workDay, shift) => {
    // Check if the selected shift is a morning shift
    if (shift.startsWith("Morning")) {
      // Check if the staff member is already selected for another morning shift
      const otherMorningShifts = Object.keys(selectedStaff).filter(
        (key) => key.startsWith(`${workDay}-Morning`) && selectedStaff[key] === staffName
      );
      if (otherMorningShifts.length > 0) {
        alert(`${staffName} is already selected for ${otherMorningShifts[0]}`);
        return;
      }
    }

    // Check if the selected shift is a lunch shift
    if (shift.startsWith("Lunch")) {
      // Check if the staff member is already selected for another lunch shift
      const otherLunchShifts = Object.keys(selectedStaff).filter(
        (key) => key.startsWith(`${workDay}-Lunch`) && selectedStaff[key] === staffName
      );
      if (otherLunchShifts.length > 0) {
        alert(`${staffName} is already selected for ${otherLunchShifts[0]}`);
        return;
      }
    }

    // Check if the selected shift is an afternoon shift
    if (shift.startsWith("Afternoon")) {
      // Check if the staff member is already selected for another afternoon shift
      const otherAfternoonShifts = Object.keys(selectedStaff).filter(
        (key) => key.startsWith(`${workDay}-Afternoon`) && selectedStaff[key] === staffName
      );
      if (otherAfternoonShifts.length > 0) {
        alert(`${staffName} is already selected for ${otherAfternoonShifts[0]}`);
        return;
      }
    }

    setSelectedStaff((prevSelectedStaff) => ({
      ...prevSelectedStaff,
      [`${workDay}-${shift}`]: staffName,
    }));
  };

  const handleScheduleUpdate = () => {
    setSchedule(selectedStaff);

    localStorage.setItem("shiftData", JSON.stringify(selectedStaff));
  };

  const handleClearSchedule = () => {
    setSelectedStaff({});
    setSchedule({});
    localStorage.setItem("shiftData", JSON.stringify({}));
  };

  return (
    <div>

      <button onClick={handleScheduleUpdate}>Update Schedule</button>
      <button onClick={handleClearSchedule}>Clear Schedule</button>

      <table>
        <thead>
          <tr>
            <th>Shifts</th>
            {workDays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift}>
              <td>{shift}</td>
              {workDays.map((day) => (
                <td key={`${day}-${shift}`}>
                  <select
                    value={selectedStaff[`${day}-${shift}`] || ""}
                    onChange={(e) => handleStaffSelection(e.target.value, day, shift)}
                  >
                    <option value="">Select Staff</option>
                    {staffList.map((staff) => (
                      <option key={staff} value={staff}>
                        {staff}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Shift Count</h1>
      <ShiftCountTable schedule={schedule} />
    </div>
  );
};
