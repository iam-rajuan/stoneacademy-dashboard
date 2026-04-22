import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const MainLayout = lazy(() => import("../Layout/Main/Main"));
const SignIn = lazy(() => import("../Pages/Auth/SignIn/SignIn"));
const AboutUs = lazy(() => import("../Pages/Settings/AboutUS/AboutUs"));
const PrivacyPolicy = lazy(() => import("../Pages/Settings/PrivacyPolicy/PrivacyPolicy"));
const TermsCondition = lazy(() => import("../Pages/Settings/TermsCondition/TermsCondition"));
const Dashboard = lazy(() => import("../Pages/Dashboard/Dashboard"));
const ProfilePage = lazy(() => import("../Pages/AdminProfile/ProfilePage"));
const Notifications = lazy(() => import("../Pages/Notifications/Notifications"));
const AnalysisPage = lazy(() => import("../Pages/Analysis/AnalysisPage"));
const Subscriptions = lazy(() => import("../Pages/Subscriptions/Subscriptions"));
const Analysis = lazy(() => import("../Pages/Analysis/Analysis"));
const RestaurantRequest = lazy(() => import("../Pages/RestaurantRequest/RestaurantRequest"));
const UserList = lazy(() => import("../Pages/UserList/UserList"));
const Earnings = lazy(() => import("../Pages/Earnings/Earnings"));
const Categories = lazy(() => import("../Pages/Categories/Categories"));
const Reports = lazy(() => import("../Pages/Reports/Reports"));
const Settings = lazy(() => import("../Pages/Settings/Settings"));
const AllMessages = lazy(() => import("../Pages/Messages/AllMessages"));
const BlockedList = lazy(() => import("../Pages/BlockedList/BlockedList"));
const ChangePass = lazy(() => import("../Pages/AdminProfile/ChangePass"));
const AdsSetup = lazy(() => import("../Pages/AdsSetup/AdsSetup"));
const ActivityEvents = lazy(() => import("../Pages/Activity & Events/ActivityEvents"));
const EventCreators = lazy(() => import("../Pages/EventCreator/EventCreators"));
const EventCreatorDetails = lazy(() => import("../Pages/EventCreator/EventCreatorDetails"));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm font-medium text-slate-500">
    Loading...
  </div>
);

const withSuspense = (element) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

const routes = [
  {
    path: "/sign-in",
    element: withSuspense(<SignIn />),
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: withSuspense(<MainLayout />),
        children: [
          { path: "/", element: withSuspense(<Dashboard />) },
          { path: "/dashboard", element: withSuspense(<Dashboard />) },
          { path: "/user-list", element: withSuspense(<UserList />) },
          { path: "/block-list", element: withSuspense(<BlockedList />) },
          { path: "/earnings", element: withSuspense(<Earnings />) },
          { path: "/restaurant-request", element: withSuspense(<RestaurantRequest />) },
          { path: "/analysis-page", element: withSuspense(<AnalysisPage />) },
          { path: "/analysis/:id", element: withSuspense(<Analysis />) },
          { path: "/subscriptions", element: withSuspense(<Subscriptions />) },
          { path: "/categories", element: withSuspense(<Categories />) },
          { path: "/reports", element: withSuspense(<Reports />) },
          { path: "/ads-setup", element: withSuspense(<AdsSetup />) },
          { path: "/activity&events", element: withSuspense(<ActivityEvents />) },
          { path: "/event-creator", element: withSuspense(<EventCreators />) },
          { path: "/event-creator/:id", element: withSuspense(<EventCreatorDetails />) },
          { path: "/notifications", element: withSuspense(<Notifications />) },
          { path: "/settings", element: withSuspense(<Settings />) },
          { path: "/settings/about-us", element: withSuspense(<AboutUs />) },
          { path: "/settings/privacy-policy", element: withSuspense(<PrivacyPolicy />) },
          { path: "/settings/terms-condition", element: withSuspense(<TermsCondition />) },
          { path: "/settings/profile", element: withSuspense(<ProfilePage />) },
          { path: "/settings/change-password", element: withSuspense(<ChangePass />) },
          { path: "/messages", element: withSuspense(<AllMessages />) },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/sign-in" replace />,
  },
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});
