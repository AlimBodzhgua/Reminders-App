declare module '*.svg' {
  import { type ReactElement, type SVGProps } from 'react';

  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}