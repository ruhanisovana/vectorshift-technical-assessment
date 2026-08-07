import { BaseNode } from "./BaseNode";

export function APINode({ id }) {
  return (
    <BaseNode id={id} title="API" color="#22c55e" inputs={[{id: `${id}-url`}]} outputs={[{id: `${id}-response`}]}>
      <div>REST API</div>
    </BaseNode>
  );
};