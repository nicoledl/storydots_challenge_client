import Login from "@/components/admin/Login";
import Container from "@/components/home/Container";
import Header from "@/components/home/header";

export default function Home() {
  return (
    <main>
      <Login />
      <Header />
      <Container />
    </main>
  );
}
