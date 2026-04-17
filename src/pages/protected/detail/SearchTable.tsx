import React, {useEffect, useState} from "react";
import { observer } from "mobx-react";
import { useStore } from "@/store";
import { IoIosRefresh } from "react-icons/io";
import CardTemplate from "@components/Layout/CardSection.tsx";
import {FormTable, ListTable} from "@components/Table";
import {buildSearchParams, cleanParams, parseSearchParams, updateFormData, updateSearchParams} from "@/util/search.ts";
import {useSearchParams} from "react-router-dom";
import Button from "@components/Button";
import {ButtonWrap} from "@styles/CommonStyle.tsx";
import {TableAdditional, TotalCount} from "@components/Table/style.tsx";
import TablePageNation from "@components/Table/PageNation.tsx";
import {getOrderNumber} from "@/util";

import styled from "styled-components";
import {EX_INIT_FORM, EX_LIST_COLUMN, SEARCH_FIELDS} from "@/pages/protected/detail/contoller";

const SearchTable = observer(() => {
    const { exampleStore } = useStore();
    const [searchParams, setSearchParams] = useSearchParams(cleanParams(EX_INIT_FORM));
    const [formData, setFormData] = useState(() => ({
        ...EX_INIT_FORM,
        ...parseSearchParams(searchParams),
    }));
    const currentPage = parseInt(searchParams.get("offset")) || EX_INIT_FORM["offset"];
    const limit = parseInt(searchParams.get("limit")) || EX_INIT_FORM["limit"];

    const setForm = (e) => {
        const { key, value, type, checked } = e.target;
        setFormData(updateFormData(key, value, type, checked));
    };
    const setPaging = (page) => {
        setSearchParams(updateSearchParams(searchParams, { offset: page }));
    };

    const setClearTable = () => {
        setFormData(EX_INIT_FORM);
        setSearchParams(cleanParams(EX_INIT_FORM));
    };

    const setDrawTable = () => {
        setSearchParams({
            ...buildSearchParams(formData),
            offset: "1",
            limit: `${limit}`,
        });
    };
    useEffect(() => {
        exampleStore.getFetchTable(searchParams).then().catch((error) => {
            console.log(error);
        })
    }, [searchParams]);

    useEffect(() => {
        return(() => {
            exampleStore.setDataClear();
        })
    }, []);
    return (
        <SearchTableWrap>
            <CardTemplate title="Search Table">
                <FormTable
                    fields={SEARCH_FIELDS}
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
            </CardTemplate>
            <CardTemplate title="Result Table">
                <TableAdditional>
                    <TotalCount>총 {exampleStore.totalCount ?? 0}건</TotalCount>
                </TableAdditional>
                <ListTable
                    columns={EX_LIST_COLUMN}
                    rows={exampleStore.list}
                    renderCell={(row, idx, col) => {
                        if (col.key === "no") {
                            return (
                                getOrderNumber(exampleStore.totalCount, idx, currentPage - 1, limit)
                            );
                        }
                        return row[col.key];
                    }}
                />
                <TablePageNation
                    currentPage={currentPage}
                    totalCount={exampleStore.totalCount ?? 0}
                    limit={limit}
                    offsetFunc={setPaging}
                />
            </CardTemplate>
        </SearchTableWrap>
    );
});

const SearchTableWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`

export default SearchTable;

