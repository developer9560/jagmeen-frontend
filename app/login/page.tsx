'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/ui/AuthInput';
import { useAuth } from '@/context/AuthContext';
import { ApiError, authApi } from '@/lib/api';

type ViewState = 'LOGIN' | 'FORGOT_EMAIL' | 'FORGOT_OTP' | 'FORGOT_RESET';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [viewState, setViewState] = useState<ViewState>('LOGIN');
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login({ email, password });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await authApi.forgotPassword(forgotEmail);
      setViewState('FORGOT_OTP');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to send OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await authApi.verifyOtp(forgotEmail, otp);
      setViewState('FORGOT_RESET');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Invalid OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await authApi.resetPassword(forgotEmail, otp, newPassword);
      setSuccessMsg('Password reset successfully. You can now login.');
      setViewState('LOGIN');
      setEmail(forgotEmail);
      setPassword('');
      setForgotEmail('');
      setOtp('');
      setNewPassword('');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to reset password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your profile, orders, and saved addresses."
    >
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}
        
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm">
            {successMsg}
          </div>
        )}

        {viewState === 'LOGIN' && (
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <AuthInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />

            <div className="relative">
              <AuthInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-muted hover:text-primary transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setViewState('FORGOT_EMAIL');
                  setError('');
                  setSuccessMsg('');
                }}
                className="text-sm text-gold hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-4 text-sm tracking-widest uppercase font-medium hover:bg-gold transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>

            <p className="text-center text-sm text-charcoal/60">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-gold font-medium hover:underline">
                Create one
              </Link>
            </p>
          </form>
        )}

        {viewState === 'FORGOT_EMAIL' && (
          <form onSubmit={handleForgotEmailSubmit} className="space-y-6">
            <p className="text-sm text-muted">Enter your email address and we will send you an OTP to reset your password.</p>
            <AuthInput
              label="Email Address"
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-4 text-sm tracking-widest uppercase font-medium hover:bg-gold transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
            </button>
            <button
              type="button"
              onClick={() => setViewState('LOGIN')}
              className="w-full border border-gray-200 py-4 text-sm tracking-widest uppercase font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Login
            </button>
          </form>
        )}

        {viewState === 'FORGOT_OTP' && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <p className="text-sm text-muted">Enter the 6-digit OTP sent to {forgotEmail}.</p>
            <AuthInput
              label="OTP Code"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-4 text-sm tracking-widest uppercase font-medium hover:bg-gold transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={() => setViewState('FORGOT_EMAIL')}
              className="w-full border border-gray-200 py-4 text-sm tracking-widest uppercase font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          </form>
        )}

        {viewState === 'FORGOT_RESET' && (
          <form onSubmit={handleResetSubmit} className="space-y-6">
            <p className="text-sm text-muted">Create a new password for your account.</p>
            <div className="relative">
              <AuthInput
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-muted hover:text-primary transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-4 text-sm tracking-widest uppercase font-medium hover:bg-gold transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
