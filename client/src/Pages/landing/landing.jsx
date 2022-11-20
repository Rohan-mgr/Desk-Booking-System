import React from "react";

// import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/UI/navbar/navbar";

import video from "../../Assets/Images/view.mp4";
import { useFormik } from "formik";
import { handleUserMessage } from "../../services/auth";
import image1 from "../../Assets/Images/schedule/business-woman-making-presentation-office.jpg";
import image2 from "../../Assets/Images/schedule/clayton-cardinalli-JMoFpdqL3XM-unsplash.jpg";

import avatar1 from "../../Assets/Images/avatar/happy-asian-man-standing-with-arms-crossed-grey-wall.jpg";
import avatar2 from "../../Assets/Images/avatar/portrait-good-looking-brunette-young-asian-woman.jpg";
import { toast } from "react-toastify";

function LandingPage() {
  // const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await handleUserMessage(values);
        console.log(data);
        if (!data) {
          throw new Error("Message can't be send");
        }
        resetForm({ values: "" });
        toast("Message Sent Successfully");
        window.scrollTo(0, 0);
      } catch (e) {
        toast.error(e);
        console.log("error", e);
      }
    },
  });
  return (
    <div>
      <Navbar />
      <main>
        <section class="hero" id="section_1">
          <div class="container">
            <div class="row">
              <div>
                <div class="hero-text">
                  <h2 class="text-white ">Book your Workspace </h2>
                  <p class="text-white mb-4">Work from anywhere </p>

                  <a
                    href="#workspace"
                    class="custom-link bi-arrow-down arrow-icon"
                  ></a>
                </div>
              </div>
            </div>
          </div>

          <div class="video-wrap">
            <video autoPlay loop muted="" class="custom-video" poster="">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section class="schedule section-padding" id="workspace">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-12">
                <h2 class="mb-5 text-center">
                  New <u class="text-info">Workspace</u>
                </h2>

                <div class="tab-content mt-5" id="nav-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="nav-DayOne"
                    role="tabpanel"
                    aria-labelledby="nav-DayOne-tab"
                  >
                    <div class="row border-bottom pb-5 mb-5">
                      <div class="col-lg-4 col-12">
                        <img
                          src={image1}
                          class="schedule-image img-fluid"
                          alt=""
                        />
                      </div>

                      <div class="col-lg-8 col-12 mt-3 mt-lg-0">
                        <h4 class="mb-2">Startup Development Ideas</h4>

                        <p>
                          You are free to download any HTML CSS template from
                          TemplateMo website. You can use any template for
                          business purposes. You are not allowed to redistribute
                          the downloadable ZIP file on any other template
                          website. Thank you.
                        </p>

                        <div class="d-flex align-items-center mt-4">
                          <div class="avatar-group d-flex">
                            <img
                              src={avatar1}
                              class="img-fluid avatar-image"
                              alt=""
                            />

                            <div class="ms-3">
                              Logan Wilson
                              <p class="speakers-text mb-0">CEO / Founder</p>
                            </div>
                          </div>

                          <span class="mx-3 mx-lg-5">
                            <i class="bi-clock me-2"></i>
                            9:00 - 9:45 AM
                          </span>

                          <span class="mx-1 mx-lg-5">
                            <i class="bi-layout-sidebar me-2"></i>
                            Conference Hall 3
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="row border-bottom pb-5 mb-5">
                      <div class="col-lg-4 col-12">
                        <img
                          src={image2}
                          class="schedule-image img-fluid"
                          alt=""
                        />
                      </div>

                      <div class="col-lg-8 col-12 mt-3 mt-lg-0">
                        <h4 class="mb-2">Introduction to Online Businesses</h4>

                        <p>
                          Quisque mollis, ante non semper ultricies, nulla
                          sapien sollicitudin augue, id scelerisque nunc turpis
                          nec urna. Class aptent taciti sociosqu ad litora.
                        </p>

                        <div class="d-flex align-items-center mt-4">
                          <div class="avatar-group d-flex">
                            <img
                              src={avatar2}
                              class="img-fluid avatar-image"
                              alt=""
                            />

                            <div class="ms-3">
                              Natalie
                              <p class="speakers-text mb-0">Event Planner</p>
                            </div>
                          </div>

                          <span class="mx-3 mx-lg-5">
                            <i class="bi-clock me-2"></i>
                            10:00 - 10:45 AM
                          </span>

                          <span class="mx-1 mx-lg-5">
                            <i class="bi-layout-sidebar me-2"></i>
                            100-D Room
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="call-to-action section-padding">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-7 col-12">
                <h2 class="text-white mb-4">
                  Want to <u class="text-info">resister your workspace?</u>
                </h2>

                <p class="text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut dolore
                </p>
              </div>

              <div class="col-lg-3 col-12 ms-lg-auto mt-4 mt-lg-0">
                <a href="/signup" class="custom-btn btn">
                  Register Today
                </a>
              </div>
            </div>
          </div>
        </section>

        <section class="venue section-padding" id="about">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-12">
                <h2 class="mb-5">
                  Visit to our <u class="text-info">office</u>
                </h2>
              </div>

              <div class="col-lg-6 col-12">
                <iframe
                  title="map"
                  class="google-map"
                  src="https://maps.google.com/maps?q=61%20hullrick%20drive,%20Etobicoke,%20Ontario,%20Canada&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="371.59"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

              <div class="col-lg-6 col-12 mt-5 mt-lg-0">
                <div class="venue-thumb bg-white shadow-lg">
                  <div class="venue-info-title">
                    <h2 class="text-white mb-0">61 Hillrick Dr</h2>
                  </div>

                  <div class="venue-info-body">
                    <h4 class="d-flex">
                      <i class="bi-geo-alt me-2"></i>
                      <span>61 hullrick drive, Etobicoke, Ontario, Canada</span>
                    </h4>

                    <h5 class="mt-4 mb-3">
                      <a href="mailto:hello@yourgmail.com">
                        <i class="bi-envelope me-2"></i>
                        bookyourdesk2022@gmail.com
                      </a>
                    </h5>

                    <h5 class="mb-0">
                      <a href="tel: 305-240-9671">
                        <i class="bi-telephone me-2"></i>
                        010-020-0340
                      </a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="contact section-padding" id="contact-section">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 col-12 mx-auto">
                <form
                  class="custom-form contact-form bg-white shadow-lg"
                  onSubmit={formik.handleSubmit}
                >
                  <h2>Please Say Hi</h2>

                  <div class="row">
                    <div class="col-lg-4 col-md-4 col-12">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="form-control"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        placeholder="Name"
                        required=""
                      />
                    </div>

                    <div class="col-lg-4 col-md-4 col-12">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        pattern="[^ @]*@[^ @]*"
                        class="form-control"
                        placeholder="Email"
                        required=""
                      />
                    </div>

                    <div class="col-lg-4 col-md-4 col-12">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        class="form-control"
                        placeholder="Subject"
                      />
                    </div>

                    <div class="col-12">
                      <textarea
                        class="form-control"
                        rows="5"
                        id="message"
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        placeholder="Message"
                      ></textarea>

                      <button type="submit" class="form-control">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
