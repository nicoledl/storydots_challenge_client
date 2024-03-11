import Login from "@/components/admin/Login";
import PrivateRoute from "@/components/admin/PrivateRoute";
import Container from "@/components/home/Container";
import Header from "@/components/home/header";

export default function Home() {
  return (
    <main>
      <PrivateRoute>
        <Login />
        <Header />
        <Container />
      </PrivateRoute>
    </main>
  );
}
