"use client";
import { Calendar, MapPin, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function MyEvents({ events, handleDelete }) {
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";

    const dt = new Date(dateTimeString);

    const day = dt.getDate();
    const suffix = getDaySuffix(day);
    const month = dt.toLocaleString("en-US", { month: "short" }); // Dec
    const time = dt.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }); // 7:00 PM

    return `${day}${suffix} ${month}, ${time}`;
  };

  // Function to get suffix (st, nd, rd, th)
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // 11th, 12th, etc.
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <div className="max-w-sm mx-auto grid grid-cols-2 gap-4">
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events created yet</p>
      ) : (
        events.map((event) => (
          <Card
            key={event.id}
            className="overflow-hidden border-0 shadow-lg rounded-xl"
          >
            <CardContent className="p-0 flex flex-col justify-between">
              {event.media && (
                <div className="relative w-full overflow-hidden bg-gray-100">
                  <img
                    src={event.media}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between gap-1 items-start mb-2">
                  <h3 className="font-semibold">{event.title}</h3>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3" />
                    <span className="text-xs">
                      {formatDateTime(event.startDateTime)}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3" />
                    <span className="text-xs">{event.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
