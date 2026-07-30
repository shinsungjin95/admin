import type {ReactNode} from "react";
import styled from "styled-components";
import {theme} from "@/styles/theme";
import Button from "@components/Button";

type CardSectionProps = {
    title?: string | null;
    useButton?: {
        name: string;
        function: () => void;
    }
    children?: ReactNode | string | null;
};
const CardTemplate = ({
                          title,
                          useButton = undefined,
                          children
}: CardSectionProps) => {
    return (
        <>
            <Section>
                <Title>
                    {title}
                    {
                        useButton &&
                        <Button
                            size={"sm"}
                            onClick={() => {
                                useButton.function()
                            }}
                        >
                            {useButton.name}
                        </Button>
                    }
                </Title>
                <Content>{children}</Content>
            </Section>
        </>
    );
};

export default CardTemplate;

const Section = styled.section`
    position: relative;
    & + section {
        margin-top: 50px;
    }
`;

const Title = styled.h2`
    color: ${theme.colors.gray.black};
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Content = styled.div`
    padding: 32px 40px;
    box-shadow: 0 0 10px 0 rgba(98, 120, 233, 0.1);
    background: ${theme.colors.gray.white};
    border-radius: 10px;
`;
