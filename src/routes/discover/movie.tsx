import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/discover/movie')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/discover/movie"!</div>
}
