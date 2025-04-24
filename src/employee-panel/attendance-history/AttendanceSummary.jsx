import React, { useState } from "react";
import { addDays, format, isWithinInterval } from "date-fns";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
} from "chart.js";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { motion } from "framer-motion";
import * as styleCss from "./style.css";
import { DateRangePicker } from "react-date-range";
import { useScreenSize } from "../../shared/contexts/ScreenSizeContext";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

export default function AttendanceSummary({ records = [] }) {
  const { isSmallScreen } = useScreenSize();

  const [dateRange, setDateRange] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [summaryData, setSummaryData] = useState(null);
  const [kpis, setKpis] = useState(null);

  const handleGenerateSummary = () => {
    const { startDate, endDate } = dateRange[0];

    const filtered = records.filter((r) =>
      isWithinInterval(new Date(r.checkInTime), {
        start: startDate,
        end: endDate,
      })
    );

    const groupedByDate = {};
    filtered.forEach((r) => {
      const dateKey = format(new Date(r.checkInTime), "yyyy-MM-dd");
      groupedByDate[dateKey] = groupedByDate[dateKey] || { hours: 0 };
      groupedByDate[dateKey].hours += r.totalWorkedHours || 0;
    });

    const labels = Object.keys(groupedByDate);
    const dataValues = labels.map((date) => groupedByDate[date].hours);

    setSummaryData({
      labels,
      datasets: [
        {
          label: "Worked Hours",
          data: dataValues,
          backgroundColor: "#1e177c",
          borderRadius: 8,
        },
      ],
    });
    let x = filtered.reduce((acc, val) => acc + val.totalWorkedHours, 0);
    console.log({ filtered, x });

    setKpis({
      totalDays: labels.length,
      totalWorkedHours: filtered.reduce(
        (acc, val) => acc + val.totalWorkedHours,
        0
      ),
      averageHours:
        dataValues.reduce((acc, val) => acc + val, 0) / labels.length || 0,
    });
  };

  return (
    <div className="flex flex-col items-stretch w-full justify-center gap-4">
      <div className="rounded-2xl shadow-xl overflow-hidden flex flex-col items-stretch lg:p-6">
        <div className="w-full overflow-x-auto space-y-10 rounded-2xl p-6">
          <div className="flex flex-col justify-center items-center overflow-x-auto w-full min-w-fit  gap-6">
            <DateRangePicker
              onChange={(item) => setDateRange([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={dateRange}
              direction={isSmallScreen ? "vertical" : "horizontal"}
              preventSnapRefocus={true}
              calendarFocus="backwards"
            />
          </div>
        </div>
      </div>

      <motion.button
        style={styleCss}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleGenerateSummary}
        className="gradient-button text-white font-semibold w-2/3  md:w-fit md:text-xl py-2 px-6 rounded-lg hover:bg-[#1e177c] cursor-pointer hover:scale-110 transition my-6 mx-auto"
      >
        Generate Summary
      </motion.button>
      {kpis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-center  text-gray-800 md:text-white ">
          <div className="bg-white/80 backdrop-blur-md md:bg-[#1e165c] rounded-xl p-4 shadow">
            <h3 className="text-sm font-medium">Total Days</h3>
            <p className="text-2xl font-bold">{kpis.totalDays}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md md:bg-[#1e165c] rounded-xl p-4 shadow">
            <h3 className="text-sm font-medium">Total Worked Hours</h3>
            <p className="text-2xl font-bold">
              {Number(kpis.totalWorkedHours).toFixed(0)} h
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-md md:bg-[#1e165c] rounded-xl p-4 shadow">
            <h3 className="text-sm font-medium">Avg. Worked Hours</h3>
            <p className="text-2xl font-bold">
              {kpis.averageHours.toFixed(2)} h
            </p>
          </div>
        </div>
      )}

      {summaryData && (
        <div className="w-full bg-white rounded-2xl shadow-2xl p-4 h-[300px]">
          <Bar
            data={summaryData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: {
                padding: {
                  top: 20,
                  bottom: 20,
                  left: 15,
                  right: 15,
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: "Worked Hours Per Day",
                  color: "#1e165c",
                  font: {
                    size: 20,
                    weight: "bold",
                    family: "Inter, sans-serif",
                  },
                  padding: {
                    bottom: 20,
                  },
                },
                tooltip: {
                  backgroundColor: "#1e165c",
                  titleColor: "#ffffff",
                  bodyColor: "#ffffff",
                  borderWidth: 1,
                  borderColor: "#6366f1",
                  cornerRadius: 6,
                  padding: 10,
                },
                legend: {
                  display: true,
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "#374151", // Tailwind slate-700
                    font: {
                      size: 12,
                      family: "Inter, sans-serif",
                    },
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  ticks: {
                    color: "#374151",
                    font: {
                      size: 12,
                      family: "Inter, sans-serif",
                    },
                  },
                  grid: {
                    color: "rgba(99, 102, 241, 0.1)", // Tailwind indigo-500 low opacity
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
