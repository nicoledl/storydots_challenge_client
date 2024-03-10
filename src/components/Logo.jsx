import { Maiden_Orange } from "next/font/google";
import style from "../styles/home.module.css"

const maiden_orange = Maiden_Orange({ subsets: ["latin"], weight: "400" });

function Logo() {
    return(
        <div className={style.logo} >
            <span className={maiden_orange.className}>
                <p>Hi!</p>
                <p>BUY!</p>
            </span>
        </div>
    )
}

export default Logo;