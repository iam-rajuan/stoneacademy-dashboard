import { useEffect, useState } from "react";
import { LuPenLine } from "react-icons/lu";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import ChangePass from "./ChangePass";
import Profile from "./Profile";
import { getMyProfile, updateMyProfile } from "../../services/adminApi";
import {
  readCachedAdminProfile,
  writeCachedAdminProfile,
} from "../../utils/adminProfileCache";

const toAbsoluteImageUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  if (/^(https?:)?\/\//i.test(url) || /^data:|^blob:/i.test(url)) return url;
  if (url.startsWith("/")) {
    const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");
    return base ? `${base}${url}` : url;
  }
  return url;
};

const getInitials = (name) =>
  (name || "Admin")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "A";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("/settings/profile");
  const [profilePic, setProfilePic] = useState(() => readCachedAdminProfile()?.profilePhoto || "");
  const [profileName, setProfileName] = useState(() => readCachedAdminProfile()?.name || "Admin");
  const [profileImageFailed, setProfileImageFailed] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        const payload = await getMyProfile();
        if (!mounted) return;
        const data = payload?.data || payload;
        const cached = readCachedAdminProfile();
        const nextPhoto = data?.profilePhoto || data?.profileImageUrl || cached?.profilePhoto || "";
        const nextName = data?.name || data?.fullName || cached?.name || "Admin";
        setProfilePic(nextPhoto);
        setProfileName(nextName);
        setProfileImageFailed(false);
        writeCachedAdminProfile({ name: nextName, profilePhoto: nextPhoto });
        window.dispatchEvent(
          new CustomEvent("admin-profile-updated", {
            detail: { profilePhoto: nextPhoto, name: nextName },
          })
        );
      } catch {
        // Keep cached or current profile photo.
      }
    };

    loadProfile();
    return () => {
      mounted = false;
    };
  }, []);

  const getTabTitle = () => {
    switch (activeTab) {
      case "/settings/profile":
        return "Profile";
      case "/settings/editProfile":
        return "Edit Profile";
      case "/settings/changePassword":
        return "Change Password";
      default:
        return "";
    }
  };

  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    let shouldRevokeLocalPreview = false;
    setProfilePic(localPreview);
    setProfileImageFailed(false);
    window.dispatchEvent(
      new CustomEvent("admin-profile-updated", {
        detail: { profilePhoto: localPreview, name: profileName },
      })
    );

    try {
      setUploadingPhoto(true);
      const formData = new FormData();
      formData.append("photo", file);
      const payload = await updateMyProfile(formData);
      const data = payload?.data || payload;
      const serverPhoto = data?.profilePhoto || data?.profileImageUrl;
      const nextName = data?.name || data?.fullName || profileName;
      if (serverPhoto) {
        shouldRevokeLocalPreview = true;
        setProfilePic(serverPhoto);
        setProfileName(nextName);
        writeCachedAdminProfile({ name: nextName, profilePhoto: serverPhoto });
        window.dispatchEvent(
          new CustomEvent("admin-profile-updated", {
            detail: { profilePhoto: serverPhoto, name: nextName },
          })
        );
      }
    } catch {
      // Keep local preview if upload fails.
    } finally {
      setUploadingPhoto(false);
      if (shouldRevokeLocalPreview) URL.revokeObjectURL(localPreview);
      event.target.value = "";
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div
        style={{ boxShadow: "0px 1px 6px 0px rgba(0, 0, 0, 0.24)" }}
        className="mx-auto mt-16"
      >
        {/* Header with title */}
        <div className="bg-[#71abe0] p-5 rounded-t-xl text-[#ffff]">
          <div>
            <Link to="/" className="px-10 text-3xl font-bold text-start">
              {getTabTitle()}
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mx-auto">
          {/* Profile Picture */}
          <div className="w-full">
            <div className="mt-10 ">
              <div className="w-[122px] relative h-[122px] mx-auto rounded-full border-4 shadow-xl flex justify-center items-center">
                {profilePic && !profileImageFailed ? (
                  <img
                    src={toAbsoluteImageUrl(profilePic)}
                    alt="profile"
                    className="w-32 h-32 overflow-hidden rounded-full object-cover"
                    onError={() => setProfileImageFailed(true)}
                  />
                ) : (
                  <div className="flex w-32 h-32 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-3xl font-semibold text-blue-700">
                    {getInitials(profileName)}
                  </div>
                )}
                <div className="absolute top-0 right-0 p-2 rounded-full shadow-md cursor-pointer bg-white">
                  <label htmlFor="profilePicUpload" className="cursor-pointer">
                    <LuPenLine />
                  </label>
                  <input
                    type="file"
                    id="profilePicUpload"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {uploadingPhoto ? (
            <p className="text-xs text-center text-slate-500">Uploading photo...</p>
          ) : null}

          {/* Tab Navigation */}
          <div className="flex items-center justify-center gap-5 my-5 font-semibold text-md md:text-xl">
            <p
              onClick={() => setActiveTab("/settings/profile")}
              className={`cursor-pointer pb-1 ${
                activeTab === "/settings/profile"
                  ? "border-b-2 border-[#319FCA] text-[#319FCA]"
                  : ""
              }`}
            >
              Profile
            </p>
            <p
              onClick={() => setActiveTab("/settings/editProfile")}
              className={`cursor-pointer pb-1 ${
                activeTab === "/settings/editProfile"
                  ? "border-b-2 border-[#319FCA] text-[#319FCA]"
                  : ""
              }`}
            >
              Edit Profile
            </p>
          </div>

          {/* Tab Content */}
          <div className="flex items-center justify-center p-5 rounded-md">
            <div className="w-full max-w-3xl">
              {activeTab === "/settings/profile" && (
                <Profile setActiveTab={setActiveTab} />
              )}
              {activeTab === "/settings/editProfile" && <EditProfile />}
              {activeTab === "/settings/changePassword" && <ChangePass />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
