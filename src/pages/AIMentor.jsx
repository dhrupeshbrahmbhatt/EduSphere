import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaBrain, FaSpinner, FaPaperPlane, FaRegLightbulb, FaCode, FaMicrophone, FaImage, FaEllipsisH, FaTimes } from 'react-icons/fa';
import { getGeminiResponse } from '../services/geminiService';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { processImageWithPrompt, startVoiceRecognition } from '../services/mediaService';

const AIMentor = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'assistant',
      message: "Hello! I'm Sage, your AI companion powered by advanced machine learning. I specialize in education, coding, and problem-solving. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [userInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() && !selectedImage) return;

    const newMessage = { 
      type: 'user', 
      message: userInput,
      timestamp: new Date()
    };

    if (selectedImage) {
      newMessage.image = imagePreview;
    }

    setChatHistory(prev => [...prev, newMessage]);
    setUserInput('');
    setIsTyping(true);

    try {
      let response;
      if (selectedImage) {
        response = await processImageWithPrompt(
          selectedImage, 
          userInput || "As Sage AI, analyze this image and provide detailed information."
        );
        setSelectedImage(null);
        setImagePreview(null);
      } else {
        const context = `You are Sage, an advanced AI mentor specializing in education and helping students learn effectively. 
                        Always maintain a helpful, encouraging, and professional tone.
                        Previous context: ${chatHistory.slice(-3).map(msg => 
                          `${msg.type}: ${msg.message}`).join('\n')}
                        
                        User's question: ${userInput}
                        
                        Provide a detailed, educational response as Sage AI.`;
        response = await getGeminiResponse(context);
      }
      
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        message: response,
        timestamp: new Date()
      }]);
    } catch (error) {
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        message: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = async () => {
    try {
      setIsListening(true);
      const transcript = await startVoiceRecognition();
      setUserInput(transcript);
    } catch (error) {
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        message: "Sorry, I couldn't access the microphone. Please check your browser permissions.",
        timestamp: new Date()
      }]);
    } finally {
      setIsListening(false);
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  const renderMessage = (msg) => (
    <div className="prose prose-invert max-w-none">
      {msg.image && (
        <div className="mb-4">
          <img 
            src={msg.image} 
            alt="Uploaded content" 
            className="rounded-lg max-h-64 object-contain"
          />
        </div>
      )}
      <p className="text-gray-100 whitespace-pre-wrap">{msg.message}</p>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black py-12">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/neural-grid.svg')] opacity-20 animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4"
            >
              Sage AI
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-200 max-w-2xl mx-auto"
            >
              Your Intelligent Learning Companion
            </motion.p>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="fixed left-0 top-20 h-full w-64 bg-black/50 backdrop-blur-xl border-r border-gray-800 p-4 hidden lg:block">
        <div className="space-y-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-3 flex items-center justify-center space-x-2 transition-all">
            <FaRegLightbulb />
            <span>New Chat</span>
          </button>
          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Capabilities</h3>
            <div className="space-y-2">
              {[
                { icon: <FaCode />, text: "Code Analysis" },
                { icon: <FaBrain />, text: "Learning Assistant" },
                { icon: <FaRobot />, text: "Problem Solving" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-300 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="lg:ml-64">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Chat Messages */}
          <div className="space-y-6 mb-24">
            <AnimatePresence>
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] group ${
                    msg.type === 'user'
                      ? 'bg-blue-600/20 border border-blue-500/20'
                      : 'bg-gray-800/50 border border-gray-700'
                    } rounded-2xl p-4 backdrop-blur-lg hover:border-blue-500/50 transition-all`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {msg.type === 'assistant' ? (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <FaRobot className="text-white text-sm" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-white text-sm">You</span>
                        </div>
                      )}
                      <span className="text-gray-400 text-sm">
                        {formatTimestamp(msg.timestamp)}
                      </span>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white">
                        <FaEllipsisH className="text-sm" />
                      </button>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      {renderMessage(msg)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2 p-4 bg-gray-800/30 backdrop-blur-lg rounded-2xl w-fit"
              >
                <FaSpinner className="animate-spin text-blue-400" />
                <span className="text-blue-400">Sage is thinking...</span>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Fixed at Bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent py-6">
            <div className="max-w-5xl mx-auto px-4">
              <form onSubmit={handleSubmit} className="relative">
                {/* Image Preview */}
                <AnimatePresence>
                  {imagePreview && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="mb-4 relative"
                    >
                      <div className="relative inline-block">
                        <img 
                          src={imagePreview} 
                          alt="Selected" 
                          className="h-32 rounded-lg object-contain bg-gray-800/50 p-2"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <FaTimes className="text-white text-sm" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input Container */}
                <div className="flex items-end space-x-4 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-4">
                  <textarea
                    ref={textareaRef}
                    rows="1"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    placeholder={
                      selectedImage 
                        ? "Ask Sage to analyze this image..." 
                        : "Message Sage..."
                    }
                    className="flex-1 bg-transparent text-white resize-none max-h-32 focus:outline-none"
                  />
                  <div className="flex items-center space-x-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleVoiceInput}
                      disabled={isListening}
                      className={`p-2 rounded-xl ${
                        isListening 
                          ? 'text-blue-400 animate-pulse' 
                          : 'text-gray-400 hover:text-white'
                      } transition-colors`}
                    >
                      <FaMicrophone />
                    </motion.button>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`p-2 ${
                        selectedImage 
                          ? 'text-blue-400' 
                          : 'text-gray-400 hover:text-white'
                      } transition-colors`}
                    >
                      <FaImage />
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isTyping || (!userInput.trim() && !selectedImage)}
                      className={`p-2 rounded-xl ${
                        userInput.trim() || selectedImage
                          ? 'text-blue-400 hover:text-blue-300' 
                          : 'text-gray-600'
                      } transition-colors`}
                    >
                      <FaPaperPlane />
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMentor; 