import React from "react";
import { ToastContainer } from "react-toastify";
import { MovieProvider } from "./context/MovieContext";

import Routing from "./Routing";

const App = () => {
  return (
    <>
      <MovieProvider>
        <Routing />
        <ToastContainer />
      </MovieProvider>
    </>
  );
};

export default App;
