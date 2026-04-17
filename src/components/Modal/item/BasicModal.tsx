import styled from "styled-components";
import Button from "@components/Button";
import {Dimmer, ModalHeader, ModalItem, ModalWrapper} from "../style.tsx";


const BasicModal = ({
                        onConfirm,
                        onCancel,
                        width,
                        maxHeight,
                        title,
                        modalDepth,
                        confirmText,
                        cancelText
                    }) => {
    return (
        <ModalWrapper
            $modalDepth={modalDepth}
        >
            <Dimmer onClick={onCancel}/>
            <ModalItem
                $width={width}
                $maxHeight={maxHeight}
            >
                <ModalHeader>
                    {
                        title &&
                        <h1 className={"modal-title"}>{title}</h1>
                    }
                </ModalHeader>
                <TestModalWrap>
                    <div className={"inner"}>
                        <p>기본 모달 내용</p>
                    </div>

                    <div className="btn-area">
                        <Button
                            outlined
                            size={"sm"}
                            radius={"sm"}
                            onClick={onCancel}
                        >
                            {cancelText || "취소"}
                        </Button>
                        <Button
                            size={"sm"}
                            radius={"sm"}
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </Button>
                    </div>
                </TestModalWrap>
            </ModalItem>
        </ModalWrapper>
    );
};


const TestModalWrap = styled.div`
    padding: 20px;

    .inner {
        text-align: center;
        padding: 15px;

        p {
            margin-bottom: 10px;
        }
    }

    .btn-area {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
`
export default BasicModal;
