import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createCli, formatProfiles } from '../buffer.js';

describe('buffer CLI', () => {
  let logSpy;
  let errSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('formats connected profiles output', () => {
    const output = formatProfiles([{ id: 'abc123', service: 'Twitter', username: 'learnopenclaw' }]);
    expect(output).toContain('Connected Profiles');
    expect(output).toContain('abc123');
    expect(output).toContain('Twitter');
  });

  it('executes profiles command', async () => {
    const getProfiles = vi.fn().mockResolvedValue([{ id: '1', service: 'LinkedIn', username: 'ahmad' }]);
    const cli = createCli({ api: { getProfiles } });

    await cli.parseAsync(['node', 'buffer', 'profiles']);

    expect(getProfiles).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Connected Profiles'));
  });
});
