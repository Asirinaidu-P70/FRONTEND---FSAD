import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { apiClient } from "../services/api";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactPage() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await apiClient.post("/contact", {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });

      toast.success("Message sent successfully.");
      setForm(initialForm);
    } catch (error) {
      toast.error("Failed to send message.");
      console.log(error);
    }
  };

  return (
    <div className="top-padding">
      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s talk about workshop operations, product demos, or frontend showcases."
            description="This form is frontend-only, but the interaction is styled to feel production-ready and trustworthy."
          />
          <div className="page-grid grid-2">
            <div className="page-grid">
              <div className="glass-panel" style={{ padding: "1.35rem" }}>
                <div className="trainer-header">
                  <div className="icon-wrap">
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong>Email</strong>
                    <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                      hello@workshopplatform.dev
                    </p>
                  </div>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: "1.35rem" }}>
                <div className="trainer-header">
                  <div className="icon-wrap">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <strong>Support line</strong>
                    <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                      +1 (555) 014-8842
                    </p>
                  </div>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: "1.35rem" }}>
                <div className="trainer-header">
                  <div className="icon-wrap">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong>Studio</strong>
                    <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                      Remote-first collaboration across NYC, Bengaluru, and London.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form className="glass-panel" onSubmit={handleSubmit} style={{ padding: "1.5rem" }}>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="name">Your name</label>
                  <input className="input" id="name" name="name" onChange={handleChange} value={form.name} />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input className="input" id="email" name="email" onChange={handleChange} type="email" value={form.email} />
                </div>
              </div>
              <div className="form-field" style={{ marginTop: "1rem" }}>
                <label htmlFor="subject">Subject</label>
                <input className="input" id="subject" name="subject" onChange={handleChange} value={form.subject} />
              </div>
              <div className="form-field" style={{ marginTop: "1rem" }}>
                <label htmlFor="message">Message</label>
                <textarea className="textarea" id="message" name="message" onChange={handleChange} value={form.message} />
              </div>
              <button className="button button-primary" style={{ marginTop: "1rem" }} type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
