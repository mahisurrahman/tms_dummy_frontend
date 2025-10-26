import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import logo from "../../../assets/images/Final-V.png";

const Header = ({ setShowCreateTask, setSelectedUserForCreate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(1);
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  // Fixed: store today's actual date separately
  const realToday = new Date();

  // Calculate current week based on today's date
  const calculateCurrentWeek = (date) => {
    const today = new Date(date);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstSaturday = new Date(firstDayOfMonth);

    while (firstSaturday.getDay() !== 6) {
      firstSaturday.setDate(firstSaturday.getDate() + 1);
    }

    const diffInTime = today.getTime() - firstSaturday.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) return 1;

    return Math.floor(diffInDays / 7) + 1;
  };

  // Helper: calculate how many weeks are in a given month
  const calculateWeeksInMonth = (date) => {
    const month = new Date(date);
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const firstSaturday = new Date(firstDay);
    while (firstSaturday.getDay() !== 6) {
      firstSaturday.setDate(firstSaturday.getDate() + 1);
    }

    const lastSaturday = new Date(lastDay);
    while (lastSaturday.getDay() !== 6) {
      lastSaturday.setDate(lastSaturday.getDate() - 1);
    }

    const diffInTime = lastSaturday.getTime() - firstSaturday.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffInDays / 7) + 1;
  };

  // Generate week data
  const generateWeekData = (weekNumber, referenceDate) => {
    const currentDate = new Date(referenceDate);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const firstSaturday = new Date(firstDayOfMonth);
    while (firstSaturday.getDay() !== 6) {
      firstSaturday.setDate(firstSaturday.getDate() + 1);
    }

    const startDate = new Date(firstSaturday);
    startDate.setDate(firstSaturday.getDate() + (weekNumber - 1) * 7);

    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      // ✅ FIXED: Always compare against realToday, not currentDate
      const isToday =
        date.getDate() === realToday.getDate() &&
        date.getMonth() === realToday.getMonth() &&
        date.getFullYear() === realToday.getFullYear();

      weekDays.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        fullDate: date,
        isToday,
      });
    }

    return weekDays;
  };

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today);
    setCurrentWeek(calculateCurrentWeek(today));
  }, []);

  const weekDays = generateWeekData(currentWeek, currentDate);

  const handlePreviousWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    } else {
      const prevMonth = new Date(currentDate);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      prevMonth.setDate(1);

      const weeksInPrevMonth = calculateWeeksInMonth(prevMonth);
      setCurrentWeek(weeksInPrevMonth);
      setCurrentDate(prevMonth);
    }
  };

  const handleNextWeek = () => {
    const weeksInCurrentMonth = calculateWeeksInMonth(currentDate);
    if (currentWeek < weeksInCurrentMonth) {
      setCurrentWeek(currentWeek + 1);
    } else {
      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      nextMonth.setDate(1);
      setCurrentWeek(1);
      setCurrentDate(nextMonth);
    }
  };

  const handleDateRangeChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getMonthName = () => {
    return currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
      <div className="px-4 md:px-6 py-2">
        <div className="grid grid-cols-3">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
              <img src={logo} className="w-20 h-40 object-contain" alt="" />
            </div>
            Traiban
          </h1>

          {/* <div className="flex flex-col md:flex-row gap-x-4 md:gap-x-6">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePreviousWeek}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <div className="flex flex-col items-center">
                <span className="text-white text-sm font-medium mb-1">
                  {getMonthName()}
                </span>
                <div className="flex items-center gap-1">
                  {weekDays.map((day, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center p-2 rounded min-w-12 ${
                        day.isToday
                          ? "bg-blue-500 text-white"
                          : "bg-white/10 text-white/80"
                      }`}
                    >
                      <span className="text-xs font-medium">{day.day}</span>
                      <span className="text-sm font-bold">{day.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNextWeek}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              <div className="ml-2 px-3 py-1 text-center bg-white/20 rounded-full">
                <span className="text-white text-xs font-medium">
                  Week {currentWeek}
                </span>
              </div>
            </div>

            <div className="border-l-2 pl-10 border-white flex items-center gap-x-3">
              <Calendar className="w-5 h-5 text-white" />

              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <label className="text-xs text-white/70 mb-1">From</label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) =>
                      handleDateRangeChange("from", e.target.value)
                    }
                    className="bg-white/20 text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs text-white/70 mb-1">To</label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) =>
                      handleDateRangeChange("to", e.target.value)
                    }
                    className="bg-white/20 text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
