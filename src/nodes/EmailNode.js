import { BaseNode } from "./BaseNode";

export function EmailNode({ id }) {
  return (
    <BaseNode id={id} title="Email" color="#22c55e" inputs={[{id: `${id}-to`}, {id: `${id}-body`}]} outputs={[{id: `${id}-status`}]}>
      <div>Send Email</div>
    </BaseNode>
  );
};