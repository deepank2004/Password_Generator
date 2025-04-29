import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [Length, setLength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [Password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += '0123456789'
    if (charAllowed) str += "!@#$%^"

    for (let i = 1; i < Length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [Length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=>{PasswordGenerator()},[Length, numAllowed, charAllowed, PasswordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className=' text-center text-white'>Password Generator</h1>
        <div className="flex  shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={Password} className='outline-none w-full py-1 px-3 ' placeholder='password' readonly ref={passwordRef}/>
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={Length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} />
            <label>Length: {Length}</label>
          </div>
          <div className="flex itmes-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setnumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex itmes-center gap-x-1">
            <input type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setnumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
