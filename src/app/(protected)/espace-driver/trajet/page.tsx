import React from "react";
import Welcome from "./components/Welcome";

const page = () => {
    const firstname="John"
    const lastname="Doe"
    const driver="driver"
  return (
    <div className="flex  flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div>welcome page trajet {driver} </div>
      <Welcome firstname={firstname} lastname={lastname} />
    </div>
  );
};

export default page;
