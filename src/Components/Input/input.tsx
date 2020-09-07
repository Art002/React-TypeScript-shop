import React, { FC } from 'react';

type InputType = {
    type: string
    placeholder: string
}

const Input:FC<InputType> = ({type, placeholder}) => {
    return (
        <input type={type} placeholder={placeholder}></input>
    )
}

export default Input