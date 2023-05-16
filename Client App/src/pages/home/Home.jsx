import AuthenForm from "../../components/authen/authen";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import { useState, useEffect } from "react";

const Home = () => {
  const [login, setLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const respone = await fetch("http://localhost:5000/hotels");
      const data = await respone.json();
      setHotels(data.results);
    }

    fetchData();
  }, []);

  const onLogin = () => {
    if (!isLogin) {
      setIsLogin(true);
    }
  };

  const onSignUp = () => {
    if (isLogin) {
      setIsLogin(false);
    }
  };

  const onSubmit = () => {
    setLogin(true);
  };
  return (
    <div>
      <Navbar onLogin={onLogin} onSignUp={onSignUp} login={login} />
      {login && (
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
      {!login && <AuthenForm islogin={isLogin} onSubmit={onSubmit} />}
    </div>
  );
};

export default Home;
