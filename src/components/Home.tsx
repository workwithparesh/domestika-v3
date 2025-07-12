import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Users, ThumbsUp, Star, Sparkles, Brain, Zap, MessageCircle } from 'lucide-react';

const Home: React.FC = () => {
  const recommendedCourses = [
    {
      id: 1,
      title: "Digital Illustration Basics",
      instructor: "Sarah Chen",
      category: "DOMESTIKA BASICS • 7 COURSES",
      description: "Learn how to master digital illustration fundamentals and create professional-quality artwork",
      students: "76,425",
      rating: "93% (1.2K)",
      originalPrice: "₹829",
      discountPrice: "₹150",
      discount: "82%",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      bestSeller: true
    },
    {
      id: 2,
      title: "Character Design Fundamentals",
      instructor: "Marcus Rodriguez",
      category: "DOMESTIKA BASICS • 5 COURSES",
      description: "Create compelling characters with personality and strong visual storytelling techniques",
      students: "45,230",
      rating: "97% (892)",
      originalPrice: "₹829",
      discountPrice: "₹74",
      discount: "91%",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      bestSeller: true
    },
    {
      id: 3,
      title: "Color Theory Mastery",
      instructor: "Elena Vasquez",
      category: "DOMESTIKA BASICS • 4 COURSES",
      description: "Master color relationships and create harmonious palettes for impactful designs",
      students: "32,663",
      rating: "99% (895)",
      originalPrice: "₹829",
      discountPrice: "₹74",
      discount: "91%",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      bestSeller: true
    },
    {
      id: 4,
      title: "Advanced Digital Painting",
      instructor: "David Kim",
      category: "DOMESTIKA BASICS • 6 COURSES",
      description: "Explore advanced digital painting techniques and professional workflow optimization",
      students: "44,835",
      rating: "99% (613)",
      originalPrice: "₹829",
      discountPrice: "₹150",
      discount: "82%",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      bestSeller: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* AI Creative Assistant Banner */}
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-red-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">AI Creative Assistant</h2>
                    <p className="text-orange-100">Powered by advanced AI technology</p>
                  </div>
                  </div>
                  
                  {/* AI Info Cue */}
                  <div className="group relative">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center cursor-help">
                      <span className="text-white text-xs font-bold">i</span>
                    </div>
                    <div className="absolute -top-20 -right-4 bg-gray-900 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 w-64">
                      <div className="space-y-1">
                        <div>• Upload your creative work for instant feedback</div>
                        <div>• Get personalized learning recommendations</div>
                        <div>• Chat with AI for concept explanations</div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg mb-6 text-orange-50 leading-relaxed">
                  Get instant feedback on your creative work, discover personalized learning paths, 
                  and accelerate your artistic growth with our intelligent AI companion.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm font-medium text-white">Smart Feedback</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <Zap className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm font-medium text-white">Instant Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <MessageCircle className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm font-medium text-white">24/7 Learning Support</span>
                  </div>
                </div>
                
                <Link
                  to="/my-learning"
                  className="inline-flex items-center space-x-2 bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all font-semibold"
                >
                  <span>Try AI Assistant</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              {/* Animated Background Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-12 w-12 h-12 bg-white/10 rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 right-8 w-6 h-6 bg-white/20 rounded-full animate-ping"></div>
            </div>

            {/* Recommended Courses Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Recommended courses</h2>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <span className="font-medium">See more</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                {recommendedCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-gray-900 ml-1" />
                        </div>
                      </div>
                      {course.bestSeller && (
                        <div className="absolute top-3 left-3 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                          BEST SELLER
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="text-xs text-gray-500 font-medium mb-2">
                        {course.category}
                      </div>
                      
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        A course by {course.instructor}
                      </p>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{course.students}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-orange-500 font-bold text-sm">
                            {course.discount}% Disc.
                          </span>
                          <span className="text-gray-400 line-through text-sm ml-2">
                            {course.originalPrice}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <button className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium">
                        🛒 Buy {course.discountPrice}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Your Domestika profile</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-500">14%</div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Who are you?</span>
                  <span className="text-gray-900">→</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Learning Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Courses Started</span>
                  <span className="font-bold text-gray-900">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Hours Learned</span>
                  <span className="font-bold text-gray-900">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">AI Feedback Sessions</span>
                  <span className="font-bold text-orange-500">8</span>
                </div>
              </div>
            </div>

            {/* AI Assistant CTA */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white mt-6">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <p className="text-sm text-orange-100 mb-4">
                Get personalized feedback on your creative projects
              </p>
              <Link
                to="/my-learning"
                className="block w-full bg-white text-orange-600 text-center py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Try Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;