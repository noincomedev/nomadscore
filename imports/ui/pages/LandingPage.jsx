import React, { Fragment } from "react";

import Community from "../layouts/components/landing-page/CommunityLayout";
import Footer from "../layouts/components/landing-page/FooterLayout";
import Header from "../layouts/components/landing-page/HeaderLayout";
import Pricing from "../layouts/components/landing-page/PricingLayout";
import Product from "../layouts/components/landing-page/ProductLayout";
import Testimonial from "../layouts/components/landing-page/TestimonialLayout";

export default () => (
  <Fragment>
    <Header />
    <Product />
    <Testimonial />
    <Pricing />
    <Community />
    <Footer />
  </Fragment>
);
