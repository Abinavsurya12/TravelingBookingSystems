import emailjs from "emailjs-com";

export default function ContactForm() {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      e.target,
      "YOUR_PUBLIC_KEY"
    ).then(() => {
      alert("Email sent!");
    }).catch((err) => {
      alert("Error: " + err.text);
    });
  };

  return (
    <form onSubmit={sendEmail}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      <button type="submit">Send</button>
    </form>
  );
}