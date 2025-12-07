"use client";
import { useState } from "react";
import CommonButton from "@/components/common/CommonButton";
import { RxCross2 } from "react-icons/rx";
import { useCreateEventMutation } from "@/redux/features/eventApis";
import { postApiHandler } from "@/lib/postApiHandler";
import EventCategorySelect from "./EventCategorySelect";
import { eventCategoryEnums } from "@/types/eventTypes";
import DetailedInfoInputs from "./DetailedInfoInputs";
import BannerUploader from "./BannerUploader";

const SESSION_KEY = "newEventBanner";

const AddNewEvent = ({
  setAddNewEvent,
}: {
  setAddNewEvent: (value: boolean) => void;
}) => {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [category, setCategory] = useState<eventCategoryEnums | "">("");
  const [detailedInfos, setDetailedInfos] = useState<string[]>([""]);

  const [createEvent] = useCreateEventMutation();

  const handleAddEvents = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const payload = {
      eventName: form.get("eventName") as string,
      description: form.get("description") as string,
      eventDate: form.get("eventDate") as string,
      category: category as string,
      status: "UPCOMING",
      entryFee: Number(form.get("entryFee")),
      detailedInformations: detailedInfos,
      location: form.get("location") as string,
      banner: sessionStorage.getItem(SESSION_KEY) || bannerUrl,
      minParticipants: Number(form.get("minParticipants")),
      maxParticipants: Number(form.get("maxParticipants")),
    };

    await postApiHandler({
      mutateFn: createEvent,
      options: { data: payload },
      setIsLoading: setIsSubmitting,
      optionalTasksFn: () => {
        sessionStorage.removeItem(SESSION_KEY);
        setBannerUrl(null);
        setAddNewEvent(false);
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className=" flex justify-between items-center mb-6 border-b border-gray-200">
          <h2 className="text-3xl font-semibold mb-2">Add New Event</h2>
          <div
            onClick={() => setAddNewEvent(false)}
            className="text-red-500 text-2xl font-bold cursor-pointer"
          >
            <RxCross2 />
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleAddEvents}>
          <div className="w-full flex flex-col gap-6">
            {/** Banner */}
            <BannerUploader bannerUrl={bannerUrl} setBannerUrl={setBannerUrl} />

            {/** Event Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="eventName" className="font-medium text-sm">
                Event Name
              </label>
              <input
                required
                id="eventName"
                type="text"
                name="eventName"
                placeholder="Event Name"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Events Date */}
            <div className="flex flex-col gap-1">
              <label htmlFor="eventDate" className="font-medium text-sm">
                Events Date
              </label>
              <input
                required
                id="eventDate"
                type="datetime-local"
                name="eventDate"
                placeholder="Events Date"
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
                required
                id="entryFee"
                type="number"
                name="entryFee"
                placeholder="Entry Fee"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Min Participants */}
            <div className="flex flex-col gap-1">
              <label htmlFor="minParticipants" className="font-medium text-sm">
                Min Participants
              </label>
              <input
                required
                id="minParticipants"
                type="number"
                name="minParticipants"
                placeholder="Min Participants"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Max Participants */}
            <div className="flex flex-col gap-1">
              <label htmlFor="maxParticipants" className="font-medium text-sm">
                Max Participants
              </label>
              <input
                required
                id="maxParticipants"
                type="number"
                name="maxParticipants"
                placeholder="Max Participants"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Location */}
            <div className="flex flex-col gap-1">
              <label htmlFor="location" className="font-medium text-sm">
                Location
              </label>
              <input
                required
                id="location"
                type="text"
                name="location"
                placeholder="Location"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Detail Information */}
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
                required
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
                title={isSubmitting ? "Adding Event" : "Add Event"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEvent;
