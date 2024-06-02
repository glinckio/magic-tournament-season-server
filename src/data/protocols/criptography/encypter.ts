export interface Encypter {
  encrypt(value: number): Promise<string>;
}
