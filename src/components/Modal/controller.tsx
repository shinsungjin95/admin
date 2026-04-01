import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useStore } from "@/store";
import Modal from "@/components/Modal";
import { MODAL_TRANSITION_TIMEOUT } from "@/constants";
import styled from "styled-components";

type ModalAction<T = unknown> = (data?: T) => boolean | void;

const ModalController = observer(() => {
    const { modalStore } = useStore();
    const nodeRefs = useRef([]);
    useEffect(() => {
        const onKeyDown = ({ key }: KeyboardEvent) => {
            if (key !== "Escape") return;
            const topModal = modalStore.modals[modalStore.modals.length - 1];
            if (!topModal) return;
            modalStore.close();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [modalStore]);

    return (
        <TransitionGroup component={null}>
            {modalStore.modals.map((modal, index) => {
                if (!nodeRefs.current[index]) {
                    nodeRefs.current[index] = { current: null };
                }
                const nodeRef = nodeRefs.current[index];
                const runAndClose = (action?: ModalAction<any>, data?: any) => {
                    const shouldClose = action?.(data);
                    if (shouldClose === false) return;
                    modalStore.close();
                };

                const handleCancel = (data?: any) => {
                    console.log("123")
                    runAndClose(modal.props?.onCancel, data);
                };

                const handleConfirm = (data?: any) => {
                    runAndClose(modal.props?.onConfirm, data);
                };

                return (
                    <StyledTransition
                        key={index}
                        timeout={MODAL_TRANSITION_TIMEOUT}
                        nodeRef={nodeRef}
                        unmountOnExit
                    >
                        <div ref={nodeRef}>
                            <Modal
                                idx={index}
                                component={modal.component}
                                modalClassName={"modal-body"}
                                {...modal.props}
                                zIndex={(index + 1) * 1000}
                                onCancel={handleCancel}
                                onConfirm={handleConfirm}
                            />
                        </div>
                    </StyledTransition>
                );
            })}
        </TransitionGroup>
    );
});

const StyledTransition = styled(CSSTransition)`
    &.enter{
        .modal-body{
            opacity: 0;
        }
    }
    &.enter-active{
        .modal-body{
            opacity: 1;
            transition: opacity 0.2s;
        }
    }
    &.exit{
        .modal-body{
            opacity: 1;
        }
    }
    &.exit-active{
        .modal-body{
            opacity: 0;
            transition: opacity 0.2s;
        }
    }
`


export default ModalController;