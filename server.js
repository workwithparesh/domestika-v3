import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock AI responses for practice feedback
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

// Mock learning assistant responses
const mockLearningResponses = {
  greeting: "Hi! I see you're working on 'Digital Illustration Basics'. How can I help you with this course today? Are you stuck on a concept, looking for practice, or wondering what's next?",
  blendingModes: "Certainly!\n\n**Multiply** darkens. It's like stacking transparent colored gels – the more you stack, the darker it gets. Great for shadows or darkening areas.\n\n**Screen** lightens. It's like projecting multiple slides onto the same screen – the light areas combine and brighten. Ideal for highlights or adding glows.\n\nThink of Multiply for shadows, Screen for light! Do you want to try a quick exercise on this?",
  colorTheory: "Fantastic! To truly master color theory from 'Digital Illustration Basics', I'd suggest focusing on two things:\n\n1. **Practice Exercise:** Create a color palette based on a specific mood (e.g., 'calm forest' or 'energetic city night'), applying what you learned about warm/cool and complementary colors.\n2. **Next Micro-Course:** Consider our 'Advanced Color Grading in Procreate' mini-course. It builds directly on foundational color theory and helps you apply it to actual digital artworks. Would you like me to provide details for either?",
  default: "I'm here to help with your creative journey! Feel free to ask about any concepts you're working on, techniques you'd like to practice, or what you should focus on next in your learning path."
};

// Routes
app.post('/api/practice-feedback', (req, res) => {
  const { imageUrl } = req.body;
  
  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL is required' });
  }
  
  // Simple logic to determine response type based on URL
  let responseType = 'default';
  if (imageUrl.includes('landscape') || imageUrl.includes('nature')) {
    responseType = 'landscape';
  } else if (imageUrl.includes('portrait') || imageUrl.includes('face')) {
    responseType = 'portrait';
  }
  
  const response = mockFeedbackResponses[responseType];
  
  // Simulate AI processing delay
  setTimeout(() => {
    res.json(response);
  }, 1500);
});

app.post('/api/practice-feedback/iterate', (req, res) => {
  // Return mock iteration suggestions
  setTimeout(() => {
    res.json({
      variations: mockIterations
    });
  }, 1000);
});

app.post('/api/learning-assistant', (req, res) => {
  const { message, context } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  let response = mockLearningResponses.default;
  
  // Context-based greeting
  if (context === 'Digital Illustration Basics' && message.toLowerCase().includes('help')) {
    response = mockLearningResponses.greeting;
  }
  // Concept clarification
  else if (message.toLowerCase().includes('blending') || message.toLowerCase().includes('multiply') || message.toLowerCase().includes('screen')) {
    response = mockLearningResponses.blendingModes;
  }
  // Personalized next step
  else if (message.toLowerCase().includes('finished') && message.toLowerCase().includes('color')) {
    response = mockLearningResponses.colorTheory;
  }
  // Greeting trigger
  else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    response = mockLearningResponses.greeting;
  }
  
  // Simulate AI processing delay
  setTimeout(() => {
    res.json({ response });
  }, 1200);
});

