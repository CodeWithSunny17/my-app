"use client";
import { useState, useRef } from "react";
import { Calendar, MapPin, Image, Plus } from "lucide-react";
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

export default function CreateEvent({ setEvents, setActiveTab }) {
  //state variables
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

  const handleMediaChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

    console.log("Selected File:", file);

    const reader = new FileReader();
    reader.onload = () => {
      console.log("File Loaded Successfully:", reader.result);
      setMediaPreview(reader.result);
      setMediaFile(reader.result);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
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

    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      return updatedEvents;
    });

    setMediaPreview(null);
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
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          style={{
            backgroundImage: `url(${
              mediaPreview ? mediaPreview : `/image.png`
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="space-y-2 relative aspect-[4/5] w-full overflow-hidden rounded-lg "
        >
          {/* <Label htmlFor="media-upload" className="text-sm font-medium">
            Event Media
          </Label> */}
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
            onClick={() => document.getElementById("media-upload").click()}
            variant="outline"
            className="absolute bottom-6 w-full py-6 border-dashed border-2 bg-gray-50"
          >
            <div className="flex flex-col items-center gap-2">
              <Image className="h-6 w-6 text-gray-400" />
              {mediaPreview ? (
                <span className="text-gray-600">Replace Media</span>
              ) : (
                <span className="text-gray-600">Upload Media</span>
              )}
            </div>
          </Button>
          {/* {mediaPreview && (
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100">
              <img
                src={mediaPreview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            </div>
          )} */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="community" className="text-sm font-medium">
            Community
          </Label>
          <Select value={community} onValueChange={setCommunity} id="community">
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
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center space-y-2">
              <Label htmlFor="start-datetime" className="text-sm font-medium">
                Start Date & Time
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
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
            <div className="flex flex-row justify-between items-center space-y-2">
              <Label htmlFor="end-datetime" className="text-sm font-medium">
                End Date & Time
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
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
            <MapPin className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
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
        <Button type="submit">Create Event</Button>
      </form>
    </div>
  );
}
