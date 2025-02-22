import { useState, useRef, useEffect } from 'react';

const AIMentor = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'assistant',
      message: "Hello! I'm Sage, your AI companion powered by advanced neural networks. How can I assist you in your learning journey today?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessage = { type: 'user', message: userInput };
    setChatHistory([...chatHistory, newMessage]);
    setUserInput('');
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        message: "I'm analyzing your query using my neural networks. This is a placeholder response that will be replaced with actual AI processing."
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-900 to-black py-12">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/neural-network-bg.jpg')] opacity-20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
              Sage AI Mentor
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Powered by advanced neural networks and quantum computing algorithms
            </p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] ${
                    msg.type === 'user'
                      ? 'bg-blue-600 rounded-2xl rounded-tr-sm'
                      : 'bg-gray-800 rounded-2xl rounded-tl-sm'
                  } p-4`}
                >
                  {msg.type === 'assistant' && (
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-2"></div>
                      <span className="text-blue-400 font-semibold">Sage AI</span>
                    </div>
                  )}
                  <p className="text-white">{msg.message}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex space-x-2 p-4 bg-gray-800 rounded-2xl w-fit">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700">
            <div className="flex space-x-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-gray-900 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {[
            {
              title: "Neural Network Processing",
              description: "Advanced AI algorithms for personalized learning"
            },
            {
              title: "Quantum-Enhanced Responses",
              description: "Lightning-fast, accurate problem-solving"
            },
            {
              title: "Adaptive Learning Paths",
              description: "Customized curriculum based on your progress"
            },
            {
              title: "Real-time Analytics",
              description: "Track your learning journey with detailed insights"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-blue-500 transition-colors"
            >
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIMentor; 