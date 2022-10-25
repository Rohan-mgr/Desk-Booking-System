import React from "react";
import "./About.css";
import Image from "react-bootstrap/Image";

function About() {
  return (
    <section id="about" className="text-center position-relative">
      <h1 className="text-center">Who We Are</h1>
      <Image fluid src="/dist/img/about.svg" />
      <div className="about__content col-8 col-lg-6">
        <Image
          //   width={60}
          //   height={60}
          //   rounded
          fluid
          src="/dist/img/desk-logo.png"
        />
        <p className="text-left">
          We introduce ourself to you as the best and the cheapest company to
          build your dream office with us.Our passion is to tackle the
          real-world complexities of space-scheduling problems.
        </p>
        <p className="text-left">
          We wanted to build a product that was completely customer focused.
          Every decision we make is driven by our goal to make the product more
          valuable for our customers.
        </p>
      </div>
    </section>
  );
}

export default About;
