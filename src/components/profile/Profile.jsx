import ProtectedRoute from "../authorization/ProtectedRoute";
export default function Profile(props) {
  <ProtectedRoute roles={["ROLE_USER"]}>
    <section className="profile">
      <h2>Welcome to your profile page</h2>
    </section>
  </ProtectedRoute>;
}
