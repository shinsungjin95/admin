import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState} from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import {observer} from "mobx-react";
import {useStore} from "@/store";
import {theme} from "@styles/theme";
import {buildKey, findPath, getActiveKeysFromPath, type MenuItem, toggleKey} from "@/util/menu.ts";



const SideNav = observer(() => {
    const {menuStore} = useStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [activeKeys, setActiveKeys] = useState<string[]>([]);

    useEffect(() => {
        const foundPath = findPath(menuStore.menuData, location.pathname) || [];
        setActiveKeys(getActiveKeysFromPath(foundPath));

        if (foundPath.length) {
            const ancestors = [];
            for (let i = 0; i < foundPath.length - 1; i++) {
                ancestors.push(buildKey(foundPath.slice(0, i + 1)));
            }
            setOpenKeys(ancestors);
        }
    }, [location.pathname]);

    const handleLeafClick = (link: string) => {
        navigate(link);
    };

    const renderNode = (node: MenuItem, indexes: number[] = [], depth: number = 1) => {
        const key = buildKey(indexes);
        const isActive = activeKeys.includes(key);
        const style = node.display === "none" ? {display: "none"} : {};

        let hasVisibleChild = false;
        if (node.children && node.children.length) {
            for (let i = 0; i < node.children.length; i++) {
                if (node.children[i].display !== "none") {
                    hasVisibleChild = true;
                    break;
                }
            }
        }

        const isOpen = openKeys.includes(key);

        return (
            <li
                key={key}
                style={style}
                className={`list ${
                    depth === 1 && !hasVisibleChild ? "only" : hasVisibleChild ? "parent" : ""
                } ${isActive ? "active" : ""}`}
            >
                <div className={`menu-wrap${isOpen ? " on" : ""}`}>
                    <div
                        className={`depth_${depth} item ${isActive ? "active" : ""}`}
                        onClick={(e) => {
                            if (hasVisibleChild) {
                                e.stopPropagation();
                                toggleKey(key, setOpenKeys);
                            } else if (node.link) {
                                handleLeafClick(node.link);
                            }
                        }}
                    >
                        {hasVisibleChild ? (
                            <div className={`arrow-area${isOpen ? " on" : ""}`}>
                                {
                                    depth === 1 ? <IoIosArrowForward /> : <IoIosArrowDown />
                                }
                            </div>
                        ) : null}

                        <span>{node.name}</span>
                    </div>

                    {hasVisibleChild && isOpen && (
                        <ul className={`depth_${depth + 1} children open`}>
                            {node.children.map((child, idx) =>
                                renderNode(child, [...indexes, idx], depth + 1)
                            )}
                        </ul>
                    )}
                </div>
            </li>
        );
    };

    return (
        <SideNavWrap>
            <SideNavList>
                    {menuStore.menuData.map((item, idx) => renderNode(item, [idx], 1))}
            </SideNavList>
        </SideNavWrap>
    );
});

const SideNavWrap = styled.div`
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

const SideNavList = styled.ul`
    white-space: nowrap;

    .list {
        &.only, &.parent {
            cursor: pointer;

            &.active {
                .depth_1 {
                    position: relative;
                    background-color: ${theme.colors.primary.main};
                }

                .children {
                    .list {
                        background-color: ${theme.colors.palette.brand700};

                        &.active {
                            background-color: ${theme.colors.palette.brand500};
                        }
                    }
                }
            }
        }
    }

    .menu-wrap .arrow-area {
        width: 20px;
        height: 20px;
        padding: 5px;
        display: flex;
        transform: rotate(-90deg);
        transition: transform .15s ease;
        align-items: center;
        justify-content: center;
    }

    .menu-wrap .arrow-area.on {
        transform: rotate(0deg);
    }

    .item {
        height: 48px;
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 700;
        font-size: 20px;
    }

    .depth_1.item {
        padding: 0 24px;
    }

    .depth_2.item {
        padding: 0 64px;
    }

    .depth_3.item {
        padding: 0 84px;
    }

    .depth_4.item {
        padding: 0 104px;
    }

    .depth_5.item {
        padding: 0 124px;
    }

    .children {
        height: 0;
        overflow: hidden;
        transform: scaleY(0);
        transform-origin: top left;
        transition: transform .12s ease, height .12s ease;
        margin-top: 1px;

        .list + .list {
            margin-top: 1px;
        }
    }

    .children.open {
        transform: scaleY(1);
        height: auto;
        overflow: visible;
    }
`;

export default SideNav;
