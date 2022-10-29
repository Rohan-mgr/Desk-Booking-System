import React from "react";
import { useOutletContext } from "react-router-dom";

export default function DashboardHome() {
  const [currentUser] = useOutletContext();
  return (
    <div>
      Welcome,{" "}
      <h5>
        {currentUser?.fname} {currentUser?.lname}!
      </h5>
    </div>
  );
}
