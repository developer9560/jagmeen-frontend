'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import AuthInput from '@/components/ui/AuthInput';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/lib/api';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setMobile(user.mobile || '');
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mobile && (!/^\d{10}$/.test(mobile) || parseInt(mobile) < 6000000000)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: { name?: string; mobile?: string; password?: string } = {};
      if (name !== user?.name) payload.name = name;
      if (mobile !== user?.mobile) payload.mobile = mobile;
      if (password) payload.password = password;

      if (Object.keys(payload).length === 0) {
        setError('No changes to save.');
        return;
      }

      await updateProfile(payload);
      setPassword('');
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 p-6 md:p-10 animate-fade-in">
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-gold font-bold mb-2">Account Settings</p>
        <h1 className="font-heading italic text-3xl md:text-4xl text-primary">My Profile</h1>
        <p className="text-sm text-muted mt-2">Manage your personal information and account security.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm mb-6 flex items-center gap-2">
          <CheckCircle size={16} />
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <AuthInput
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <AuthInput
          label="Email Address"
          type="email"
          value={user?.email || ''}
          disabled
          className="bg-gray-50 cursor-not-allowed"
        />
        <p className="text-xs text-muted -mt-4">Email cannot be changed</p>

        <AuthInput
          label="Mobile Number"
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
          placeholder="10-digit mobile number"
        />

        <div className="relative">
          <AuthInput
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[38px] text-muted hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-muted mb-4">
            Member since{' '}
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : '—'}
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white px-8 py-3.5 text-sm tracking-widest uppercase font-medium hover:bg-gold transition-colors duration-300 disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
