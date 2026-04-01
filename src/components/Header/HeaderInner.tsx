import {observer} from "mobx-react";
import {getMenu, getMenuPath} from "@/util/menu";
import {useStore} from "@/store";
import {useState} from "react";
import styled from "styled-components";
import {theme} from "@/styles/theme";
import {Link, useLocation} from "react-router-dom";

type MenuType = {
    id: string;
    slug: string;
    title: string;
};

const HeaderInner = observer(({wrap}) => {
    const {menuStore} = useStore();
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const isActive = (slug: string) => pathSegments.includes(slug);
    const depth1Menu = getMenu(menuStore.menuData);
    return (
        <PcWrapperInner>
            {
                depth1Menu.map((item: MenuType, idx: number) => {
                    const children = getMenu(menuStore.menuData, item.id);
                    const isOpen = openIndex === idx;
                    const depth1Active = isActive(item.slug);
                    return (
                        <li
                            className={`list ${depth1Active ? "active" : ""}`}
                            key={item.slug}
                            onMouseEnter={() => setOpenIndex(idx)}
                            onMouseLeave={(e) => {
                                const headerEl = wrap.current;
                                const next = e.relatedTarget;
                                if (!headerEl) return;
                                if (!next || !(next instanceof Node)) {
                                    setOpenIndex(null);
                                    return;
                                }
                                if (headerEl.contains(next)) {
                                    return;
                                }
                                setOpenIndex(null);
                            }}
                        >
                            <div className="wrapper">
                                <div className="depth-1">
                                    {
                                        children.length > 0 ?
                                            item.title
                                            :
                                            <Link
                                                to={getMenuPath(menuStore.menuData, item.id)}
                                                onClick={() => setOpenIndex(null)}
                                            >
                                                {item.title}
                                            </Link>
                                    }
                                </div>
                                {
                                    children.length > 0 &&
                                    <ul className={`depth-2 ${isOpen ? "open" : ""}`}>
                                        <div className={"depth-2-inner"}>
                                            {
                                                children.map((child: MenuType) => {
                                                    const depth2Active = isActive(child.slug);

                                                    return (
                                                        <li
                                                            className={`child ${depth2Active ? "active" : ""}`}
                                                            key={child.slug}
                                                        >
                                                            <Link
                                                                to={getMenuPath(menuStore.menuData, child.id)}
                                                                onClick={() => setOpenIndex(null)}
                                                            >
                                                                {child.title}
                                                            </Link>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </div>
                                    </ul>
                                }
                            </div>
                        </li>
                    );
                })}
        </PcWrapperInner>
    )
});
const PcWrapperInner = styled.ul`
    display: flex;
    gap: 20px;

    .list {
        .wrapper {
            position: relative;

            .depth-1 {
                cursor: pointer;
                font-size: 16px;
                color: ${theme.colors.palette.gray300};
            }

            .depth-2 {
                position: fixed;
                width: 100%;
                top: ${theme.size.headerHeight};
                left: 0;
                background: rgb(255, 255, 255);
                z-index: 1;
                opacity: 0;
                transform: translateY(-1px);
                pointer-events: none;
                transition: opacity 0.3s, transform 0.3s;
                box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0, rgba(0, 0, 0, 0.06) 0 4px 20px 0;

                &.open {
                    opacity: 1;
                    transform: translateY(0);
                    pointer-events: auto;
                }

                .depth-2-inner {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: end;
                    padding: 30px 32px;
                    gap: 10px;

                    .child {
                        color: ${theme.colors.palette.gray900};

                        &.active {
                            font-weight: 700;
                            color: ${theme.colors.palette.blue500};
                        }
                    }
                }
            }
        }

        &.active {
            .depth-1 {
                font-weight: 700;
                color: ${theme.colors.palette.blue500};
            }
        }
    }
`
export default HeaderInner;