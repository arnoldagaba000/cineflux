import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/discover/tv')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/discover/tv"!</div>
}
