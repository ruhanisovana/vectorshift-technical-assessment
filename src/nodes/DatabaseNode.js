import { BaseNode } from "./BaseNode";

export function DatabaseNode({ id }) {
  return (
    <BaseNode id={id} title="Database" color="#3b82f6" inputs={[{id: `${id}-query`}]} outputs={[{id: `${id}-data`}]}>
      <div>Database Query</div>
    </BaseNode>
  );
};