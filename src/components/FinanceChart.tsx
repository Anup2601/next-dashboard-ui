"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

// #region Sample data
const data = [
  {
    name: "Jan",
    income: 4000,
    expanse: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expanse: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expanse: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expanse: 3908,
  },
  {
    name: "May",
    income: 1890,
    expanse: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expanse: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expanse: 4300,
  },
  {
    name: "Aug",
    income: 4000,
    expanse: 2400,
  },
  {
    name: "Sep",
    income: 3000,
    expanse: 1398,
  },
  {
    name: "Oct",
    income: 2000,
    expanse: 9800,
  },
  {
    name: "Nov",
    income: 2780,
    expanse: 3908,
  },
  {
    name: "Dec",
    income: 1890,
    expanse: 4800,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* title */}
      <div className="flex items-center justify-between ">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="More Options" width={20} height={20} />
      </div>
      <div className="w-full">
        <LineChart
          style={{
            width: "99%",
            height: "100%",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#d1d5db" }}
            tickMargin={10}
          />
          <YAxis
            width="auto"
            tickLine={false}
            tick={{ fill: "#d1d5db" }}
            tickMargin={20}
          />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#C3EBFA"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="expanse"
            stroke="#CFCEFF"
            strokeWidth={5}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default FinanceChart;
