import React, {useRef, useEffect} from "react";
import '../css/style.css';
import {ReactComponent as RmgLogo} from '../img/logo/RMG_PublicArt_Logo.svg';
import { gsap } from "gsap";

export default function LogoPage() {

    // store a reference to the box div
    const boxRef = useRef();

    // wait until DOM has been rendered
    useEffect(() => {
        gsap.to(boxRef.current, { delay: "3", opacity: "0", duration: "1"}, 0);
        gsap.to(boxRef.current, { duration: "1", display: "none" }, 2);
    });

    

return(

    
        <div className="logobox" ref={boxRef}>
        {/* <RmgLogo className="logo"></RmgLogo>  */}
        <img className="logo-img" src={require('../img/logo/RMG-Logo-Animation.gif')}/>
        </div>
)
}

// export { LogoPage as default };