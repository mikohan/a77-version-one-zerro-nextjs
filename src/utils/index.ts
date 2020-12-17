// Function for cloning objects and arrays
export function clone(data: any): any {
  return JSON.parse(JSON.stringify(data));
}
