declare module 'class-styles' {
  type CSSPropertyObject = {
    [k: string]: any
  }

  type ClassRecord = Record<string, any>
  type ClassValue = string | number | ClassRecord | ClassArray | undefined | null | boolean

  // Borrowed from @types/classnames at
  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/classnames/index.d.ts
  // This is the only way I found to break circular references between ClassArray and ClassValue
  // https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
  interface ClassArray extends Array<ClassValue> { } // tslint:disable-line no-empty-interface
  export default function ClassStylesAPI(...classes: ClassValue[]): CSSPropertyObject

  // .bind support
  type BoundContext3 = Array<any> | Record<string, any>
  type BoundContext2 = Array<BoundContext3> | Record<string, BoundContext3>
  type BoundContext = Array<BoundContext2> | Record<string, BoundContext2>
  export function bind(context: BoundContext, ...classes: ClassValue[]): CSSPropertyObject
}
