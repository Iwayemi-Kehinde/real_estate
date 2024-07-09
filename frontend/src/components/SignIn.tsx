import React from "react"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {signInStart, signInFaliure, signInSuccess} from "../redux/user/userSlice"

interface FormData {
  email: string;
  password: string;
}


const Signin = () => {
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: ""
  })
 const {loading, error} = useSelector((state: any) => state.user)
  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const dispatch = useDispatch()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) {
        dispatch(signInFaliure(data.message))
        toast.error(data.message)
        return 
      }
      dispatch(signInSuccess(data))
      toast.success("Login was successful!")
      navigate("/")
    } catch (error: any) {
      dispatch(signInFaliure(error.message))
      toast.error("An error occured. Please try again later")
    } 
  }
  return (
    <div className="min-h-[100vh] bg-blue-100 flex justify-center">
      <div className="my-20">
        <h2 className="text-gray-800 mb-10 text-center">LOGIN TO YOUR ACCOUNT</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg w-[500px] min-h-[350px] py-6 px-12">
          
          <div className="mb-[12px]">
            <label className="block text-lg">Email:</label>
            <input type="email" required className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none" placeholder="email" id="email" onChange={handleChange}/>
          </div>



          <div className="mb-[12px]">
            <label className="block text-lg">Password:</label>
            <input type="password" className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none" placeholder="password" id="password" onChange={handleChange}/>
          </div>






          <div className="mb-[30px]">
            <p className="block text-lg">{"Don't have an account"} <Link to="/signup" className="text-blue-500 cursor-pointer">Sign up</Link></p>
          </div>


          <div className="text-center">
            <button type="submit" className=" w-[100%] cursor-pointer p-1 text-lg rounded-[3px] text-white bg-blue-500 border-0 hover:opacity-90  disabled:opacity-50 transition" disabled={loading}>{loading ? "Loading..." : "Login" }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;

//whta is redux persisi
