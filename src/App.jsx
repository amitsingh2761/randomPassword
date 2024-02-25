import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css'
function App() {
  const [password, setPassword] = useState("password");
  const [length, setLength] = useState(8);
  const [isNum, setNum] = useState(true);
  const [isSymbol, setSymbol] = useState(false);

  const passwordRef = useRef(null);

  const copyPassword=useCallback(()=>{
  passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password]);

  const randomPasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (isNum) {
      str += "1234567890";
    }
    if (isSymbol) {
      str += "!@#$%^&*()_";
    }

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, isNum, isSymbol]);

  const handleLength = (e) => {
    setLength(parseInt(e.target.value));
  };

  const handleNum = (e) => {
    setNum(e.target.checked);
  };

  const handleSymbol = (e) => {
    setSymbol(e.target.checked);
  };

  useEffect(() => {
    randomPasswordGenerator();
  }, [length, isNum, isSymbol, randomPasswordGenerator]);

  return (
    <>
      <h1 className='text-white font-serif text-3xl my-3 font-extrabold'>Random Password Generator</h1>
      <div className='w-full max-w-md  mx-auto shadow-md bg-gray-600 text-white font-bold text-2xl rounded-lg p-3'>Password
        <div className='flex overflow-hidden' id='passbox'>
          <input type='text' className='w-full flex max-w-md mx-auto shadow-md font-bold text-lg font-mono text-orange-500 p-2 m-2 rounded-lg'
            value={password} placeholder='password' readOnly ref={passwordRef}  />
          <button type="button" onClick={copyPassword} className="outline-none bg-green-500 text-white rounded-xl text-lg hover:bg-green-400 hover:text-white active:bg-green-600 mx-2 srink-0 py-0.5 p-8 h-12 mt-1.5">Copy</button>
        </div>
        <div className="flex text-sm justify-center mt-2">
          <div className='inline mx-2'><input type='range' name='length' min={4}
            max={20} value={length} className='cursor-pointer mx-1 text-lg' onChange={handleLength} /> Length : {length}</div>
          <div className='inline mx-2'>Number<input type="checkbox" checked={isNum} value={isNum} name='isNum' className='mx-1' onChange={handleNum} /></div>
          <div className='inline mx-2'>Symbol<input type="checkbox" checked={isSymbol} value={isSymbol} name='isSymbol' className='mx-1' onChange={handleSymbol} /></div>
        </div>
      </div>
    </>
  );
}

export default App;