// Community Hub endpoints
app.get('/api/community-hub/data', (req, res) => {
  const { activity } = req.query;
  
  // Mock community data based on activity
  const mockData = {
    myCommunities: [
      {
        id: 'digital-art-masters',
        name: 'Digital Art Masters',
        description: 'A community for advanced digital artists sharing techniques and masterpieces',
        members: 8500,
        posts: 420,
        category: 'Digital Art',
        tags: ['Digital Art', 'Advanced', 'Techniques'],
        recentActivity: '2 hours ago',
        engagementPrompt: 'Share your latest digital artwork and get feedback from fellow masters!'
      }
    ],
    suggestedCommunities: [
      {
        id: 'color-theory-hub',
        name: 'Color Theory Enthusiasts',
        description: 'Dive deep into color relationships, palettes, and psychological impact of colors',
        members: 5600,
        posts: 320,
        category: 'Color Theory',
        tags: ['Color Theory', 'Palettes', 'Psychology'],
        recentActivity: '30 minutes ago',
        aiReason: 'Perfect match for your current Unit 3: Color Theory progress in Digital Illustration Basics'
      },
      {
        id: 'beginner-support',
        name: 'Creative Beginners Circle',
        description: 'A welcoming space for new artists to share work, ask questions, and grow together',
        members: 12800,
        posts: 890,
        category: 'Beginner Friendly',
        tags: ['Beginner', 'Support', 'Learning'],
        recentActivity: '15 minutes ago',
        aiReason: 'Great supportive community that matches your learning journey and skill development'
      },
      {
        id: 'character-design-pro',
        name: 'Character Design Professionals',
        description: 'Professional character designers sharing industry insights and portfolio reviews',
        members: 4200,
        posts: 280,
        category: 'Character Design',
        tags: ['Character Design', 'Professional', 'Portfolio'],
        recentActivity: '1 hour ago',
        aiReason: 'Recommended based on your Character Design Fundamentals course enrollment'
      }
    ],
    overallEngagementPrompt: {
      callToAction: activity === 'digital-illustration' 
        ? 'Your color theory progress is impressive! Share your learning journey with the community.'
        : 'Feeling inspired? Share your progress or ask for feedback!',
      suggestedAction: activity === 'digital-illustration'
        ? 'Create a post about your color theory discoveries'
        : 'Draft a post about your latest creative project'
    }
  };
  
  // Simulate API delay
  setTimeout(() => {
    res.json(mockData);
  }, 800);
});

app.post('/api/community-hub/join', (req, res) => {
  const { communityName } = req.body;
  
  if (!communityName) {
    return res.status(400).json({ error: 'Community name is required' });
  }
  
  // Simulate join delay
  setTimeout(() => {
    res.json({
      status: 'success',
      message: `Successfully joined ${communityName}! Welcome to the community.`
    });
  }, 1000);
});

app.post('/api/community-hub/post', (req, res) => {
  const { communityName, postTitle, postContent } = req.body;
  
  if (!communityName || !postTitle || !postContent) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // Simulate post creation delay
  setTimeout(() => {
    res.json({
      status: 'success',
      message: `Your post "${postTitle}" has been shared in ${communityName}!`
    });
  }, 1200);
});

app.post('/api/community-hub/ai-draft-post', (req, res) => {
  const { communityName, lastActivity, projectTopic } = req.body;
  
  // Mock AI-generated post drafts based on context
  const draftTemplates = {
    'color-theory': {
      draftTitle: 'Seeking Feedback on My Color Theory Journey',
      draftContent: `Just completed Unit 3 of Digital Illustration Basics focusing on color theory! I've been experimenting with warm vs cool color relationships and creating mood-based palettes.\n\nThe AI feedback helped me understand how color temperature affects composition depth. I'm particularly excited about applying color psychology to my next project.\n\nWhat are your favorite techniques for creating harmonious color schemes? Any tips for a fellow learner?`
    },
    'digital-illustration': {
      draftTitle: 'Progress Update: Digital Illustration Fundamentals',
      draftContent: `Sharing my journey through the Digital Illustration Basics course! Currently working on color theory and loving how it's transforming my understanding of digital art.\n\nThe AI Practice Studio has been incredibly helpful for getting specific feedback on composition and technique. Each iteration suggestion opens up new creative possibilities.\n\nWould love to connect with others on similar learning paths. What's been your biggest breakthrough moment in digital art?`
    },
    'character-design': {
      draftTitle: 'Character Anatomy Practice - Looking for Feedback',
      draftContent: `Working through Character Design Fundamentals and focusing on anatomy and proportions. The balance between realistic and stylized anatomy is fascinating!\n\nI've been practicing different character archetypes and how body language conveys personality. The AI assistant helped me understand how anatomical choices affect character appeal.\n\nAnyone else working on character design? I'd love to see your work and share feedback!`
    }
  };
  
  const template = draftTemplates[projectTopic] || draftTemplates['digital-illustration'];
  
  // Simulate AI processing delay
  setTimeout(() => {
    res.json(template);
  }, 1500);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}
)