/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRAPI_BASE_URL: string
  readonly VITE_STRAPI_TOKEN: string
  readonly VITE_PUBLIC_KEY: string
  readonly VITE_SERVICE_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
