import { useSelector } from "react-redux"
const Profile = () => {
  const {currentUser} = useSelector((state: any) => state.user)
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form className="flex flex-col">
        <img className="rounded-full h-24 w-24 object-cover cursor-pointer self-center" src={"../assets/react.svg"} alt="img" />
        
        <input type="text" placeholder="username" className="border p-3 rounded-sm" id="username"/>

        <input type="email" placeholder="email" className="border p-3 rounded-sm" id="email"/>

        <input type="text" placeholder="password" className="border p-3 rounded-sm" id="password"/>

        <button type="submit" className="bg-red-600 text-white p-3 uppercase hover:opacity-95 disabled:opacity-70">update</button>


      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>

        <span className="text-red-700 cursor-pointer">Signout</span>
      </div>
    </div>
  )
}

export default Profile