import React, { useEffect } from "react";
import { HiCake, HiShoppingCart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toggleNav } from "../../feature/stateSlice";

function Navbar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.stateSlice.value);
  const toggle = useSelector((state) => state.stateSlice.navbar);

  const toggleCart = () => {
    const bool = !toggle;
    dispatch(toggleNav(bool));
  };

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  return (
    <div className="w-full h-[70px]  flex justify-between items-center px-[20px]">
      <div className="flex h-full justify-center items-center gap-1 ">
        <HiCake className="text-secondary" />
        <h1>Main Curse</h1>
      </div>
      <div className="relative h-full flex justify-center items-center">
        <div
          className={`${
            cart.length > 0 ? "flex" : "hidden"
          } absolute  justify-center items-center rounded-full bg-red-600 w-[20px] h-[20px] top-2 -right-2`}
        >
          <p className="text-white">{cart.length}</p>
        </div>
        <button
          onClick={() => toggleCart()}
          className="flex h-[40px] justify-center items-center gap-1 p-1 border-[1px] border-secondary px-[20px] py-[5px]"
        >
          <HiShoppingCart className="text-secondary" />
          <h1>Keranjang</h1>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
