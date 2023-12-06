import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MainSection from "../../components/home/main-section/MainSection";
import Cart from "../../components/cart/Cart";

function Home() {
  return (
    <div className="container relative flex flex-col justify-start items-center">
      <Navbar />
      <MainSection />
      <Cart />
    </div>
  );
}

export default Home;
