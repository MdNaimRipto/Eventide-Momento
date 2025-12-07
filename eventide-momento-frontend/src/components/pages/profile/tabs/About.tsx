import CommonButton from "@/components/common/CommonButton";
import { useUserContext } from "@/contexts/AuthContext";
import Link from "next/link";

const About = () => {
  const { user } = useUserContext();

  return (
    <div className="w-full bg-white shadow-md p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-secondary1">
            {user?.userName}
          </h2>
          <p className="text-sm text-secondary1/70 mt-1">{user?.role}</p>
        </div>
      </div>

      {/* Bio */}
      {user?.bio && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-secondary1 mb-2">About</h3>
          <p className="text-secondary1/80">{user.bio}</p>
        </div>
      )}

      {/* Contact & Location */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-secondary1 2xl:max-w-[1000px] mb-6">
        <div>
          <h3 className="text-sm font-medium text-secondary1/70">Email</h3>
          <p className="text-secondary1">{user?.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-secondary1/70">Phone</h3>
          <p className="text-secondary1">{user?.contactNumber}</p>
        </div>
        <div className="mt-3">
          <h3 className="text-sm font-medium text-secondary1/70">
            Account Status
          </h3>
          <p
            className={`px-4 py-1 rounded-md text-[10px] tracking-widest font-semibold inline-block mt-1 uppercase ${
              user?.activeStatus
                ? "bg-green-500/15 text-green-500"
                : "bg-red-500/15 text-red-500"
            }`}
          >
            {user?.activeStatus ? "Active" : "Inactive"}
          </p>
        </div>
        <div className="mt-3">
          <h3 className="text-sm font-medium text-secondary1/70">Interests</h3>
          {user?.interests && user?.interests.length ? (
            <div className="flex flex-wrap gap-3 mt-1">
              {user?.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1 rounded-md text-[10px] tracking-widest font-semibold inline-block uppercase bg-secondary1/15 text-secondary1"
                >
                  {interest}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-secondary1">Not Updated Yet!</p>
          )}
        </div>
      </div>
      <Link href={"/user/profile?tab=settings"}>
        <CommonButton title={"Edit Now"} />
      </Link>
    </div>
  );
};

export default About;
