import React from "react";
import Product from "../Components/Product";
import Cart from "../Components/Cart";
import UsersPage from "@/Components/UserPage";
import { Button } from "@/Components/ui/button";

const Home = () => {
  const [selectedTab, setSelectedTab] = React.useState("");
  return (
    <div>
      <div>
        <Button
          onClick={() => setSelectedTab("product")}
          className={`${
            selectedTab === "product" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Product
        </Button>
        <Button
          onClick={() => setSelectedTab("user")}
          className={`${
            selectedTab === "user" ? "bg-blue-500 text-white" : ""
          }`}
        >
          User
        </Button>
      </div>
      <div className="">
        {selectedTab === "product" && <Product />}
        {selectedTab === "user" && <UsersPage />}
      </div>
      <Cart />
    </div>
  );
};

export default Home;
