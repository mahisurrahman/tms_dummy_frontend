import { Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { timelineApi } from "../../../api/endpoints/timeline.api";

export default function HorizontalTimeline({ task }) {
  const [timelineData, setTimelineData] = useState([]);

  const fetchTimeLine = async () => {
    try {
      const response = await timelineApi.getAllTimeLine(task?.taskId);

      // Safely transform backend data to a timeline-friendly format
      const formatted = response.data.map((item) => {
        const createdAt = new Date(item.createdAt);
        const date = createdAt.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        // Changed to 12-hour format with AM/PM
        const time = createdAt.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // This ensures AM/PM format
        });

        // Define color and textColor based on status
        let color = "bg-gray-500";
        let textColor = "text-gray-600";

        switch (item.newStatus) {
          case "pending":
            color = "bg-yellow-500";
            textColor = "text-yellow-600";
            break;
          case "ongoing":
            color = "bg-blue-600";
            textColor = "text-blue-600";
            break;
          case "completed":
            color = "bg-green-600";
            textColor = "text-green-600";
            break;
          case "rejected":
            color = "bg-red-600";
            textColor = "text-red-600";
            break;
          default:
            break;
        }

        return {
          status: item.newStatus || "Unknown",
          color,
          textColor,
          date,
          time,
        };
      });

      setTimelineData(formatted);
    } catch (error) {
      console.error("Fetch Timeline Error:", error.message);
    }
  };

  useEffect(() => {
    if (task?.taskId) fetchTimeLine();
  }, [task]);

  // Helper: Chunk data in groups of 5 for better layout
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
    setGlowStyle({ animation: "glow 2s ease-in-out infinite" });
  }, []);

  return (
    <div className="bg-white w-full p-6 rounded-2xl border-4 border-orange-600">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Timer className="w-5 h-5 mr-2 text-blue-600" />
        Timeline
      </h3>

      {/* If no timeline found */}
      {timelineData.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No timeline data available
        </p>
      ) : (
        rows.map((row, rowIndex) => (
          <div key={rowIndex} className="overflow-x-auto py-4 px-10 w-full">
            <div className="flex items-center justify-start w-full">
              {row.map((item, index) => {
                const globalIndex = rowIndex * 5 + index;
                const isLastGlobalItem =
                  globalIndex === timelineData.length - 1;

                return (
                  <div key={index} className="flex items-center gap-x-10">
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
                          } px-6 py-3 text-white font-bold text-xs relative ${
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
        ))
      )}

      {/* Glow Animation */}
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
