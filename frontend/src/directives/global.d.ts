import type { vAos } from './aos'

// 讓模板裡的 v-aos 有型別檢查(在 main.ts 用 app.directive 全域註冊)
declare module 'vue' {
  interface GlobalDirectives {
    vAos: typeof vAos
  }
}

export {}
