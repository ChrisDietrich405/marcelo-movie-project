import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Watchlist from "./components/Watchlist";
import Watched from "./components/Watched";
import PageNotFound from "./components/PageNotFound";

export const Routing = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/watched" element={<Watched />} />
          <Route path="/page-not-found" element={<PageNotFound/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default Routing;
