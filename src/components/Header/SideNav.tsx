import { observer } from "mobx-react";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useStore } from "@/store";
import { getMenu, findMenuByPath, findActiveKeys } from "@/util/menu.ts";
import { theme } from "@/styles/theme";
import styled from "styled-components";
const paddingMap = {
    1: 14,
    2: 34,
    3: 54,
    4: 74,
    5: 94,
};
const SideNav = observer(() => {
    const { menuStore } = useStore();
    const {pathname} = useLocation();
    const [openIndexes, setOpenIndexes] = useState([]);
    const depth1Menu = getMenu(menuStore.menuData);
    const currentMenu = findMenuByPath(menuStore.menuData, pathname);
    const isActive = (menuId) => currentMenu?.menuId === menuId;
    useEffect(() => {
        if (!currentMenu) return;
        const activeKeys = findActiveKeys(
            depth1Menu,
            currentMenu.menuId
        );
        if (activeKeys) {
            setOpenIndexes(activeKeys);
        }
    }, [pathname]);

    const toggleIndex = (key) => {
        setOpenIndexes((prev) => {
            if (prev.includes(key)) {
                return prev.filter((i) => i !== key);
            } else {
                return [...prev, key];
            }
        });
    };

    const renderMenu = (menus, parentKey = "") => {
        return menus.map((item, idx) => {
            const key = parentKey ? `${parentKey}-${idx}` : `${idx}`;
            const children = getMenu(menuStore.menuData, item.menuId);
            const isOpen = openIndexes.includes(key);
            const active = isActive(item.menuId);
            const depth = key.split("-").length;


            return (
                <NavList className={`list ${active ? "active" : ""}`} key={key} $depths={depth}>
                    <div className={`wrapper `}>
                        <div className={`depth-item depth-${depth}`}>
                            {children.length > 0 ? (
                                <div
                                    className={`item-wrap ${isOpen ? "open" : ""}`}
                                    onClick={() => toggleIndex(key)}
                                >
                                    <span className={"title"}>{item.title}</span>
                                    <div className="arrow-wrap">
                                        <IoIosArrowDown
                                            color={theme.colors.palette.gray300}
                                            size={20}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <Link to={item.path} className={"item-wrap"}>
                                    <span className={"title"}>{item.title}</span>
                                </Link>
                            )}
                        </div>
                        {children.length > 0 && isOpen && (
                            <NavWrap className={`depth-item depth-${depth + 1}`}>
                                {renderMenu(children, key)}
                            </NavWrap>
                        )}
                    </div>
                </NavList>
            );
        });
    };

    return (
        <SideNaveArea>
            <NavWrap className={"nav-wrap"}>
                {renderMenu(depth1Menu)}
            </NavWrap>
        </SideNaveArea>
    );
});



const SideNaveArea = styled.div`
    width: ${theme.size.sidebarWidth};
    position: fixed;
    top: ${theme.size.headerHeight};
    left: 0;
    height: calc(100vh - ${theme.size.headerHeight});
    overflow: auto;
    background-color: #000;
    transition: all .3s ease-in-out;
    z-index: 300;
`;
const NavWrap = styled.ul`
    white-space: nowrap;
`;
const NavList =  styled.li<{ $depths?: string | number; }>`
    .depth-item{
        .item-wrap{
            cursor: pointer;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: ${({ $depths }) => paddingMap[$depths] || 14}px;
            padding-right: ${paddingMap[1]}px;
            .title{
                color: #fff;
                font-weight: 600;
                font-size: 15px;
            }
            &.open{
                .arrow-wrap{
                    transform: rotate(180deg);
                }
            }
        }
 
    }
    &.active{
        .depth-item{
            .item-wrap{
                background-color: ${theme.colors.palette.brand700};
            }   
        }
    }
`


export default SideNav;