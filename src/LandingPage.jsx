import React from 'react';
import { BookOpen, Settings, Users, Award, Zap } from 'lucide-react';

const LandingPage = ({ onQuizSelect }) => {
  return (
    <div className="landing-container">
      <div className="landing-card">
        {/* Header */}
        <div className="landing-header">
          <div className="landing-icon">
            <Settings size={48} />
          </div>
          <h1 className="landing-title">Quiz Reviewer Platform</h1>
          <p className="landing-subtitle">
            Test your knowledge with comprehensive quizzes
          </p>
        </div>

        {/* Quiz Types */}
        <div className="quiz-types">
          <div 
            className="quiz-type-card multiple-choice"
            onClick={() => onQuizSelect('multiple-choice')}
          >
            <div className="quiz-type-icon">
              <BookOpen size={32} />
            </div>
            <h3 className="quiz-type-title">Multiple Choice Quiz</h3>
            <p className="quiz-type-description">
              144 comprehensive questions covering 9 weeks of System Administration topics
            </p>
            <div className="quiz-type-features">
              <span className="feature-tag">• Randomized Questions</span>
              <span className="feature-tag">• Shuffled Answers</span>
              <span className="feature-tag">• Retake Wrong Answers</span>
            </div>
            <button className="quiz-type-button">Start Multiple Choice</button>
          </div>

          <div 
            className="quiz-type-card situational"
            onClick={() => onQuizSelect('situational')}
          >
            <div className="quiz-type-icon">
              <Users size={32} />
            </div>
            <h3 className="quiz-type-title">Situational Scenarios</h3>
            <p className="quiz-type-description">
              Real-world scenarios and problem-solving situations you'll face as a System Administrator
            </p>
            <div className="quiz-type-features">
              <span className="feature-tag">• Real-world Problems</span>
              <span className="feature-tag">• Decision Making</span>
              <span className="feature-tag">• Best Practices</span>
            </div>
            <button className="quiz-type-button">Start Scenarios</button>
          </div>

          <div 
            className="quiz-type-card engine-electrical"
            onClick={() => onQuizSelect('engine-electrical')}
          >
            <div className="quiz-type-icon">
              <Zap size={32} />
            </div>
            <h3 className="quiz-type-title">Engine Electrical NC-II</h3>
            <p className="quiz-type-description">
              Comprehensive reviewer for Engine Electrical Systems covering batteries, starters, alternators, and ignition systems
            </p>
            <div className="quiz-type-features">
              <span className="feature-tag">• Identification Questions</span>
              <span className="feature-tag">• Enumeration</span>
              <span className="feature-tag">• Parts Labeling</span>
            </div>
            <button className="quiz-type-button">Start Engine Electrical</button>
          </div>
        </div>

        {/* Stats */}
        <div className="landing-stats">
          <div className="stat-item">
            <Award size={24} />
            <div className="stat-content">
              <span className="stat-number">260</span>
              <span className="stat-label">Total Questions</span>
            </div>
          </div>
          <div className="stat-item">
            <BookOpen size={24} />
            <div className="stat-content">
              <span className="stat-number">66</span>
              <span className="stat-label">Engine Electrical</span>
            </div>
          </div>
          <div className="stat-item">
            <Settings size={24} />
            <div className="stat-content">
              <span className="stat-number">3</span>
              <span className="stat-label">Quiz Types</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="landing-footer">
          <p>Choose your preferred quiz type to begin testing your knowledge</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
