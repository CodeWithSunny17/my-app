import React, { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, Image, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EventApp = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [events, setEvents] = useState([]);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [community, setCommunity] = useState("");
  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);

  const communities = [
    { id: 1, name: "Sports & Fitness" },
    { id: 2, name: "Art & Culture" },
    { id: 3, name: "Technology" },
    { id: 4, name: "Food & Dining" },
    { id: 5, name: "Music" },
  ];

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const resizeMedia = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const width = img.width;
          const height = (width * 5) / 4;
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL(file.type));
        };
      };
    });
  };

  const handleMediaChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const resizedMedia = await resizeMedia(file);
        setMediaPreview(resizedMedia);
        setMediaFile(resizedMedia);
      }
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const dt = new Date(dateTimeString);
    return {
      date: dt.toLocaleDateString(),
      time: dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now(),
      title,
      startDateTime,
      endDateTime,
      location,
      community,
      description,
      media: mediaFile,
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    setMediaPreview(null);
    setMediaFile(null);
    setCommunity("");
    setTitle("");
    setStartDateTime("");
    setEndDateTime("");
    setLocation("");
    setDescription("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setActiveTab("events");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 bg-white z-10">
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === "create"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("create")}
          >
            Create Event
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === "events"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("events")}
          >
            My Events
          </button>
        </div>
      </div>

      <div className="pt-16 pb-4">
        {activeTab === "create" ? (
          <div className="max-w-md mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="media-upload" className="text-sm font-medium">
                  Event Media
                </Label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                  ref={fileInputRef}
                  className="hidden"
                  id="media-upload"
                />
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("media-upload").click()
                  }
                  variant="outline"
                  className="w-full py-6 border-dashed border-2 bg-gray-50"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Image className="h-6 w-6 text-gray-400" />
                    <span className="text-gray-600">Upload Media</span>
                  </div>
                </Button>
                {mediaPreview && (
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={mediaPreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="community" className="text-sm font-medium">
                  Community
                </Label>
                <Select
                  value={community}
                  onValueChange={setCommunity}
                  id="community"
                >
                  <SelectTrigger className="w-full py-3">
                    <SelectValue placeholder="Select Community" />
                  </SelectTrigger>
                  <SelectContent>
                    {communities.map((comm) => (
                      <SelectItem key={comm.id} value={comm.name}>
                        {comm.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Event Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter event title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 text-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <Label
                      htmlFor="start-datetime"
                      className="text-sm font-medium"
                    >
                      Start Date & Time
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="start-datetime"
                        type="datetime-local"
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                        className="pl-10 py-3"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label
                      htmlFor="end-datetime"
                      className="text-sm font-medium"
                    >
                      End Date & Time
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="end-datetime"
                        type="datetime-local"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                        className="pl-10 py-3"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 py-3"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter event description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 min-h-[120px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
              >
                Create Event
              </Button>
            </form>
          </div>
        ) : (
          <div className="max-w-md mx-auto p-4">
            <div className="space-y-4">
              {events.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No events created yet
                </div>
              ) : (
                events.map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden border-0 shadow-lg rounded-xl"
                  >
                    <CardContent className="p-0">
                      {event.media && (
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                          <img
                            src={event.media}
                            alt={event.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-semibold">
                            {event.title}
                          </h3>
                          <span className="text-sm text-blue-600">
                            {event.community}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-5 w-5 mr-3" />
                            <span>
                              {formatDateTime(event.startDateTime).date}{" "}
                              {formatDateTime(event.startDateTime).time} -
                              {formatDateTime(event.endDateTime).time}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-5 w-5 mr-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {activeTab === "events" && (
        <Button
          className="fixed right-4 bottom-4 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          onClick={() => setActiveTab("create")}
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default EventApp;
