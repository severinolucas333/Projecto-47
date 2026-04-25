import React, { useState, useEffect } from 'react';
import { ALL_LESSONS } from '../data/lessons';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, BookOpen, ChevronRight, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface DashboardProps {
  onStartLesson: (lessonId: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartLesson }) => {
  const { profile } = useAuth();
  const currentLessonId = profile?.currentLessonId || 1;

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <header className="sticky top-0 bg-white border-b-2 border-gray-200 p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-duo-orange font-bold">
            <Star className="w-5 h-5 fill-current" />
            {profile?.totalXp || 0} XP
          </div>
          <div className="flex items-center gap-1 text-duo-red font-bold">
            🔥 {profile?.streak || 0}
          </div>
        </div>
        <div className="text-gray-500 font-bold uppercase tracking-wider text-sm">
          FRANCÊS FONÉTICO
        </div>
      </header>

      <div className="p-4 flex flex-col items-center gap-8 mt-8">
        {ALL_LESSONS.map((lesson, index) => {
          const isCompleted = lesson.id < currentLessonId;
          const isCurrent = lesson.id === currentLessonId;
          const isLocked = lesson.id > currentLessonId;

          // Zig-zag offset
          const xOffset = Math.sin(index * 0.8) * 60;

          return (
            <motion.div
              key={lesson.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              style={{ x: xOffset }}
              className="relative"
            >
              <button
                disabled={isLocked}
                onClick={() => onStartLesson(lesson.id)}
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center transition-all",
                  isCompleted ? "bg-duo-yellow shadow-[0_6px_0_0_#d9a700]" : 
                  isCurrent ? "bg-duo-green shadow-[0_6px_0_0_#46a302] ring-8 ring-duo-green/20" : 
                  "bg-gray-200 shadow-[0_6px_0_0_#e5e5e5]"
                )}
              >
                {isCompleted ? <Trophy className="w-8 h-8 text-white" /> : 
                 isCurrent ? <Star className="w-8 h-8 text-white fill-current animate-pulse" /> : 
                 <BookOpen className="w-8 h-8 text-gray-400" />}
              </button>
              
              {isCurrent && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-duo-green text-white px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap shadow-md">
                  COMEÇAR
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-duo-green rotate-45" />
                </div>
              )}

              <div className="absolute top-1/2 -right-4 translate-x-full opacity-60 text-xs font-bold text-gray-400 text-center w-24">
                {lesson.title}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
