import { useState } from "react";
import { Edit } from "lucide-react";
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

const blankAdForm = {
  id: null,
  category: "",
  productName: "",
  description: "",
  price: "",
  url: "",
  isActive: false,
  image: "",
};

const AdsSetup = () => {
  const [ads, setAds] = useState(initialAds);
  const [editingAd, setEditingAd] = useState(null);
  const [deletingAd, setDeletingAd] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState(blankAdForm);
  const placeholderImage =
    "https://via.placeholder.com/400x240.png?text=Ad+Preview";

  const handleInputChange = (field, value) =>
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange("image", reader.result ?? "");
    };
    reader.readAsDataURL(file);
  };

  const handlePreviewClick = (url) => {
    if (!url || typeof window === "undefined") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const formatPrice = (value) => {
    if (value === "" || value === undefined || value === null) return "--";
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return value;
    return `$${numeric.toFixed(2)}`;
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
    setFormData(blankAdForm);
  };

  const closeEditModal = () => {
    setEditingAd(null);
    setFormData(blankAdForm);
  };

  const closeDeleteModal = () => setDeletingAd(null);

  const closeCreateModal = () => {
    setIsCreating(false);
    setFormData(blankAdForm);
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
      const nextId = (ads.length + 1).toString().padStart(2, "0");
      setAds((prev) => [...prev, { ...payload, id: nextId }]);
      closeCreateModal();
    }
  };

  return (
    <div className="w-full px-4 mx-auto mt-20">
      <div className="overflow-hidden bg-white rounded-md shadow-sm">
        <div className="bg-[#71ABE0] py-5 rounded-tl-md rounded-tr-md flex justify-between px-5 items-center">
          <h2 className="px-4 text-2xl font-semibold text-white">
            Ad Management
          </h2>
          <button
            onClick={handleCreate}
            className="text-[#71ABE0] bg-white font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors"
          >
            Create New Ad
          </button>
        </div>

        <div
          style={{ boxShadow: "0px 1px 6px 0px rgba(0, 0, 0, 0.24)" }}
          className="overflow-x-auto rounded-lg"
        >
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-left">
                  S ID
                </th>
                <th className="px-6 py-3 text-sm font-medium text-left">
                  Product
                </th>
                <th className="px-6 py-3 text-sm font-medium text-left">
                  Category
                </th>
                <th className="px-6 py-3 text-sm font-medium text-left">
                  Price
                </th>
                <th className="px-6 py-3 text-sm font-medium text-left">
                  Status
                </th>
                <th className="px-6 py-3 text-sm font-medium text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {ads.map((ad, index) => (
                <tr
                  key={ad.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-3 text-sm text-gray-900">
                    {ad.id}
                  </td>

                  <td className="px-6 py-3 text-sm text-gray-900">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {ad.productName || "Untitled"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {ad.description || "No description"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-3 text-sm text-gray-900">
                    {ad.category || "Uncategorized"}
                  </td>

                  <td className="px-6 py-3 text-sm text-gray-900">
                    {formatPrice(ad.price)}
                  </td>

                  <td className="px-6 py-3 text-sm text-gray-900">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                        ad.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {ad.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(ad)}
                        className="p-2 transition-colors bg-blue-100 rounded-full hover:bg-blue-200"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>

                      <button
                        onClick={() => handleDelete(ad)}
                        className="p-2 transition-colors bg-red-100 rounded-full hover:bg-red-200"
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

      <section className="mt-10">
        <div className="flex flex-col gap-2 mb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              In-app Card Preview
            </h3>
            <p className="text-sm text-gray-500">
              Matches the shopping layout your users see inside the app. Each
              card uses your image, copy, price, and link.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ads.map((ad) => (
            <div
              key={`${ad.id}-preview`}
              className="flex flex-col h-full p-4 bg-white border border-gray-100 rounded-2xl shadow-sm"
            >
              <span className="inline-flex text-[11px] font-semibold uppercase tracking-wide text-[#71ABE0] bg-[#E9F2FB] px-3 py-1 rounded-full self-start">
                {ad.category || "Category"}
              </span>
              <img
                src={ad.image || placeholderImage}
                alt={ad.productName || "Ad creative"}
                className="object-cover w-full h-40 mt-4 rounded-xl"
              />
              <div className="flex flex-col flex-1 mt-4 space-y-1">
                <h4 className="text-lg font-semibold text-gray-900">
                  {ad.productName || "Untitled product"}
                </h4>
                <p className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                  {ad.description ||
                    "Add a short description to help users understand the ad."}
                </p>
                <p className="mt-auto text-2xl font-bold text-gray-900">
                  {formatPrice(ad.price)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handlePreviewClick(ad.url)}
                disabled={!ad.url}
                className="w-full px-4 py-2 mt-3 text-sm font-semibold text-white rounded-lg transition-colors bg-[#71ABE0] hover:bg-[#5a94c9] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/*===================================== Create/Edit Modal =====================================*/}
      {(isCreating || editingAd) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-40">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h3 className="mb-6 text-2xl font-medium text-center text-[#71ABE0]">
              {isCreating ? "Create New Ad" : "Edit Ad"}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => handleInputChange("productName", e.target.value)}
                  placeholder="Whey Protein Plus"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Vanilla flavor 2lbs, clean ingredients..."
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Tap the Add to Cart button to open this link in the app.
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
                      <span className="text-xs text-gray-600">
                        Image selected
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">
                        No image selected
                      </span>
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
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#71ABE0]"></div>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={isCreating ? closeCreateModal : closeEditModal}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-white border border-[#71ABE0] rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
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

      {/*========================================= Delete Modal =========================================*/}
      {deletingAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-40">
          <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-2xl font-bold text-center">
              Do you want to delete this Ad?
            </h3>
            <p className="mb-6 text-sm text-center text-gray-500">
              {deletingAd.productName || "Unnamed ad"} will be removed from the
              ad list and mobile feed preview.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 text-sm  transition-colors bg-white border border-[#71ABE0] text-[#71ABE0]  rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
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
