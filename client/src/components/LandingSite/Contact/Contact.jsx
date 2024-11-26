import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

function Contact() {
  const [fromName, setFromName] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .send(
        "service_3ig6o84",
        "template_cfn1xni",
        {
          from_name: fromName,
          message: message,
          to_email: "asharma5_be22@thapar.edu",
        },
        "ThI5RgcXnZR7Ba8ND"
      )
      .then(() => {
        setIsSending(false);
        setIsSent(true);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setIsSending(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "fromName") {
      setFromName(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md"
      >
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          If you have any queries or suggestions, let us know!
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <label
              htmlFor="fromName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your Name
            </label>
            <input
              type="text"
              id="fromName"
              name="fromName"
              value={fromName}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="John Doe"
              required
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={message}
              onChange={handleInputChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Leave a message..."
              required
            ></textarea>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileTap={{ scale: 0.97 }}
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 sm:w-fit hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSending || isSent}
          >
            {isSending ? "Sending..." : isSent ? "Sent!" : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}

export { Contact };
