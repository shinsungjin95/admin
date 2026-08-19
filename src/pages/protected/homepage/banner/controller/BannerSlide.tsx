import { Swiper, SwiperSlide } from "swiper/react";
import {
    Navigation,
    Pagination,
    Autoplay,
    EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import styled from "styled-components";
import { PAGINATION_TYPE_MAP } from "./index";

import {
    IoChevronBack,
    IoChevronForward,
} from "react-icons/io5";

const BannerSlide = ({config, slides}) => {
    const paginationType = PAGINATION_TYPE_MAP[config.pagination.type];
    return(
        <BannerSlideWrap
            $paginationPosition={config.pagination.position}
        >
            <Swiper
                key={[
                    config.effect,
                    config.pagination.active,
                    paginationType,
                    config.autoplay.active,
                    config.autoplay.delay,
                    config.navigation.active,
                ].join("-")}
                modules={[
                    Navigation,
                    Pagination,
                    Autoplay,
                    EffectFade,
                ]}
                effect={config.effect}
                fadeEffect={{
                    crossFade: true,
                }}
                speed={600}
                navigation={
                    config.navigation.active
                        ? {
                            prevEl: ".banner-prev",
                            nextEl: ".banner-next",
                        }
                        : false
                }
                pagination={
                    config.pagination.active
                        ? {
                            type: paginationType,
                            clickable: paginationType === "bullets",
                        }
                        : false
                }
                autoplay={
                    config.autoplay.active
                        ? {
                            delay: config.autoplay.delay,
                            disableOnInteraction: false,
                        }
                        : false
                }
                loop={slides.length > 1}
            >
                {slides.map((item) => (
                    <SwiperSlide key={item.id}>
                        <img
                            src={item.image?.url}
                            alt={item.title}
                        />
                    </SwiperSlide>
                ))}

                {config.navigation.active && (
                    <>
                        <NavigationButton
                            type="button"
                            className="banner-prev"
                            $position="left"
                        >
                            <IoChevronBack size={24} />
                        </NavigationButton>

                        <NavigationButton
                            type="button"
                            className="banner-next"
                            $position="right"
                        >
                            <IoChevronForward size={24} />
                        </NavigationButton>
                    </>
                )}
            </Swiper>
        </BannerSlideWrap>
    )
}


const BannerSlideWrap = styled.div<{
    $paginationPosition: string;
}>`
    width: 400px;
    height: 250px;
    flex-shrink: 0;

    .swiper {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .swiper-slide {
        width: 100%;
        height: 100%;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }


    /* =========================
       Pagination 공통
    ========================= */

    && .swiper-pagination {
        width: auto;
    }


    /* =========================
       Bullet
    ========================= */

    && .swiper-pagination-bullets {
        bottom: 0;
        padding: 0 20px 20px;

        ${({ $paginationPosition }) => {
            switch ($paginationPosition) {
                case "bottom-left":
                    return `
                        left: 0;
                        right: auto;
                        transform: none;
                    `;

                case "bottom-right":
                    return `
                        left: auto;
                        right: 0;
                        transform: none;
                    `;

                case "bottom-center":
                    return `
                        left: 50%;
                        right: auto;
                        transform: translateX(-50%);
                    `;

                default:
                    return "";
            }
        }}
    }

    && .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        margin: 0 4px;
        opacity: 0.5;
        background: #fff;
    }

    && .swiper-pagination-bullet-active {
        width: 20px;
        border-radius: 10px;
        opacity: 1;
    }


    /* =========================
       Progress
    ========================= */

    && .swiper-pagination-progressbar {
        top: auto;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        padding: 0;
        background: rgba(255, 255, 255, 0.35);
        transform: none;
    }

    && .swiper-pagination-progressbar-fill {
        background: #fff;
    }


    /* =========================
       Fraction
    ========================= */

    && .swiper-pagination-fraction {
        bottom: 0;
        padding: 0 20px 20px;

        ${({ $paginationPosition }) => {
            switch ($paginationPosition) {
                case "bottom-left":
                    return `
                        left: 0;
                        right: auto;
                        transform: none;
                    `;

                case "bottom-right":
                    return `
                        left: auto;
                        right: 0;
                        transform: none;
                    `;

                case "bottom-center":
                    return `
                        left: 50%;
                        right: auto;
                        transform: translateX(-50%);
                    `;

                default:
                    return "";
            }
        }}
    }
`;


const NavigationButton = styled.button<{
    $position: "left" | "right";
}>`
    position: absolute;
    top: 50%;
    ${({ $position }) => `${$position}: 12px;`}

    z-index: 10;

    width: 36px;
    height: 36px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;
    border: 0;
    border-radius: 50%;

    color: #fff;
    background: rgba(0, 0, 0, 0.35);

    cursor: pointer;

    transform: translateY(-50%);
    transition: background 0.2s;

    &:hover {
        background: rgba(0, 0, 0, 0.55);
    }
`;


export default BannerSlide;