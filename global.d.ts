// global.d.ts (Proje ana dizininde)
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}
