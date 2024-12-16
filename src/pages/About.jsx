import React from 'react'
import { motion } from 'framer-motion'
import AboutImage from '../assets/about.png'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Memoized Components
const StatCard = React.memo(({ number, label }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ scale: 1.05 }}
    className="text-center p-6 rounded-xl bg-white hover:shadow-xl transition-shadow duration-200"
  >
    <div className="text-4xl font-bold text-orange-500 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </motion.div>
))

const TeamMember = React.memo(({ member }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-200"
  >
    <div className="h-64 bg-gray-200">
      <img
        src={`TEAM_MEMBER_${member}_IMAGE_PATH`}
        alt={`Team Member ${member}`}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">Team Member {member}</h3>
      <p className="text-gray-600">Position</p>
      <div className="mt-4 flex space-x-4">
        <motion.a
          whileHover={{ scale: 1.1 }}
          href="#"
          className="text-orange-500 hover:text-orange-600"
        >
          LinkedIn
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          href="#"
          className="text-orange-500 hover:text-orange-600"
        >
          Twitter
        </motion.a>
      </div>
    </div>
  </motion.div>
))

const stats = [
  { number: "10+", label: "Years Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "250+", label: "Happy Clients" },
  { number: "15+", label: "Team Members" }
]

function About() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="w-full min-h-screen bg-white"
    >
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image Section */}
          <motion.div
            variants={fadeIn}
            className="w-full md:w-1/2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src={AboutImage}
                alt="About Us"
                loading="lazy"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={fadeInUp}
            className="w-full md:w-1/2 space-y-6"
          >
            <h1 className="text-5xl font-bold mb-4 text-orange-500">
              About Us
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 hover:shadow-lg transition-colors duration-200"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-center mb-12 text-orange-500"
        >
          Our Team
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[1, 2, 3].map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default React.memo(About)