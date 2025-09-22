import { Timer } from "lucide-react";

export default function HorizontalTimeline() {
  const timelineData = [
    {
      year: "2018",
      topText: "Assigned",
      bottomText: "Initial Planning",
      color: "bg-pink-400",
      textColor: "text-pink-400",
      date: "16th September, 2025",
      time: "11:00 AM",
    },
    {
      year: "2019",
      topText: "In Que",
      bottomText: "Core Features",
      color: "bg-orange-400",
      date: "18th September, 2025",
      textColor: "text-orange-400",

      time: "09:00 AM",
    },
    {
      year: "2020",
      topText: "Started",
      bottomText: "Bug Fixes",
      textColor: "text-yellow-400",
      color: "bg-yellow-400",
      date: "20th September, 2025",
      time: "10:00 AM",
    },
    {
      year: "2021",
      topText: "Review",
      bottomText: "Marketing Campaign",
      textColor: "text-green-400",
      color: "bg-green-400",
      date: "22th September, 2025",
      time: "08:00 AM",
    },
    {
      year: "2022",
      topText: "Completed",
      bottomText: "Go Live",
      textColor: "text-teal-400",
      color: "bg-teal-400",
      date: "24th September, 2025",
      time: "09:00 AM",
    },
  ];

  return (
    <div className="bg-white w-full p-6 rounded-2xl border-4 border-orange-600">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Timer className="w-5 h-5 mr-2 text-blue-600" />
        Timeline
      </h3>

      <div className="overflow-x-auto py-4 px-4 w-full">
        <div className="flex items-center justify-center w-full">
          {timelineData.map((item, index) => (
            <div key={index} className="flex items-center gap-x-14">
              {/* Timeline Item */}
              <div className="relative flex flex-col items-center">
                {/* Top Text */}
                <div className="mb-1 text-center">
                  <p
                    className={`text-xs ${item.textColor} whitespace-nowrap font-bold max-w-24`}
                  >
                    {item.topText}
                  </p>
                </div>

                {/* Year Block with Chevron */}
                <div className="relative">
                  {/* Main chevron shape */}
                  <div
                    className={`${item.color} px-6 py-3 text-white font-bold text-sm relative`}
                    style={{
                      clipPath:
                        index === timelineData.length
                          ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                          : "polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%, 15px 50%)",
                    }}
                  >
                    {item.year}
                  </div>
                </div>

                {/* Bottom Text */}
                <div className="mt-4 text-center">
                  <div
                    className={`w-4 h-4 ${item.color} rounded-full mx-auto mb-2`}
                  ></div>
                  <p className="text-xs text-gray-800 whitespace-nowrap max-w-24">
                    {item.date}
                  </p>
                  <p className="text-xs text-gray-900 whitespace-nowrap max-w-24">
                    {item.time}
                  </p>
                </div>
              </div>

              {/* Connector (hidden for last item) */}
              {index < timelineData.length - 1 && (
                <div className="w-0 h-0 relative -ml-1 z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
