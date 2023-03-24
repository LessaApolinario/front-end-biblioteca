import { RefObject } from 'react';

function getFieldFromRef(ref: RefObject<HTMLInputElement>) {
  return { field: ref.current?.value ?? '' };
}

export default getFieldFromRef;
