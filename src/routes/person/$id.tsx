import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/person/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/person/$id"!</div>
}
