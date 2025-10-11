import "./Contact.css";
import { banner } from "../assets/assets";

const Contact = () => {
  return (
    <div className="contact-page">

      {/* -------------- Banner Image -------------- */}
      <div className="banner">
        <img src={banner.ContactBanner} alt="Contact Banner" />
      </div>

      {/* -------------- Contact Section -------------- */}
      <div className="desc">
        <h1 className="MainHeading">Contact Us</h1>
        <div className="desc-1">
          <form>
            {/* First Name */}
            <div className="form-group half">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" placeholder="Enter Your First Name" />
            </div>

            {/* Last Name */}
            <div className="form-group half">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" placeholder="Enter Your Last Name" />
            </div>

            {/* Email */}
            <div className="form-group half">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter Your Email" />
            </div>

            {/* Phone */}
            <div className="form-group half">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="Enter Your Phone Number" />
            </div>

            {/* Message */}
            <div className="form-group full">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Describe Your Issue or Request">
              </textarea>
            </div>

            {/* Submit Button */}
            <div className="form-group full">
              <button type="submit" className="mainButton">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;