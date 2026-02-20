import RecentUsersTable from "../../Components/Dashboard/RecentUsersTable";
import UserRatioChart from "../../Components/Dashboard/UserRatioChart";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full min-h-0 gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
            Overview
          </p>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-slate-900">38.6K</p>
              <p className="mt-1 text-base font-semibold text-slate-700">
                Total Users
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              +12.4%
            </span>
          </div>
        </div>

        <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
            Performance
          </p>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-slate-900">4.9M</p>
              <p className="mt-1 text-base font-semibold text-slate-700">
                Total Revenue
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              +8.1%
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Revenue growth compared with last month.
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pb-2 pr-1">
        <UserRatioChart />
        <div className="pb-2">
          <RecentUsersTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
