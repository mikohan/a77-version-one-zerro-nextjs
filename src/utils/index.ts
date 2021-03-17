import { ICategory } from '~/interfaces/category';
// Function for cloning objects and arrays
export function clone(data: any): any {
  return JSON.parse(JSON.stringify(data));
}
export function error<T>(message: string): Promise<T> {
  return Promise.reject<T>(new Error(message));
}

export function makeTree(cats: any): Promise<ICategory[]> {
  const filtredArray = cats.filter((item: any) => {
    return item.count !== 0;
  });

  const list: any = filtredArray;

  const tree: any = [];
  const lookup: any = {};

  list.forEach((o: any) => {
    lookup[o.id] = o;
    lookup[o.id].children = [];
  });

  list.forEach((o: any) => {
    if (o.parent && o.parent !== null) {
      try {
        lookup[o.parent].children.push(o);
      } catch (e) {
        console.error(
          o,
          `Somethin fucks up in /endpoints/categories.ts line 108
            seems to instance of category has no parent
            check the database category id = ${o.id}!
          `,
          e
        );
      }
    } else {
      tree.push(o);
    }
  });
  const new_tree = clone(tree);
  return new_tree;
}
