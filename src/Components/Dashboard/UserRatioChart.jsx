import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const userData = [
  { month: "Jan", users: 650 },
  { month: "Feb", users: 380 },
  { month: "Mar", users: 780 },
  { month: "Apr", users: 520 },
  { month: "May", users: 420 },
  { month: "June", users: 850 },
  { month: "July", users: 580 },
  { month: "Aug", users: 620 },
  { month: "Sep", users: 750 },
  { month: "Oct", users: 680 },
  { month: "Nov", users: 540 },
  { month: "Dec", users: 720 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 text-white bg-slate-900 rounded-lg shadow-lg">
        <p className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
          Monthly Users
        </p>
        <p className="text-lg font-semibold">
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const UserRatioChart = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const maxUsers = Math.max(...userData.map((item) => item.users));
  const yAxisMax = Math.ceil((maxUsers + 50) / 100) * 100;

  const handleMouseEnter = (_, index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-[0.3em] text-slate-400 uppercase">
            Engagement
          </p>
          <h2 className="text-xl font-semibold text-slate-900">User Ratio</h2>
          <p className="text-sm text-slate-500">
            Unique sessions recorded each month.
          </p>
        </div>
        <div className="flex flex-col justify-end w-full text-sm sm:w-auto">
          <label className="text-xs font-medium text-slate-500 uppercase">
            Reporting Range
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 mt-1 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="2025">Year-2025</option>
            <option value="2024">Year-2024</option>
            <option value="2023">Year-2023</option>
            <option value="2022">Year-2022</option>
          </select>
        </div>
      </div>

      <div className="h-[320px] mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={userData}
            margin={{
              top: 10,
              right: 12,
              left: 0,
              bottom: 0,
            }}
            barCategoryGap="12%"
            barGap={4}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={46}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              domain={[0, yAxisMax]}
              tickCount={6}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(37, 99, 235, 0.08)" }}
            />
            <Bar
              dataKey="users"
              radius={[10, 10, 0, 0]}
              maxBarSize={42}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {userData.map((entry, index) => {
                const isHovered = hoveredIndex === index;
                return (
                  <Cell
                    key={entry.month}
                    fill={isHovered ? "#1d4ed8" : "#60a5fa"}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserRatioChart;
