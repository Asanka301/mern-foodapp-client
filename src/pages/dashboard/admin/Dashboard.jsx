import React from "react";
import { PureComponent } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaCartArrowDown,
  FaDollarSign,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const { refetch, data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminStats");
      return res.data;
    },
  });

  //console.log(stats);

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orderStats");
      return res.data;
    },
  });

  console.log(chartData);

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">Hi, {user.displayName}</h2>

      <div className="stats shadow w-full">
        <div className="stat place-items-center">
          <div className="stat-figure text-secondary text-3xl">
            <FaDollarSign />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value"> ${stats.revenue}</div>
          <div className="stat-desc">From January 1st to February 1st</div>
        </div>

        <div className="stat place-items-center ">
          <div className="stat-figure text-secondary text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value ">{stats.users}</div>
          <div className="stat-desc "></div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-figure text-secondary text-3xl">
            <FaShoppingBag />
          </div>
          <div className="stat-title">Menu Items</div>
          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-desc"></div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-figure text-secondary text-3xl">
            <FaCartArrowDown />
          </div>
          <div className="stat-title">All Orders</div>
          <div className="stat-value">{stats.orders}</div>
          <div className="stat-desc"></div>
        </div>
      </div>

      <div className="stats center shadow w-full mt-7">
        <div className="stats bg text-primary-content ">
          <div className="stat">
            <div className="stat-title">Account balance</div>
            <div className="stat-value text-primary">${stats.revenue}</div>
            <div className="stat-actions">
              <button className="btn btn-sm bg-orange-500 btn-success">
                Add funds
              </button>
            </div>
          </div>

          <div className="stat center">
            <div className="stat-title">Current balance</div>
            <div className="stat-value text-primary">${stats.revenue}</div>
            <div className="stat-actions">
              <button className="btn btn-sm">Withdrawal</button>
              <button className="btn btn-sm">deposit</button>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
