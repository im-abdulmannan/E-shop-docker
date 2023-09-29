import React from "react";
import BestDeals from "../components/BestDeals/BestDeals";
import Events from "../components/Events/Events";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Categories from "../components/Route/Categories/Categories";
import FeaturedProducts from "../components/Route/FeaturedProducts/FeaturedProducts";
import Hero from "../components/Route/Hero/Hero";
import Sponsored from "../components/Route/Sponsored/Sponsored";

const HomePage = () => {
  return (
    <>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored />
      <Footer />
    </>
  );
};

export default HomePage;
