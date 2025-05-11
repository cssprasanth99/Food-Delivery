import React from "react";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-2">
            📍 <strong>Address:</strong> 123 Food Street, Flavor Town, IN
          </p>
          <p className="mb-2">
            📞 <strong>Phone:</strong> +91 98765 43210
          </p>
          <p className="mb-2">
            📧 <strong>Email:</strong> support@foodieapp.com
          </p>
          <p className="mb-2">
            🕒 <strong>Working Hours:</strong> Mon-Sun: 9am - 11pm
          </p>

          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-blue-600 hover:underline">
              Facebook
            </a>
            <a href="#" className="text-pink-500 hover:underline">
              Instagram
            </a>
            <a href="#" className="text-sky-400 hover:underline">
              Twitter
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
