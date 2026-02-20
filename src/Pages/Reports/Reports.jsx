import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { listAdminReports, updateAdminReportStatus } from "../../services/reportsApi";

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reports, setReports] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [updatingId, setUpdatingId] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    let mounted = true;

    const loadReports = async () => {
      try {
        const payload = await listAdminReports({ page: currentPage, limit: itemsPerPage });
        if (!mounted) return;

        const data = payload?.data || payload;
        const items = data?.reports || data?.items || data?.rows || [];
        const total =
          Number(data?.total) ||
          Number(data?.meta?.total) ||
          Number(data?.pagination?.total) ||
          items.length;

        setReports(Array.isArray(items) ? items : []);
        setTotalItems(total);
      } catch {
        if (mounted) {
          setReports([]);
          setTotalItems(0);
        }
      }
    };

    loadReports();
    return () => {
      mounted = false;
    };
  }, [currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + reports.length;

  const currentData = useMemo(
    () =>
      reports.map((report, index) => ({
        id: report?.id || report?._id || String(startIndex + index + 1).padStart(2, "0"),
        reportFrom:
          report?.reportFrom?.name || report?.reporter?.name || report?.from?.name || "N/A",
        reportReason: report?.reason || report?.reportReason || "N/A",
        reportTo:
          report?.reportTo?.name || report?.target?.name || report?.to?.name || "N/A",
        date: report?.createdAt ? new Date(report.createdAt).toLocaleString() : report?.date || "N/A",
        status: report?.status || "open",
      })),
    [reports, startIndex]
  );

  const handleCloseReport = async (reportId) => {
    try {
      setUpdatingId(reportId);
      await updateAdminReportStatus({ reportId, status: "closed" });
      setReports((prev) => prev.map((r) => ((r.id || r._id) === reportId ? { ...r, status: "closed" } : r)));
    } finally {
      setUpdatingId(null);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i += 1) pages.push(i);
    } else if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, "...", totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, 2, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="mx-auto overflow-hidden bg-white border rounded-2xl border-slate-100 shadow-sm">
        <div className="bg-white">
          <div className="sticky top-0 z-10 px-6 py-4 text-white bg-[#71ABE0] rounded-t-2xl">
            <h1 className="text-xl font-semibold">Reports</h1>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white border-b">
                  <th className="w-16 px-4 py-3 text-sm font-medium text-center text-[#71ABE0]">S.ID</th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-[#71ABE0]">Report From</th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-[#71ABE0]">Report Reason</th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-[#71ABE0]">Report To</th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-[#71ABE0]">Date & Time</th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-[#71ABE0]">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentData.map((report, index) => (
                  <tr key={report.id} className="transition-colors border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-center">{String(startIndex + index + 1).padStart(2, "0")}</td>
                    <td className="px-4 py-3"><span className="font-medium">{report.reportFrom}</span></td>
                    <td className="px-4 py-3 text-gray-700">{report.reportReason}</td>
                    <td className="px-4 py-3"><span className="font-medium">{report.reportTo}</span></td>
                    <td className="px-4 py-3 text-gray-700">{report.date}</td>
                    <td className="px-4 py-3">
                      {report.status === "closed" ? (
                        <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded">Closed</span>
                      ) : (
                        <button
                          className="px-2 py-1 text-xs text-white bg-red-500 rounded disabled:opacity-50"
                          onClick={() => handleCloseReport(report.id)}
                          disabled={updatingId === report.id}
                        >
                          {updatingId === report.id ? "Closing..." : "Close"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">No reports found.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
            <div className="text-sm font-medium text-[#71ABE0]">SHOWING {totalItems ? startIndex + 1 : 0}-{endIndex} OF {totalItems}</div>

            <div className="flex items-center gap-1">
              <button className={`w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                <ChevronLeft className="w-4 h-4" />
              </button>

              {getVisiblePages().map((page, index) => (
                <div key={`${page}-${index}`}>
                  {page === "..." ? (
                    <span className="px-2 text-gray-500">...</span>
                  ) : (
                    <button
                      className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-[#71ABE0] text-white hover:bg-[#71ABE0]"
                          : "hover:bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )}
                </div>
              ))}

              <button className={`w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
