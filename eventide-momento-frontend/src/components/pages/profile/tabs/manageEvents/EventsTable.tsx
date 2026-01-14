"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import UpdateEvent from "./UpdateEvent";
import Loader from "@/components/common/Loader";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useGetHostEventsQuery } from "@/redux/features/eventApis";
import { IEvent } from "@/types/eventTypes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteEventMutation } from "@/redux/features/eventApis";
import { postApiHandler } from "@/lib/postApiHandler";
import { Spinner } from "@/components/ui/spinner";
import { useUserContext } from "@/contexts/AuthContext";

const EventsTable = () => {
  const { user } = useUserContext();
  const [updateEvent, setUpdateEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  const category = searchParams.get("category") || "";
  const status = searchParams.get("status") || "";

  const { data, isLoading } = useGetHostEventsQuery({
    searchTerm,
    category,
    status,
    hostId: user?.id,
  });

  const [deleteEvent] = useDeleteEventMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  if (isLoading) return <Loader />;

  const events = (data?.data?.data as IEvent[]) || [];

  return (
    <div>
      <Table className="border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Event Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Participant</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Entry Fee</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {events.map((event, i) => (
            <TableRow key={event.id || i}>
              <TableCell>{event.id?.slice(0, 6) || i}</TableCell>
              <TableCell>{event.eventName}</TableCell>
              <TableCell>
                {event.eventDate
                  ? new Date(event.eventDate).toLocaleString()
                  : "-"}
              </TableCell>
              <TableCell>
                {event.minParticipants}-{event.maxParticipants}
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.category}</TableCell>
              <TableCell>{event.status}</TableCell>
              <TableCell>{event.entryFee}</TableCell>
              <TableCell className="flex gap-2 pr-0 justify-center">
                <button
                  className="text-sm text-secondary1 border border-secondary1 px-3 py-1 font-semibold"
                  onClick={() => {
                    setUpdateEvent(true);
                    setSelectedEvent(event);
                  }}
                >
                  Edit
                </button>

                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="text-sm  font-semibold px-3 py-1 bg-secondary1 text-white"
                      onClick={() => setSelectedEvent(event)}
                    >
                      View Details
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>{event.eventName}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="space-y-2 mt-2">
                      {event.banner && (
                        <Image
                          src={event.banner}
                          alt="banner"
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover rounded mb-6"
                        />
                      )}
                      <p>
                        <strong>Host ID:</strong> {event.hostId}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {event.eventDate
                          ? new Date(event.eventDate).toLocaleString()
                          : "-"}
                      </p>
                      <p>
                        <strong>Category:</strong> {event.category}
                      </p>
                      <p>
                        <strong>Entry Fee:</strong> {event.entryFee}
                      </p>
                      <p>
                        <strong>Min Participants:</strong>{" "}
                        {event.minParticipants}
                      </p>
                      <p>
                        <strong>Max Participants:</strong>{" "}
                        {event.maxParticipants}
                      </p>
                      <p>
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p>
                        <strong>Status:</strong> {event.status}
                      </p>
                      <p>
                        <strong>Detailed Informations:</strong>
                      </p>
                      <ul className="list-disc list-inside">
                        {Array.isArray(event.detailedInformations) ? (
                          event.detailedInformations.map((info, idx) => (
                            <li key={idx}>{info}</li>
                          ))
                        ) : (
                          <li>{event.detailedInformations}</li>
                        )}
                      </ul>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>

                <button
                  className={`text-sm text-white px-3 py-1 font-semibold ${
                    isDeleting ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
                  }`}
                  onClick={async () => {
                    const confirmed = window.confirm(
                      `Are you sure you want to delete event "${event.eventName}"?`
                    );
                    if (!confirmed) return;
                    await postApiHandler({
                      mutateFn: deleteEvent,
                      options: event.id,
                      setIsLoading: setIsDeleting,
                      optionalTasksFn: () => {
                        // clear selection if deleted
                        setSelectedEvent(null);
                      },
                    });
                  }}
                  disabled={isDeleting}
                >
                  {isDeleting ? <Spinner className="size-16" /> : "Delete"}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {updateEvent && (
        <UpdateEvent setUpdateEvent={setUpdateEvent} event={selectedEvent} />
      )}
    </div>
  );
};

export default EventsTable;
