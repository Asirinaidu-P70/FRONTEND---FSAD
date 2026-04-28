import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import AlertBanner from "../components/AlertBanner";
import DataTable from "../components/DataTable";
import PageIntro from "../components/PageIntro";
import { fetchUsers } from "../services/api";

function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const data = await fetchUsers();

        if (isMounted) {
          setUsers(data);
        }
      } catch (error) {
        toast.error(error.message || "Unable to load users.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const rows = useMemo(
    () =>
      users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        joinedOn: user.joinedOn,
      })),
    [users]
  );

  return (
    <div className="container">
      <PageIntro
        eyebrow="Manage users"
        title="Review learner and admin accounts from the live backend."
        description="This table now reads the real users stored in MySQL through your Spring Boot API."
      />

      <AlertBanner
        title={`${rows.length} users loaded from backend`}
        description="User management now reflects the actual backend records instead of a frontend dataset."
      />

      <div className="data-card" style={{ marginTop: "1rem" }}>
        {isLoading ? (
          <h2 style={{ color: "white" }}>Loading users...</h2>
        ) : (
          <DataTable
            columns={[
              { key: "id", label: "User ID" },
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "role", label: "Role" },
              { key: "joinedOn", label: "Joined" },
            ]}
            rows={rows}
          />
        )}
      </div>
    </div>
  );
}

export default ManageUsersPage;
