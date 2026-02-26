import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

const devPlugins = [
    {
        name: "Tanstack Query",
        render: <ReactQueryDevtoolsPanel />,
    },
    {
        name: "Tanstack Router",
        render: <TanStackRouterDevtoolsPanel />,
    },
    {
        name: "Tanstack Form",
        render: <FormDevtoolsPanel />,
    },
];

export default devPlugins;
