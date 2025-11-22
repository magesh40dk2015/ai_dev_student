import React, { useState } from 'react';
import { QuizQuestion, QuizResult } from '../types';
import { Button } from './Button';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';

interface QuizInterfaceProps {
  questions: QuizQuestion[];
  onComplete: (result: QuizResult) => void;
}

export const QuizInterface: React.FC<QuizInterfaceProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    setShowExplanation(true);

    if (index === currentQuestion.correctAnswerIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      onComplete({
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        scorePercentage: Math.round((correctCount / questions.length) * 100)
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <span className="text-slate-500 font-bold font-display">
          Question {currentIndex + 1} / {questions.length}
        </span>
        <div className="flex gap-1">
           {questions.map((_, idx) => (
             <div 
                key={idx} 
                className={`h-2 w-8 rounded-full ${idx === currentIndex ? 'bg-brand-blue' : idx < currentIndex ? 'bg-brand-green' : 'bg-slate-200'}`}
             />
           ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border-4 border-slate-100 p-8 mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-8 font-display">
          {currentQuestion.question}
        </h3>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            let cardStyle = "bg-slate-50 border-slate-200 hover:border-brand-blue hover:bg-blue-50";
            
            if (isAnswered) {
              if (idx === currentQuestion.correctAnswerIndex) {
                cardStyle = "bg-green-50 border-brand-green ring-2 ring-brand-green";
              } else if (idx === selectedOption) {
                cardStyle = "bg-red-50 border-brand-red ring-2 ring-brand-red";
              } else {
                cardStyle = "opacity-50 bg-slate-50 border-slate-100";
              }
            } else if (selectedOption === idx) {
                cardStyle = "bg-blue-50 border-brand-blue ring-2 ring-brand-blue";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 text-lg font-medium transition-all duration-200 flex justify-between items-center ${cardStyle}`}
              >
                <span>{option}</span>
                {isAnswered && idx === currentQuestion.correctAnswerIndex && (
                  <CheckCircle className="text-brand-green" size={24} />
                )}
                {isAnswered && idx === selectedOption && idx !== currentQuestion.correctAnswerIndex && (
                  <XCircle className="text-brand-red" size={24} />
                )}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-brand-blue/10 rounded-xl text-brand-blue font-medium">
             💡 {currentQuestion.explanation}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button 
            onClick={handleNext} 
            disabled={!isAnswered}
            size="lg"
        >
          {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
};