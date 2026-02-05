// Type declarations for asset imports

// GLB and GLTF files
declare module '*.glb' {
  const content: string;
  export default content;
}

declare module '*.gltf' {
  const content: string;
  export default content;
}

// Image files - Next.js StaticImageData
interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}

declare module '*.png' {
  const content: StaticImageData;
  export default content;
}

declare module '*.jpg' {
  const content: StaticImageData;
  export default content;
}

declare module '*.jpeg' {
  const content: StaticImageData;
  export default content;
}

declare module '*.webp' {
  const content: StaticImageData;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
