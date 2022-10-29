import React, { useEffect, useState } from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import Main from "./Main";
import Footer from "./Footer";
import { getCurrentUser } from "../../services/auth";

function Dashboard() {
  const [user, setUser] = useState();

  const fetchUser = async () => {
    const user = await getCurrentUser();
    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(user);

  return (
    <div className="wrapper">
      <Header currentUser={user} />
      <SideNav />
      <Main currentUser={user} />
      <Footer />
    </div>
  );
}

export default Dashboard;
