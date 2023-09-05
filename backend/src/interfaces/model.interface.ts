export default interface Model<T> {
  create(obj: T): Promise<void>;
  list(): Promise<Partial<T>[]>;
  find(id: number): Promise<Partial<T> | null>;
  update(id: number, obj: T): Promise<void>;
  delete(id: number): Promise<void>;
}