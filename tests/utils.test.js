import { describe, it, expect } from 'vitest';
import { validateApiKey } from '../lib/auth.js';

describe('auth validation', () => {
  it('throws when API key is missing', () => {
    expect(() => validateApiKey('')).toThrow(/Missing Buffer API key/);
  });

  it('returns trimmed API key when valid', () => {
    expect(validateApiKey('  valid_key_123456  ')).toBe('valid_key_123456');
  });
});
