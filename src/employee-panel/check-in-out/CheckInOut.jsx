import React, { useState, useEffect } from "react";
import { format, isSameDay, set } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  checkInAttendance,
  checkOutAttendance,
} from "../../shared/services/attendanceService";
import { useAuth } from "../../shared/contexts/AuthContext";
import { toast } from "react-toastify";
import { NavLink } from "react-router";
import { getTodayAttendance } from "../../shared/services/authenticatedEmployeeService";
import { toTodayTime } from "../../shared/utils";
import { appConfig } from "../../config/appConfig";

function CheckInOut() {
  const [checkInOutStatus, setCheckInOutStatus] = useState({
    hasCheckedIn: false,
    hasCheckedOut: false,
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todayAttendance, setTodayAttendance] = useState({
    id: null,
    employeeId: null,
    checkInTime: null,
    checkOutTime: null,
    totalWorkedHours: null,
  });
  const { auth } = useAuth();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const todayAttendanceResponse = await getTodayAttendance(auth.token);

        if (todayAttendanceResponse) {
          if (
            todayAttendanceResponse.checkInTime &&
            todayAttendanceResponse.checkOutTime &&
            isSameDay(
              new Date(currentDate),
              new Date(todayAttendanceResponse.checkInTime)
            ) &&
            isSameDay(
              new Date(currentDate),
              new Date(todayAttendanceResponse.checkOutTime)
            )
          ) {
            setCheckInOutStatus({ hasCheckedIn: true, hasCheckedOut: true });
            setTodayAttendance({
              id: todayAttendanceResponse.id,
              employeeId: todayAttendanceResponse.employeeId,
              checkInTime: todayAttendanceResponse.checkInTime,
              checkOutTime: todayAttendanceResponse.checkOutTime,
              totalWorkedHours: todayAttendanceResponse.totalWorkedHours,
            });
          }

          if (
            todayAttendanceResponse.checkInTime &&
            todayAttendanceResponse.checkOutTime === null &&
            isSameDay(
              new Date(currentDate),
              new Date(todayAttendanceResponse.checkInTime)
            )
          ) {
            setTodayAttendance({
              id: todayAttendanceResponse.id,
              employeeId: todayAttendanceResponse.employeeId,
              checkInTime: todayAttendanceResponse.checkInTime,
              checkOutTime: todayAttendanceResponse.checkOutTime,
              totalWorkedHours: todayAttendanceResponse.totalWorkedHours,
            });
            setCheckInOutStatus({ hasCheckedIn: true, hasCheckedOut: false });
          }
        }
      } catch (err) {
        console.log({ "Error fetching today's attendance": err });
      }
    };

    fetchAttendanceData();

    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [auth.token]);

  const isWithinTimeWindow = () => {
    const now = new Date();
    const start = toTodayTime(appConfig.CheckInAllowedWindow.start);
    const end = toTodayTime(appConfig.CheckInAllowedWindow.end);
    return now >= start && now <= end;
  };

  const handleCheckIn = async () => {
    if (checkInOutStatus.hasCheckedIn) {
      toast.info("You have already checked in today.");
      return;
    }

    if (!isWithinTimeWindow()) {
      toast.info("You can only check in between 07:30 and 09:00.");
      return;
    }

    try {
      const now = new Date();
      const response = await checkInAttendance(auth.token);
      setTodayAttendance({
        ...todayAttendance,
        id: response.id,
        employeeId: response.employeeId,
        checkInTime: response.checkInTime,
      });
      setCheckInOutStatus((pre) => ({ ...pre, hasCheckedIn: true }));
      toast.success("Check-in successful");
    } catch (err) {
      toast.error("Unable to check in at the moment. Please try again later.");
    }
  };

  const handleCheckOut = async () => {
    try {
      const now = new Date();
      const response = await checkOutAttendance(todayAttendance.id, auth.token);
      if (!response) {
        toast.error(
          "Unable to check out at the moment. Please try again later."
        );
        return;
      }
      setTodayAttendance((pre) => ({
        ...pre,
        checkOutTime: response.checkOutTime,
        totalWorkedHours: response.totalWorkedHours,
      }));
      setCheckInOutStatus((pre) => ({ ...pre, hasCheckedOut: true }));
      toast.success("Check-out successful");
    } catch (err) {
      console.log("Error checking out", err);

      toast.error("Unable to check out at the moment. Please try again later.");
    }
  };

  return (
    <div className="min-h-full md:bg-gradient-to-br md:from-[#1e165c] md:to-[#3d2c91]  md:rounded-xl md:shadow-lg flex items-center justify-center md:p-6">
      <div className="w-full md:w-[90%] lg:w-[85%] xl:w-[70%] min-h-2/3  bg-white rounded-xl md:shadow-lg md:p-8 flex justify-center items-center space-y-16">
        {!checkInOutStatus.hasCheckedIn ? (
          <div className="flex flex-col items-center justify-between  h-full w-full gap-8 xl:gap-12">
            <div className="flex flex-col items-center gap-2 xl:gap-4">
              <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold">
                Welcome, {auth.fullName}
              </h1>
              <p className="text-xs md:text-xm lg:text-xl xl:text-2xl text-gray-600">
                {`Please check in between ${appConfig.CheckInAllowedWindow.start} and ${appConfig.CheckInAllowedWindow.end} to start your day.`}
              </p>
            </div>
            <CheckInOutButton onClick={handleCheckIn} check="in">
              Check In
            </CheckInOutButton>

            <p className="flex flex-col items-center gap-1 font-semibold text-xs md:text-xm lg:text-xl text-gray-600">
              <span className="text-base">
                {format(currentDate, "HH:mm:ss")}
              </span>
              <span>{format(currentDate, "dd-MM-yyyy")}</span>
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              key="checkedIn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className=" text-2xl md:text-3xl lg:text-4xl font-bold text-center">
                Hi, {auth.fullName}
              </h2>

              <div className="flex justify-between w-full  items-end text-base md:text-lg lg:text-xl text-neutral-400 px-2 py-4 border-b border-neutral-200 rounded-lg">
                <h3>Hours Collected Today:</h3>
                <p className="font-semibold text-red-300 text-base ">
                  {checkInOutStatus.hasCheckedOut
                    ? format(todayAttendance.totalWorkedHours, "HH'h' mm'm")
                    : "Pending Check-out"}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 text-2xl font-semibold justify-between items-start lg:items-end bg-green-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl lg:text-2xl">
                  {`Checked In: ${format(
                    todayAttendance.checkInTime,
                    "HH:mm"
                  )}`}
                </h3>
                <p className="text-neutral-400 text-xs">
                  {`Work Starts at ${appConfig.CheckInAllowedWindow.start}`}
                </p>
              </div>

              <div
                className={`flex flex-col lg:flex-row gap-4 text-2xl font-semibold justify-between items-start lg:items-end ${
                  checkInOutStatus.hasCheckedOut ? "bg-green-100" : "bg-red-100"
                } p-6 rounded-lg shadow-lg`}
              >
                {checkInOutStatus.hasCheckedOut ? (
                  <>
                    <h3 className="text-xl lg:text-2xl">
                      {`Checked Out: ${format(
                        todayAttendance.checkOutTime,
                        "HH:mm"
                      )}`}
                    </h3>
                    <p className="text-neutral-400 text-xs">
                      {`Work Ends at ${appConfig.CheckOutAllowedWindow.start}`}
                    </p>
                  </>
                ) : (
                  <div className="flex flex-col items-stretch  w-full gap-2">
                    <h3 className="text-xl lg:text-2xl">Check Out</h3>
                    <div className="flex flex-col text-neutral-400 justify-center items-start">
                      <p className=" text-xs md:text-sm">
                        Do not forget to check out before leaving your office.
                      </p>
                      <p className=" text-left md: text-xs md:text-sm">
                        {`Check-out available from ${format(
                          toTodayTime(appConfig.CheckOutAllowedWindow.start),
                          "HH:mm"
                        )}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {!checkInOutStatus.hasCheckedOut ? (
                <>
                  <div className="flex justify-center mt-8 md:mt-10">
                    <CheckInOutButton onClick={handleCheckOut} check="out">
                      Check Out
                    </CheckInOutButton>
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center gap-2 text-neutral-400 text-xs md:text-sm lg:text-lg mt-10">
                  <span>Thanks, have a nice day</span>
                  <NavLink
                    to={"/attendance-history"}
                    className="underline text-blue-700 text-xs tracking-widest"
                  >
                    ATTENDANCE HISTORY
                  </NavLink>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default CheckInOut;

function CheckInOutButton({ children, onClick, check = "in" }) {
  return (
    <button
      onClick={onClick}
      className={`${
        check === "in"
          ? "bg-green-600 hover:bg-green-700"
          : "bg-red-600 hover:bg-red-700"
      } text-white w-30 h-30 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 cursor-pointer hover:scale-110 rounded-full flex items-center justify-center text-xl md:text-2xl  transition`}
    >
      {children}
    </button>
  );
}
