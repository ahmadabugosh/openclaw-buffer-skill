import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_API_URL = 'https://api.buffer.com/graphql';

/**
 * Returns Buffer API configuration from environment variables.
 * @returns {{apiKey: string|undefined, apiUrl: string}}
 */
export function getConfig() {
  return {
    apiKey: process.env.BUFFER_API_KEY,
    apiUrl: process.env.BUFFER_API_URL || DEFAULT_API_URL,
  };
}

export { DEFAULT_API_URL };
