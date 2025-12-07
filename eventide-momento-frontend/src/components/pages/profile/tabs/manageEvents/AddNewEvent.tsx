import CommonButton from "@/components/common/CommonButton";
import { RxCross2 } from "react-icons/rx";

const AddNewEvent = ({
  setAddNewEvent,
}: {
  setAddNewEvent: (value: boolean) => void;
}) => {
  const handleAddEvents = () => {};
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
            <div className="flex flex-col gap-1">
              <label htmlFor="banner" className="font-medium text-sm">
                Banner
              </label>
              <input
                id="banner"
                type="file"
                name="banner"
                accept="image/*"
                placeholder="Upload Banner"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

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
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Events Time */}
            <div className="flex flex-col gap-1">
              <label htmlFor="eventTime" className="font-medium text-sm">
                Events Time
              </label>
              <input
                id="eventTime"
                type="datetime-local"
                name="eventTime"
                placeholder="Events Time"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Category */}
            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="font-medium text-sm">
                Category
              </label>
              <input
                id="category"
                type="text"
                name="category"
                placeholder="Category"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

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
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>

            {/** Total Participants */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="totalParticipants"
                className="font-medium text-sm"
              >
                Total Participants
              </label>
              <input
                id="totalParticipants"
                type="number"
                name="totalParticipants"
                placeholder="Total Participants"
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
              <textarea
                id="detailInformation"
                name="detailInformation"
                placeholder="Detail Information"
                rows={4}
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>
            <div>
              <CommonButton title="Add Event" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEvent;
