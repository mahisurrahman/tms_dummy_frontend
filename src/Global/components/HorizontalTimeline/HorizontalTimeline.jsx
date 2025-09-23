import { Timer } from "lucide-react";
import { useEffect, useState } from "react";

export default function HorizontalTimeline() {
  const timelineData = [
    {
      status: "Assigned",
      date: "16th Sep",
      time: "11:00 AM",
      color: "bg-pink-400",
      textColor: "text-pink-400",
    },
    {
      status: "In Queue",
      date: "18th Sep",
      time: "09:00 AM",
      color: "bg-orange-400",
      textColor: "text-orange-400",
    },
    {
      status: "Started",
      date: "20th Sep",
      time: "10:00 AM",
      color: "bg-yellow-400",
      textColor: "text-yellow-400",
    },
    {
      status: "Review",
      date: "22nd Sep",
      time: "08:00 AM",
      color: "bg-green-400",
      textColor: "text-green-400",
    },
    {
      status: "Completed",
      date: "24th Sep",
      time: "09:00 AM",
      color: "bg-teal-400",
      textColor: "text-teal-400",
    },
    {
      status: "Testing",
      date: "26th Sep",
      time: "10:00 AM",
      color: "bg-blue-400",
      textColor: "text-blue-400",
    },
    {
      status: "Feedback",
      date: "28th Sep",
      time: "02:00 PM",
      color: "bg-purple-400",
      textColor: "text-purple-400",
    },
    {
      status: "Deployed",
      date: "30th Sep",
      time: "11:00 AM",
      color: "bg-indigo-400",
      textColor: "text-indigo-400",
    },
    {
      status: "Monitoring",
      date: "2nd Oct",
      time: "01:00 PM",
      color: "bg-red-400",
      textColor: "text-red-400",
    },
  ];

  // Function to chunk the timeline data into rows of 5 items each
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const rows = chunkArray(timelineData, 5);
  const [glowStyle, setGlowStyle] = useState({});

  useEffect(() => {
    // Simulate getting the color for glow effect
    setGlowStyle({
      animation: "glow 2s ease-in-out infinite",
    });
  }, []);

  return (
    <div className="bg-white w-full p-6 rounded-2xl border-4 border-orange-600">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Timer className="w-5 h-5 mr-2 text-blue-600" />
        Timeline
      </h3>

      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="overflow-x-auto py-4 px-10 w-full">
          <div className="flex items-center justify-start w-full">
            {row.map((item, index) => {
              const globalIndex = rowIndex * 5 + index;
              const isLastGlobalItem = globalIndex === timelineData.length - 1;

              return (
                <div key={index} className="flex items-center gap-x-14">
                  {/* Timeline Item */}
                  <div className="relative flex flex-col items-center">
                    {/* Status Text */}
                    <div className="mb-1 text-center">
                      <p
                        className={`text-xs ${item.textColor} whitespace-nowrap font-bold max-w-24`}
                      >
                        {item.status}
                      </p>
                    </div>

                    {/* Date Block with Chevron */}
                    <div className="relative">
                      <div
                        className={`${
                          item.color
                        } px-6 py-3 text-white font-bold text-sm relative ${
                          isLastGlobalItem ? "glowing-item" : ""
                        }`}
                        style={{
                          clipPath:
                            "polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%, 15px 50%)",
                          ...(isLastGlobalItem ? glowStyle : {}),
                        }}
                      >
                        {item.date}
                      </div>
                    </div>

                    {/* Time Text */}
                    <div className="mt-1 text-center">
                      <p className="text-sm text-gray-800 whitespace-nowrap max-w-24">
                        {item.time}
                      </p>
                    </div>
                  </div>

                  {/* Connector (hidden for last item in the row) */}
                  {index < row.length - 1 && (
                    <div className="w-0 h-0 relative -ml-1 z-10"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Time Metrics Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-600">
            Spent Time on Task
          </p>
          <p className="text-lg font-bold text-gray-800">2 days 4 hours</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-600">
            Spent Time in Queue
          </p>
          <p className="text-lg font-bold text-gray-800">1 day 8 hours</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-600">
            Elapsed Time In Review
          </p>
          <p className="text-lg font-bold text-gray-800">3 days 2 hours</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 5px #f87171;
          }
          50% {
            box-shadow: 0 0 20px #f87171, 0 0 30px #f87171;
          }
          100% {
            box-shadow: 0 0 5px #f87171;
          }
        }
        .glowing-item {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
