import React, { Component } from 'react';




const Select = ({id,label,classes,name,text, onChange, data}) => {
    return (
        <div>
       {(label)?<label htmlFor={id}>{label}</label>:null}
        <select className={classes?classes+" inputField":"inputField"} 
            id={id} 
            onChange={e=>onChange(e.currentTarget.value)} 
            name={name}>
            <option value="">{text}</option>
                {data.map((d) => (
                <option key={d} value={d}>
                {d}
            </option>
            ))}
        </select>
        </div>
      );
}
 
export default Select;