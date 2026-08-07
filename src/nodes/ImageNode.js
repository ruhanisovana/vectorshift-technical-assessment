import { BaseNode } from "./BaseNode";

export function ImageNode({ id }) {
  return (
    <BaseNode id={id} title="Image" color="#ec4899" inputs={[{id: `${id}-prompt`}]} outputs={[{id: `${id}-image`}]}>
      <div>Generate Image</div>
    </BaseNode>
  );
};