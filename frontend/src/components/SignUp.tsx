import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import React from "react"
const SignUp = () => {
  const [formData, setFormData] = React.useState<{}>({})
  const [error, setError] = React.useState<string>("")
  const [loading, setLoading] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        setError(data.message)
        return 
      }
      setLoading(false)
      setError("")
      navigate("/signin")
    } catch (error: any) {
      setLoading(false)
      setError(error.message)
    }
  }
  return (
    <div className="min-h-[100vh] bg-blue-100 flex justify-center">
      <div className="my-20">
        <h2 className="text-gray-800 mb-10 text-center">CREATE AN ACCOUNT</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg w-[500px] h-[500px] py-6 px-12">
          <div className="mb-[12px]">
            <label className="block text-lg">username:</label>
            <input type="text" className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none" placeholder="username" onChange={ handleChange}  id="username"/>
          </div>

          
          <div className="mb-[12px]">
            <label className="block text-lg">email:</label>
            <input type="email" required className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none" placeholder="email" id="email" onChange={ handleChange}/>
          </div>



          <div className="mb-[12px]">
            <label className="block text-lg">password:</label>
            <input type="password" className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none" placeholder="password" id="password" onChange={ handleChange}/>
          </div>





          <div className="mb-[12px]">
            <label className="block text-lg">confirm password:</label>
            <input type="text" className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none" placeholder="confirm password" id="confirmPassword" onChange={ handleChange} />
          </div>


          <div className="mb-[30px]">
            <p className="block text-lg">Already have an account? <Link to="/signin" className="text-blue-500 cursor-pointer">Sign In</Link></p>
          </div>

          <div className="text-center">
            <button disabled={loading} type="submit" className=" w-[100%] cursor-pointer p-1 text-lg rounded-[3px] text-white bg-blue-500 border-0 hover:opacity-90  disabled:opacity-50 transition">{
              loading ? "Loading..." : "Get Started"
            }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
