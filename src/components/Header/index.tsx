import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {observer} from "mobx-react";
import {theme} from "@styles/theme";
import {findMenuByPath} from "@/util/menu.ts";
import {useStore} from "@/store";
import {setToast} from "@/util/toast.ts";
import {useCookies} from "react-cookie";
import {COOKIE_NAME} from "@/constants";
import { useNavigate } from "react-router-dom";
import {LOGIN_PATH} from "@/constants";

const Header = observer(() => {
    const {menuStore, userStore} = useStore();
        const navigate = useNavigate();
    const {pathname} = useLocation();
    const currentDepths = findMenuByPath(menuStore.currentMenuData, pathname, true);
    const [cookies, setCookie, removeCookie] = useCookies([COOKIE_NAME]);
    const logOut = async () => {
        try {
            if (cookies[COOKIE_NAME]) {
                await userStore.setLogout(removeCookie);
                navigate(`${LOGIN_PATH}`, { replace: true });
            }
        } catch (e) {
            setToast("warning", e)
        }
    }
    return (
        <>
            <HeaderWrap>
                <div className={"info-area"}>
                    <div className={"logo-area"}>
                        <div className={"logo"}>React-Admin</div>
                    </div>
                    {
                        currentDepths && currentDepths.length > 0 &&
                        <div className="page-info-area">
                            {currentDepths.map((item, key) => {
                                return (
                                    <div key={key} className={"page-seg"}>
                                        <div className={`${currentDepths.length - 1 === key ? "active" : ""}`}>
                                            {item.title}
                                        </div>
                                        {key < currentDepths.length - 1 && <span>/</span>}
                                    </div>
                                );
                            })}
                        </div>
                    }
                </div>
                <div className={"logout"} onClick={logOut}>로그아웃</div>
            </HeaderWrap>
        </>
    );
})
const HeaderWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.08);
    height: ${theme.size.headerHeight};
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info-area{
        display: flex;
        align-items: center;
        .logo-area {
            padding: 0 24px;
            width: ${theme.size.sidebarWidth};
            .logo {
                width: 155px;
                font-size: 24px;
                font-weight: 800;
            }
        }
        .page-info-area {
            font-weight: 500;
            color: ${theme.colors.palette.gray400};
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
            
            .page-seg{
                display: flex;
                align-items: center;
                gap: 5px;
                .active {
                    cursor: default;
                    color: ${theme.colors.palette.brand900};
                }
            }
        }
    }
    .logout{
        padding: 0 24px;
        cursor: pointer;
    }
`;
export default Header;
