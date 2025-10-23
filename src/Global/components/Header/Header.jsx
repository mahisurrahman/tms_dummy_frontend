import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import logo from "../../../assets/images/Final-V.png";

const Header = ({ setShowCreateTask, setSelectedUserForCreate }) => {
  const [currentWeek, setCurrentWeek] = useState(() => {
    // Calculate current week based on today's date (October 23, 2025)
    const today = new Date(2025, 9, 23); // Month is 0-indexed, so 9 = October
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstSaturday = new Date(firstDayOfMonth);

    // Find the first Saturday of the month
    while (firstSaturday.getDay() !== 6) {
      // 6 = Saturday
      firstSaturday.setDate(firstSaturday.getDate() + 1);
    }

    // Calculate which week we're in
    const diffInTime = today.getTime() - firstSaturday.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(diffInDays / 7) + 1;

    return weekNumber;
  });

  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  // Generate week data for display
  const generateWeekData = (weekNumber) => {
    const today = new Date(2025, 9, 23); // October 23, 2025
    const currentDate = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Find first Saturday of the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const firstSaturday = new Date(firstDayOfMonth);
    while (firstSaturday.getDay() !== 6) {
      // 6 = Saturday
      firstSaturday.setDate(firstSaturday.getDate() + 1);
    }

    // Calculate start date of the requested week
    const startDate = new Date(firstSaturday);
    const daysToAdd = (weekNumber - 1) * 7;
    startDate.setDate(firstSaturday.getDate() + daysToAdd);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      weekDays.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.getDate(),
        month: date.getMonth(),
        isToday:
          date.getDate() === currentDate && date.getMonth() === currentMonth,
      });
    }

    return weekDays;
  };

  const weekDays = generateWeekData(currentWeek);

  const handlePreviousWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  const handleDateRangeChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));
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

          <div className="flex flex-col md:flex-row gap-x-4 md:gap-x-6">
            {/* Week Filter */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePreviousWeek}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                disabled={currentWeek === 1}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

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

            {/* Date Range Filter */}
            <div className="border-l-2  pl-10 border-white flex items-center gap-x-3">
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

                <span className="text-white/70 mx-1">-</span>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
