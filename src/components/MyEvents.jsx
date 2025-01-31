"use client";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function MyEvents({ events }) {
  return (
    <div className="max-w-md mx-auto p-4">
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events created yet</p>
      ) : (
        events.map((event) => (
          <Card key={event.id} className="mb-4">
            <CardContent className="flex flex-col gap-2">
              {event.media && (
                <img
                  src={event.media}
                  alt={event.title}
                  className="rounded-lg"
                />
              )}
              <h3>{event.title}</h3>
              <p>
                <Calendar /> {event.startDateTime} - {event.endDateTime}
              </p>
              <p>
                <MapPin /> {event.location}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
