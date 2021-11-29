import React, { useRef } from "react";
import emailjs from "emailjs-com";

const Mailer = ({ email }) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_5csn1z8",
        "template_nbrsaof",
        form.current,
        "user_cV4R0j042yTicuRDbqqxB"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <h3>Invite someone!</h3>
      <form ref={form} onSubmit={sendEmail} className="invite">
        <input
          className="mail-input"
          type="text"
          name="from_name"
          placeholder="your name"
        />
        <input
          className="mail-input"
          type="email"
          name="from_email"
          placeholder={email}
        />
        <input
          className="mail-input"
          type="email"
          name="to_email"
          placeholder="invitee's email address"
        />
        <button className="mail-btn">send</button>
      </form>
    </div>
  );
};

export default Mailer;
