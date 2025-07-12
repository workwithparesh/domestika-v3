import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle, User, Clock, Award, Palette, Upload, Camera, Sparkles, Eye, Loader2, Users, Heart, MessageSquare, TrendingUp } from 'lucide-react';
import ChatWidget from './ChatWidget';
import CommunitiesHub from './CommunitiesHub';

// Mock data for AI feedback
const mockFeedbackResponses = {
  landscape: {
    feedback: "Thanks for sharing your landscape! Your use of leading lines with the river is effective. However, the horizon line is centered, which can sometimes make the image feel static. Consider applying the Rule of Thirds. Also, the foreground appears a bit flat; perhaps adding some textural elements could enhance depth. Would you like me to suggest specific crops or ideas for foreground enhancement?",
    variations_offered: true
  },
  portrait: {
    feedback: "Beautiful portrait work! The lighting on the subject's face creates nice dimension. I notice the background might be competing for attention - consider using a wider aperture or post-processing to blur it slightly. The composition follows the rule of thirds well, but the subject's eyes could use a bit more sharpening to draw the viewer in. Would you like suggestions for enhancing the focal point?",
    variations_offered: true
  },
  default: {
    feedback: "Great work on this piece! I can see attention to detail in your composition. The color balance works well, though there's room to enhance the focal point. The lighting creates good mood, but consider how contrast could guide the viewer's eye more effectively. The overall technique shows solid fundamentals - shall we explore some iteration ideas?",
    variations_offered: true
  }
};

const mockIterations = [
  "**Crop Suggestion:** Imagine cropping from the bottom and slightly left to place the river's entry point near a lower-left intersection and the horizon on the upper third. This emphasizes depth and dynamism.",
  "**Foreground Enhancement (Conceptual):** Consider adding a rock or a cluster of wildflowers in the lower-right foreground, slightly out of focus, to create visual interest and depth.",
  "**Color Mood Shift (Co-creation):** We could explore a version with a warmer, golden hour light to evoke a sense of calm, or a cooler, more dramatic blue hour to create mystery."
];

// Mock communities data
const suggestedCommunities = [
  {
    id: 1,
    name: "Digital Illustration Masters",
    description: "A community for digital artists sharing techniques, feedback, and inspiration",
    members: 12500,
    posts: 850,
    category: "Digital Art",
    tags: ["Digital Illustration", "Procreate", "Photoshop"],
    recentActivity: "2 hours ago",
    matchReason: "Based on your Digital Illustration Basics course"
  },
  {
    id: 2,
    name: "Character Design Hub",
    description: "Share your character designs, get feedback, and learn from industry professionals",
    members: 8200,
    posts: 420,
    category: "Character Design",
    tags: ["Character Design", "Concept Art", "Animation"],
    recentActivity: "1 hour ago",
    matchReason: "Based on your Character Design Fundamentals course"
  },
  {
    id: 3,
    name: "Color Theory Enthusiasts",
    description: "Dive deep into color relationships, palettes, and psychological impact of colors",
    members: 5600,
    posts: 320,
    category: "Color Theory",
    tags: ["Color Theory", "Palettes", "Psychology"],
    recentActivity: "30 minutes ago",
    matchReason: "Based on your current Unit 3: Color Theory progress"
  },
  {
    id: 4,
    name: "Beginner Artists Support",
    description: "A welcoming space for new artists to share work, ask questions, and grow together",
    members: 15800,
    posts: 1200,
    category: "Beginner Friendly",
    tags: ["Beginner", "Support", "Learning"],
    recentActivity: "15 minutes ago",
    matchReason: "Perfect for your current learning level"
  }
];

interface FeedbackResponse {
  feedback: string;
  variations_offered: boolean;
}

