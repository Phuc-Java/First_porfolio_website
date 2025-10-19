export { };

declare module '*.glb' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module 'meshline' {
  import { BufferGeometry, Material } from 'three';
  
  export class MeshLineGeometry extends BufferGeometry {
    setPoints(points: any[]): void;
  }
  
  export class MeshLineMaterial extends Material {
    color: any;
    lineWidth: number;
    map: any;
    useMap: boolean;
    resolution: any;
    repeat: any;
    depthTest: boolean;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
