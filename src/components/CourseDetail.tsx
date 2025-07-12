import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, CheckCircle, Circle, Play, MessageCircle, Send, Loader2, Award, Target } from 'lucide-react';

// Mock course data
const courseData = {
  'digital-illustration-basics': {
    title: 'Digital Illustration Basics',
    description: 'Master the fundamentals of digital illustration with industry-standard techniques and tools.',
    instructor: 'Sarah Chen',
    duration: '8 hours',
    progress: 65,
    currentUnit: 3,
    totalUnits: 5,
    units: [
      {
        id: 1,
        title: 'Getting Started with Digital Art',
        description: 'Introduction to digital illustration, setting up your workspace, and understanding basic concepts.',
        duration: '1.5 hours',
        completed: true,
        lessons: [
          { title: 'What is Digital Illustration?', duration: '15 min', completed: true },
          { title: 'Setting Up Your Workspace', duration: '20 min', completed: true },
          { title: 'Understanding Resolution and Canvas Size', duration: '25 min', completed: true },
          { title: 'Basic Navigation and Interface', duration: '30 min', completed: true }
        ]
      },
      {
        id: 2,
        title: 'Digital Tools and Brushes',
        description: 'Explore different digital tools, brush settings, and how to customize your toolkit.',
        duration: '2 hours',
        completed: true,
        lessons: [
          { title: 'Brush Basics and Settings', duration: '30 min', completed: true },
          { title: 'Creating Custom Brushes', duration: '25 min', completed: true },
          { title: 'Pen Pressure and Sensitivity', duration: '20 min', completed: true },
          { title: 'Tool Organization and Shortcuts', duration: '25 min', completed: true },
          { title: 'Practice Exercise: Tool Exploration', duration: '20 min', completed: true }
        ]
      },
      {
        id: 3,
        title: 'Color Theory and Application',
        description: 'Understanding color relationships, creating harmonious palettes, and applying color effectively.',
        duration: '2.5 hours',
        completed: false,
        current: true,
        lessons: [
          { title: 'Color Wheel and Relationships', duration: '30 min', completed: true },
          { title: 'Creating Color Palettes', duration: '35 min', completed: true },
          { title: 'Warm vs Cool Colors', duration: '25 min', completed: false, current: true },
          { title: 'Color Psychology in Art', duration: '30 min', completed: false },
          { title: 'Practice: Mood-Based Palettes', duration: '40 min', completed: false }
        ]
      },
      {
        id: 4,
        title: 'Composition and Layout',
        description: 'Learn the principles of good composition and how to arrange elements effectively.',
        duration: '1.5 hours',
        completed: false,
        lessons: [
          { title: 'Rule of Thirds and Golden Ratio', duration: '25 min', completed: false },
          { title: 'Leading Lines and Flow', duration: '20 min', completed: false },
          { title: 'Balance and Hierarchy', duration: '25 min', completed: false },
          { title: 'Composition Analysis Exercise', duration: '20 min', completed: false }
        ]
      },
      {
        id: 5,
        title: 'Building Your Portfolio',
        description: 'Create a professional portfolio and prepare your work for presentation.',
        duration: '1 hour',
        completed: false,
        lessons: [
          { title: 'Portfolio Planning', duration: '15 min', completed: false },
          { title: 'Presentation Techniques', duration: '20 min', completed: false },
          { title: 'Final Project Guidelines', duration: '25 min', completed: false }
        ]
      }
    ]
  },
  'character-design-fundamentals': {
    title: 'Character Design Fundamentals',
    description: 'Create compelling characters with personality, appeal, and strong visual storytelling.',
    instructor: 'Marcus Rodriguez',
    duration: '6 hours',
    progress: 25,
    currentUnit: 1,
    totalUnits: 4,
    units: [
      {
        id: 1,
        title: 'Anatomy and Proportions',
        description: 'Master the fundamentals of character anatomy and proportional relationships.',
        duration: '2 hours',
        completed: false,
        current: true,
        lessons: [
          { title: 'Basic Human Proportions', duration: '30 min', completed: true },
          { title: 'Stylized vs Realistic Anatomy', duration: '25 min', completed: false, current: true },
          { title: 'Drawing Different Body Types', duration: '35 min', completed: false },
          { title: 'Hands and Feet Fundamentals', duration: '30 min', completed: false }
        ]
      },
      {
        id: 2,
        title: 'Personality and Appeal',
        description: 'Develop characters with distinct personalities and visual appeal.',
        duration: '1.5 hours',
        completed: false,
        lessons: [
          { title: 'Character Archetypes', duration: '25 min', completed: false },
          { title: 'Visual Personality Traits', duration: '30 min', completed: false },
          { title: 'Silhouette Design', duration: '35 min', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Facial Expressions and Emotions',
        description: 'Bring your characters to life with expressive faces and emotional range.',
        duration: '1.5 hours',
        completed: false,
        lessons: [
          { title: 'Basic Facial Structure', duration: '20 min', completed: false },
          { title: 'Expression Fundamentals', duration: '25 min', completed: false },
          { title: 'Emotional Range Exercise', duration: '35 min', completed: false },
          { title: 'Micro-expressions', duration: '10 min', completed: false }
        ]
      },
      {
        id: 4,
        title: 'Character Portfolio Development',
        description: 'Create a professional character design portfolio.',
        duration: '1 hour',
        completed: false,
        lessons: [
          { title: 'Portfolio Structure', duration: '15 min', completed: false },
          { title: 'Character Sheets and Turnarounds', duration: '25 min', completed: false },
          { title: 'Final Character Project', duration: '20 min', completed: false }
        ]
      }
    ]
  }
};

// Mock AI responses for course-specific context
const courseAIResponses = {
  'digital-illustration-basics': {
    greeting: "Hi! I'm here to help you with Digital Illustration Basics. I see you're currently working on Unit 3: Color Theory, specifically the 'Warm vs Cool Colors' lesson. How can I assist you today?",
    colorTheory: "Great question about color theory! Since you're in Unit 3, let me explain:\n\n**Warm Colors** (reds, oranges, yellows) tend to advance and feel energetic, while **Cool Colors** (blues, greens, purples) recede and feel calming.\n\nFor your current lesson on Warm vs Cool Colors, try this exercise: Create two versions of the same simple illustration - one using primarily warm colors, another using cool colors. Notice how the mood changes!\n\nWould you like me to explain color temperature in more detail?",
    warmCool: "Perfect timing! Since you're on the 'Warm vs Cool Colors' lesson:\n\n**Warm Colors:**\n- Reds, oranges, yellows\n- Feel energetic, aggressive, or cozy\n- Appear to come forward in compositions\n- Great for focal points and action\n\n**Cool Colors:**\n- Blues, greens, purples\n- Feel calm, peaceful, or mysterious\n- Appear to recede into the background\n- Perfect for creating depth and atmosphere\n\n**Pro Tip:** Use warm colors for your main subject and cool colors for backgrounds to create natural depth!\n\nReady to move on to Color Psychology, or do you want to practice more with temperature?",
    nextSteps: "Based on your progress in Unit 3 (Color Theory), here's what I recommend:\n\n**Current Focus:** Complete 'Warm vs Cool Colors' - you're doing great!\n\n**Next Up:** 'Color Psychology in Art' will teach you how colors affect emotions and storytelling.\n\n**After Unit 3:** Unit 4 covers Composition and Layout, which will help you apply your color knowledge effectively.\n\n**Practice Suggestion:** Try the 'Mood-Based Palettes' exercise at the end of this unit - it combines everything you've learned!\n\nNeed help with any specific color concepts?",
    brushes: "I see you've completed Unit 2 on Digital Tools and Brushes! Since you're now in Color Theory, here's how brushes relate:\n\n**Brush Opacity** affects color blending - lower opacity creates smoother color transitions.\n\n**Brush Texture** can enhance color application - rough brushes for textured color, smooth for clean gradients.\n\n**Color Mixing Brushes** are perfect for your current unit - they blend colors naturally as you paint.\n\nWant me to explain how to use specific brush settings for color work?",
    default: "I'm here to help with your Digital Illustration Basics journey! You're currently in Unit 3: Color Theory. Feel free to ask about color concepts, review previous units, or get guidance on what's coming next."
  },
  'character-design-fundamentals': {
    greeting: "Hello! I'm your AI assistant for Character Design Fundamentals. I see you're working on Unit 1: Anatomy and Proportions, currently on 'Stylized vs Realistic Anatomy'. How can I help you today?",
    anatomy: "Great question about anatomy! Since you're on 'Stylized vs Realistic Anatomy':\n\n**Realistic Anatomy:**\n- Follows actual human proportions (8 heads tall)\n- Accurate muscle and bone structure\n- Natural movement and poses\n\n**Stylized Anatomy:**\n- Exaggerated or simplified proportions\n- Can be 6 heads tall (cute) or 9+ heads tall (heroic)\n- Emphasizes personality over accuracy\n\n**Key Tip:** Even stylized characters need anatomical foundation - learn the rules before breaking them!\n\nWould you like specific tips for your current lesson?",
    proportions: "Perfect! Proportions are fundamental to character design. Here's what you need to know for your current unit:\n\n**Basic Human Proportions (which you've completed):**\n- Adult = 8 heads tall\n- Child = 6 heads tall\n- Heroic = 8.5-9 heads tall\n\n**For Stylized Characters:**\n- Cute/Chibi = 2-4 heads tall\n- Cartoon = 5-7 heads tall\n- Realistic = 7-8 heads tall\n- Heroic = 8-10 heads tall\n\n**Current Focus:** Understanding when and why to break these rules for character appeal!\n\nNeed help with specific proportion challenges?",
    nextSteps: "Based on your progress in Unit 1, here's your path forward:\n\n**Current:** Finish 'Stylized vs Realistic Anatomy' - you're making great progress!\n\n**This Unit:** Still ahead - 'Drawing Different Body Types' and 'Hands and Feet Fundamentals'\n\n**Unit 2:** Personality and Appeal - where anatomy meets character!\n\n**Pro Tip:** Master basic proportions first, then experiment with stylization. Each style choice should serve your character's personality!\n\nWhat aspect of anatomy would you like to focus on?",
    personality: "I see you're interested in personality! That's Unit 2, which builds perfectly on your current anatomy work:\n\n**How Anatomy Affects Personality:**\n- Broad shoulders = strength, confidence\n- Hunched posture = shyness, age\n- Exaggerated features = specific traits\n\n**Coming in Unit 2:**\n- Character archetypes and visual storytelling\n- How body language conveys personality\n- Silhouette design for instant recognition\n\nFinish your anatomy fundamentals first - they're the foundation for expressive characters!\n\nAny specific anatomy questions for your current lesson?",
    default: "I'm here to help with Character Design Fundamentals! You're currently in Unit 1: Anatomy and Proportions. Ask me about anatomy, proportions, or what's coming up in your character design journey."
  }
};

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const course = courseId ? courseData[courseId as keyof typeof courseData] : null;
  const aiResponses = courseId ? courseAIResponses[courseId as keyof typeof courseAIResponses] : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Send initial greeting when component loads
    if (course && aiResponses && messages.length === 0) {
      const initialMessage: ChatMessage = {
        id: Date.now().toString(),
        text: aiResponses.greeting,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
    }
  }, [course, aiResponses]);

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim() || !aiResponses) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      let response = aiResponses.default;
      
      // Course-specific responses
      if (courseId === 'digital-illustration-basics') {
        if (text.toLowerCase().includes('color theory') || text.toLowerCase().includes('color')) {
          response = aiResponses.colorTheory || aiResponses.default;
        } else if (text.toLowerCase().includes('warm') || text.toLowerCase().includes('cool')) {
          response = aiResponses.warmCool || aiResponses.default;
        } else if (text.toLowerCase().includes('next') || text.toLowerCase().includes('what should')) {
          response = aiResponses.nextSteps || aiResponses.default;
        } else if (text.toLowerCase().includes('brush') || text.toLowerCase().includes('tool')) {
          response = aiResponses.brushes || aiResponses.default;
        }
      } else if (courseId === 'character-design-fundamentals') {
        if (text.toLowerCase().includes('anatomy') || text.toLowerCase().includes('proportion')) {
          response = aiResponses.anatomy || aiResponses.default;
        } else if (text.toLowerCase().includes('proportion')) {
          response = aiResponses.proportions || aiResponses.default;
        } else if (text.toLowerCase().includes('next') || text.toLowerCase().includes('what should')) {
          response = aiResponses.nextSteps || aiResponses.default;
        } else if (text.toLowerCase().includes('personality') || text.toLowerCase().includes('character')) {
          response = aiResponses.personality || aiResponses.default;
        }
      }
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link to="/my-learning" className="text-orange-600 hover:text-orange-700">
            ← Back to My Learning
          </Link>
        </div>
      </div>
    );
  }

  const currentUnit = course.units.find(unit => unit.current) || course.units[course.currentUnit - 1];
  const currentLesson = currentUnit?.lessons.find(lesson => lesson.current) || 
                      currentUnit?.lessons.find(lesson => !lesson.completed) ||
                      currentUnit?.lessons[0];

  const suggestedQuestions = courseId === 'digital-illustration-basics' 
    ? [
        "Explain warm vs cool colors",
        "What's next after color theory?",
        "How do I apply color psychology?",
        "Review brush techniques for color"
      ]
    : [
        "Help with stylized anatomy",
        "Explain character proportions",
        "What's coming in Unit 2?",
        "How does anatomy affect personality?"
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/my-learning" 
          className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Learning</span>
        </Link>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-200">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>Instructor: {course.instructor}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>Unit {course.currentUnit} of {course.totalUnits}</span>
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-orange-600 mb-1">{course.progress}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Course Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Focus */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Currently Learning</h2>
            
            <div className="bg-orange-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{currentUnit?.id}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{currentUnit?.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{currentUnit?.description}</p>
              
              {currentLesson && (
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Play className="w-5 h-5 text-orange-500" />
                    <div>
                      <h4 className="font-medium text-gray-900">{currentLesson.title}</h4>
                      <p className="text-sm text-gray-500">{currentLesson.duration}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* All Units */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Course Outline</h2>
            
            <div className="space-y-4">
              {course.units.map((unit) => (
                <div key={unit.id} className={`rounded-lg p-6 border-2 transition-all ${
                  unit.current 
                    ? 'bg-orange-50 border-orange-200' 
                    : unit.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      unit.completed 
                        ? 'bg-green-500' 
                        : unit.current 
                          ? 'bg-orange-500' 
                          : 'bg-gray-400'
                    }`}>
                      {unit.completed ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white font-bold text-sm">{unit.id}</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{unit.title}</h3>
                        <span className="text-sm text-gray-500">{unit.duration}</span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{unit.description}</p>
                      
                      <div className="space-y-2">
                        {unit.lessons.map((lesson, index) => (
                          <div key={index} className="flex items-center space-x-3 text-sm">
                            {lesson.completed ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : lesson.current ? (
                              <Play className="w-4 h-4 text-orange-500" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-400" />
                            )}
                            <span className={lesson.completed ? 'text-gray-500 line-through' : 'text-gray-700'}>
                              {lesson.title}
                            </span>
                            <span className="text-gray-400">({lesson.duration})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Assistant Sidebar */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center relative">
                <MessageCircle className="w-5 h-5 text-white" />
                
                {/* AI Info Cue */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Course Assistant</h3>
                <p className="text-sm text-gray-600">Ask about your current unit</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        message.isUser
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
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
                    <div className="bg-white border border-gray-200 px-3 py-2 rounded-lg flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your current lesson..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isLoading}
                className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Suggested Questions */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Quick questions:</p>
              <div className="space-y-1">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="w-full text-left px-3 py-2 bg-white/80 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Units Completed</span>
                <span className="font-semibold">{course.units.filter(u => u.completed).length}/{course.totalUnits}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current Unit</span>
                <span className="font-semibold">Unit {course.currentUnit}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Time Invested</span>
                <span className="font-semibold">
                  {course.units
                    .filter(u => u.completed)
                    .reduce((total, unit) => total + parseFloat(unit.duration), 0)
                    .toFixed(1)}h
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;