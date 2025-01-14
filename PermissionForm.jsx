import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import "./src/PermissionForm.css";

const PermissionForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [isResponsible, setIsResponsible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Change the body's background color when modal is shown
    if (showModal) {
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.899)"; // Set a light overlay color
    } else {
      document.body.style.backgroundColor = ""; // Reset background color when modal is closed
    }

    return () => {
      // Clean up when component is unmounted or modal is closed
      document.body.style.backgroundColor = "";
    };
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isResponsible) {
      setStatus("Mesuliyyət qəbul et.");
      return; // Stop form submission if checkbox is not checked
    }

    const templateParams = {
      from_name: name,
      to_email: "zengiyev.murad@gmail.com", // Target email address
      user_email: email,
      contact_number: contactNumber,
      message: message,
      location: location,
      responsible: isResponsible,
    };

    emailjs
      .send(
        "service_sfp7doj",
        "template_af434di",
        templateParams,
        "6YQbrCMe69xBCoWWM"
      )
      .then(
        (response) => {
          setStatus("Email successfully sent!");
          setShowModal(true); // Show modal after email is sent
        },
        (error) => {
          setStatus("Error sending email: " + error.text);
        }
      );
  };

  const closeModal = () => {
    setShowModal(false); // Close modal when clicked
  };

  return (
    <div className="form-container">
      <h2>Murada İcazə Formu</h2>
      <form onSubmit={handleSubmit}>
        <label>
          İcazə alanın adı
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Əlaqə nömrəsi
          <input
            type="number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </label>
        <label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="">Hara gediləcək?</option>
            <option value="cayxana">7 mərtəbə(çayxana)</option>
            <option value="Playstation">Playstation</option>
            <option value="Avtoyuma">F1 Avtoyuma</option>
            <option value="ickimeclisi">İçki məclisi</option>
            <option value="Other">Digər</option>
          </select>
        </label>
        <label>
          Əlavə məlumat
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </label>

        <label>
         * Evdən çıxıb, evə qayıdana qədər məsuliyyət daşıdığınızı və hər hansı
          bir xoşagəlməz fəaliyyətə görə cavabdeh olacağınızı qəbul edirəm.
          <input
            type="checkbox"
            checked={isResponsible}
            onChange={(e) => setIsResponsible(e.target.checked)}
            required
          />
        </label>

        <button type="submit">İcazə Al</button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <h2>Murad: 15 deqe chixiram</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionForm;
