import React, {useState} from "react";
import {IoIosEye, IoIosEyeOff} from "react-icons/io";
import {observer} from "mobx-react";
import {InputWrapper} from "@components/Input/style.tsx";

const Input = observer((
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
});



export default Input;
