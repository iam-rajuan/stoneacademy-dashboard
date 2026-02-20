import { useMemo, useState } from "react";
import { Edit, Plus, Search, SlidersHorizontal } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { CiPower } from "react-icons/ci";

const productCategories = [
  "Protein",
  "Fitness Tracker",
  "Sport Earbuds",
  "Premium Yoga Mat",
  "Supplements",
  "Accessories",
];

const initialAds = [
  {
    id: "01",
    category: "Protein",
    productName: "Whey Protein Plus",
    description: "Vanilla flavor 2lbs",
    price: 49,
    url: "https://example.com/whey-protein-plus",
    isActive: true,
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "02",
    category: "Fitness Tracker",
    productName: "Heart rate monitor",
    description: "Advanced sensors",
    price: 129,
    url: "https://example.com/heart-rate-monitor",
    isActive: true,
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "03",
    category: "Sport Earbuds",
    productName: "Wireless, waterproof",
    description: "Premium sound quality",
    price: 89,
    url: "https://example.com/sport-earbuds",
    isActive: false,
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "04",
    category: "Premium Yoga Mat",
    productName: "Non-slip, 6mm thick",
    description: "Premium quality material",
    price: 39,
    url: "https://example.com/premium-yoga-mat",
    isActive: true,
    image:
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=400&q=80",
  },
];

const createBlankAdForm = () => ({
  id: null,
  category: "",
  productName: "",
  description: "",
  price: "",
  url: "",
  isActive: false,
  image: "",
});

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const formatPrice = (value) => {
  if (value === "" || value === undefined || value === null) return "--";
  const numeric = Number.parseFloat(value);
  if (Number.isNaN(numeric)) {
    return typeof value === "string" && value.trim() ? value : "--";
  }
  return currencyFormatter.format(numeric);
};

const parsePriceValue = (value) => {
  const numeric = Number.parseFloat(value);
  return Number.isNaN(numeric) ? 0 : numeric;
};

const computeNextAdId = (collection) => {
  const numericIds = collection
    .map((ad) => Number.parseInt(ad.id, 10))
    .filter((id) => Number.isFinite(id));
  const highest = numericIds.length ? Math.max(...numericIds) : 0;
  return (highest + 1).toString().padStart(2, "0");
};


