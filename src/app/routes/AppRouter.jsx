import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PublicLayout from "../layouts/PublicLayout";
import AdminAnalyticsPage from "../pages/AdminAnalyticsPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminSettingsPage from "../pages/AdminSettingsPage";
import AnnouncementsPage from "../pages/AnnouncementsPage";
import AboutPage from "../pages/AboutPage";
import CertificatesPage from "../pages/CertificatesPage";
import ContactPage from "../pages/ContactPage";
import FeedbackPage from "../pages/FeedbackPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ManageRegistrationsPage from "../pages/ManageRegistrationsPage";
import ManageUsersPage from "../pages/ManageUsersPage";
import ManageWorkshopsPage from "../pages/ManageWorkshopsPage";
import MyLearningPage from "../pages/MyLearningPage";
import MyWorkshopsPage from "../pages/MyWorkshopsPage";
import NotFoundPage from "../pages/NotFoundPage";
import NotificationsPage from "../pages/NotificationsPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SettingsPage from "../pages/SettingsPage";
import UploadMaterialsPage from "../pages/UploadMaterialsPage";
import UserDashboardPage from "../pages/UserDashboardPage";
import WorkshopDetailsPage from "../pages/WorkshopDetailsPage";
import WorkshopFormPage from "../pages/WorkshopFormPage";
import WorkshopListPage from "../pages/WorkshopListPage";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "./ScrollToTop";

function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="workshops" element={<WorkshopListPage />} />
          <Route path="workshops/:workshopId" element={<WorkshopDetailsPage />} />
        </Route>

        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="app/dashboard" element={<UserDashboardPage />} />
            <Route path="app/workshops" element={<WorkshopListPage />} />
            <Route
              path="app/workshops/:workshopId"
              element={<WorkshopDetailsPage />}
            />
            <Route path="app/my-workshops" element={<MyWorkshopsPage />} />
            <Route path="app/learning" element={<MyLearningPage />} />
            <Route path="app/notifications" element={<NotificationsPage />} />
            <Route path="app/profile" element={<ProfilePage />} />
            <Route path="app/settings" element={<SettingsPage />} />
            <Route path="app/feedback" element={<FeedbackPage />} />
            <Route path="app/certificates" element={<CertificatesPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="admin/workshops" element={<ManageWorkshopsPage />} />
            <Route path="admin/workshops/new" element={<WorkshopFormPage />} />
            <Route
              path="admin/workshops/:workshopId/edit"
              element={<WorkshopFormPage />}
            />
            <Route path="admin/users" element={<ManageUsersPage />} />
            <Route
              path="admin/registrations"
              element={<ManageRegistrationsPage />}
            />
            <Route path="admin/materials" element={<UploadMaterialsPage />} />
            <Route path="admin/announcements" element={<AnnouncementsPage />} />
            <Route path="admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="admin/settings" element={<AdminSettingsPage />} />
          </Route>
        </Route>

        <Route path="dashboard" element={<Navigate replace to="/app/dashboard" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default AppRouter;
