import React from "react"

const ReadMore = ({children}) => {
  const [open, setOpen] = React.useState(false)
  const toggle = (e) => {
    e.preventDefault()
    setOpen(!open)
  }
  return <div>
    <a href="#" onClick={(e) => toggle(e)}>Read {open ? 'less' : 'more'}...</a>
    <div className={open ? '' : 'hidden'}>
      {children}
    </div>
  </div>
}

export default ReadMore