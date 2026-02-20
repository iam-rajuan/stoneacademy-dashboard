import RecentUsersTable from "../../Components/Dashboard/RecentUsersTable";
import UserRatioChart from "../../Components/Dashboard/UserRatioChart";

const Dashboard = () => {
  return (
    <div className="flex h-full flex-col">
      <div
        style={{ boxShadow: "0px 1px 6px 0px rgba(0, 0, 0, 0.24)" }}
        className="flex flex-wrap p-5 rounded-md justify-evenly md:flex-nowrap"
      >
        {/*============================= Total User =============================*/}
        <div className="flex justify-center w-full md:w-1/4">
          <div className="flex flex-col gap-5">
            <p className="text-[#1C2434] text-2xl font-bold">38.6K</p>
            <p className="text-xl text-[#101010] font-semibold">Total Users</p>
          </div>
        </div>

        {/*============================= Total Revenue =============================*/}
        <div className="flex justify-center w-full mt-6 md:w-1/4 md:mt-0">
          <div className="flex flex-col gap-5">
            <p className="text-[#1C2434] text-2xl font-bold">4.9M</p>
            <p className="text-xl text-[#101010] font-semibold">
              Total Revenue
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-4 space-y-4 overflow-y-auto">
        <UserRatioChart />
        <RecentUsersTable />
      </div>
    </div>
  );
};

export default Dashboard;
