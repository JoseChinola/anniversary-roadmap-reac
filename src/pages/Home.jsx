import React from "react";
import Hero from "../Components/Hero";
import Timeline from "../Components/Timeline";
import SpecialMoments from "../Components/SpecialMoments";


const Home = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Timeline />
      <SpecialMoments/>
    </main>
  );
};

export default Home;
