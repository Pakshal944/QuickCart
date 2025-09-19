import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

export const revalidate = 3600;

const Home = async () => {
  const c = await cookies();
  const personalized = c.get('qc_personalized')?.value === '1';
  const firstName = c.get('qc_firstname')?.value || '';

  return (
    <>
      <Navbar/>
      <div className="px-6 md:px-16 lg:px-32">
        {personalized ? (
          <div className="mt-6 mb-4 rounded-md bg-orange-50 border border-orange-200 p-4 text-orange-800">
            <p>Welcome back{firstName ? `, ${firstName}` : ''}! 👋</p>
          </div>
        ) : (
          <div className="mt-6 mb-4 rounded-md bg-gray-50 border border-gray-200 p-4 text-gray-700">
            <p>Sign up today and get 10% off your first order!</p>
          </div>
        )}
        <HeaderSlider />
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
