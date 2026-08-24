import CardSection from "@/components/Layout/CardSection.tsx";
import {observer} from "mobx-react";
import {useStore} from "@/store";
import {useEffect, useState} from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { findCurrentMenu } from "@/util/menu.ts";
import { CONTENT_INIT_FORM, CONTENT_LIST_COLUMN, CONTENT_SEARCH_FIELDS, getContentColumns, getContentLimit } from "./controller";
import { buildSearchParams, cleanParams, createParams, parseSearchParams, updateFormData, updateSearchParams } from "@/util/search";
import { CustomList, FormTable, ListTable } from "@/components/Table";
import { ButtonWrap } from "@/styles/CommonStyle";
import Button from "@/components/Button";
import { IoIosRefresh } from "react-icons/io";
import styled from "styled-components";
import TablePageNation from "@/components/Table/PageNation";
import { getOrderNumber } from "@/util";
import moment from "moment/moment";
import { FaRegImage } from "react-icons/fa6";
import { MODAL_PAYLOAD } from "@/constants/Modal";
import { PiEmptyBold } from "react-icons/pi";
import Input from "@/components/Input";
import { setToast } from "@/util/toast";


const HomePageContentSetting = observer(() => {
    const {menuStore, contentStore, modalStore} = useStore();
    const [checkedList, setCheckedList] = useState<number[]>([]);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const {limit, ...contentSearchInitForm} = CONTENT_INIT_FORM;
    const [searchParams, setSearchParams] = useSearchParams(cleanParams(contentSearchInitForm));
    const menuId = searchParams.get("menuId");
    const type = searchParams.get("type");
    const subtype = searchParams.get("subtype");
    const defaultLimit = getContentLimit(subtype);
    const contentInitForm = {...CONTENT_INIT_FORM, limit: defaultLimit};
    const fixedParams = {menuId, type, subtype};
    const currentMenu = findCurrentMenu(menuStore.currentMenuData, pathname, menuId);
    const columns = getContentColumns(subtype);
    const [formData, setFormData] = useState(() => ({
        ...contentInitForm,
        ...parseSearchParams(searchParams),
    }));
    const currentPage = parseInt(searchParams.get("offset")) || contentInitForm.offset;
    const currentLimit = parseInt(searchParams.get("limit")) || contentInitForm.limit;
    

    const setForm = (e) => {
        const { key, value, type, checked } = e.target;
        setFormData(updateFormData(key, value, type, checked));
    };

    const setPaging = (page) => {
        setCheckedList([]);
        setSearchParams(updateSearchParams(searchParams, { offset: page }));
    };

    const setClearTable = () => {
        setFormData(contentInitForm);
        const params = createParams(cleanParams(contentInitForm), fixedParams);
        setSearchParams(params);
    };

    const setDrawTable = () => {
        const params = createParams(buildSearchParams(formData), fixedParams);
        params.set("offset", "1");
        params.set("limit", String(currentLimit));
        setSearchParams(params);
    };

    const setContentDetailView = (detailId = undefined) => {
        navigate(`detail?menuId=${menuId}${detailId ? `&detailId=${detailId}` : ""}`);
    };

    const setListRender = (row, idx, col, type) => {
        if (col.key === "checked") {
            return (
                <Input
                    inputType={"checkbox"}
                    checked={checkedList.includes(idx)}
                    onChange={() => setChecked(idx)}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            );
        }
        if (col.key === "no") {
            return (
                getOrderNumber(contentStore.contentCount, idx, currentPage - 1, currentLimit)
            );
        }
        if (col.key === "image") {
            if(type === "list"){
                if(row.images && row.images.length > 0){
                    return (
                        <div className={"cursor-pointer"} onClick={(e) => {
                                e.stopPropagation();
                                modalStore.open(
                                    MODAL_PAYLOAD.IMAGE_PREVIEW_MODAL({
                                        props: {
                                            title: "이미지 미리보기",
                                            url: row.images[0]?.url,
                                        },
                                    })
                                );
                            }}>
                            <FaRegImage size={20}/>
                        </div>
                    )
                } else{
                    return "-";
                }
            } else{
                if(row.images && row.images.length > 0){
                    return (
                        <img src={row.images[0]?.url} alt="이미지 미리보기" />
                    )
                } else{
                    return <PiEmptyBold size={50}/>
                }
            }
        }
        if (col.key === "updated_at") {
            return(
                moment(row.updated_at).format("YYYY-MM-DD HH:mm")
            )
        }
        return row[col.key];
    }

    const setChecked = (idx: number) => {
        setCheckedList((prev) => {
            if (prev.includes(idx)) {
                return prev.filter((item) => item !== idx);
            }
            return [...prev, idx];
        });
    };


    const setCheckedAll = (checked: boolean) => {
        if (checked) {
            setCheckedList(
                contentStore.contentList.map((_, idx) => idx)
            );
        } else {
            setCheckedList([]);
        }
    };

    const setListDeleteFunc = () => {
        if(checkedList.length === 0){
            setToast("warning", "선택후 사용해 주세요.");
            return;
        }
        modalStore.open(
            MODAL_PAYLOAD.BASIC_CONFIRM({
                props: {
                    message: `삭제시 데이터는 모두 삭제 됩니다.\n진행 하시겟습니까?`,
                    onConfirm: async () => {
                        try{
                            const response = await contentStore.setDeleteContent(checkedList);
                            console.log(response)
                            if(response.data.success){
                                // setClearTable();
                                const fetchParams = createParams(
                                    searchParams,
                                    {
                                        limit: currentLimit,
                                    }
                                );
                                const result = await contentStore.getContentTable(fetchParams);
                                console.log(result)
                                
                                setCheckedList([]);
                                if (
                                    contentStore.contentList.length === 0 &&
                                    currentPage > 0
                                ) {
                                    setSearchParams(
                                        updateSearchParams(
                                            searchParams,
                                            {
                                                offset: currentPage - 1,
                                            }
                                        )
                                    );
                                }
                            }
                            setToast("success", "삭제 되었습니다.");
                        }catch(e){
                            console.log(e)
                        }
                    },
                },
            })
        );
    }


    useEffect(() => {
        const fetchParams = createParams(searchParams, {
            limit: currentLimit,
        });
        setCheckedList([]);
        contentStore.getContentTable(fetchParams).catch((error) => {
            console.log(error);
        });
    }, [searchParams]);

    useEffect(() => {
        return(() => {
            contentStore.setContentListDataClear();
        });
    }, []);

    return (
        <>
            {
                currentMenu &&
                <HomepageContentWrap>
                    <CardSection title={currentMenu.title}>
                        <FormTable
                            fields={CONTENT_SEARCH_FIELDS}
                            formData={formData}
                            handleFormChange={setForm}
                        />
                        <ButtonWrap>
                            <Button outlined size={"sm"} radius={"sm"} onClick={setClearTable}>
                                <IoIosRefresh /> 초기화
                            </Button>
                            <Button size={"sm"} radius={"sm"} onClick={setDrawTable}>
                                검색
                            </Button>
                        </ButtonWrap>
                        <TableDataList>
                            <div className={"table-control-head"}>
                                <div className={"summery-wrap"}>
                                    총: {contentStore.contentCount} 개
                                </div>
                                <Button size={"sm"} radius={"sm"} outlined onClick={setListDeleteFunc}>
                                    삭제
                                </Button>
                            </div>
                            <div className={"table-wrap"}>
                                {subtype === "list" ? (
                                    <ListTable
                                        columns={columns}
                                        rows={contentStore.contentList}
                                        checkedList={checkedList}
                                        onCheckedAll={setCheckedAll}
                                        onRowClick={(row) => {
                                            setContentDetailView(row.id);
                                        }}
                                        renderCell={(row, idx, col) =>
                                            setListRender(row, idx, col, subtype)
                                        }
                                    />
                                ) : (
                                    <CustomList
                                        className={subtype}
                                        columns={columns}
                                        rows={contentStore.contentList}
                                        onRowClick={(row) => {
                                            setContentDetailView(row.id);
                                        }}
                                        renderCell={(row, idx, col) =>
                                            setListRender(row, idx, col, subtype)
                                        }
                                    />
                                )}
                            </div>
                            <TablePageNation
                                currentPage={currentPage}
                                totalCount={contentStore.contentCount ?? 0}
                                limit={currentLimit}
                                offsetFunc={setPaging}
                            />
                        </TableDataList>
                    </CardSection>
                    <div className={"title-btn-wrap"}>
                        <Button size={"sm"} radius={"sm"} onClick={() => {
                                setContentDetailView()
                            }}>
                            컨텐츠 등록
                        </Button>
                    </div>
                </HomepageContentWrap>
            }
            
        </>
    );
});


const TableDataList = styled.div`
    margin-top: 50px;
    .table-control-head{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .table-wrap{
        margin: 20px 0 0;
    }
`;

const HomepageContentWrap = styled.div`
    position: relative;

    .title-btn-wrap {
        position: absolute;
        top: -10px;
        right: 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;





export default HomePageContentSetting;