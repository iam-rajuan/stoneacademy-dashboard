import { SendHorizontal } from "lucide-react";

const events = [
  {
    title: "Morning Running Challenge",
    datetime: "Mar 15, 2024 • 2:00 PM",
    ticketPrice: "$85",
    sold: "127/150 sold",
    amount: "$10,795",
    status: "Upcoming",
  },
  {
    title: "Power Walking Workshop",
    datetime: "Feb 28, 2024 • 10:00 AM",
    ticketPrice: "$120",
    sold: "89/100 sold",
    amount: "$10,680",
    status: "Completed",
  },
  {
    title: "Sunrise Yoga Session",
    datetime: "Feb 14, 2024 • 6:00 PM",
    ticketPrice: "$45",
    sold: "203/250 sold",
    amount: "$9,135",
    status: "Completed",
  },
  {
    title: "Cycling Endurance Camp",
    datetime: "Jan 20, 2024 • 9:00 AM",
    ticketPrice: "$75",
    sold: "156/200 sold",
    amount: "$11,700",
    status: "Completed",
  },
  {
    title: "HIIT Fitness Bootcamp",
    datetime: "Dec 10, 2023 • 1:00 PM",
    ticketPrice: "$95",
    sold: "34/50 sold",
    amount: "$0",
    status: "Canceled",
  },
];

const statusClasses = {
  Upcoming: "bg-[#DCEBFF] text-[#3B6EA0]",
  Completed: "bg-[#CFF1DC] text-[#216D3D]",
  Canceled: "bg-[#FBD9D9] text-[#A23838]",
};

const EventCreatorDetails = () => {
  return (
    <div className="p-4 bg-gray-50">
      <div className="mx-auto bg-white border rounded-2xl border-slate-100 shadow-sm">
        <div className="sticky top-0 z-10 px-6 py-4 bg-[#71ABE0]">
          <h1 className="text-2xl font-semibold text-white">
            Event Creator
          </h1>
        </div>

        <div className="p-4 space-y-4 md:p-6">
          <div className="p-4 border border-gray-200 rounded-2xl">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
                alt="Sarah Johnson"
                className="object-cover w-14 h-14 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Sarah Johnson
                </h2>
                <p className="text-sm text-gray-500">@sarahjohnson_events</p>
                <span className="inline-flex items-center gap-2 px-3 py-1 mt-2 text-xs text-green-700 rounded-full bg-green-100">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden border border-gray-200 rounded-2xl">
            <div className="px-4 py-3 text-base font-semibold text-gray-900 border-b border-gray-200 md:px-6">
              Events Created
            </div>

            {events.map((event) => (
              <div
                key={event.title}
                className="flex flex-col gap-2 px-4 py-3 border-b border-gray-200 md:px-6 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-500">{event.datetime}</p>
                  <p className="mt-1 text-xs text-gray-700">
                    {event.ticketPrice} ticket price
                    <span className="mx-2 text-gray-400">|</span>
                    {event.sold}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`text-xl font-semibold ${
                      event.amount === "$0" ? "text-red-600" : "text-[#16A34A]"
                    }`}
                  >
                    {event.amount}
                  </p>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs ${statusClasses[event.status]}`}
                  >
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#E9EEF8] rounded-2xl md:p-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Payout Information
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Current balance and withdrawal history
            </p>

            <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-3xl font-bold text-gray-900">$12,320</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Withdrawal</p>
                <p className="text-2xl font-semibold text-gray-900">
                  May 28, 2024
                </p>
                <p className="text-lg text-gray-500">$15,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payout Status</p>
                <span className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg text-[#A56403] bg-[#F8E8B1]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A56403]" />
                  Pending Review
                </span>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 px-5 py-2 mt-6 text-sm text-white rounded-xl bg-[#71ABE0] hover:bg-[#5a9ad7]">
              <SendHorizontal className="w-5 h-5" />
              Process Payout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreatorDetails;
