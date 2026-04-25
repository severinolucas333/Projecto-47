import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion } from 'motion/react';
import { LogIn, UserPlus } from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName });
      }
    } catch (err: any) {
      setError('Erro na autenticação. Verifique suas credenciais.');
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-3xl border-2 border-gray-200 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-duo-green">
          {isLogin ? 'Bem-vindo de volta!' : 'Criar Conta'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">NOME</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-duo-blue outline-none"
                placeholder="Seu nome"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-duo-blue outline-none"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">SENHA</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-duo-blue outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-duo-red text-sm font-bold">{error}</p>}

          <button type="submit" className="w-full duo-button duo-button-primary">
            {isLogin ? 'ENTRAR' : 'CADASTRAR'}
          </button>
        </form>

        <div className="mt-6 flex flex-col space-y-3">
          <button onClick={handleGoogleSignIn} className="w-full duo-button duo-button-secondary flex items-center justify-center gap-2">
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            ENTRAR COM GOOGLE
          </button>

          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-duo-blue font-bold hover:underline"
          >
            {isLogin ? 'Não tem conta? Crie uma!' : 'Já tem conta? Entre aqui'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
