import {theme} from "@/styles/theme";
import {useRef} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import HeaderInner from "@components/Header/HeaderInner.tsx";

const Header = () => {
    const headerWrapRef = useRef(null);
    return(
        <HeaderWrap ref={headerWrapRef}>
            <div className={"logo-wrap"}>
                <Link to={"/"}>
                    <img src={"/icons/common/icon-logo.svg"} alt={"logo"}/>
                </Link>
            </div>
            <div className={"control-area"}>
                <HeaderInner wrap={headerWrapRef}/>
            </div>
        </HeaderWrap>
    )
}
const HeaderWrap = styled.header`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9999;
    height: ${theme.size.headerHeight};
    background: ${theme.colors.layout.headerBG};
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .control-area{
        display: flex;
        align-items: center;
        gap: 30px;
    }
`
export default Header