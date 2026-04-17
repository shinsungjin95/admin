import Select from "react-select";
import {InputChecked, SelectInputField} from "@components/Table/style.tsx";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "@/components/DatePicker";
import Input from "@components/Input";

const FIELD_RENDERERS = {
    "input": ({field, formData, handleChange}) => (
        <Input
            inputType={"text"}
            value={formData[field.key] ?? ""}
            placeholder={field.placeholder ?? ""}
            onChange={(e) => {
                handleChange({
                    target: {
                        key: field.key,
                        value: e.target.value,
                    },
                });
            }}
        />
    ),

    "textarea": ({field, formData, handleChange}) => (
        <textarea
            name={field.key}
            value={formData[field.key] ?? ""}
            placeholder={field.placeholder ?? ""}
            onChange={(e) => {
                handleChange({
                    target: {
                        key: field.key,
                        value: e.target.value,
                    },
                });
            }}
            rows={4}
        />
    ),

    "select": ({field, formData, handleChange}) => (
        <Select
            isSearchable={false}
            className={"custom-select"}
            classNamePrefix={"react-select"}
            options={field.options ?? []}
            placeholder={field.placeholder ?? "선택하세요"}
            value={field.options?.find((option) => option.value === formData?.[field.key]) ?? null}
            onChange={(selectedOption) => {
                handleChange({
                    target: {
                        key: field.key,
                        value: selectedOption?.value ?? "",
                    },
                });
            }}
        />
    ),

    "select-input": ({field, formData, handleChange}) => (
        <SelectInputField>
            <Select
                isSearchable={false}
                className={"custom-select"}
                classNamePrefix={"react-select"}
                name={field.selectName}
                options={field.options ?? []}
                placeholder={field.selectPlaceholder ?? "선택하세요"}
                value={field.options?.find((option) => option.value === formData?.[field.selectKey]) ?? null}
                onChange={(selectedOption) => {
                    handleChange({
                        target: {
                            key: field.selectKey,
                            value: selectedOption?.value ?? "",
                        },
                    });
                }}
            />
            <Input
                inputType={"text"}
                value={formData?.[field.stringKey] ?? ""}
                placeholder={field.inputPlaceholder ?? ""}
                onChange={(e) => {
                    handleChange({
                        target: {
                            key: field.stringKey,
                            value: e.target.value,
                        },
                    });
                }}
            />
        </SelectInputField>
    ),

    "checkbox": ({field, formData, handleChange}) => (
        <InputChecked>
            {field.options?.map((option) => {
                const checkedValues = formData?.[field.key] ?? [];
                const isChecked = checkedValues.includes(option.value);

                return (
                    <Input
                        key={option.value}
                        inputType={"checkbox"}
                        value={option.value}
                        checked={isChecked}
                        label={option.label}
                        onChange={(event) => {
                            const previousValues = formData?.[field.key] ?? [];

                            const nextValues = event.target.checked
                                ? previousValues.concat(option.value)
                                : previousValues.filter((value) => value !== option.value);

                            handleChange({
                                target: {
                                    key: field.key,
                                    value: nextValues,
                                },
                            });
                        }}
                    />
                );
            })}
        </InputChecked>
    ),

    "radio": ({field, formData, handleChange}) => (
        <InputChecked>
            {field.options?.map((option) => {
                const isChecked = formData?.[field.key] === option.value;

                return (
                    <Input
                        key={option.value}
                        inputType={"radio"}
                        label={option.label}
                        name={"radio_state"}
                        value={option.value}
                        checked={isChecked}
                        onChange={(event) => {
                            handleChange({
                                target: {
                                    key: field.key,
                                    value: event.target.value,
                                },
                            });
                        }}
                    />
                );
            })}
        </InputChecked>
    ),


    "date-picker": ({
                        field,
                        formData,
                        handleChange,
                    }) => {
        const value = {
            [field.keyMap.from]: formData[field.keyMap.from],
            [field.keyMap.to]: formData[field.keyMap.to]
        };
        return (
            <DatePicker
                type={field.dateType}
                dateValue={value}
                setDateValue={(date) => {
                    Object.entries(field.keyMap as Record<string, string>).forEach(([type, key]) => {
                        handleChange({
                            target: {
                                key: field.keyMap[type],
                                value: date[key],
                            },
                        });
                    });
                }}
                initValue={field.initialValue}
                numberOfMonths={2}
                reset={true}
                quickButton={true}
                keyMap={field.keyMap}
            />
        );
    },
};

export const renderField = (props) => {
    const renderer = FIELD_RENDERERS[props.field.type];
    if (!renderer) return null;
    return renderer(props);
};