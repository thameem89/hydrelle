'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, ArrowRight, ArrowLeft, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('admin_auth', 'true');
        router.push('/dashboard/admin');
      } else {
        setError('Invalid administrative password');
      }
    } catch {
      setError('An error occurred during authentication');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      setIsSubmitting(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        // Return to login form after 2 seconds
        setTimeout(() => {
          setIsChangingPassword(false);
          setSuccessMessage('');
          setError('');
        }, 2000);
      } else {
        setError(data.error || 'Failed to update password');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (changing: boolean) => {
    setError('');
    setSuccessMessage('');
    setIsChangingPassword(changing);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-botanical-dark/10 rounded-2xl text-botanical-dark mb-4">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl font-serif text-botanical-dark">Admin Access.</h1>
          <p className="text-earth-deep text-sm tracking-wide font-light">
            {isChangingPassword 
              ? 'Update your administrative security credentials.' 
              : 'Enter your credentials to manage the Hydrelle botanical collection.'}
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-earth-soft/10 overflow-hidden relative min-h-[350px]">
          <AnimatePresence mode="wait">
            {!isChangingPassword ? (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                className="p-10 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1 flex items-center gap-2">
                      <Lock size={12} />
                      Password
                    </label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-cream/30 border border-earth-soft/20 rounded-2xl pl-6 pr-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/20 transition-all font-mono"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-earth-soft hover:text-botanical-dark transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-500 text-[11px] font-medium px-1"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-4 pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-botanical-dark text-cream rounded-2xl py-4 text-xs font-bold uppercase tracking-widest hover:bg-earth-deep transition-all shadow-lg shadow-botanical-dark/10 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'Verifying...' : 'Access Dashboard'}
                    <ArrowRight size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => switchMode(true)}
                    className="w-full text-center text-[10px] uppercase tracking-widest text-earth-deep hover:text-botanical-dark transition-colors font-bold py-2"
                  >
                    Change Password
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="change-password-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleChangePassword}
                className="p-10 space-y-6"
              >
                {successMessage ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 border border-green-200">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="font-serif text-xl text-botanical-dark">Success!</h3>
                    <p className="text-earth-deep text-xs max-w-[280px] leading-relaxed">
                      {successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {/* Current Password */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1 flex items-center gap-2">
                          <Lock size={12} />
                          Current Password
                        </label>
                        <div className="relative">
                          <input 
                            type={showCurrentPassword ? "text" : "password"} 
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-cream/30 border border-earth-soft/20 rounded-2xl pl-6 pr-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/20 transition-all font-mono"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-earth-soft hover:text-botanical-dark transition-colors"
                          >
                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1 flex items-center gap-2">
                          <Lock size={12} />
                          New Password
                        </label>
                        <div className="relative">
                          <input 
                            type={showNewPassword ? "text" : "password"} 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-cream/30 border border-earth-soft/20 rounded-2xl pl-6 pr-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/20 transition-all font-mono"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-earth-soft hover:text-botanical-dark transition-colors"
                          >
                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1 flex items-center gap-2">
                          <Lock size={12} />
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-cream/30 border border-earth-soft/20 rounded-2xl pl-6 pr-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/20 transition-all font-mono"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-earth-soft hover:text-botanical-dark transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {error && (
                        <p className="text-red-500 text-[11px] font-medium px-1">
                          {error}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4 pt-2">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-botanical-dark text-cream rounded-2xl py-4 text-xs font-bold uppercase tracking-widest hover:bg-earth-deep transition-all shadow-lg shadow-botanical-dark/10 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? 'Updating...' : 'Update Password'}
                        <ArrowRight size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => switchMode(false)}
                        className="w-full text-center text-[10px] uppercase tracking-widest text-earth-deep hover:text-botanical-dark transition-colors font-bold py-2 flex items-center justify-center gap-1"
                      >
                        <ArrowLeft size={12} />
                        Back to Login
                      </button>
                    </div>
                  </>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={() => router.push('/')}
          className="w-full mt-8 text-[10px] uppercase tracking-widest text-earth-deep hover:text-botanical-dark transition-colors font-bold"
        >
          Return to Storefront
        </button>
      </div>
    </div>
  );
}

