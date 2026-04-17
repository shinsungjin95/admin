import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState, useRef, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import moment from "moment";
import { ko } from "date-fns/locale";
import {DateInputWrap, DatePickerArea, DatePickerWrap} from "@components/DatePicker/style.tsx";
import {
    formatValue,
    getActiveQuick,
    getQuickRange,

    handleReset,
    QUICK_DATE_LIST
} from "@components/DatePicker/controller";
import Input from "@components/Input";



const DatePicker = ({
                        type = "range",
                        dateValue,
                        setDateValue,
                        initValue,
                        numberOfMonths = 2,
                        reset = true,
                        quickButton = false,
                        quickDateDirection = "past",
                        keyMap = { from: "startDate", to: "endDate" },
                    }) => {
    const fromKey = keyMap.from;
    const toKey = keyMap.to;
    const [open, setOpen] = useState(false);
    const [hoveredDate, setHoveredDate] = useState(null);
    const activeQuick = getActiveQuick(dateValue, { fromKey, toKey });
    const [tempRange, setTempRange] = useState({
        [fromKey]: undefined,
        [toKey]: undefined,
    });
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);





    const handleQuickClick = (days) => {
        const range = getQuickRange(days, quickDateDirection, {fromKey, toKey});
        setTempRange(range);
        setDateValue(range);
        setOpen(false);
    };


    // ===== 선택 로직 =====
    const handleSelect = (val, selectedDay) => {
        if (!selectedDay) return;
        const dateStr = moment(selectedDay).format("YYYY-MM-DD");
        if (type === "range") {
            if (!tempRange[fromKey] || (tempRange[fromKey] && tempRange[toKey])) {
                setTempRange({
                    [fromKey]: dateStr,
                    [toKey]: undefined,
                });
                return;
            }
            if (tempRange[fromKey] && !tempRange[toKey]) {
                const next = {
                    [fromKey]: tempRange[fromKey],
                    [toKey]: dateStr,
                };
                setTempRange(next);
                setDateValue(next);
                setOpen(false);
            }
        }

        if (type === "single") {
            setDateValue(dateStr);
            setOpen(false);
        }
    };

    // ===== hover =====
    const modifiers = {
        hoverRange: (date) => {
            if (type !== "range") return false;
            if (!tempRange?.[fromKey] || tempRange?.[toKey] || !hoveredDate)
                return false;

            const mDate = moment(date);

            const start = moment(tempRange[fromKey]);
            const end = moment(hoveredDate);

            return mDate.isBetween(start, end, "day", "[]");
        },

        hoverEnd: (date) => {
            if (type !== "range") return false;
            if (!tempRange?.[fromKey] || tempRange?.[toKey] || !hoveredDate)
                return false;

            return moment(date).isSame(moment(hoveredDate), "day");
        },
    };

    return (
        <DatePickerArea ref={wrapperRef}>
            <DateInputWrap>
                <Input
                    value={formatValue(type, dateValue, {fromKey, toKey})}
                    readOnly
                    placeholder={"날짜 선택"}
                    onClick={() => {
                        setTempRange({
                            [fromKey]: dateValue?.[fromKey],
                            [toKey]: dateValue?.[toKey],
                        });
                        setOpen(prev => !prev);
                    }}
                />
                {reset && (
                    <div className={"reset-btn"} onClick={() => {handleReset(type, initValue, setDateValue, {fromKey, toKey})}}>
                        <IoCloseCircleOutline />
                    </div>
                )}
            </DateInputWrap>

            <DatePickerWrap className={`picker ${open ? "open" : ""}`}>
                {open && (
                    <>
                        {quickButton && type === "range" && (
                            <ul className={"quick-area"}>
                                {QUICK_DATE_LIST.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className={`quick-list ${activeQuick === item.value ? "active" : ""}`}
                                        onClick={() => handleQuickClick(item.value)}
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <DayPicker
                            {...({
                                mode: type === "range" ? "range" : "single",
                                min: 1,
                                locale: ko,
                                formatters: {
                                    formatCaption: (date) =>
                                        `${date.getFullYear()}년 ${date.getMonth() + 1}월`,
                                },
                                selected:
                                    type === "range"
                                        ? {
                                            from: tempRange?.[fromKey]
                                                ? moment(tempRange[fromKey]).toDate()
                                                : undefined,
                                            to: tempRange?.[toKey]
                                                ? moment(tempRange[toKey]).toDate()
                                                : undefined,
                                        }
                                        : tempRange?.[fromKey]
                                            ? moment(tempRange[fromKey]).toDate()
                                            : undefined,
                                onSelect: handleSelect,
                                numberOfMonths,
                                pagedNavigation: true,
                                showOutsideDays: true,
                                onDayMouseEnter: (date) => {
                                    if (
                                        type === "range" &&
                                        tempRange[fromKey] &&
                                        !tempRange[toKey]
                                    ) {
                                        setHoveredDate(moment(date).format("YYYY-MM-DD"));
                                    }
                                },
                                modifiers,
                                modifiersClassNames: {
                                    hoverRange: "hover-range",
                                    hoverEnd: "hover-end",
                                },
                            } as any)}
                        />
                    </>
                )}
            </DatePickerWrap>
        </DatePickerArea>
    );
};





export default DatePicker;

