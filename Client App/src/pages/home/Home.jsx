import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import { useState, useEffect } from "react";
import fetchData from "../../Data/fetch";
import { useSelector } from "react-redux";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const state = useSelector((state) => state.login);
  useEffect(() => {
    async function getData() {
      const data = await fetchData();
      setHotels(data.results);
    }
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      {state.isLogin && (
        <>
          <Header />
          <div className="homeContainer">
            <Featured />
            <h1 className="homeTitle">Browse by property type</h1>
            <PropertyList />
            <h1 className="homeTitle">Homes guests love</h1>
            <FeaturedProperties hotels={hotels} />
            <MailList />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
