
import { useState } from 'react';
import './App.css';
import { loginUser } from './service/operations/auth';

function App() {

  const loginwithgoogle = ()=>{
    window.open("http://localhost:4000/auth/google/callback","_self")
}
  const [formData,setFormData] = useState();

  const handleChange = (e) => {
     setFormData(() => ({
      ...formData,
      [e.target.name] : e.target.value
     }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData)

    await loginUser(formData)
  }

  return (
    <div className="w-full h-[50vh] flex items-center justify-center ">
     <div onClick={loginwithgoogle}
     className='p-2 border border-black rounded-md bg-yellow-500 w-fit cursor-pointer'>
      Continue with Google
     </div>

     <form>
      <input
      type='text'
      placeholder='email'
      name='email'
      required
      onChange={handleChange}
      />

     <input
      type='text'
      placeholder='password'
      name='password'
      required
      onChange={handleChange}
      />
      <button onClick={handleSubmit}>submit</button>
     </form>
    </div>
  );
}

export default App;
