import React, { useMemo, useEffect } from "react";

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

export default function ShiftCountTable(props){
  const [staffShiftCount, setStaffShiftCount] = React.useState({});

  // useEffect(() => {
  //   // Load shift data from local storage when the component is mounted
  //   const storedData = localStorage.getItem("staffShiftCount");
  //   if (storedData) {
  //     setStaffShiftCount(JSON.parse(storedData));
  //   }
  // }, []);

  // Calculate the number of shifts by staff whenever the schedule changes
  useEffect(() => {
    const newStaffShiftCount = {};

    // Loop through the schedule to count the number of shifts by staff
    Object.entries(props.schedule).forEach(([key, staffName]) => {
      if (!staffName) {
        // Skip if no staff is assigned to this shift
        return;
      }

      if (!newStaffShiftCount[staffName]) {
        // Initialize the count to zero if this is the first shift for this staff
        newStaffShiftCount[staffName] = 0;
      }

      // Increment the shift count for this staff
      newStaffShiftCount[staffName]++;
    });

    setStaffShiftCount(newStaffShiftCount);
    
    
  }, [props.schedule]);

  // Memoize the shift count for each staff member by day
  const staffShiftCountByDay = useMemo(() => {
    const countByDay = {};

    workDays.forEach((day) => {
      countByDay[day] = staffList.reduce((total, staff) => {
        const shiftCount = shifts.reduce((total, shift) => {
          const shiftKey = `${day}-${shift}`;
          if (props.schedule[shiftKey] === staff) {
            return total + 1;
          }
          return total;
        }, 0);

        return total + (shiftCount > 0 ? 1 : 0);
      }, 0);
    });

    // localStorage.setItem("staffShiftCount", JSON.stringify(staffShiftCount));

    return countByDay;
  }, [props.schedule]);

  return (
    <table>
      <thead>
        <tr>
          <th>Staff</th>
          {workDays.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {staffList.map((staff) => (
          <tr key={staff}>
            <td>{staff}</td>
            {workDays.map((day) => (
              <td key={`${staff}-${day}`}>
                {shifts.reduce((total, shift) => {
                  const shiftKey = `${day}-${shift}`;
                  if (props.schedule[shiftKey] === staff) {
                    return total + 1;
                  }
                  return total;
                }, 0)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          {workDays.map((day) => (
            <td key={`total-${day}`}>{staffShiftCountByDay[day]}</td>
          ))}
        </tr>
      </tfoot>
    </table>
  );
};
