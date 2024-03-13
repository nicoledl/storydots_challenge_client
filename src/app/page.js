import Login from "@/components/admin/Login";
import Container from "@/components/home/Container";
import Header from "@/components/home/Header";
import style from "../styles/home.module.css"

function Home() {
  return (
    <main>
      <div className={style.wave_container}>
        <Header />
      </div>
      <Login />
      <Container />
    </main>
  );
}

export default Home