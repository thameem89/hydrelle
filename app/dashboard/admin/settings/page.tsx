'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Save, CheckCircle2, AlertCircle, RotateCcw, Eye, EyeOff, ShieldAlert } from 'lucide-react';

const SettingsPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Password updated successfully' });
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update password' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetToDefault = async () => {
    if (!confirm("Are you sure you want to reset the admin password to the default ('admin123')?")) {
      return;
    }
    
    setIsResetting(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: 'admin123' }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: "Password reset to default ('admin123') successfully" });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to reset password' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="text-earth-deep font-medium uppercase tracking-[0.2em] text-[10px]">Preferences</p>
        <h1 className="text-4xl md:text-5xl font-serif text-botanical-dark">Settings.</h1>
        <p className="text-earth-deep font-light">Configure your administrative preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
        {/* Card 1: Change Password */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] border border-earth-soft/10 shadow-sm p-8 md:p-10 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-botanical-dark/10 rounded-xl flex items-center justify-center text-botanical-dark">
                <Lock size={20} />
              </div>
              <div>
                <h2 className="text-xl font-serif text-botanical-dark">Change Password</h2>
                <p className="text-xs text-earth-soft">Update your administrative access password manually.</p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1">New Password</label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-5 pr-12 py-4 bg-cream/30 border border-earth-soft/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/10 transition-all font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-earth-soft hover:text-botanical-dark transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {newPassword && newPassword.length < 6 && (
                  <p className="text-[10px] text-red-500 font-semibold px-1">Password must be at least 6 characters</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1">Confirm New Password</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-5 pr-12 py-4 bg-cream/30 border border-earth-soft/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/10 transition-all font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-earth-soft hover:text-botanical-dark transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-[10px] text-red-500 font-semibold px-1">Passwords do not match</p>
                )}
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-botanical-dark text-cream px-8 py-4 rounded-full text-xs font-bold hover:bg-earth-deep transition-all shadow-lg shadow-botanical-dark/10 disabled:opacity-50 uppercase tracking-widest w-full md:w-auto mt-4"
              >
                {isSubmitting ? 'Updating...' : (
                  <>
                    <Save size={16} />
                    Update Password
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Card 2: Quick Reset Zone */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-white to-amber-50/20 rounded-[2.5rem] border border-amber-200/30 shadow-sm p-8 md:p-10 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h2 className="text-xl font-serif text-botanical-dark">Reset System Password</h2>
                <p className="text-xs text-earth-soft">Quick recovery option for administrative access.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-amber-500/5 border border-amber-200/20 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">Warning: Default Credentials</h4>
                <p className="text-xs text-amber-700/80 leading-relaxed">
                  Resetting the password will instantly revert the administrative access credential back to the system default configuration (<strong className="font-mono bg-amber-100/60 px-1 py-0.5 rounded text-amber-900">admin123</strong>).
                </p>
                <p className="text-xs text-amber-700/80 leading-relaxed font-light">
                  Use this option to restore defaults if you want a clean setup or quick access. Please make sure to secure your workspace afterwards.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetToDefault}
                disabled={isResetting}
                className="flex items-center justify-center gap-2 bg-amber-600 text-white hover:bg-amber-700 px-8 py-4 rounded-full text-xs font-bold transition-all disabled:opacity-50 uppercase tracking-widest shadow-md shadow-amber-600/15 w-full md:w-auto"
              >
                <RotateCcw size={16} />
                {isResetting ? 'Resetting...' : 'Reset to Default'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Global Alert Message */}
      <AnimatePresence>
        {message.text && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="max-w-5xl"
          >
            <div className={cn(
              "flex items-center gap-2 p-5 rounded-2xl text-xs font-medium border shadow-sm",
              message.type === 'success' 
                ? "bg-green-50/50 text-green-700 border-green-200/30" 
                : "bg-red-50/50 text-red-700 border-red-200/30"
            )}>
              {message.type === 'success' ? <CheckCircle2 size={16} className="text-green-600" /> : <AlertCircle size={16} className="text-red-600" />}
              {message.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Utility function for conditional classes
function cn(...classes: unknown[]) {
  return classes.filter(Boolean).join(' ');
}

export default SettingsPage;
