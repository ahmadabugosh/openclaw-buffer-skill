import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const MAX_POST_TEXT_LENGTH = 3000;

/**
 * Validate and normalize post text.
 * @param {string} text
 * @returns {string}
 */
export function validatePostText(text) {
  const normalized = (text || '').trim();

  if (!normalized) {
    throw new Error('Post text is required. Provide text like: buffer post "Hello world"');
  }

  if (normalized.length > MAX_POST_TEXT_LENGTH) {
    throw new Error(`Post text must be ${MAX_POST_TEXT_LENGTH} characters or less.`);
  }

  return normalized;
}

/**
 * Parse and validate schedule time.
 * @param {string | undefined} time
 * @returns {string | null}
 */
export function parseScheduleTime(time) {
  if (!time) {
    return null;
  }

  const parsed = new Date(time);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Invalid schedule time. Use ISO 8601 format, e.g. 2026-03-03T14:00:00Z');
  }

  return parsed.toISOString();
}

/**
 * Parse profile IDs from comma-separated option.
 * @param {string | undefined} profiles
 * @returns {string[]}
 */
export function parseProfilesList(profiles) {
  if (!profiles) {
    return [];
  }

  const items = profiles
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (!items.length) {
    throw new Error('No valid profile IDs found in --profiles. Example: --profiles twitter,linkedin');
  }

  return items;
}

/**
 * Validate image file path when attaching media.
 * @param {string | undefined} imagePath
 * @returns {string | null}
 */
export function validateImagePath(imagePath) {
  if (!imagePath) {
    return null;
  }

  const resolvedPath = resolve(imagePath);
  if (!existsSync(resolvedPath)) {
    throw new Error(`Image file not found: ${imagePath}. Check the path and try again.`);
  }

  return resolvedPath;
}

export { MAX_POST_TEXT_LENGTH };
