import React from 'react';
import './app.css';
import Routes from "../config/router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes />
      <Footer />
    </>

  );
}

export default App;
