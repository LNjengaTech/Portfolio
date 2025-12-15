import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

//an API call to send messages
const API_URL = import.meta.env.VITE_API_URL || '/api'; //fallback to /api

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage(''); // Clear previous errors

    try {
      // API endpoint to send the message (e.g., handled by Nodemailer on the backend)
      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle server-side validation or error messages
        const data = await response.json();
        throw new Error(data.message || 'Failed to send message.');
      }

      // Success
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 3000); // Clear status after 3 seconds

    } catch (error) {
      console.error('Submission Error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again.');
      setTimeout(() => setStatus(''), 5000); // Clear status after 5 seconds
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'your.email@example.com',
      link: 'mailto:your.email@example.com',
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '+254 XXX XXX XXX',
      link: 'tel:+254XXXXXXXXX',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Mombasa, Kenya',
      link: null,
    },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://twitter.com/yourusername', label: 'Twitter' },
  ];

  return (
    <section id="contact" className="section-padding bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Get In <span className="text-purple-600 dark:text-purple-400">Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Have something in mind? Let's work together!
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Let's talk about everything!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Send me an email directly or reach out on social media. 
              I'll get back to you as soon as possible.
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-2xl text-purple-600 dark:text-purple-400 mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">{item.title}</h4>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transform hover:scale-110 transition-all"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-3">
            <form 
              onSubmit={handleSubmit} 
              className="p-8 rounded-xl space-y-6 
                bg-gray-50 dark:bg-gray-800 shadow-xl dark:shadow-purple-900/20 transition-colors duration-300"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg 
                      bg-white dark:bg-gray-700 
                      border-gray-300 dark:border-gray-600 
                      text-gray-900 dark:text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg 
                      bg-white dark:bg-gray-700 
                      border-gray-300 dark:border-gray-600 
                      text-gray-900 dark:text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg 
                    bg-white dark:bg-gray-700 
                    border-gray-300 dark:border-gray-600 
                    text-gray-900 dark:text-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border rounded-lg 
                    bg-white dark:bg-gray-700 
                    border-gray-300 dark:border-gray-600 
                    text-gray-900 dark:text-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                  placeholder="Message me..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-8 py-3 text-lg font-semibold rounded-lg shadow-lg 
                  bg-purple-600 text-white hover:bg-purple-700 
                  dark:bg-purple-500 dark:hover:bg-purple-600 dark:shadow-purple-500/50 
                  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="text-center text-green-600 dark:text-green-400 font-medium">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="text-center text-red-600 dark:text-red-400 font-medium">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;