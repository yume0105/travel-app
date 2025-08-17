import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env.GITHUB_TOKEN); // ここでトークンが参照できる
};