const MyLearning: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatContext, setChatContext] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'practice' | 'communities'>('overview');
  
  // Practice Studio states
  const [imageUrl, setImageUrl] = useState('https://picsum.photos/800/600?random=1');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [iterations, setIterations] = useState<string[]>([]);
  const [showIterations, setShowIterations] = useState(false);
  const [iterationLoading, setIterationLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, text: string, isUser: boolean}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const handleAskAI = (courseName: string) => {
    setChatContext(courseName);
    setShowChat(true);
  };

  // Practice Studio functions
  const handleSimulateUpload = () => {
    setImageUrl(`https://picsum.photos/800/600?random=${Math.floor(Math.random() * 100)}`);
  };

  const handleGetFeedback = async () => {
    if (!imageUrl.trim()) return;
    
    setIsLoading(true);
    setFeedback(null);
    setIterations([]);
    setShowIterations(false);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Simple logic to determine response type based on URL
      let responseType = 'default';
      if (imageUrl.includes('landscape') || imageUrl.includes('nature')) {
        responseType = 'landscape';
      } else if (imageUrl.includes('portrait') || imageUrl.includes('face')) {
        responseType = 'portrait';
      }
      
      const response = mockFeedbackResponses[responseType as keyof typeof mockFeedbackResponses];
      setFeedback(response);
      setIsLoading(false);
    }, 1500);
  };

  const handleGetIterations = async () => {
    setIterationLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      setIterations(mockIterations);
      setShowIterations(true);
      setIterationLoading(false);
    }, 1000);
  };

  const handleSendChatMessage = async (text: string = chatInput) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      let response = "I'm here to help with your creative journey! Feel free to ask about any concepts you're working on, techniques you'd like to practice, or what you should focus on next in your learning path.";
      
      // Practice Studio specific responses
      if (text.toLowerCase().includes('rule of thirds') || text.toLowerCase().includes('composition')) {
        response = "The Rule of Thirds is a fundamental composition technique! Imagine dividing your image into a 3x3 grid. Placing key elements along these lines or at their intersections creates more dynamic, visually interesting compositions.\n\nFor your landscape, try positioning the horizon on the upper or lower third line rather than center. This gives more weight to either the sky or foreground, creating better visual balance.";
      }
      else if (text.toLowerCase().includes('foreground') || text.toLowerCase().includes('depth')) {
        response = "Great question about foreground enhancement! Here are some effective techniques:\n\n**Leading Lines:** Use rocks, fallen logs, or shoreline curves to guide the eye into the scene.\n**Depth Layers:** Include close, middle, and far elements to create depth.\n**Selective Focus:** Keep foreground elements slightly soft to maintain focus on your main subject.\n**Color Contrast:** Use warmer tones in the foreground and cooler tones in the background.";
      }
      else if (text.toLowerCase().includes('iteration') || text.toLowerCase().includes('variation') || text.toLowerCase().includes('crop')) {
        response = "The iteration suggestions are designed to help you explore different creative directions:\n\n**Cropping** changes the story and emphasis of your image.\n**Foreground elements** add depth and visual interest.\n**Color mood shifts** can completely transform the emotional impact.\n\nWhich aspect interests you most? I can provide more specific guidance on any of these techniques!";
      }
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setChatLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Learning Dashboard</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track your progress, practice with AI feedback, and connect with creative communities.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-orange-200">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'practice'
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span>Practice Studio</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('communities')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'communities'
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Communities</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Progress</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">3</h3>
                  <p className="text-gray-600">Courses Started</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">12</h3>
                  <p className="text-gray-600">Hours Learned</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">1</h3>
                  <p className="text-gray-600">Completed</p>
                </div>
              </div>
            </div>

            {/* Current Courses */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Courses</h2>
              
              <div className="space-y-6">
                {/* Course 1 */}
                <div className="bg-white/80 rounded-xl p-6 border border-orange-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <Link 
                        to="/course/digital-illustration-basics"
                        className="text-xl font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors cursor-pointer"
                      >
                        Digital Illustration Basics
                      </Link>
                      <p className="text-gray-600 mb-3">Learn fundamental digital illustration techniques and tools</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span>Progress: 65%</span>
                        <span>•</span>
                        <span>Unit 3 of 5</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleAskAI('Digital Illustration Basics')}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Ask AI</span>
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">✓ Unit 1: Basics</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">✓ Unit 2: Tools</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Current: Unit 3: Color Theory</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Unit 4: Composition</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Unit 5: Portfolio</span>
                  </div>
                </div>

                {/* Course 2 */}
                <div className="bg-white/80 rounded-xl p-6 border border-orange-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <Link 
                        to="/course/character-design-fundamentals"
                        className="text-xl font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors cursor-pointer"
                      >
                        Character Design Fundamentals
                      </Link>
                      <p className="text-gray-600 mb-3">Create compelling characters with personality and appeal</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span>Progress: 25%</span>
                        <span>•</span>
                        <span>Unit 1 of 4</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleAskAI('Character Design Fundamentals')}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Ask AI</span>
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Current: Unit 1: Anatomy</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Unit 2: Personality</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Unit 3: Expressions</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Unit 4: Portfolio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-700">Completed Unit 2: Digital Tools</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-700">Started Color Theory lessons</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-700">Joined Character Design course</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
              
              <div className="space-y-3">
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2">Based on your progress in Color Theory, you might enjoy:</p>
                  <p className="text-sm font-medium text-orange-700">Advanced Color Grading</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2">Complete your current unit to unlock:</p>
                  <p className="text-sm font-medium text-blue-700">Digital Painting Techniques</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab('practice')}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all"
                >
                  <Palette className="w-5 h-5" />
                  <span>Practice Studio</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('communities')}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  <Users className="w-5 h-5" />
                  <span>Join Communities</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'practice' && (
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Practice Studio</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Upload your projects and get instant AI feedback to refine your craft. 
              Discover specific improvements and explore creative variations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Upload Your Work</h3>
                
                {/* AI Info Cue */}
                <div className="group relative">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center cursor-help">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <div className="absolute -top-20 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    <div className="space-y-1">
                      <div>• Upload any creative file for AI analysis</div>
                      <div>• Get specific feedback and improvement tips</div>
                      <div>• Explore creative variations and iterations</div>
                    </div>
                    <div className="absolute top-full right-4 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* File Upload Options */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <Camera className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">Images</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Upload className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Videos</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Upload className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Audio</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <Upload className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">Documents</span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    File URL or Upload
                  </label>
                  <input
                    type="text"
                    id="fileUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Paste file URL here or use simulate upload..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported: Images, Videos, Audio, PDFs, Text files, Code files
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleSimulateUpload}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Simulate File Upload</span>
                  </button>
                  
                  <button
                    onClick={handleGetFeedback}
                    disabled={isLoading || !imageUrl.trim()}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Get AI Feedback</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* File Preview */}
              {imageUrl && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">File Preview</h4>
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt="File preview" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Feedback Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">AI Feedback</h3>
                
                {/* AI Info Cue */}
                <div className="group relative">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center cursor-help">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <div className="absolute -top-16 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    <div className="space-y-1">
                      <div>• AI analyzes your work for improvements</div>
                      <div>• Get specific technical and creative feedback</div>
                      <div>• Ask follow-up questions about suggestions</div>
                    </div>
                    <div className="absolute top-full right-4 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
              
              {!feedback && !isLoading && (
                <div className="text-center py-12">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Upload any creative file to get AI feedback</p>
                </div>
              )}
              
              {isLoading && (
                <div className="text-center py-12">
                  <Loader2 className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" />
                  <p className="text-gray-600">Analyzing your work...</p>
                </div>
              )}
              
              {feedback && (
                <div className="space-y-6">
                  <div className="bg-orange-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Feedback</h4>
                    <p className="text-gray-700 leading-relaxed">{feedback.feedback}</p>
                  </div>
                  
                  {feedback.variations_offered && (
                    <div className="space-y-4">
                      <button
                        onClick={handleGetIterations}
                        disabled={iterationLoading}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all font-medium disabled:opacity-50"
                      >
                        {iterationLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Generating Ideas...</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            <span>Suggest Iterations / Co-create</span>
                          </>
                        )}
                      </button>
                      
                      {showIterations && iterations.length > 0 && (
                        <div className="space-y-3">
                          <h5 className="font-semibold text-gray-900">Creative Variations:</h5>
                          {iterations.map((iteration, index) => (
                            <div key={index} className="bg-orange-50 rounded-lg p-4">
                              <div className="text-sm text-gray-700 whitespace-pre-line">
                                {iteration}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Ask Questions Section */}
          {feedback && (
            <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Ask Questions About Your Feedback</h3>
                
                {/* AI Info Cue */}
                <div className="group relative">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center cursor-help">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <div className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    <div className="space-y-1">
                      <div>• Chat with AI about your feedback</div>
                      <div>• Get detailed explanations of techniques</div>
                      <div>• Ask for step-by-step guidance</div>
                    </div>
                    <div className="absolute top-full right-4 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Chat Messages */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    {chatMessages.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 mb-4">Ask me about your feedback or iterations!</p>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 mb-2">Try asking:</p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {[
                              "Explain the Rule of Thirds",
                              "How can I improve my foreground?",
                              "Tell me about the iterations",
                              "What's the best cropping approach?"
                            ].map((question, index) => (
                              <button
                                key={index}
                                onClick={() => handleSendChatMessage(question)}
                                className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors"
                              >
                                {question}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {chatMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs px-3 py-2 rounded-lg ${
                                message.isUser
                                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                                  : 'bg-white text-gray-800 border border-gray-200'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-line">{message.text}</p>
                            </div>
                          </div>
                        ))}
                        
                        {chatLoading && (
                          <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 px-3 py-2 rounded-lg flex items-center space-x-2">
                              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                              <span className="text-sm text-gray-600">AI is thinking...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Chat Input */}
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendChatMessage()}
                      placeholder="Ask about your feedback or iterations..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      disabled={chatLoading}
                    />
                    <button
                      onClick={() => handleSendChatMessage()}
                      disabled={!chatInput.trim() || chatLoading}
                      className="p-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Quick Questions</h4>
                  <div className="space-y-2">
                    {[
                      "What is the Rule of Thirds?",
                      "How do I improve foreground depth?",
                      "Explain the cropping suggestion",
                      "What are leading lines?",
                      "How do I create better composition?",
                      "Tell me about color mood shifts"
                    ].map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendChatMessage(question)}
                        className="w-full text-left px-4 py-3 bg-white/80 rounded-lg border border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-colors text-sm"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'communities' && (
        <div className="max-w-6xl mx-auto">
          <CommunitiesHub />
        </div>
      )}

      {/* Chat Widget */}
      <ChatWidget 
        isOpen={showChat} 
        onClose={() => setShowChat(false)}
        context={chatContext}
      />

      {/* Floating Chat Button */}
      {!showChat && activeTab === 'overview' && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center z-40"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default MyLearning;