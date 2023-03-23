import React, { useState } from "react";
import ScheduleTable from "./ScheduleTable";

export default function Content(){
  const [schedule, setSchedule] = useState({});

  const handleScheduleUpdate = (newSchedule) => {
    setSchedule(newSchedule);
  };

  return (
    <div>
      <h1>Schedule</h1>
      <ScheduleTable schedule={schedule} onScheduleUpdate={handleScheduleUpdate} />
    </div>
  );
};