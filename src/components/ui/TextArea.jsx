'use client';

import { forwardRef } from 'react';

const TextArea = forwardRef(({ 
  label, 
  placeholder,
  error,
  rows = 3,
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full px-4 py-2 border rounded-lg
          bg-white text-gray-900 placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? 'border-red-500' : 'border-gray-300'}
          transition resize-none
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;
