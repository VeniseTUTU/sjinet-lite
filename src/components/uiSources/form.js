import React, {Component, useState} from "react";
import '../../scss/form.scss';


export const Input = ({className,errLog,type,name,placeholder,onChange}) => (
     
    <label className={className} htmlFor="name"> {errLog}
    <input 
       type={type}
       name={name}
       placeholder={placeholder}
       onChange= {(e) => onChange(e)}
       
      />                 
    </label> 
);

export const Button = ({className,text,submit,onSubmit}) => (
     
    
    <button className={className} type={submit} onSubmit= {(e) => onSubmit(e)} >
     {text}
    </button>                 
    
);
        
    

