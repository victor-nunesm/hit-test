import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'accessNestedPropertyOfObject',
})
export class AccessNestedPropertyOfObjectPipe implements PipeTransform {
  transform(obj: Record<string, any>, path: string): unknown {
    return this.accessNestedPropByDotPath(obj, path)
  }

  accessNestedPropByDotPath(obj: { [key: string]: any }, path: string): any {
    if (path.includes('[')) {
      const index = +path.split('[')[1].split(']')[0]
      const pathBeforeIndex = path.split('[')[0]
      let pathAfterIndex = path.split(']')[1]
      if (pathAfterIndex[0] === '.') {
        pathAfterIndex = pathAfterIndex.slice(1)
      }

      const valBeforeIndex = pathBeforeIndex.split('.').reduce((o, p) => o[p], obj)
      const indexVal = valBeforeIndex[index]
      const valAfterIndex = pathAfterIndex.split('.').reduce((o, p) => o[p], indexVal)
      return valAfterIndex
    }
    return path.split('.').reduce((o, p) => o[p], obj)
  }
}
