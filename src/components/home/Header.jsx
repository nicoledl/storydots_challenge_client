import style from "../../styles/home.module.css"
import Logo from "../Logo";
import { Fira_Sans } from "next/font/google";

const fira_sans = Fira_Sans({ subsets: ["latin"], weight: "400" });

function Header() {
  return(
    <div className={style.header}>
        <Logo />
        <p className={fira_sans.className}>Take a look at all the<br /> products we have for you!</p>
    </div>
  )
}

export default Header;