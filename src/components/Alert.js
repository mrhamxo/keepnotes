import React from 'react'

export default function ALert(props) {
    const capitalise = (string) => {
        if(string === 'danger'){
            return string = "Error";
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  return (
    <div style={{height: '50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} text-center alert-dismissible fade show`} role="alert">
        <strong>{capitalise(props.alert.type)}</strong> : {props.alert.msg}
      </div>}
    </div>
    
  )
}
