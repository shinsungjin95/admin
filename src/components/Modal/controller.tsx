import { useRef } from "react";
import { observer } from "mobx-react-lite";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useStore } from "@/store";
import Modal from "@/components/Modal";
import { MODAL_TRANSITION_TIMEOUT } from "@/constants";
import styled from "styled-components";


const ModalController = observer(() => {
    const { modalStore } = useStore();
    const nodeRefs = useRef([]);

    return (
        <TransitionGroup component={null}>
            {modalStore.modals.map((modal, index) => {
                if (!nodeRefs.current[index]) {
                    nodeRefs.current[index] = { current: null };
                }
                const nodeRef = nodeRefs.current[index];

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