import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../../components/layout/admin/sidebar/AdminSidebar";
import AdminNavbar from "../../components/layout/admin/navbar/AdminNavbar";
import { useAdminStore } from "../../context/AdminContext";

export default function AdminLayout() {
  const { token } = useAdminStore();

  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <AdminNavbar />
        <div className="flex items-start justify-start">
          <AdminSidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
