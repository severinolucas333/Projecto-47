import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import { LessonRunner } from './components/LessonRunner';
import { ALL_LESSONS } from './data/lessons';
import { Loader2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-duo-green" />
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  const activeLesson = ALL_LESSONS.find(l => l.id === activeLessonId);

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {activeLesson ? (
        <LessonRunner 
          lesson={activeLesson} 
          onClose={() => setActiveLessonId(null)} 
        />
      ) : (
        <Dashboard onStartLesson={(id) => setActiveLessonId(id)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
