import { defineConfig } from 'vitest/config';
import { config } from 'dotenv';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['./**/*.test.tsx'],
    env: {
      ...config({ path: './env/.env.test' }).parsed,
    },
    globals: true,
  },
});