const AdsSetup = () => {
  const [ads, setAds] = useState(initialAds);
  const [editingAd, setEditingAd] = useState(null);
  const [deletingAd, setDeletingAd] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState(createBlankAdForm());
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const placeholderImage =
    "https://via.placeholder.com/400x240.png?text=Ad+Preview";

  const categoryOptions = useMemo(() => {
    const seen = new Map();
    [...productCategories, ...ads.map((ad) => ad.category || "")].forEach((category) => {
      const normalized = category.trim();
      if (!normalized) return;
      const key = normalized.toLowerCase();
      if (!seen.has(key)) {
        seen.set(key, normalized);
      }
    });
    return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
  }, [ads]);

  const stats = useMemo(() => {
    const totalValue = ads.reduce((sum, ad) => sum + parsePriceValue(ad.price), 0);
    const activeCount = ads.filter((ad) => ad.isActive).length;
    const categoriesInUse = new Set(
      ads.map((ad) => ad.category).filter((category) => Boolean(category))
    ).size;
    const averagePrice = ads.length ? totalValue / ads.length : 0;

    return {
      totalValue,
      activeCount,
      categoriesInUse,
      averagePrice,
    };
  }, [ads]);

  const displayAds = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const normalizedCategory = categoryFilter.toLowerCase();

    const filtered = ads.filter((ad) => {
      const matchesCategory =
        categoryFilter === "all" ||
        (ad.category && ad.category.toLowerCase() === normalizedCategory);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && ad.isActive) ||
        (statusFilter === "inactive" && !ad.isActive);

      const matchesSearch = normalizedSearch
        ? [ad.productName, ad.description, ad.url]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch)
        : true;

      return matchesCategory && matchesStatus && matchesSearch;
    });

    const sortedAds = [...filtered].sort((a, b) => {
      if (sortBy === "price-desc") {
        return parsePriceValue(b.price) - parsePriceValue(a.price);
      }
      if (sortBy === "price-asc") {
        return parsePriceValue(a.price) - parsePriceValue(b.price);
      }
      if (sortBy === "name-asc") {
        return (a.productName || "").localeCompare(b.productName || "");
      }

      const aId = Number.parseInt(a.id, 10) || 0;
      const bId = Number.parseInt(b.id, 10) || 0;
      return bId - aId;
    });

    return sortedAds;
  }, [ads, categoryFilter, searchTerm, sortBy, statusFilter]);

  const handleInputChange = (field, value) =>
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

  const resetForm = () => setFormData(createBlankAdForm());

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange("image", reader.result ?? "");
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (ad) => {
    setEditingAd(ad);
    setIsCreating(false);
    setFormData({
      id: ad.id,
      category: ad.category || "",
      productName: ad.productName || "",
      description: ad.description || "",
      price:
        ad.price === undefined || ad.price === null ? "" : ad.price.toString(),
      url: ad.url || "",
      isActive: ad.isActive ?? false,
      image: ad.image || "",
    });
  };

  const handleDelete = (ad) => setDeletingAd(ad);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingAd(null);
    resetForm();
  };

  const closeEditModal = () => {
    setEditingAd(null);
    resetForm();
  };

  const closeDeleteModal = () => setDeletingAd(null);

  const closeCreateModal = () => {
    setIsCreating(false);
    resetForm();
  };

  const handleInlineStatusToggle = (adId) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === adId
          ? {
              ...ad,
              isActive: !ad.isActive,
            }
          : ad
      )
    );
  };

  const handleConfirmDelete = () => {
    if (deletingAd) {
      setAds((prev) => prev.filter((ad) => ad.id !== deletingAd.id));
    }
    setDeletingAd(null);
  };

  const handleSave = () => {
    const parsedPrice =
      formData.price === "" ? "" : Number.parseFloat(formData.price);
    const payload = {
      ...formData,
      price: Number.isNaN(parsedPrice) ? formData.price : parsedPrice,
    };

    if (editingAd) {
      setAds((prev) =>
        prev.map((ad) => (ad.id === editingAd.id ? { ...ad, ...payload } : ad))
      );
      closeEditModal();
    } else {
      const nextId = computeNextAdId(ads);
      setAds((prev) => [{ ...payload, id: nextId }, ...prev]);
      closeCreateModal();
    }
  };

  return (
    <div className="w-full p-4 space-y-6 bg-gray-50">
      <section className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-[#71ABE0] uppercase">
              Campaign Control
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-gray-900">
              Ads Setup Workspace
            </h1>
            <p className="text-sm text-gray-500">
              Search, filter, and optimize every placement from one view. All
              updates sync instantly to the preview cards below.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white rounded-xl bg-[#71ABE0] hover:bg-[#5a94c9] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create New Ad
          </button>
        </div>

        <div className="grid gap-4 mt-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="p-4 bg-[#F4F8FC] rounded-xl">
            <p className="text-xs font-medium text-gray-500 uppercase">
              Active Ads
            </p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {stats.activeCount}
            </p>
            <p className="text-sm text-gray-500">
              {stats.activeCount} of {ads.length} live
            </p>
          </div>
          <div className="p-4 bg-[#F4F8FC] rounded-xl">
            <p className="text-xs font-medium text-gray-500 uppercase">
              Catalog Value
            </p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {formatPrice(stats.totalValue)}
            </p>
            <p className="text-sm text-gray-500">Combined price across ads</p>
          </div>
          <div className="p-4 bg-[#F4F8FC] rounded-xl">
            <p className="text-xs font-medium text-gray-500 uppercase">
              Avg. Product Price
            </p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {formatPrice(stats.averagePrice)}
            </p>
            <p className="text-sm text-gray-500">Based on current catalog</p>
          </div>
          <div className="p-4 bg-[#F4F8FC] rounded-xl">
            <p className="text-xs font-medium text-gray-500 uppercase">
              Categories Live
            </p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {stats.categoriesInUse}
            </p>
            <p className="text-sm text-gray-500">Unique categories in rotation</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="sticky top-0 z-20 p-6 space-y-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <SlidersHorizontal className="w-4 h-4 text-[#71ABE0]" />
            <span>
              Showing {displayAds.length} of {ads.length} ads
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                Keyword Search
              </label>
              <div className="relative">
                <Search className="absolute w-4 h-4 text-gray-400 left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by product, copy, or URL"
                  className="w-full py-3 pl-11 pr-4 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#71ABE0]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#71ABE0]"
              >
                <option value="all">All categories</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#71ABE0]"
              >
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#71ABE0]"
              >
                <option value="recent">Newest first</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="name-asc">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          {displayAds.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg font-semibold text-gray-900">
                No ads match the current filters
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Adjust filters above or create a new ad to see it here.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden md:block">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {displayAds.map((ad) => (
                        <tr key={ad.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {ad.id}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={ad.image || placeholderImage}
                                alt={ad.productName || "Ad creative"}
                                className="object-cover rounded-lg w-12 h-12"
                              />
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {ad.productName || "Untitled"}
                                </p>
                                <p className="text-xs text-gray-500 max-w-[220px] truncate">
                                  {ad.description || "No description"}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-[#E9F2FB] text-[#71ABE0]">
                              {ad.category || "Uncategorized"}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {formatPrice(ad.price)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={ad.isActive}
                                  onChange={() => handleInlineStatusToggle(ad.id)}
                                />
                                <span className="w-11 h-6 bg-gray-300 rounded-full peer peer-focus:outline-none peer-checked:bg-[#71ABE0] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></span>
                              </label>
                              <span
                                className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                                  ad.isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {ad.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleEdit(ad)}
                                className="p-2 transition-colors bg-blue-50 rounded-full hover:bg-blue-100"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4 text-blue-600" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(ad)}
                                className="p-2 transition-colors bg-red-50 rounded-full hover:bg-red-100"
                                title="Delete"
                              >
                                <MdDelete className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col gap-4 md:hidden">
                {displayAds.map((ad) => (
                  <div
                    key={`${ad.id}-mobile`}
                    className="p-4 border border-gray-100 rounded-2xl shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium text-gray-500">
                          #{ad.id}
                        </p>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {ad.productName || "Untitled"}
                        </h3>
                      </div>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          ad.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {ad.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {ad.description || "No description"}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-[#E9F2FB] text-[#71ABE0]">
                        {ad.category || "Uncategorized"}
                      </span>
                      <p className="text-base font-semibold text-gray-900">
                        {formatPrice(ad.price)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={ad.isActive}
                          onChange={() => handleInlineStatusToggle(ad.id)}
                        />
                        <span className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#71ABE0] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></span>
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(ad)}
                          className="p-2 transition-colors bg-blue-50 rounded-full hover:bg-blue-100"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(ad)}
                          className="p-2 transition-colors bg-red-50 rounded-full hover:bg-red-100"
                        >
                          <MdDelete className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      {(isCreating || editingAd) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-40"
          onClick={isCreating ? closeCreateModal : closeEditModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-[#71ABE0]">
                {isCreating ? "Create New Ad" : "Edit Ad"}
              </h3>
              <button
                type="button"
                onClick={isCreating ? closeCreateModal : closeEditModal}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) =>
                    handleInputChange("productName", e.target.value)
                  }
                  placeholder="Whey Protein Plus"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#71ABE0]"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  list="ad-categories"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  placeholder="Protein, Accessories..."
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#71ABE0]"
                />
                <datalist id="ad-categories">
                  {productCategories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Vanilla flavor 2lbs, clean ingredients..."
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#71ABE0]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="49"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#71ABE0]"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Destination URL
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleInputChange("url", e.target.value)}
                    placeholder="https://example.com/your-landing-page"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#71ABE0]"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Tap the preview button below to open this link in the app.
                  </p>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Upload Creative
                </label>
                <div className="flex flex-col gap-3 p-4 border border-dashed rounded-xl border-blue-200 bg-blue-50/40">
                  <p className="text-sm text-gray-600">
                    Drop a PNG/JPG (max 5MB) to match the card shown in the
                    mobile preview.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <label
                      htmlFor="ad-image-upload"
                      className="px-4 py-2 text-sm font-semibold text-white rounded-md cursor-pointer bg-[#71ABE0] hover:bg-[#5a94c9]"
                    >
                      Upload image
                    </label>
                    <input
                      id="ad-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    {formData.image ? (
                      <span className="text-xs text-gray-600">Image selected</span>
                    ) : (
                      <span className="text-xs text-gray-400">No image selected</span>
                    )}
                  </div>
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Uploaded preview"
                      className="object-cover w-full h-40 rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-3 text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                      <CiPower />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Activate Now?
                      </p>
                      <p className="text-xs text-gray-500">
                        Turn on to make ad live immediately
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        handleInputChange("isActive", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#71ABE0] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={isCreating ? closeCreateModal : closeEditModal}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-white border border-[#71ABE0] rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 px-4 py-3 text-sm font-medium text-white bg-[#71ABE0] rounded-md hover:bg-[#5a94c9] transition-colors"
                >
                  {isCreating ? "Save Ad" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deletingAd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-40"
          onClick={closeDeleteModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="mb-4 text-2xl font-bold text-center">
              Do you want to delete this Ad?
            </h3>
            <p className="mb-6 text-sm text-center text-gray-500">
              {deletingAd.productName || "Unnamed ad"} will be removed from the
              ad list and mobile feed preview.
            </p>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="px-4 py-2 text-sm transition-colors bg-white border border-[#71ABE0] text-[#71ABE0] rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm text-white transition-colors bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdsSetup;
