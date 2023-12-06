import React, { useEffect, useState } from "react";
import { HiArchive, HiCake, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import stateSlice, { addState, toggleNav } from "../../feature/stateSlice";
import Swal from "sweetalert2";

function Cart() {
  const cart = useSelector((state) => state.stateSlice.value);
  const toggle = useSelector((state) => state.stateSlice.navbar);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [promo, setPromo] = useState("");

  const closeCart = () => {
    const bool = !toggle;
    dispatch(toggleNav(bool));
  };

  const minCount = (data) => {
    const updatedArray = cart
      .map((entry) => {
        if (entry.data.id === data.data.id) {
          return {
            ...entry,
            count: entry.count - 1,
          };
        }

        return entry;
      })
      .filter((entry) => entry.count > 0);
    console.log(updatedArray);
    dispatch(addState(updatedArray));
  };

  const addCount = (data) => {
    const updatedArray = cart.map((entry) => {
      if (entry.data.id === data.data.id) {
        return {
          ...entry,
          count: entry.count + 1,
        };
      }
      return entry;
    });
    dispatch(addState(updatedArray));
  };

  const checkout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(toggleNav(false));
        dispatch(addState([]));
        Swal.fire({
          title: "Success!",
          text: "You success ordered.",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    if (cart.length > 0) {
      if (promo === "hemat") {
        const totalHarga = cart.reduce((total, entry) => {
          const subtotal = entry.data.harga * entry.count;
          return total + subtotal;
        }, 0);
        if (totalHarga - 10000 > 0) {
          setTotal(totalHarga - 10000);
        } else {
          setTotal(0);
        }

        console.log(totalHarga);
      } else if (promo === "puas") {
        const totalHarga = cart.reduce((total, entry) => {
          const subtotal = entry.data.harga * entry.count;
          return total + subtotal;
        }, 0);
        if (totalHarga - 100000 > 0) {
          setTotal(totalHarga - 100000);
        } else {
          setTotal(0);
        }

        console.log(totalHarga);
      } else {
        const totalHarga = cart.reduce((total, entry) => {
          const subtotal = entry.data.harga * entry.count;
          return total + subtotal;
        }, 0);
        setTotal(totalHarga);
      }
    }
  }, [cart, promo]);

  return (
    <div
      className={`${toggle ? "block" : "hidden"}  absolute w-screen h-screen`}
    >
      <div
        onClick={() => closeCart()}
        className="absolute bg-black opacity-50 w-screen h-screen z-40"
      ></div>
      <div className="absolute p-5 bg-white w-screen md:w-[400px] h-screen right-0 z-50 flex flex-col items-center justify-start">
        <div className="w-full flex justify-between items-center  ">
          <div className="flex justify-center items-center gap-1 ">
            <HiCake className="text-secondary" />
            <h1>Main Curse</h1>
          </div>
          <HiX onClick={() => closeCart()} className="cursor-pointer" />
        </div>
        <div className="w-full flex flex-col justify-start items-center  gap-5 h-[700px] overflow-y-scroll">
          {cart?.map((el, index) => (
            <div
              key={index}
              className="w-full h-[150px] flex flex-col justify-between items-center bg-white "
            >
              <div className="flex justify-between items-center  w-full h-[100px]">
                <div className="w-[100px] h-[100px]  overflow-hidden flex justify-center items-center ">
                  <img
                    src={el.data.gambar}
                    alt={el.data.gambar}
                    className="h-[100px] w-[100px]"
                  />
                </div>
                <div className="w-[200px] h-full flex flex-col items-start  justify-between">
                  <div className="w-full h-[80px] flex flex-col items-start p-2 justify-start gap-[5px]">
                    <h1 className=" line-clamp-1">{el.data.nama}</h1>
                    <p className="text-secondary">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(el.data.harga * el.count)}
                    </p>
                  </div>
                  <div className="w-full p-2 flex justify-start items-center">
                    <p>mantap</p>
                  </div>
                </div>
                <div className="w-[70px] h-full flex text-[12px] ">
                  <div className="flex justify-between items-end h-full w-full ">
                    <button
                      onClick={() => minCount(el)}
                      className="w-[20px] p-1 rounded-[5px] bg-secondary text-white h-[20px] flex justify-center items-center"
                    >
                      <p>-</p>
                    </button>
                    <p className="w-full justify-center items-center text-center">
                      {el.count}
                    </p>
                    <button
                      onClick={() => addCount(el)}
                      className="w-[20px] p-1 rounded-[5px] bg-secondary text-white h-[20px] flex justify-center items-center"
                    >
                      <p>+</p>
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-[30px]  w-full">
                <input
                  type="text"
                  className="h-[30px] border-[1px] p-2 rounded-[3px] w-full"
                  placeholder="Masukan catatan disini..."
                />
              </div>
            </div>
          ))}
        </div>
        <div className="border-t-1 w-full h-full flex flex-col justify-between items-center mt-[10px] py-[20px]">
          <div className="w-full flex flex-col justify-start  items-start h-full">
            <div className="w-full flex gap-2  justify-start items-center ">
              <HiArchive />
              <h1>Tambahkan Voucher</h1>
            </div>
            <div className="h-[30px]  w-full">
              <input
                onChange={(e) => setPromo(e.target.value)}
                value={promo}
                type="text"
                className="h-[30px] border-[1px] p-2 rounded-[3px] w-full"
                placeholder="Masukan vouchermu disini..."
              />
            </div>
          </div>

          <div className="w-full">
            <div className="bg-primari p-3 rounded-[5px] w-full flex justify-between items-center">
              <p>Total</p>
              <p>
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(total)}
              </p>
            </div>
            <div className="w-full p-3 ">
              <button
                onClick={() => checkout()}
                className="w-full flex rounded-[5px] bg-secondary py-2 text-white justify-center items-center"
              >
                Buat Pesanan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
