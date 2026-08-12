import Button from "@/components/Button";
import Input from "@/components/Input";
import CardSection from "@/components/Layout/CardSection";
import { useStore } from "@/store";
import { ButtonWrap } from "@/styles/CommonStyle";
import { observer } from "mobx-react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { setToast } from "@/util/toast";
import { theme } from "@/styles/theme";

const HomePageContentDetail = observer(() => {
    const {contentStore} = useStore();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const menuId = searchParams.get("menuId");
    const detailId = searchParams.get("detailId");
    const editorRef = useRef<Editor>(null);

    const cancelContent = () => {
        navigate(-1);
    }
    const confirmContent = async () => {
        if (!contentStore.contentData.title.trim()) {
            setToast("warning", "제목을 입력해 주세요.");
            return;
        }
        try {
            const response = await contentStore.setContentData(menuId, detailId)
            if (response.data.success) {
                setToast("success", `${detailId ? "수정" : "등록"} 되었습니다.`);
                navigate(-1);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!detailId) return;
        contentStore.getContentDetialData(detailId).then(() => {
            const editor = editorRef.current?.getInstance();
            if (!editor) return;
            editor.setHTML(contentStore.contentData.content || "");
        }).catch((error) => {
            console.log(error);
        });
    }, [detailId]);


    useEffect(() => {
        return(() => {
            contentStore.setcontentDataClear();
        });
    }, []);

    return(
        <ContentDetailWrap>
            <CardSection title={`${detailId ?  "수정" : "신규 등록"}`}>
                <div className={"form-wrap"}>
                    <div className={"wrap-row"}>
                        <div className={"title"}>제목</div>
                        <div className={"inner"}>
                            <Input
                                inputType={"text"}
                                value={contentStore.contentData.title}
                                placeholder={"텍스트를 입력해 주세요."}
                                onChange={(e) => {
                                    contentStore.setcontentData("title", e.target.value)
                                }}
                            />
                        </div>
                    </div>
                    <div className={"wrap-row"}>
                        <div className={"title"}>이미지 업로드</div>

                        <div className={"inner"}>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                    const files = Array.from(e.target.files || []);
                                    if (!files.length) return;
                                    contentStore.addContentFiles(files);
                                    e.target.value = "";
                                }}
                            />
                            <ImageList>
                                {contentStore.contentData.images.map((image, index) => (
                                    <ImageItem key={`existing-${image.url}`}>
                                        <img src={image.url} alt=""/>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                contentStore.removeContentImage(index);
                                            }}
                                        >
                                            ×
                                        </button>
                                    </ImageItem>
                                ))}

                                {/* 새로 선택한 이미지 */}
                                {contentStore.contentData.files.map((file, index) => (
                                    <NewImage
                                        key={`new-${file.name}-${file.lastModified}-${index}`}
                                        file={file}
                                        onRemove={() => {
                                            contentStore.removeContentFile(index);
                                        }}
                                    />
                                ))}
                            </ImageList>
                        </div>
                    </div>
                    <div className={"wrap-row"}>
                        <div className={"title"}>내용</div>

                        <div className={"inner"}>
                            <Editor
                                ref={editorRef}
                                initialValue=""
                                initialEditType="wysiwyg"
                                hideModeSwitch={true}
                                previewStyle="vertical"
                                height="500px"
                                useCommandShortcut={true}
                                toolbarItems={[
                                    ["heading", "bold", "italic", "strike"],
                                    ["hr", "quote"],
                                    ["ul", "ol", "task"],
                                    ["table", "link"],
                                ]}
                                onChange={() => {
                                    const editor = editorRef.current?.getInstance();

                                    if (!editor) return;

                                    contentStore.setcontentData(
                                        "content",
                                        editor.getHTML()
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
                <ButtonWrap>
                    <Button outlined size={"sm"} radius={"sm"} onClick={cancelContent}>
                        취소
                    </Button>
                    <Button size={"sm"} radius={"sm"} onClick={ async () => {
                       await confirmContent();
                    }}>
                        {detailId ?  "수정" : "등록"}
                    </Button>
                </ButtonWrap>
            </CardSection>
        </ContentDetailWrap>
    )
});

const NewImage = ({
    file,
    onRemove,
}: {
    file: File;
    onRemove: () => void;
}) => {
    const imageUrl = URL.createObjectURL(file);

    return (
        <ImageItem>
            <img
                src={imageUrl}
                alt={file.name}
            />

            <button
                type="button"
                onClick={onRemove}
            >
                ×
            </button>
        </ImageItem>
    );
};

const ContentDetailWrap = styled.div`
        .form-wrap{
            border: 1px solid ${theme.colors.palette.brand700};
            border-bottom: none;
            .wrap-row{
                display: flex;
                align-items: stretch;
                border-bottom: 1px solid ${theme.colors.palette.brand700};
                .title{
                    width: 150px;
                    flex-shrink: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: ${theme.colors.palette.brand700};
                    color: ${theme.colors.palette.white};
                }
                .inner{
                    width: 100%;
                    padding: 20px;
                }
            }
        }
`
const ImageList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
`;

const ImageItem = styled.div`
    position: relative;
    width: 120px;
    height: 120px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
    }

    button {
        position: absolute;
        top: 5px;
        right: 5px;

        width: 24px;
        height: 24px;

        border: 0;
        border-radius: 50%;
        cursor: pointer;
    }
`;

export default HomePageContentDetail