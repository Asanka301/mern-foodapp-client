import React from "react";

import bannerImg1 from "/images/home/home-img-1.png";
import bannerImg2 from "/images/home/home-img-2.png";
import bannerImg3 from "/images/home/home-img-3.png";

const Banner = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 ">
      <div className="py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8">
        {/* img */}
        <div className="md:w-1/2">
          <img src={bannerImg1} alt="" />
        </div>

        {/* texts */}
        <div className="md:w-1/2 px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Dive into Delights Of Delectable{" "}
            <span className="text-orange-500">Food</span>
          </h2>
          <p className=" text-xl">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <button className="bg-orange-500 font-semibold btn text-white px-8 py-3 rounded-full">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
