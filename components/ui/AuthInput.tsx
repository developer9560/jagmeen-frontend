'use client';

import { type InputHTMLAttributes, forwardRef } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="text-xs tracking-widest uppercase text-charcoal/70 font-medium">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`w-full border border-gray-200 bg-white px-4 py-3.5 text-sm text-primary placeholder:text-muted focus:border-gold focus:outline-none transition-colors ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

AuthInput.displayName = 'AuthInput';

export default AuthInput;
