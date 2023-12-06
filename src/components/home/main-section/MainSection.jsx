import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addState } from "../../../feature/stateSlice";

function MainSection() {
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.stateSlice.value);

  const fetchMenu = async () => {
    try {
      const response = await axios.get("https://tes-mobile.landa.id/api/menus");
      console.log(response);
      setMenu(response.data.datas);
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = (el) => {
    const foundData = cart.find((entry) => entry.data.id === el.id);
    if (foundData) return;
    const tmpCart = [...cart, { data: el, count: 1, text: "" }];
    dispatch(addState(tmpCart));
    console.log(cart);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <div className="w-full px-[10px] flex justify-center  items-start">
      <div className="w-fit flex justify-center items-start mt-[30px]">
        <div className=" grid grid-cols-1  md:grid-cols-2  xl:grid-cols-6 gap-[24px] ">
          {menu?.map((el, index) => (
            <div
              key={index}
              className="w-[200px] h-[300px] p-5 flex flex-col items-center bg-white justify-center rounded-[5px] gap-[10px]"
            >
              <div className="w-full flex justify-center items-center ">
                <img src={el.gambar} alt={el.gambar} className="h-[150px]" />
              </div>
              <div className="w-full gap-[5px]">
                <h1 className=" line-clamp-1">{el.nama}</h1>
                <p className="text-secondary">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(el.harga)}
                </p>
              </div>
              <button
                onClick={() => addToCart(el)}
                className="text-white flex flex-col items-center justify-center bg-secondary w-full rounded-[5px]"
              >
                <p>+ Tambahkan Ke</p>
                <p>Keranjang</p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainSection;
