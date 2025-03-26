import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

/**
 * [QueryClient](https://tanstack.com/query/latest)
 */

const queryCache = new QueryCache({
  onError(_e) {
    console.log(_e)
  },
})
const mutationCache = new MutationCache({
  onError(_e) {
    // console.log(_e)
  },
})
const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 0,
      gcTime: 0,
    },
  },
})
/**
 * react-query context
 */
export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
