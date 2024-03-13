import Login from "@/components/admin/Login";
import Container from "@/components/home/Container";
import Header from "@/components/home/Header";

function Home() {
  return (
    <main>
      <Login />
      <Header />
      <Container />
    </main>
  );
}

export default Home