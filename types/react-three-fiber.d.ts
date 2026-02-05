// Type declarations for custom Three.js elements and meshline

import type * as THREE from 'three';
import type { Object3DNode } from '@react-three/fiber';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: {
        color?: string | number | THREE.Color;
        depthTest?: boolean;
        resolution?: [number, number] | THREE.Vector2;
        useMap?: boolean | number;
        map?: THREE.Texture | any;
        repeat?: [number, number] | THREE.Vector2;
        lineWidth?: number;
        attach?: string;
        opacity?: number;
        transparent?: boolean;
        [key: string]: any;
      };
    }
  }
}

export {};
