import styled from "styled-components";
import {Dimmer, ModalHeader, ModalItem, ModalWrapper} from "../style.tsx";
import {IoCloseOutline} from "react-icons/io5";
import {theme} from "@styles/theme";
import { NoticeBox } from "@/styles/CommonStyle.tsx";


const ProjectInformationModal = ({
                              onCancel,
                              width,
                              maxHeight,
                              title,
                              closeBtn,
                              modalDepth,
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
                    {
                        closeBtn &&
                        <div
                            className={"modal-close-wrap"}
                            onClick={onCancel}>
                            <IoCloseOutline
                                color={`${theme.colors.palette.white}`}
                                size={24}
                            />
                        </div>
                    }
                </ModalHeader>
                <PortfolioGuide>
                    <p className="intro">
                        안녕하세요. 포트폴리오 CMS Admin에 방문해 주셔서 감사합니다.
                    </p>
                     <NoticeBox>
                        * 본 페이지는 실제 관리자 기능을 직접 확인하실 수 있도록
                        테스트 계정을 공개하여 운영 중입니다.
                    </NoticeBox>

                    <div className="account-box">
                        <div className="account-title">
                            관리자 테스트 계정
                        </div>

                        <div className="account-row">
                            <span>아이디</span>
                            <strong>admin</strong>
                        </div>

                        <div className="account-row">
                            <span>비밀번호</span>
                            <strong>12345</strong>
                        </div>
                    </div>

                    <div className="guide-box">
                        <p>
                            로그인 후 메뉴 구성, 콘텐츠 등록 및 수정, 배너 설정 등
                            구현된 관리자 기능을 자유롭게 확인하실 수 있습니다.
                        </p>

                        <p>
                            다만 여러 방문자가 동일한 환경을 이용하고 있으므로,
                            <strong>
                                기존에 설정되어 있는 메뉴·콘텐츠·배너 데이터는
                                가급적 삭제하지 않고 확인해 주시면 감사하겠습니다.
                            </strong>
                            새로운 데이터를 직접 등록하거나 수정하며 기능을
                            확인하셔도 좋습니다.
                        </p>

                        <p>
                            테스트 과정에서 변경된
                            <strong> 메뉴와 콘텐츠 데이터는 매일 00시에 정리될 예정</strong>
                            이므로 편하게 기능을 확인해 주세요.
                        </p>
                    </div>

                    <p className="thanks">
                        방문해 주셔서 감사합니다.
                    </p>
                </PortfolioGuide>
            </ModalItem>
        </ModalWrapper>
    );
}

const PortfolioGuide = styled.div`
    padding: 24px;
    font-size: 14px;
    line-height: 1.7;

    .intro {
        margin: 0 0 6px;
        font-size: 17px;
        font-weight: 700;
    }

    .description {
        margin: 0;
        color: ${theme.colors.palette.gray400};
    }

    .account-box {
        margin-top: 20px;
        padding: 16px 18px;
        border-radius: 8px;
        background: ${theme.colors.palette.gray100};

        .account-title {
            margin-bottom: 12px;
            font-size: 14px;
            font-weight: 700;
        }

        .account-row {
            display: flex;
            align-items: center;

            & + .account-row {
                margin-top: 6px;
            }

            span {
                width: 80px;
                color: ${theme.colors.palette.gray400};
            }

            strong {
                font-size: 15px;
                font-weight: 700;
            }
        }
    }

    .guide-box {
        margin-top: 20px;

        p {
            margin: 0;

            & + p {
                margin-top: 12px;
            }
        }

        strong {
            font-weight: 700;
        }
    }

    .thanks {
        margin: 20px 0 0;
        padding-top: 16px;
        border-top: 1px solid ${theme.colors.palette.gray300};
        font-weight: 600;
    }
`;
export default ProjectInformationModal;
