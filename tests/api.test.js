import { describe, it, expect, vi } from 'vitest';
import { BufferApi } from '../lib/buffer-api.js';

describe('BufferApi', () => {
  it('returns profiles from GraphQL response', async () => {
    const post = vi.fn().mockResolvedValue({
      data: {
        data: {
          profiles: [{ id: 'p1', service: 'twitter', username: 'learnopenclaw' }],
        },
      },
    });

    const api = new BufferApi(
      { apiKey: 'valid_api_key_12345', apiUrl: 'https://api.buffer.com/graphql' },
      { post },
    );

    const profiles = await api.getProfiles();
    expect(profiles).toHaveLength(1);
    expect(profiles[0].id).toBe('p1');
  });

  it('maps 401/403 to auth-friendly error', async () => {
    const post = vi.fn().mockRejectedValue({
      message: 'Request failed with status code 401',
      response: { status: 401 },
    });

    const api = new BufferApi(
      { apiKey: 'bad_key_12345', apiUrl: 'https://api.buffer.com/graphql' },
      { post },
    );

    await expect(api.getProfiles()).rejects.toThrow(/Authentication failed/);
  });
});
