import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {observer} from "mobx-react";
import {theme} from "@styles/theme";
import {getBreadcrumbFromPath, matchPath} from "@/util/menu.ts";
import {useStore} from "@/store";

const Header = observer(() => {
    const {menuStore} = useStore();
    const {pathname} = useLocation();
    const currentDepths = getBreadcrumbFromPath(pathname, menuStore.menuData)
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
                                const isActive = matchPath(item.path, pathname).matched;
                                return (
                                    <div key={key} className={"page-seg"}>
                                        <div className={isActive ? "active" : ""}>
                                            {item.name}
                                        </div>
                                        {key < currentDepths.length - 1 && <span>/</span>}
                                    </div>
                                );
                            })}
                        </div>
                    }
                </div>
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
`;
export default Header;
