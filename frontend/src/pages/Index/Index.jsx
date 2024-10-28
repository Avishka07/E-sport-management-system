import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeaderSlider from "../../components/HeaderSlider/HeaderSlider";
import TopGames from "../../components/TopGames/TopGames";
import Footer from "../../components/Footer/Footer";
import UpcomingChallenges from "../../components/UpcommingChallenges/UpcomingChallenges";
import RecommandedChallenges from "../../components/RecommendedChallenges/RecommendedChallenges";

function Index() {
  return (
    <div>
      <Navbar />
      <HeaderSlider />
      <TopGames />
      <UpcomingChallenges />
      <RecommandedChallenges />
      <Footer />
    </div>
  );
}

export default Index;
