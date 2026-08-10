import styled from "styled-components";
import { theme } from "@/styles/theme";
import React, {type ElementType } from "react";

type SizeType = keyof typeof SIZE_MAP;
type RadiusType = keyof typeof RADIUS_MAP | "half" | "pill" | number;

const SIZE_MAP = {
    xsm: { height: 28, padding: "0 10px", fontSize: 12, fontWeight: 400 },
    sm: { height: 32, padding: "0 20px", fontSize: 14, fontWeight: 400 },
    md: { height: 40, padding: "0 32px", fontSize: 15, fontWeight: 700 },
    lg: { height: 48, padding: "0 40px", fontSize: 16, fontWeight: 700 },
} as const;

const RADIUS_MAP = {
    sm: 4,
    md: 8,
    lg: 12,
} as const;

type ButtonOwnProps = {
    children: React.ReactNode;
    size?: SizeType;
    radius?: RadiusType;
    color?: string;
    bgColor?: string;
    outlined?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    gap?: number;
};

type ButtonProps<T extends ElementType = "button"> =
    ButtonOwnProps & {
    as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonOwnProps | "as">;

const Button = <T extends ElementType = "button">({
                                                      children,
                                                      as,
                                                      size = "md",
                                                      radius = "md",
                                                      color = theme.colors.primary.main,
                                                      bgColor = theme.colors.primary.main,
                                                      outlined = false,
                                                      fullWidth = false,
                                                      disabled = false,
                                                      gap = 10,
                                                      ...props
                                                  }: ButtonProps<T>) => {
    return (
        <ButtonWrapper
            as={as}
            type={as ? undefined : "button"}
            $size={size}
            $radius={radius}
            $outlined={outlined}
            $color={color}
            $bgColor={bgColor}
            $fullWidth={fullWidth}
            $gap={gap}
            disabled={disabled}
            {...props}
        >
            {children}
        </ButtonWrapper>
    );
};

type ButtonStyleProps = {
    $size: SizeType;
    $radius: RadiusType;
    $outlined: boolean;
    $color: string;
    $bgColor: string;
    $fullWidth: boolean;
    $gap: number;
    $height?: number;
    $padding?: string;
    $fontSize?: number;
    $fontWeight?: number;
};

const ButtonWrapper = styled.button<ButtonStyleProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-out;
    gap: ${({ $gap }) => `${$gap}px`};
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

    ${({ $size, $height }) => {
    const heightNum = $height || SIZE_MAP[$size].height;
    return `height: ${heightNum}px; line-height: ${heightNum}px;`;
}}

    padding: ${({ $padding, $size }) => $padding || SIZE_MAP[$size].padding};

    font-size: ${({ $fontSize, $size }) =>
    $fontSize ? `${$fontSize}px` : `${SIZE_MAP[$size].fontSize}px`};

    font-weight: ${({ $fontWeight, $size }) =>
    $fontWeight || SIZE_MAP[$size].fontWeight};

    border-radius: ${({ $radius, $size, $height }) => {
    const heightNum = $height || SIZE_MAP[$size].height;

    if ($radius === "half") return `${heightNum / 2}px`;
    if ($radius === "pill") return "9999px";
    if (typeof $radius === "number") return `${$radius}px`;

    return `${RADIUS_MAP[$radius]}px`;
}};

    border: 1px solid ${({ $outlined, disabled, $color }) => {
    if (disabled && $outlined) return theme.colors.gray[300];
    if ($outlined) return $color;
    return "transparent";
}};

    background-color: ${({ $outlined, disabled, $bgColor }) => {
    if (disabled) return theme.colors.gray[100];
    if (!$outlined) return $bgColor;
    return theme.colors.palette.white;
}};

    color: ${({ $outlined, disabled, $color }) => {
    if (disabled) return theme.colors.gray[500];
    if (!$outlined) return theme.colors.gray.white;
    return $color;
}};

    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

    &:hover {
        ${({ disabled, $outlined, $bgColor, $color }) => {
    if (disabled) return "";

    if (!$outlined && $bgColor) {
        return `
                    background-color: ${theme.colors.gray.white};
                    color: ${$bgColor};
                    border: 1px solid ${$bgColor};
                `;
    }

    if ($outlined) {
        return `
                    background-color: ${$color};
                    color: ${theme.colors.gray.white};
                    border-color: ${$color};
                `;
    }

    return "";
}}
    }
`;

export default Button;