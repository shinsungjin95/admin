import React, {useState} from "react";
import {IoIosEye, IoIosEyeOff} from "react-icons/io";
import {InputWrapper} from "@components/Input/style.tsx";


type InputProps = {
    placeholder?: string;
    id?: string;
    inputType?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    label?: string;
    name?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    checked?: boolean;
    autoComplete?: string;
    typeChange?: string;
    maxlength?: number;
    height?: string;
    onEyes?: "on" | "off";
    setTypeChange?: (type: string) => void;
};

const Input: React.FC<InputProps> = (
    {
        placeholder,
        id,
        inputType = "text",
        onChange,
        onClick,
        value,
        label,
        onBlur,
        onEyes,
        name,
        autoFocus,
        setTypeChange,
        onKeyDown,
        onFocus,
        disabled,
        readOnly,
        checked,
        maxlength,
        height = null,
    }
) => {
    const [eye, setEye] = useState<boolean>(false);
    const renderInput = (extraProps = {}) => (
        <input
            id={id}
            placeholder={placeholder}
            type={inputType}
            onChange={onChange}
            onClick={onClick}
            name={name}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete="off"
            autoFocus={!!autoFocus}
            maxLength={maxlength}
            {...extraProps}
        />
    );
    return (
        <InputWrapper
            className={"input-wrapper"}
            $typeName={inputType}
            $height={height}
        >
            {
                inputType === "checkbox" || inputType === "radio" ? (
                    <label>
                        {renderInput(
                            inputType === "checkbox"
                                ? { checked: !!checked }
                                : { checked: !!checked, value }
                        )}
                        {label}
                    </label>
                ) : (
                    renderInput({ value: value ?? "" })
                )
            }
            {onEyes === "on" ?
                eye === false
                    ? <div className={"eyes"} onClick={() => {
                        setTypeChange("text")
                        setEye((prev) => !prev);
                    }}><IoIosEye/></div>
                    : <div className={"eyes"} onClick={() => {
                        setTypeChange("password")
                        setEye((prev) => !prev);
                    }}><IoIosEyeOff/></div>
                : null
            }
        </InputWrapper>
    );
};



export default Input;
