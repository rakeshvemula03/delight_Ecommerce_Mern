import React, { useState } from "react";
import logo2 from "../pictures/assest/logo2.jpg";
import { Link } from "react-router-dom";
import { LuUserCircle2 } from "react-icons/lu";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state)=>state.user)
  


  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const dispatch= useDispatch()
  const handleLogout=()=>{
      dispatch(logoutRedux())
      toast("logged out successfully")

  }
  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/*desktop*/}
      <div className="flex items-center h-full justify-between ">
        <Link to={""}>
          <div className="h-12">
            <img src={logo2} className="h-full" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
        <nav className=" gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"menu/655aec325ccc987a3387e715"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          
          <div className="text-2xl text-slate-600 relative ">
          <Link to={"cart"} ><BsCartFill />
            <div className="absolute -top-2 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
              {cartItemNumber.length}
            </div>
            </Link>
          </div>
          <div className="text-2xl text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow">
              {userData.image ? <img src={userData.image} className="h-full w-full"/> : <LuUserCircle2 /> }
              
              
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {
                  userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to ={"newproduct"} className="whitespace-nowrap cursor-pointer text-sm">New Product</Link>
                }
               
                {
                  userData.image ? <p className="cursor-pointer text-red-600 text-sm" onClick={handleLogout}>Logout ({userData.firstName})</p> :
                  <Link to ={"login"} className="whitespace-nowrap cursor-pointer text-base">
                  Login
                </Link>
                }
                <nav className=" text-base md:text-lg flex flex-col md:hidden">
            <Link to={""}  className="px-2 py-1">Home</Link>
            <Link to={"menu/655aec325ccc987a3387e715"} className="px-2 py-1">Menu</Link>
            <Link to={"about"} className="px-2 py-1">About</Link>
            <Link to={"contact"} className="px-2 py-1">Contact</Link>
               </nav>

 
              </div>
            )}
          </div>
        </div>
      </div>

      {/*mobile*/}
    </header>
  );
};

export default Header;
