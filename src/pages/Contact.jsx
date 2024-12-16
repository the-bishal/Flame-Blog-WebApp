import React from 'react'
import { motion } from 'framer-motion'
import Container from '../components/container/Container'
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'

function Contact() {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold mb-4 text-primary"
            >
              Get in Touch
            </motion.h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Have a question or want to work together? Feel free to reach out to me using the form below or through my social media channels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-semibold mb-6">Send Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-600 focus:border-primary focus:ring-primary transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-600 focus:border-primary focus:ring-primary transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-600 focus:border-primary focus:ring-primary transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-600 focus:border-primary focus:ring-primary transition-all duration-300"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/80 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Information Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <MdEmail className="text-2xl text-primary" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-lg">bishal@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MdPhone className="text-2xl text-primary" />
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-lg">+91 70123 91023</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MdLocationOn className="text-2xl text-primary" />
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="text-lg">Guruguram, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-6">Connect With Me</h2>
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <FaLinkedin className="text-2xl text-[#0077b5]" />
                    <span>LinkedIn</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <FaTwitter className="text-2xl text-[#1DA1F2]" />
                    <span>Twitter</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <FaInstagram className="text-2xl text-[#E1306C]" />
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <FaGithub className="text-2xl text-white" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3">Common Question {item}?</h3>
                  <p className="text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Container>
  )
}

export default Contact