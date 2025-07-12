import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import MyLearning from './components/MyLearning';
import CourseDetail from './components/CourseDetail';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/projects" element={<div className="p-8 text-center"><h1 className="text-2xl">Projects - Coming Soon</h1></div>} />
          <Route path="/plus" element={<div className="p-8 text-center"><h1 className="text-2xl">Plus - Coming Soon</h1></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;