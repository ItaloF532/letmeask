import { useState } from "react"


export function Button() {
  const [ n, setN ] = useState(0);
  return (
    <button onClick={()=> setN(n+1)}>{n}</button>
  )
}