# Domestika Creative Assistant: Core Prototype

## Project Overview

This is a functional prototype of the **Domestika Creative Assistant**, showcasing two core AI-enhanced user flows designed to enhance the creative learning experience. The application demonstrates intelligent practice feedback and personalized learning guidance through a clean, responsive interface that aligns with Domestika's brand aesthetic.

## ⚠️ Important Notice

**All AI responses, image processing, and user data are completely simulated and mocked.** This prototype does not integrate with external Large Language Model APIs (OpenAI, Claude, etc.) or perform actual image analysis. All interactions are pre-defined responses designed to demonstrate the user experience and interface design.

## Core Features Demonstrated

### 1. Intelligent Practice Feedback & Iteration
- **AI Practice Studio** for uploading creative work
- Simulated AI feedback based on image content
- Creative iteration suggestions and co-creation ideas
- Visual feedback display with professional styling

### 2. Personalized Learning Path & Concept Deep Dive
- **My Learning Dashboard** with progress tracking
- AI chat assistant for course-specific guidance
- Contextual learning recommendations
- Concept explanations and next-step suggestions

### 3. AI-Powered Community Hub
- **My Communities** section showing joined communities
- **Suggested Communities** with AI-powered recommendations
- Community engagement prompts and post creation
- AI-assisted post drafting based on learning activity

## Technical Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Node.js with Express
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router
- **Icons**: Lucide React
- **Typography**: Montserrat font family

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the application:**
   ```bash
   npm start
   ```
   
   This command will start both the backend server (port 3001) and frontend development server (port 5173) concurrently.

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## User Flow Instructions

### Flow 1: AI Practice Studio

1. **Navigate to Practice Studio:**
   - Click "Practice Studio" in the navigation bar
   - Or visit `/practice-studio` directly

2. **Upload an Image:**
   - The Image URL field is pre-populated with a sample image
   - Click "Simulate Upload" to generate a new random image
   - Or paste any image URL

3. **Get AI Feedback:**
   - Click "Get AI Feedback" to receive simulated analysis
   - Wait for the AI processing animation (1.5 seconds)
   - View the detailed feedback in the right panel

4. **Explore Iterations:**
   - Click "Suggest Iterations / Co-create" after receiving feedback
   - Wait for the generation process (1 second)
   - Review the three creative variation suggestions

### Flow 2: My Learning Dashboard

1. **Navigate to My Learning:**
   - Click "My Learning" in the navigation bar
   - Or visit `/my-learning` directly

2. **Explore the Dashboard:**
   - View your learning progress overview
   - Check current course status and progress bars
   - Review recent activity and AI recommendations

3. **Interact with AI Assistant:**
   - Click "Ask AI" next to any course for contextual help
   - Or use the floating chat button (bottom-right corner)
   - Try these sample questions:
     - "What should I focus on next?"
     - "Explain blending modes"
     - "I finished Unit 3, what's next?"
     - "Help me with color theory"

4. **Chat Features:**
   - Real-time messaging interface
   - Contextual responses based on course progress
   - Suggested questions for easy interaction

### Flow 3: AI-Powered Community Hub

1. **Navigate to Communities:**
   - Click "My Learning" in the navigation bar
   - Select the "Communities" tab
   - Or visit `/my-learning` and switch to Communities tab

2. **Explore Community Sections:**
   - **My Communities**: View communities you've joined
   - **Suggested Communities**: AI-recommended communities based on your courses
   - **AI Engagement Card**: Get personalized prompts to create posts

3. **Join New Communities:**
   - Browse suggested communities with AI explanations
   - Click "Join Community" to add them to your communities
   - See success messages and watch communities move to "My Communities"

4. **Create Community Posts:**
   - Click "Create New Post" from any community or the main engagement card
   - Select target community from dropdown
   - Use "AI Draft My Post" for personalized content suggestions
   - Submit posts and receive confirmation messages

