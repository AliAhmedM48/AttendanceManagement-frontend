import React, { useState, useEffect } from "react";
import { formatDateTime } from "../../shared/utils";
import { fetchAttendances } from "../../shared/services/attendanceService";

function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weeklyHours, setWeeklyHours] = useState({});
  const [attendanceTrends, setAttendanceTrends] = useState({});

  useEffect(() => {
    async function loadAttendanceRecords() {
      try {
        const data = await fetchAttendances();
        setAttendanceRecords(data);
        calculateWeeklyHours(data); // حساب ساعات العمل الأسبوعية
        calculateTrends(data); // حساب الاتجاهات أو الملخصات
      } catch (error) {
        console.error("Error loading attendance records:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAttendanceRecords();
  }, []);

  // حساب ساعات العمل الأسبوعية لكل موظف
  const calculateWeeklyHours = (records) => {
    const weeklyHours = {};
    records.forEach((record) => {
      const { employeeId, checkInTime, checkOutTime } = record;
      if (checkInTime && checkOutTime) {
        const checkIn = new Date(checkInTime);
        const checkOut = new Date(checkOutTime);
        const hoursWorked = (checkOut - checkIn) / (1000 * 60 * 60); // حساب الفرق بالساعة
        if (!weeklyHours[employeeId]) {
          weeklyHours[employeeId] = 0;
        }
        weeklyHours[employeeId] += hoursWorked;
      }
    });
    setWeeklyHours(weeklyHours);
  };

  // حساب الاتجاهات أو الملخصات مثل عدد الأيام التي حضر فيها الموظف
  const calculateTrends = (records) => {
    const trends = {};
    records.forEach((record) => {
      const { employeeId, checkInTime, checkOutTime } = record;
      if (!trends[employeeId]) {
        trends[employeeId] = { totalDays: 0, lateDays: 0 };
      }
      trends[employeeId].totalDays += 1;
      const checkIn = new Date(checkInTime);
      const lateThreshold = new Date(checkIn.setHours(9, 0, 0)); // تحديد الساعة 9 صباحًا على أنها بداية اليوم
      if (new Date(checkInTime) > lateThreshold) {
        trends[employeeId].lateDays += 1;
      }
    });
    setAttendanceTrends(trends);
  };

  const columns = [
    { name: "Employee Name", selector: (row) => row.employee.fullName },
    { name: "Date", selector: (row) => formatDateTime(row.checkInTime) },
    { name: "Check In", selector: (row) => formatDateTime(row.checkInTime) },
    {
      name: "Check Out",
      selector: (row) =>
        row.checkOutTime ? formatDateTime(row.checkOutTime) : "N/A",
    },
    {
      name: "Hours Worked",
      selector: (row) => {
        const checkIn = new Date(row.checkInTime);
        const checkOut = new Date(row.checkOutTime);
        return (checkOut - checkIn) / (1000 * 60 * 60); // Return hours worked
      },
    },
  ];

  if (loading) {
    return <div>Loading attendance records...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Attendance Tracking</h2>
      <p className="text-gray-700 mb-4">
        Track and view employee attendance records.
      </p>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Weekly Hours Summary</h3>
        <ul>
          {Object.entries(weeklyHours).map(([employeeId, hours]) => (
            <li key={employeeId}>
              Employee {employeeId}: {hours.toFixed(2)} hours this week
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Attendance Trends</h3>
        <ul>
          {Object.entries(attendanceTrends).map(([employeeId, trends]) => (
            <li key={employeeId}>
              Employee {employeeId}: {trends.totalDays} days, {trends.lateDays}{" "}
              late days
            </li>
          ))}
        </ul>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.name} className="border px-4 py-2">
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record.id}>
              {columns.map((column) => (
                <td key={column.name} className="border px-4 py-2">
                  {column.selector(record)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
