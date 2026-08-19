/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_USE_MOCK_ENGINE: string;
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_GEMINI_MODEL: string;
  readonly VITE_BHASHINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