5. **AI Post Assistance:**
   - AI generates post titles and content based on your learning progress
   - Contextual suggestions related to your current courses
   - Personalized engagement prompts for each community

## API Endpoints

### Practice Feedback
- `POST /api/practice-feedback` - Get AI feedback for uploaded images
- `POST /api/practice-feedback/iterate` - Get creative iteration suggestions

### Learning Assistant
- `POST /api/learning-assistant` - Chat with the AI learning assistant

### Community Hub
- `GET /api/community-hub/data` - Get community data and AI recommendations
- `POST /api/community-hub/join` - Join a suggested community
- `POST /api/community-hub/post` - Create a new community post
- `POST /api/community-hub/ai-draft-post` - Get AI-generated post content

## Design System

### Color Palette
- **Primary**: Orange gradient (#F97316 to #EF4444)
- **Secondary**: Blue to purple gradient (#3B82F6 to #8B5CF6)
- **Background**: Warm gradient from amber to red tones
- **Neutral**: Gray scale with warm undertones

### Typography
- **Font Family**: Montserrat (300, 400, 500, 600, 700)
- **Hierarchy**: Clear visual hierarchy with appropriate weights
- **Spacing**: Consistent 8px spacing system

### Components
- **Cards**: White/semi-transparent with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Inputs**: Rounded corners with focus states
- **Progress**: Visual progress indicators
- **Chat**: Modern messaging interface

## Known Limitations

- **No Real User Accounts**: All user data is simulated
- **No Persistent Storage**: Data is not saved between sessions
- **No Real Image Processing**: Image analysis is text-based simulation
- **No External API Integration**: All AI responses are pre-defined
- **No Real Community Data**: All community interactions are simulated
- **No Actual Post Storage**: Posts are not persisted between sessions
- **Basic Error Handling**: Minimal client-side validation only
- **Development-Ready Styling**: Professional but not production-optimized

## Future Enhancements

### Technical Improvements
- Real database integration (PostgreSQL/MongoDB)
- User authentication and session management
- Actual AI API integration (OpenAI, Claude, etc.)
- Real image processing and analysis
- Advanced error handling and validation
- Performance optimization and caching

### Feature Expansions
- **Advanced Practice Studio:**
  - Multiple image upload support
  - Video project feedback
  - Collaborative iteration tools
  - Progress tracking for projects

- **Enhanced Learning Assistant:**
  - Voice interaction capability
  - Personalized learning paths
  - Integration with actual course content
  - Advanced analytics and insights

- **Community Features:**
  - Real community data persistence
  - Actual user-generated content
  - Community moderation tools
  - Live community interactions
  - Community challenges and events
  - Instructor participation and feedback

### UX/UI Improvements
- Advanced accessibility features
- Offline capability
- Mobile app version
- Advanced animations and micro-interactions
- Dark mode support

## Development Notes

### Project Structure
```
src/
├── components/
│   ├── Navigation.tsx       # Main navigation
│   ├── Home.tsx            # Landing page
│   ├── PracticeStudio.tsx  # Practice feedback flow
│   ├── MyLearning.tsx      # Learning dashboard
│   └── ChatWidget.tsx      # AI chat interface
├── App.tsx                 # Main app component
├── main.tsx               # React entry point
└── index.css              # Global styles
```

### Key Design Decisions
- **Responsive-First**: Mobile-friendly design principles
- **Component Architecture**: Modular, reusable components
- **State Management**: React hooks for local state
- **API Integration**: Fetch-based HTTP requests
- **Error Boundaries**: Basic error handling implementation

## Contributing

This prototype serves as a foundation for the full Domestika Creative Assistant. When contributing:

1. Maintain the existing design system and component patterns
2. Ensure all new features include proper TypeScript typing
3. Follow the established file structure and naming conventions
4. Test responsive behavior across different screen sizes
5. Maintain accessibility standards (ARIA labels, keyboard navigation)

## License

This project is a prototype demonstration and is not intended for production use without significant additional development and security considerations.