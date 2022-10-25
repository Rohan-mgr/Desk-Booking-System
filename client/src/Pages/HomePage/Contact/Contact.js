import React from "react";
import "./Contact.css";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { handleUserMessage } from "../../../services/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
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
        if (data.status !== 200) {
          throw new Error("Failed to send message");
        }
        toast("Message sent successfully");
        resetForm({ value: "" });
        window.scrollTo(0, 0);
      } catch (e) {
        toast.error(e);
        console.log("error", e);
      }
    },
  });

  return (
    <section className="position-relative w-100" id="contact">
      <h1 className="text-center">Contact Us</h1>
      <p className="text-center">
        For all enquiries, please email us using form below
      </p>
      <Image
        style={{ margin: "0 auto" }}
        fluid
        src="/dist/img/contact-img.svg"
      />
      <Form className="col-10 col-lg-5" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            required
            placeholder="Enter Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>E-mail:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            placeholder="Enter E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subject:</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            required
            placeholder="Enter Subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message:</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            required
            placeholder="Your Message..."
            value={formik.values.message}
            onChange={formik.handleChange}
            style={{ height: "100px" }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-auto">
          Send Message
        </Button>
      </Form>
    </section>
  );
}

export default Contact;
