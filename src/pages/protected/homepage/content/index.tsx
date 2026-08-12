import CardSection from "@/components/Layout/CardSection.tsx";
import {observer} from "mobx-react";
import {useStore} from "@/store";
import {useEffect, useState} from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { findCurrentMenu } from "@/util/menu.ts";
import { CONTENT_INIT_FORM, CONTENT_LIST_COLUMN, CONTENT_SEARCH_FIELDS } from "./controller";
import { buildSearchParams, cleanParams, createParams, parseSearchParams, updateFormData, updateSearchParams } from "@/util/search";
import { FormTable, ListTable } from "@/components/Table";
import { ButtonWrap } from "@/styles/CommonStyle";
import Button from "@/components/Button";
import { IoIosRefresh } from "react-icons/io";
import styled from "styled-components";
import TablePageNation from "@/components/Table/PageNation";
import { getOrderNumber } from "@/util";
import moment from "moment/moment";
import { FaRegImage } from "react-icons/fa6";
import { MODAL_PAYLOAD } from "@/constants/Modal";
import ROUTES from "@/constants/routes";


const HomePageContentSetting = observer(() => {
    const {menuStore, contentStore, modalStore} = useStore();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [searchParams, setSearchParams] = useSearchParams(cleanParams(CONTENT_INIT_FORM));
    const menuId = searchParams.get("menuId");
    const type = searchParams.get("type");
    const subtype = searchParams.get("subtype");
    const fixedParams = {menuId, type, subtype};
    const currentMenu = findCurrentMenu(
        menuStore.currentMenuData,
        pathname,
        menuId
    );

    const [formData, setFormData] = useState(() => ({
        ...CONTENT_INIT_FORM,
        ...parseSearchParams(searchParams),
    }));
    const currentPage = parseInt(searchParams.get("offset")) || CONTENT_INIT_FORM["offset"];
    const currentLimit = parseInt(searchParams.get("limit")) || CONTENT_INIT_FORM["limit"];
    const setForm = (e) => {
        const { key, value, type, checked } = e.target;
        setFormData(updateFormData(key, value, type, checked));
    };
    const setPaging = (page) => {
        setSearchParams(updateSearchParams(searchParams, { offset: page }));
    };

    const setClearTable = () => {
        setFormData(CONTENT_INIT_FORM);
        const params = createParams(cleanParams(CONTENT_INIT_FORM), fixedParams);
        setSearchParams(params);
    };

    const setDrawTable = () => {
        const params = createParams(buildSearchParams(formData), fixedParams);
        params.set("offset", "1");
        params.set("limit", String(currentLimit));
        setSearchParams(params);
    };

    const setContentDetailView = (detailId = undefined) => {
        navigate(
            `detail?menuId=${menuId}${detailId ? `&detailId=${detailId}` : ""}`
        );
    };

    useEffect(() => {
        contentStore.getFetchTable(searchParams).then().catch((error) => {
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
                            <div className={"summery-wrap"}>
                                총: {contentStore.contentCount} 개
                            </div>
                            <div className={"table-wrap"}>
                                {
                                    subtype === "list" ?
                                    <ListTable
                                        columns={CONTENT_LIST_COLUMN}
                                        rows={contentStore.contentList}
                                        onRowClick={(row) => {
                                            setContentDetailView(row.id);
                                        }}
                                        renderCell={(row, idx, col) => {
                                            if (col.key === "no") {
                                                return (
                                                    getOrderNumber(contentStore.contentCount, idx, currentPage - 1, currentLimit)
                                                );
                                            }
                                            if (col.key === "image") {
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
                                            }
                                            if (col.key === "updated_at") {
                                                return(
                                                    moment(row.updated_at).format("YYYY-MM-DD HH:mm")
                                                )
                                            }
                                            return row[col.key];
                                        }}
                                    /> : 
                                    subtype === "card" ? 
                                    <></> : 
                                    subtype === "thumb" ? 
                                    <></> : null
                                }
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
                        <Button
                            size={"sm"}
                            outlined
                            onClick={() => {
                                setContentDetailView()
                            }}
                        >
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
    .table-wrap{
        margin: 20px 0;
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