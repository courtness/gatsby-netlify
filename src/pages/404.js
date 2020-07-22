import React from "react";
import Footer from "~components/Footer";
import Layout from "~components/Layout";

const NotFoundPage = () => {
  return (
    <>
      <Layout className="not-found-page w-full relative pt-16">
        <section className="grid">
          <h1 className="grid-end-12 my-8 f3">404</h1>
        </section>
      </Layout>

      <Footer />
    </>
  );
};

export default NotFoundPage;
