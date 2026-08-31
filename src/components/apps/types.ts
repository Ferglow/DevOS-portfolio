import type { ComponentType } from 'react'

export interface AppProps {
  appId: string
  windowId: string
}

export type AppComponent = ComponentType<AppProps>
