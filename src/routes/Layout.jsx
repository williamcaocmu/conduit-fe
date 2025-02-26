import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthContextProvider";
import PrivateHeader from "../components/PrivateHeader";

const Layout = () => {
  const { authenticated } = useContext(AuthContext);

  return (
    <div>
      {authenticated ? <PrivateHeader /> : <Header />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
