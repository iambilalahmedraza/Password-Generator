import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [CharAllowed, setCharAllowed] = useState(false);
  const [NumberAllowed, setNumberAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const PasswordReference = useRef(null)


  const passwordChanger = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let char = "~`! @#$%^&*()-_+={}[]|;:<>,./?";

    if (CharAllowed) str += char;
    if (NumberAllowed) str += num;

    for (let i = 1; i <= length; i++) {
      let password = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(password);
    }
    setPassword(pass);
  }, [length, CharAllowed, NumberAllowed, setPassword, setPassword]);

  const CopyPasswordToClipBoard = useCallback(()=>{
    PasswordReference.current?.select(Password)
    PasswordReference.current?.setSelectionRange(0,30)
    window.navigator.clipboard.writeText(Password)
  })
  

  useEffect(() => {
   passwordChanger()
    
  }, [length,CharAllowed,NumberAllowed,setPassword])
  

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={Password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={PasswordReference}
        />
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={CopyPasswordToClipBoard}>
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={6} max={50} value={length} onChange={(e)=>setLength(e.target.value)}/>
          length:{length}
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={NumberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={CharAllowed} onChange={(()=>setCharAllowed((prev)=>!prev))} />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
