"use client";
import { useState, useRef } from "react";
import { Image } from "lucide-react";
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
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMediaPreview(reader.result);
        setMediaFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
        <div className="space-y-2">
          <Label>Event Media</Label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            ref={fileInputRef}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current.click()}
            variant="outline"
            className="w-full py-6 border-dashed border-2 bg-gray-50"
          >
            <Image className="h-6 w-6 text-gray-400" />
            Upload Media
          </Button>
          {mediaPreview && (
            <img
              src={mediaPreview}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label>Community</Label>
          <Select value={community} onValueChange={setCommunity}>
            <SelectTrigger>
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

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          required
        />
        <Input
          type="datetime-local"
          value={startDateTime}
          onChange={(e) => setStartDateTime(e.target.value)}
          required
        />
        <Input
          type="datetime-local"
          value={endDateTime}
          onChange={(e) => setEndDateTime(e.target.value)}
          required
        />
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <Button type="submit">Create Event</Button>
      </form>
    </div>
  );
}
