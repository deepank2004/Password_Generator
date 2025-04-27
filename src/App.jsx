import { useState, useCallback } from 'react'

function App() {
  const [Length, setLength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [Password, setPassword] = useState("")

  const PasswordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += '0123456789'
    if(charAllowed) str += "!@#$%^"

    for(let i=1; i<length; i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass = str.charAt(char)
    }

    setPassword(pass)
  } , [length, numAllowed, charAllowed, setPassword])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className=' text-center text-white'>Password Generator</h1>
        <div className='className = "flex  shadow rounded-lg overflow-hidden mb-4"'>
          <input type="text" value={Password} className='outline-none w-full py-1 px-3 'placeholder='password' readonly/>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
      </div>
    </>
  )
}

export default App
