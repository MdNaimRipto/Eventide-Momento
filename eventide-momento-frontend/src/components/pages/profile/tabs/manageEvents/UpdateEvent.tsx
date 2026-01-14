"use client";

import { useState } from "react";
import CommonButton from "@/components/common/CommonButton";
import { IEvent, eventCategoryEnums } from "@/types/eventTypes";
import { RxCross2 } from "react-icons/rx";
import { useUpdateEventMutation } from "@/redux/features/eventApis";
import { postApiHandler } from "@/lib/postApiHandler";
import EventCategorySelect from "./EventCategorySelect";
import DetailedInfoInputs from "./DetailedInfoInputs";
import BannerUploader from "./BannerUploader";

const SESSION_KEY = "updateEventBanner";

const UpdateEvent = ({
  setUpdateEvent,
  event,
}: {
  setUpdateEvent: (value: boolean) => void;
  event: IEvent | null;
}) => {
  const [bannerUrl, setBannerUrl] = useState<string | null>(
    event?.banner || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState<eventCategoryEnums | "">(
    event?.category || ""
  );
  const [detailedInfos, setDetailedInfos] = useState<string[]>([]);

  const [updateEvent] = useUpdateEventMutation();

  const formatToDateTimeLocal = (d?: string | Date | null) => {
    if (!d) return "";
    const date = new Date(d);
    if (isNaN(date.getTime())) return "";
    // convert to local date-time in format YYYY-MM-DDTHH:MM
    const tzOffset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - tzOffset * 60000);
    return local.toISOString().slice(0, 16);
  };

  const handleUpdateEvents = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!event) return;

    const form = new FormData(e.currentTarget);

    const payload = {
      eventName: form.get("eventName") as string,
      description: form.get("description") as string,
      eventDate: form.get("eventDate") as string,
      category: category as string,
      status: event.status || "UPCOMING",
      entryFee: Number(form.get("entryFee")) || 0,
      detailedInformations: detailedInfos,
      location: form.get("location") as string,
      banner: bannerUrl || sessionStorage.getItem(SESSION_KEY) || "",
      minParticipants: Number(form.get("minParticipants")) || 0,
      maxParticipants: Number(form.get("maxParticipants")) || 0,
    };

    await postApiHandler({
      mutateFn: updateEvent,
      options: { id: event.id, data: payload },
      setIsLoading: setIsSubmitting,
      optionalTasksFn: () => {
        sessionStorage.removeItem(SESSION_KEY);
        setBannerUrl(null);
        setUpdateEvent(false);
      },
    });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className=" flex justify-between items-center mb-6 border-b border-gray-200">
          <h2 className="text-3xl font-semibold mb-2">Update Event</h2>
          <div
            onClick={() => setUpdateEvent(false)}
            className="text-red-500 text-2xl font-bold cursor-pointer"
          >
            <RxCross2 />
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleUpdateEvents}>
          <div className="w-full flex flex-col gap-6">
            {/** Banner */}
            <BannerUploader bannerUrl={bannerUrl} setBannerUrl={setBannerUrl} />

            {/** Event Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="eventName" className="font-medium text-sm">
                Event Name
              </label>
              <input
                id="eventName"
                type="text"
                name="eventName"
                placeholder="Event Name"
                defaultValue={event?.eventName || ""}
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Events Date */}
            <div className="flex flex-col gap-1">
              <label htmlFor="eventDate" className="font-medium text-sm">
                Events Date
              </label>
              <input
                id="eventDate"
                type="datetime-local"
                name="eventDate"
                placeholder="Events Date"
                defaultValue={formatToDateTimeLocal(event?.eventDate)}
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Category */}
            <EventCategorySelect
              setCategory={setCategory}
              category={category}
            />

            {/** Entry Fee */}
            <div className="flex flex-col gap-1">
              <label htmlFor="entryFee" className="font-medium text-sm">
                Entry Fee
              </label>
              <input
                id="entryFee"
                type="number"
                name="entryFee"
                placeholder="Entry Fee"
                defaultValue={event?.entryFee ?? ""}
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Min Participants */}
            <div className="flex flex-col gap-1">
              <label htmlFor="minParticipants" className="font-medium text-sm">
                Min Participants
              </label>
              <input
                id="minParticipants"
                type="number"
                name="minParticipants"
                placeholder="Min Participants"
                defaultValue={event?.minParticipants ?? ""}
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Max Participants */}
            <div className="flex flex-col gap-1">
              <label htmlFor="maxParticipants" className="font-medium text-sm">
                Max Participants
              </label>
              <input
                id="maxParticipants"
                type="number"
                name="maxParticipants"
                placeholder="Max Participants"
                defaultValue={event?.maxParticipants ?? ""}
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Location */}
            <div className="flex flex-col gap-1">
              <label htmlFor="location" className="font-medium text-sm">
                Location
              </label>
              <input
                id="location"
                type="text"
                name="location"
                placeholder="Location"
                defaultValue={event?.location || ""}
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="detailInformation"
                className="font-medium text-sm"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={event?.description || ""}
                placeholder="Detail Information"
                rows={4}
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Detail Information */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="detailInformation"
                className="font-medium text-sm"
              >
                Detail Information
              </label>
              <DetailedInfoInputs
                value={detailedInfos}
                onChange={setDetailedInfos}
              />
            </div>
            <div>
              <CommonButton
                title={isSubmitting ? "Updating..." : "Update Event"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
