import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Plus, X, Send, Sparkles, Heart, MessageSquare, TrendingUp, CheckCircle, Loader2 } from 'lucide-react';

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  posts: number;
  category: string;
  tags: string[];
  recentActivity: string;
  engagementPrompt?: string;
  aiReason?: string;
}

interface CommunityData {
  myCommunities: Community[];
  suggestedCommunities: Community[];
  overallEngagementPrompt: {
    callToAction: string;
    suggestedAction: string;
  };
}

interface PostDraft {
  draftTitle: string;
  draftContent: string;
}

const CommunitiesHub: React.FC = () => {
  const [communityData, setCommunityData] = useState<CommunityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<string>('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [isJoining, setIsJoining] = useState<string>('');
  const [isPosting, setIsPosting] = useState(false);
  const [isDraftingPost, setIsDraftingPost] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/community-hub/data?activity=digital-illustration');
      const data = await response.json();
      setCommunityData(data);
    } catch (error) {
      console.error('Error fetching community data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCommunity = async (community: Community) => {
    try {
      setIsJoining(community.id);
      
      const response = await fetch('/api/community-hub/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ communityName: community.name })
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        // Move community from suggested to my communities
        setCommunityData(prev => {
          if (!prev) return prev;
          
          const updatedCommunity = {
            ...community,
            engagementPrompt: `Welcome to ${community.name}! Share your work and connect with fellow creators.`
          };
          
          return {
            ...prev,
            myCommunities: [...prev.myCommunities, updatedCommunity],
            suggestedCommunities: prev.suggestedCommunities.filter(c => c.id !== community.id)
          };
        });
        
        setSuccessMessage(result.message);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error joining community:', error);
    } finally {
      setIsJoining('');
    }
  };

  const handleCreatePost = (communityName?: string) => {
    setSelectedCommunity(communityName || '');
    setPostTitle('');
    setPostContent('');
    setShowPostModal(true);
  };

  const handleAIDraftPost = async () => {
    try {
      setIsDraftingPost(true);
      
      const response = await fetch('/api/community-hub/ai-draft-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          communityName: selectedCommunity,
          lastActivity: 'digital-illustration',
          projectTopic: 'color-theory'
        })
      });
      
      const draft: PostDraft = await response.json();
      setPostTitle(draft.draftTitle);
      setPostContent(draft.draftContent);
    } catch (error) {
      console.error('Error drafting post:', error);
    } finally {
      setIsDraftingPost(false);
    }
  };

  const handleSubmitPost = async () => {
    if (!postTitle.trim() || !postContent.trim() || !selectedCommunity) return;
    
    try {
      setIsPosting(true);
      
      const response = await fetch('/api/community-hub/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          communityName: selectedCommunity,
          postTitle: postTitle.trim(),
          postContent: postContent.trim()
        })
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setSuccessMessage(result.message);
        setShowPostModal(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsPosting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" />
        <p className="text-gray-600">Loading communities...</p>
      </div>
    );
  }

  if (!communityData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Failed to load communities. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Communities</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Connect with fellow creators, share your work, and grow together in supportive communities.
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800">{successMessage}</span>
        </div>
      )}

      {/* Overall AI Engagement Card */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">AI Community Assistant</h3>
                <p className="text-orange-100">Personalized engagement suggestions</p>
              </div>
            </div>
            
            {/* AI Info Cue */}
            <div className="group relative">
              <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center cursor-help">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div className="absolute -top-16 -right-4 bg-gray-900 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 w-64">
                <div className="space-y-1">
                  <div>• Get AI-powered community suggestions</div>
                  <div>• Receive personalized engagement prompts</div>
                  <div>• AI helps draft meaningful posts</div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
          
          <p className="text-lg mb-6 text-orange-50 leading-relaxed">
            {communityData.overallEngagementPrompt.callToAction}
          </p>
          
          <button
            onClick={() => handleCreatePost()}
            className="inline-flex items-center space-x-2 bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>Create a Post</span>
          </button>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-12 w-12 h-12 bg-white/10 rounded-full animate-bounce"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* My Communities */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">My Communities</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{communityData.myCommunities.length} joined</span>
            </div>
          </div>
          
          {communityData.myCommunities.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">You haven't joined any communities yet</p>
              <p className="text-sm text-gray-400">Join suggested communities below to start connecting!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {communityData.myCommunities.map((community) => (
                <div key={community.id} className="bg-white/80 rounded-xl p-6 border border-orange-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{community.name}</h4>
                      <p className="text-gray-600 mb-3">{community.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{community.members.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{community.posts}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{community.recentActivity}</span>
                        </div>
                      </div>
                      
                      {community.engagementPrompt && (
                        <div className="bg-orange-50 rounded-lg p-3 mb-4">
                          <div className="flex items-start space-x-2">
                            <Sparkles className="w-4 h-4 text-orange-500 mt-0.5" />
                            <p className="text-sm text-orange-700">{community.engagementPrompt}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {community.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Users className="w-4 h-4" />
                      <span>View Community</span>
                    </button>
                    <button
                      onClick={() => handleCreatePost(community.name)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Post</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Suggested Communities */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Suggested Communities</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Sparkles className="w-4 h-4" />
              <span>AI Recommended</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {communityData.suggestedCommunities.map((community) => (
              <div key={community.id} className="bg-white/80 rounded-xl p-6 border border-orange-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{community.name}</h4>
                    <p className="text-gray-600 mb-3">{community.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{community.members.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{community.posts}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{community.recentActivity}</span>
                      </div>
                    </div>
                    
                    {community.aiReason && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-4">
                        <div className="flex items-start space-x-2">
                          <Sparkles className="w-4 h-4 text-blue-500 mt-0.5" />
                          <p className="text-sm text-blue-700">
                            <span className="font-medium">AI Recommendation:</span> {community.aiReason}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {community.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Users className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleJoinCommunity(community)}
                    disabled={isJoining === community.id}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
                  >
                    {isJoining === community.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Joining...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Join Community</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Post Creation Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Create New Post</h3>
                  <p className="text-sm text-gray-600">Share your work and connect with the community</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowPostModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Community Selection */}
              <div>
                <label htmlFor="community" className="block text-sm font-medium text-gray-700 mb-2">
                  Community
                </label>
                <select
                  id="community"
                  value={selectedCommunity}
                  onChange={(e) => setSelectedCommunity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select a community</option>
                  {communityData.myCommunities.map((community) => (
                    <option key={community.id} value={community.name}>
                      {community.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Post Title */}
              <div>
                <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Post Title
                </label>
                <input
                  type="text"
                  id="postTitle"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="What's your post about?"
                />
              </div>

              {/* Post Content */}
              <div>
                <label htmlFor="postContent" className="block text-sm font-medium text-gray-700 mb-2">
                  Post Content
                </label>
                <textarea
                  id="postContent"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Share your thoughts, ask questions, or showcase your work..."
                />
              </div>

              {/* AI Draft Button */}
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                    <span className="font-medium text-gray-900">AI Writing Assistant</span>
                  </div>
                  
                  {/* AI Info Cue */}
                  <div className="group relative">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center cursor-help">
                      <span className="text-white text-xs font-bold">i</span>
                    </div>
                    <div className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      <div>AI generates personalized post content based on your activity</div>
                      <div className="absolute top-full right-4 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Let AI help you draft a meaningful post based on your recent learning activity.
                </p>
                <button
                  onClick={handleAIDraftPost}
                  disabled={isDraftingPost || !selectedCommunity}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50"
                >
                  {isDraftingPost ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Drafting...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>AI Draft My Post</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowPostModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPost}
                disabled={isPosting || !postTitle.trim() || !postContent.trim() || !selectedCommunity}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50 font-medium"
              >
                {isPosting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Post</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunitiesHub;