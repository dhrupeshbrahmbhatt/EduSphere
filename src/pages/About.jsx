import { motion } from 'framer-motion';
import { FaRocket, FaBrain, FaUsers, FaQuestionCircle, FaGraduationCap, FaAward, FaChartLine, FaGlobe } from 'react-icons/fa';
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const faqItems = [
    {
      question: "What is Sage AI?",
      answer: "Sage AI is our advanced artificial intelligence mentor powered by Google's latest Gemini technology. It's designed to provide personalized learning experiences, answer questions, and help students master complex topics through interactive conversations."
    },
    {
      question: "How does Sage AI learn and adapt?",
      answer: "Sage AI utilizes cutting-edge machine learning algorithms to understand user interactions, adapt to learning styles, and provide personalized responses. It continuously improves through each interaction while maintaining data privacy and security."
    },
    {
      question: "What subjects does Sage AI cover?",
      answer: "Sage AI is proficient in a wide range of subjects including mathematics, sciences, programming, languages, and humanities. It can provide detailed explanations, examples, and practice problems across various academic disciplines."
    },
    {
      question: "Is my data secure with Sage AI?",
      answer: "Yes, we prioritize data security and privacy. All interactions with Sage AI are encrypted, and we follow strict data protection protocols. We never share personal information with third parties."
    },
    {
      question: "Can Sage AI help with homework?",
      answer: "While Sage AI can explain concepts and guide you through problem-solving approaches, it's designed to be an educational tool rather than a homework solution provider. It helps you understand and learn rather than simply providing answers."
    }
  ];

  const stats = [
    { number: "1M+", label: "Active Users" },
    { number: "150+", label: "Countries" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Availability" }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Lead",
      description: "Former Google AI researcher with expertise in educational technology and machine learning."
    },
    {
      name: "Mark Rodriguez",
      role: "Chief Technology Officer",
      description: "20+ years experience in EdTech and AI implementation."
    },
    {
      name: "Dr. James Wilson",
      role: "Educational Director",
      description: "PhD in Educational Psychology, specializing in personalized learning."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4" data-aos="fade-up">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            About Sage AI
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Revolutionizing Education Through Advanced Artificial Intelligence
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <FaRocket className="text-blue-500 text-2xl" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              To democratize education through artificial intelligence, making high-quality learning accessible to everyone, everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <FaBrain className="text-5xl text-blue-500" />,
                title: "Advanced AI",
                description: "Powered by cutting-edge machine learning algorithms"
              },
              {
                icon: <FaUsers className="text-5xl text-purple-500" />,
                title: "Personalized Learning",
                description: "Adaptive education tailored to each student"
              },
              {
                icon: <FaGlobe className="text-5xl text-green-500" />,
                title: "Global Access",
                description: "Available 24/7 from anywhere in the world"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 hover:border-blue-500 transition-all"
                data-aos="fade-up"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
                data-aos="zoom-in"
              >
                <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  {stat.number}
                </h3>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700"
                data-aos="fade-up"
              >
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-400 mb-4">{member.role}</p>
                <p className="text-gray-300">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700"
                data-aos="fade-up"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaQuestionCircle className="text-blue-400 mr-2" />
                  {item.question}
                </h3>
                <p className="text-gray-300">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8" data-aos="fade-up">
            Ready to Transform Education?
          </h2>
          <p className="text-xl text-gray-300 mb-12" data-aos="fade-up" data-aos-delay="100">
            Join thousands of students and educators already using Sage AI
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-full text-xl font-semibold"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Get Started with Sage AI
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default About; 