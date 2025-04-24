declare global {
  // biome-ignore lint/style/noNamespace: TypeScript requires namespace for ProcessEnv augmentation
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string
    }
  }
}

export {}
