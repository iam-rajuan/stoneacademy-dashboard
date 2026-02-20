import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const creators = [
  {
    id: "01",
    creatorId: "sarah-johnson",
    name: "Guy Hawkins",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    totalEvents: 12,
    ticketSold: 50,
    earnings: "$654",
    paymentStatus: "Pending Payment",
  },
  {
    id: "02",
    creatorId: "ronald-richar",
    name: "Ronald Richar",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop",
    totalEvents: 10,
    ticketSold: 20,
    earnings: "$634",
    paymentStatus: "Pending Payment",
  },
  {
    id: "03",
    creatorId: "darlene-rotn",
    name: "Darlene Rotn",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop",
    totalEvents: 8,
    ticketSold: 60,
    earnings: "$6546",
    paymentStatus: "Complete Payment",
  },
  {
    id: "04",
    creatorId: "kristin-watso",
    name: "Kristin Watso",
    avatar:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=200&auto=format&fit=crop",
    totalEvents: 3,
    ticketSold: 50,
    earnings: "$6576",
    paymentStatus: "Complete Payment",
  },
  {
    id: "05",
    creatorId: "jenny-wilson",
    name: "Jenny Wilson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    totalEvents: 12,
    ticketSold: 80,
    earnings: "$2163",
    paymentStatus: "Complete Payment",
  },
  {
    id: "06",
    creatorId: "courtney-kry",
    name: "Courtney Kry",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=200&auto=format&fit=crop",
    totalEvents: 14,
    ticketSold: 70,
    earnings: "$6354",
    paymentStatus: "Pending Payment",
  },
  {
    id: "07",
    creatorId: "albert-flores",
    name: "Albert Flores",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    totalEvents: 7,
    ticketSold: 60,
    earnings: "$654",
    paymentStatus: "Complete Payment",
  },
  {
    id: "08",
    creatorId: "floyd-milegvs",
    name: "Floyd Milegvs",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    totalEvents: 2,
    ticketSold: 56,
    earnings: "$5647",
    paymentStatus: "Complete Payment",
  },
  {
    id: "09",
    creatorId: "kathryn-mury",
    name: "Kathryn Mury",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    totalEvents: 8,
    ticketSold: 78,
    earnings: "$6574",
    paymentStatus: "Pending Payment",
  },
];

const EventCreators = () => {
  return (
    <div className="p-4 bg-gray-50">
      <div className="mx-auto bg-white border rounded-2xl border-slate-100 shadow-sm">
        <div className="sticky top-0 z-10 px-6 py-4 bg-[#71ABE0]">
          <h1 className="text-2xl font-semibold text-white">
            Event Creators
          </h1>
        </div>

        <div className="px-4 py-3 md:px-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#B9D6EF]">
                  <th className="px-3 py-4 text-sm font-medium text-left text-[#71ABE0]">
                    S.ID
                  </th>
                  <th className="px-3 py-4 text-sm font-medium text-left text-[#71ABE0]">
                    Creator
                  </th>
                  <th className="px-3 py-4 text-sm font-medium text-left text-[#71ABE0]">
                    Total Events
                  </th>
                  <th className="px-3 py-4 text-sm font-medium text-left text-[#71ABE0]">
                    Ticket Sold
                  </th>
                  <th className="px-3 py-4 text-sm font-medium text-left text-[#71ABE0]">
                    Total Earnings
                  </th>
                  <th className="px-3 py-4 text-sm font-medium text-left text-[#71ABE0]">
                    Payment Status
                  </th>
                  <th className="px-3 py-4 text-sm font-medium text-left text-[#71ABE0]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {creators.map((creator) => {
                  const pending = creator.paymentStatus === "Pending Payment";

                  return (
                    <tr key={creator.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 text-sm text-gray-800">
                        {creator.id}
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="object-cover w-10 h-10 rounded-full"
                          />
                          <span className="text-sm text-gray-800">
                            {creator.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-800">
                        {String(creator.totalEvents).padStart(2, "0")}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-800">
                        {creator.ticketSold}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-800">
                        {creator.earnings}
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={`inline-flex rounded-full px-4 py-1 text-xs font-medium ${
                            pending
                              ? "bg-[#F9A1A1] text-[#8B2424]"
                              : "bg-[#CFF1DC] text-[#216D3D]"
                          }`}
                        >
                          {creator.paymentStatus}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <Link
                          to={`/event-creator/${creator.creatorId}`}
                          className="inline-flex p-1 text-[#71ABE0] hover:bg-blue-50 rounded-full"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 px-2 py-6 md:flex-row md:items-center">
            <div className="text-sm font-medium text-[#71ABE0]">
              SHOWING 1-8 OF 250
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <button className="text-2xl leading-none text-gray-400">
                &#8249;
              </button>
              <span className="px-3 py-1 text-white rounded-md bg-[#71ABE0]">
                1
              </span>
              <span>2</span>
              <span>3</span>
              <span>4.....30</span>
              <span>60</span>
              <span>120</span>
              <button className="text-2xl leading-none text-gray-400">
                &#8250;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreators;
