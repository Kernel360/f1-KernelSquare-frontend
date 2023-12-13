"use client"

import { PropsWithChildren, useState } from "react"
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query"

function ReactQueryProvider({ children }: PropsWithChildren) {
  const config: QueryClientConfig = {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchInterval: false,
      },
    },
  }

  const [client] = useState(() => new QueryClient(config))

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default ReactQueryProvider
