import { LocalFonts } from "@/components/common/fonts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#2C2C54", "#F5ca31"];

export default function AdminOverview() {
  const stats = [
    { label: "Total Users", value: 1240 },
    { label: "Total Events", value: 86 },
    { label: "Total Bookings", value: 312 },
    { label: "Active Bookings", value: 12 },
  ];

  const barData = [
    { name: "Jan", users: 120 },
    { name: "Feb", users: 210 },
    { name: "Mar", users: 170 },
    { name: "Apr", users: 260 },
    { name: "May", users: 190 },
  ];

  const pieData = [
    { name: "Events", value: 86 },
    { name: "Users", value: 1240 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            className="text-start p-5 border border-gray-300 rounded-lg"
            key={index}
          >
            <h6 className="text-gray-500 text-sm">{item.label}</h6>
            <h4
              className={`${LocalFonts.anton.className} text-5xl text-secondary1`}
            >
              {item.value}
            </h4>
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border flex-1 lg:basis-[70%]">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Monthly User Growth
          </h3>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" radius={[6, 6, 0, 0]} fill={COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border lg:basis-[30%]">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Platform Distribution
          </h3>

          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={4}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
