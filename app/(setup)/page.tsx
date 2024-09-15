import React from "react";
import Navbar from "./sections/Navbar/Navbar";
import Hero from "./sections/Hero/Hero";
import Grid from "./sections/Grid/Grid";
import Features from "./components/Features";
import ImportantFeatures from "./sections/ImportantFeatures/ImportantFeatures";
import Footer from "./components/Footer";

const HomePage = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Navbar />
        <Hero />
        <Features />
        <Grid />
        <ImportantFeatures />
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
