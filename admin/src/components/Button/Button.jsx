import React from 'react'

const Button = ({style,title,bg}) => {
  return (
    <button className={bg?bg: style} >
        {title}
    </button>
  )
}

export default Button