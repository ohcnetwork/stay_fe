import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { A } from "hookrouter";
const Error = () => {
  return (
    <Hero>
      <Banner title="404" subtitle="page not found">
        <A href="/" className="btn-primary">
          return home
        </A>
      </Banner>
    </Hero>
  );
};

export default Error;
