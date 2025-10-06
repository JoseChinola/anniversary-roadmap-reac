import React from "react";
import Hero from "../Components/Hero";
import Timeline from "../Components/Timeline";
import SpecialMoments from "../Components/SpecialMoments";
import PhotoCollage from "../Components/PhotoCollage";
import FinalMessage from "../Components/FinalMessage";
import RomanticFooter from "../Components/RomanticFooter"




const Home = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Timeline />
      <SpecialMoments />
      <PhotoCollage />
      <FinalMessage />
      <RomanticFooter />
    </main>
  );
};

export default Home;
