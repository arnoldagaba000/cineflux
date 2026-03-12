import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/genre/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/genre/$id"!</div>
}
