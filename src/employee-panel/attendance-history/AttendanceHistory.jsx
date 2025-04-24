import React, { useEffect, useState } from "react";
import { useAuth } from "../../shared/contexts/AuthContext";
import AttendanceTable from "./AttendanceTable";
import AttendanceSummary from "./AttendanceSummary";
import { getAttendancesHistory } from "../../shared/services/authenticatedEmployeeService";

export default function AttendanceHistory() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Token:", auth.token);

      try {
        const data = await getAttendancesHistory(auth.token);
        setRecords(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [auth.token]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-full md:bg-gradient-to-br md:from-[#1e165c] md:to-[#3d2c91]  md:rounded-xl md:shadow-lg flex flex-col items-center justify-center gap-8 pt-6 md:p-6">
      <div className="flex flex-col items-center w-full ">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#1e165c] md:text-white mb-4 lg:mb-8 text-center">
          Attendance History
        </h1>
        <div className="w-full md:w-[95%] lg:w-[90%] xl:w-[80%] min-h-2/3  bg-white rounded-xl md:shadow-lg md:p-8 flex justify-center items-center space-y-16">
          <AttendanceTable records={records} />
        </div>
      </div>

      <div className="flex flex-col items-center w-full ">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#1e165c] md:text-white mb-4 lg:mb-8 text-center">
          <p className="flex flex-col xl:flex-row gap-4">
            <span>Week-to-Week</span>
            <span>Attendance Summary</span>
          </p>
        </h1>
        <div className="w-full md:w-[95%] lg:w-[90%] xl:w-[80%] min-h-2/3 shadow-xl bg-white rounded-xl md:shadow-lg md:p-8 flex justify-center items-center space-y-16">
          <AttendanceSummary records={records} />
        </div>
      </div>
    </div>
  );
}
