'use client'
const { BsArrowClockwise } = require("react-icons/bs");

function LoadingScreen() {
    return(
        <div className="loading">
             <p>LODING...</p>
             <BsArrowClockwise />
        </div>
    )
}

export default LoadingScreen