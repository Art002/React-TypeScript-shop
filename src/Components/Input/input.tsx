import React, { FC } from 'react';

type InputType = {
    type: string
    placeholder: string
    changeHandler: (e: any) => void
}

const Input:FC<InputType> = ({ type, placeholder, changeHandler }) => {
    return (
        <input type={type} placeholder={placeholder} onChange={changeHandler}></input>
    )
}

export default Input