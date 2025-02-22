"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateEvent from "@/components/CreateEvent";
import MyEvents from "@/components/MyEvents";

export default function Home() {
  const [activeTab, setActiveTab] = useState("create");
  const [events, setEvents] = useState([]);

  //fetching the data from the local storage after parsing the data to json
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  //Function to delete any event which were previously created, also updating the local storage
  const handleDelete = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));  //updating the local storage
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b">
        <div className="flex">
          <button
            className={`flex-1 py-4 text-center font-medium ${activeTab === "create" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
            onClick={() => setActiveTab("create")}
          >
            Create Event
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium ${activeTab === "events" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
            onClick={() => setActiveTab("events")}
          >
            My Events
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 pb-4">
        {activeTab === "create" ? (
          <CreateEvent setEvents={setEvents} setActiveTab={setActiveTab} />
        ) : (
          <MyEvents events={events} handleDelete={handleDelete} />
        )}
      </div>

      {/* Floating Button */}
      {activeTab === "events" && (
        <Button
          className="fixed right-4 bottom-4 h-[6vh] w-[6vh] rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          onClick={() => setActiveTab("create")}
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
