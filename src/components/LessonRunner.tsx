import React, { useState, useEffect } from 'react';
import { Lesson, Exercise } from '../types';
import { IPAKeyboard } from './IPAKeyboard';
import { speakFrench } from '../lib/tts';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, X, Check, ArrowRight, HelpCircle, Trophy, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface LessonRunnerProps {
  lesson: Lesson;
  onClose: () => void;
}

export const LessonRunner: React.FC<LessonRunnerProps> = ({ lesson, onClose }) => {
  const [step, setStep] = useState<'theory' | 'exercise' | 'result'>('theory');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const { profile, refreshProfile } = useAuth();

  const currentExercise = lesson.exercises[currentExerciseIndex];

  const handleKeyPress = (key: string) => {
    if (feedback !== null) return;
    setUserInput(prev => prev + key);
  };

  const handleBackspace = () => {
    if (feedback !== null) return;
    setUserInput(prev => prev.slice(0, -1));
  };

  const checkAnswer = () => {
    const normalizedInput = userInput.trim().replace(/^\/|\/$/g, '');
    const normalizedTarget = currentExercise.transcription.replace(/^\/|\/$/g, '');

    if (normalizedInput === normalizedTarget) {
      setFeedback('correct');
      setTotalScore(prev => prev + Math.max(10 - attempts * 2, 5));
    } else {
      setFeedback('incorrect');
      setAttempts(prev => prev + 1);
    }
  };

  const nextStep = async () => {
    if (feedback === 'correct' || attempts >= 4) {
      if (currentExerciseIndex < lesson.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setUserInput('');
        setAttempts(0);
        setFeedback(null);
      } else {
        // Lesson complete
        await completeLesson();
        setStep('result');
      }
    } else {
      setFeedback(null);
      setUserInput('');
    }
  };

  const completeLesson = async () => {
    if (!profile) return;
    const userRef = doc(db, 'users', profile.uid);
    const updates: any = {
      totalXp: increment(totalScore),
    };
    if (profile.currentLessonId === lesson.id) {
      updates.currentLessonId = lesson.id + 1;
    }
    await updateDoc(userRef, updates);
    await refreshProfile();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <header className="p-4 flex items-center gap-4 border-b-2 border-gray-100">
        <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(currentExerciseIndex / lesson.exercises.length) * 100}%` }}
            className="h-full bg-duo-green"
          />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 md:p-12">
        <AnimatePresence mode="wait">
          {step === 'theory' && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-800">{lesson.title}</h2>
              <div className="prose prose-slate max-w-none bg-blue-50 p-6 rounded-2xl border-2 border-blue-100">
                <ReactMarkdown>{lesson.theory}</ReactMarkdown>
              </div>
              <button 
                onClick={() => setStep('exercise')}
                className="w-full duo-button duo-button-primary mt-8"
              >
                VAMOS PRATICAR
              </button>
            </motion.div>
          )}

          {step === 'exercise' && (
            <motion.div
              key="exercise"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest">TRANSCREVA A PALAVRA</h3>
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-black text-gray-800">{currentExercise.word}</span>
                  <button 
                    onClick={() => speakFrench(currentExercise.word)}
                    className="p-4 bg-duo-blue text-white rounded-2xl shadow-[0_4px_0_0_#1899d6] active:translate-y-1 active:shadow-none transition-all"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
                {currentExercise.hint && (
                  <p className="text-gray-500 italic">Significado: {currentExercise.hint}</p>
                )}
              </div>

              <div className="min-h-[60px] flex items-center justify-center p-4 border-b-4 border-gray-100 mt-8">
                <span className="text-4xl font-black text-duo-blue flex items-center gap-1">
                  / {userInput} <span className="w-0.5 h-10 bg-duo-blue animate-pulse" /> /
                </span>
              </div>

              <div className="mt-auto">
                <IPAKeyboard onKeyPress={handleKeyPress} onBackspace={handleBackspace} />
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full text-center space-y-6"
            >
              <Trophy className="w-32 h-32 text-duo-yellow" />
              <h2 className="text-4xl font-black text-gray-800">LIÇÃO CONCLUÍDA!</h2>
              <div className="bg-white p-6 rounded-3xl border-2 border-gray-200 shadow-xl w-64">
                <p className="text-gray-500 font-bold">GANHOU</p>
                <div className="text-4xl font-black text-duo-orange flex items-center justify-center gap-2">
                  <Star className="fill-current" />
                  {totalScore} XP
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-full max-w-xs duo-button duo-button-primary"
              >
                CONTINUAR
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {step === 'exercise' && (
        <footer className={cn(
          "p-6 h-32 flex items-center justify-between transition-colors",
          feedback === 'correct' ? "bg-green-100" : 
          feedback === 'incorrect' ? "bg-red-100" : "bg-white border-t-2 border-gray-100"
        )}>
          <div className="flex-1">
            {feedback === 'correct' && (
              <div className="flex items-center gap-3 text-duo-green font-black text-2xl">
                <Check className="w-8 h-8" /> BOM TRABALHO!
              </div>
            )}
            {feedback === 'incorrect' && (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 text-duo-red font-black text-2xl">
                  <X className="w-8 h-8" /> QUASE LÁ...
                </div>
                {attempts >= 4 ? (
                  <p className="text-duo-red font-bold">Resposta correta: {currentExercise.transcription}</p>
                ) : (
                  <p className="text-duo-red font-bold">Tentativas restantes: {4 - attempts}</p>
                )}
              </div>
            )}
          </div>
          
          <button
            onClick={feedback === null ? checkAnswer : nextStep}
            className={cn(
              "duo-button min-w-[200px]",
              feedback === null ? "duo-button-primary" : 
              feedback === 'correct' ? "bg-duo-green text-white shadow-[0_4px_0_0_#46a302]" : 
              "bg-duo-red text-white shadow-[0_4px_0_0_#d93d3d]"
            )}
          >
            {feedback === null ? 'VERIFICAR' : 'PRÓXIMO'}
          </button>
        </footer>
      )}
    </div>
  );
};
