import React, { Fragment, useEffect } from "react";
import Cookie from "js-cookie";


const Home = () => {
  useEffect(()=>{
    console.log(Cookie.get("token"))
  },[])
  return (
    <Fragment>
      <h1>Hello World</h1>
    </Fragment>
  );
};

export default Home;
