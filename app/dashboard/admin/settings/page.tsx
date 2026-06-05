'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Save, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

const SettingsPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

      <div className="max-w-2xl">
        <div className="bg-white rounded-[2.5rem] border border-earth-soft/10 shadow-sm overflow-hidden p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-botanical-dark/10 rounded-xl flex items-center justify-center text-botanical-dark">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="text-xl font-serif text-botanical-dark">Security Settings</h2>
              <p className="text-xs text-earth-soft">Update your administrative access password.</p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1">New Password</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-cream/30 border border-earth-soft/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/10 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-earth-soft px-1">Confirm New Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-cream/30 border border-earth-soft/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-botanical-dark/10 transition-all"
                required
              />
            </div>

            {message.text && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex items-center gap-2 p-4 rounded-2xl text-xs font-medium",
                  message.type === 'success' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                )}
              >
                {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {message.text}
              </motion.div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 bg-botanical-dark text-cream px-8 py-4 rounded-full text-xs font-bold hover:bg-earth-deep transition-all shadow-lg shadow-botanical-dark/10 disabled:opacity-50 uppercase tracking-widest w-full md:w-auto"
            >
              {isSubmitting ? 'Updating...' : (
                <>
                  <Save size={16} />
                  Update Password
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-earth-soft/10 space-y-6">
            <div>
              <h3 className="text-sm uppercase tracking-widest font-bold text-earth-deep">Reset Password to Default</h3>
              <p className="text-xs text-earth-soft mt-1">Reset the dashboard password back to the default value (&apos;admin123&apos;).</p>
            </div>
            
            <button
              type="button"
              onClick={handleResetToDefault}
              disabled={isResetting}
              className="flex items-center justify-center gap-2 bg-cream text-earth-deep border border-earth-soft/20 px-8 py-4 rounded-full text-xs font-bold hover:bg-earth-soft/10 transition-all disabled:opacity-50 uppercase tracking-widest w-full md:w-auto"
            >
              <RotateCcw size={16} />
              {isResetting ? 'Resetting...' : 'Reset to Default'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility function for conditional classes
function cn(...classes: unknown[]) {
  return classes.filter(Boolean).join(' ');
}

export default SettingsPage;
