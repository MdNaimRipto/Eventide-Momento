import React from "react";

interface IUserDummy {
  _id: string;
  userName: string;
  email: string;
  contactNumber: string;
  location: string;
  activeStatus: boolean;
  accountStatus: string;
  role: string;
  bio: string;
  interests: string[];
  ratingCount: number;
  ratingAvg: number;
}

const dummyUser: IUserDummy = {
  _id: "1",
  userName: "Jane Doe",
  email: "jane.doe@example.com",
  contactNumber: "+1234567890",
  location: "New York, USA",
  activeStatus: true,
  accountStatus: "ACTIVE",
  role: "USER",
  bio: "Enthusiastic event-goer and hobbyist coder. Love exploring new activities and meeting like-minded people.",
  interests: ["Music", "Sports", "Gaming", "Art"],
  ratingCount: 25,
  ratingAvg: 4.5,
};

const About: React.FC = () => {
  const user = dummyUser; // Use dummy data for now

  return (
    <div className="w-full bg-white shadow-md p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-secondary1">
            {user.userName}
          </h2>
          <p className="text-sm text-secondary1/70 mt-1">{user.role}</p>
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-secondary1 mb-2">About</h3>
          <p className="text-secondary1/80">{user.bio}</p>
        </div>
      )}

      {/* Contact & Location */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-secondary1">
        <div>
          <h3 className="text-sm font-medium text-secondary1/70">Email</h3>
          <p className="text-secondary1">{user.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-secondary1/70">Phone</h3>
          <p className="text-secondary1">{user.contactNumber}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-secondary1/70">Location</h3>
          <p className="text-secondary1">{user.location}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-secondary1/70">
            Account Status
          </h3>
          <p
            className={`px-4 py-1 rounded-md text-[10px] tracking-widest font-semibold inline-block mt-1 uppercase ${
              user.activeStatus
                ? "bg-green-500/15 text-green-500"
                : "bg-red-500/15 text-red-500"
            }`}
          >
            {user.activeStatus ? "Active" : "Inactive"}
          </p>
        </div>
      </div>

      {/* Interests */}
      {user.interests.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-secondary1 mb-2">
            Interests
          </h3>
          <div className="flex flex-wrap gap-3">
            {user.interests.map((interest, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-secondary1 text-primary text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
