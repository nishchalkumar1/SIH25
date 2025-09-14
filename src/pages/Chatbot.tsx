import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, UserIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import Sidebar from '../components/Sidebar';
import FloatingBubbles from '../components/FloatingBubbles';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm OceanIQ AI, your ocean data assistant. I can help you analyze ARGO float data, find patterns, and answer questions about ocean conditions. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = [
    "Show salinity near the equator",
    "What's the average temperature at 500m depth?",
    "Find temperature anomalies in the Pacific",
    "Compare salinity between Atlantic and Pacific",
  ];

  const mockBotResponses = [
    "Based on the latest ARGO data, I found interesting patterns in salinity distribution near the equator. The average salinity is 35.2 PSU with variations between 34.8-35.6 PSU depending on location and season.",
    "The average temperature at 500m depth across all active ARGO floats is 8.9°C, with a standard deviation of ±2.3°C. This varies significantly by ocean basin and latitude.",
    "I've identified several temperature anomalies in the Pacific Ocean. There are currently 3 warm anomalies (+2-3°C above average) in the central Pacific and 2 cold anomalies (-1.5°C) near the Alaskan current.",
    "Comparing Atlantic and Pacific salinity data: Atlantic Ocean shows higher average salinity (35.4 PSU) compared to Pacific (34.7 PSU). This difference is most pronounced in the upper 200m of the water column.",
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setInputText('');

    // Simulate API delay
    setTimeout(() => {
      const randomResponse = mockBotResponses[Math.floor(Math.random() * mockBotResponses.length)];
      const botResponse: Message = {
        id: messages.length + 2,
        text: randomResponse,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSampleQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-[#001f3f] text-white relative overflow-hidden">
      <FloatingBubbles />
      <Sidebar />
      
      <div className="ml-64 p-8 h-screen flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold mb-2">OceanIQ AI Assistant</h1>
          <p className="text-slate-400">Ask questions about ocean data and get AI-powered insights</p>
        </motion.div>

        {/* Sample Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-sm text-slate-400 mb-3">Try these sample questions:</p>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSampleQuestion(question)}
                className="px-3 py-1 bg-white/10 text-sm rounded-full hover:bg-white/20 transition-colors border border-white/20"
              >
                {question}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Chat Messages */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 overflow-hidden flex flex-col"
        >
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.isBot
                      ? 'bg-gradient-to-r from-[#00bcd4] to-[#00acc1] text-white'
                      : 'bg-white/20 text-white border border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.isBot ? (
                      <CpuChipIcon className="h-4 w-4" />
                    ) : (
                      <UserIcon className="h-4 w-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.isBot ? 'OceanIQ AI' : 'You'}
                    </span>
                    <span className="text-xs opacity-50">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gradient-to-r from-[#00bcd4] to-[#00acc1] text-white p-4 rounded-2xl max-w-[80%]">
                  <div className="flex items-center gap-2 mb-2">
                    <CpuChipIcon className="h-4 w-4" />
                    <span className="text-xs opacity-70">OceanIQ AI</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about ocean data patterns, temperature, salinity..."
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-[#00bcd4] focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-[#00bcd4] to-[#00acc1] text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Chatbot;