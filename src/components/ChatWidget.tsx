import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, Loader2 } from 'lucide-react';

// Mock learning assistant responses
const mockLearningResponses = {
  greeting: "Hi! I see you're working on 'Digital Illustration Basics'. How can I help you with this course today? Are you stuck on a concept, looking for practice, or wondering what's next?",
  practiceGreeting: "Hi! I'm here to help you understand your feedback and explore creative possibilities. Feel free to ask about the suggestions, techniques, or any aspect of your work!",
  blendingModes: "Certainly!\n\n**Multiply** darkens. It's like stacking transparent colored gels – the more you stack, the darker it gets. Great for shadows or darkening areas.\n\n**Screen** lightens. It's like projecting multiple slides onto the same screen – the light areas combine and brighten. Ideal for highlights or adding glows.\n\nThink of Multiply for shadows, Screen for light! Do you want to try a quick exercise on this?",
  colorTheory: "Fantastic! To truly master color theory from 'Digital Illustration Basics', I'd suggest focusing on two things:\n\n1. **Practice Exercise:** Create a color palette based on a specific mood (e.g., 'calm forest' or 'energetic city night'), applying what you learned about warm/cool and complementary colors.\n2. **Next Micro-Course:** Consider our 'Advanced Color Grading in Procreate' mini-course. It builds directly on foundational color theory and helps you apply it to actual digital artworks. Would you like me to provide details for either?",
  ruleOfThirds: "The Rule of Thirds is a fundamental composition technique! Imagine dividing your image into a 3x3 grid. Placing key elements along these lines or at their intersections creates more dynamic, visually interesting compositions.\n\nFor your landscape, try positioning the horizon on the upper or lower third line rather than center. This gives more weight to either the sky or foreground, creating better visual balance.",
  foregroundTips: "Great question about foreground enhancement! Here are some effective techniques:\n\n**Leading Lines:** Use rocks, fallen logs, or shoreline curves to guide the eye into the scene.\n**Depth Layers:** Include close, middle, and far elements to create depth.\n**Selective Focus:** Keep foreground elements slightly soft to maintain focus on your main subject.\n**Color Contrast:** Use warmer tones in the foreground and cooler tones in the background.",
  iterationHelp: "The iteration suggestions are designed to help you explore different creative directions:\n\n**Cropping** changes the story and emphasis of your image.\n**Foreground elements** add depth and visual interest.\n**Color mood shifts** can completely transform the emotional impact.\n\nWhich aspect interests you most? I can provide more specific guidance on any of these techniques!",
  default: "I'm here to help with your creative journey! Feel free to ask about any concepts you're working on, techniques you'd like to practice, or what you should focus on next in your learning path."
};

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, context }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && context && messages.length === 0) {
      // Send initial greeting when opened with context
      handleSendMessage('help', true);
    }
  }, [isOpen, context]);

  const handleSendMessage = async (text: string = inputText, isInitial: boolean = false) => {
    if (!text.trim() && !isInitial) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date(),
    };

    if (!isInitial) {
      setMessages(prev => [...prev, userMessage]);
    }
    setInputText('');
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      let response = mockLearningResponses.default;
      
      // Context-based greeting
      if (context === 'Digital Illustration Basics' && text.toLowerCase().includes('help')) {
        response = mockLearningResponses.greeting;
      }
      // Practice Studio greeting
      else if (context === 'Practice Studio' && text.toLowerCase().includes('help')) {
        response = mockLearningResponses.practiceGreeting;
      }
      // Concept clarification
      else if (text.toLowerCase().includes('blending') || text.toLowerCase().includes('multiply') || text.toLowerCase().includes('screen')) {
        response = mockLearningResponses.blendingModes;
      }
      // Personalized next step
      else if (text.toLowerCase().includes('finished') && text.toLowerCase().includes('color')) {
        response = mockLearningResponses.colorTheory;
      }
      // Greeting trigger
      else if (text.toLowerCase().includes('hello') || text.toLowerCase().includes('hi')) {
        response = context === 'Practice Studio' ? mockLearningResponses.practiceGreeting : mockLearningResponses.greeting;
      }
      // Practice Studio specific responses
      else if (text.toLowerCase().includes('rule of thirds') || text.toLowerCase().includes('composition')) {
        response = mockLearningResponses.ruleOfThirds;
      }
      else if (text.toLowerCase().includes('foreground') || text.toLowerCase().includes('depth')) {
        response = mockLearningResponses.foregroundTips;
      }
      else if (text.toLowerCase().includes('iteration') || text.toLowerCase().includes('variation') || text.toLowerCase().includes('crop')) {
        response = mockLearningResponses.iterationHelp;
      }
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      if (isInitial) {
        setMessages([aiMessage]);
      } else {
        setMessages(prev => [...prev, aiMessage]);
      }
      
      setIsLoading(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What should I focus on next?",
    "Explain blending modes",
    "I finished Unit 3, what's next?",
    "Help me with color theory"
  ];

  const practiceQuestions = [
    "Explain the Rule of Thirds",
    "How can I improve my foreground?",
    "Tell me about the iterations",
    "What's the best cropping approach?"
  ];

  const currentQuestions = context === 'Practice Studio' ? practiceQuestions : suggestedQuestions;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center relative">
              <MessageCircle className="w-5 h-5 text-white" />
              
              {/* AI Info Cue */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">i</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Learning Assistant</h3>
              {context && (
                <p className="text-sm text-gray-600">{context}</p>
              )}
            </div>
          </div>
          
          {/* Info Tooltip */}
          <div className="group relative mr-8">
            <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center cursor-help">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div className="absolute -top-16 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              <div className="space-y-1">
                <div>• Ask questions about your courses</div>
                <div>• Get explanations of concepts</div>
                <div>• Receive personalized learning guidance</div>
              </div>
              <div className="absolute top-full right-4 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-6">Ask me anything about your learning journey!</p>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isUser ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-2xl flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                <span className="text-sm text-gray-600">AI is thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your learning journey..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;