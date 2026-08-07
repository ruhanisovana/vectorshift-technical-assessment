import { BaseNode } from "./BaseNode";

export function MathNode({ id }) {
  return (
    <BaseNode id={id} title="Math" color="#f59e0b" inputs={[{id: `${id}-a`}, {id: `${id}-b`}]} outputs={[{id: `${id}-result`}]}>
      <div>Perform Math</div>
    </BaseNode>
  );
};