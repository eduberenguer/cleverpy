export interface Repository<X extends { id: string | number }> {
  getAll(): Promise<X[]>;
  getById?(id: X['id']): Promise<X>;
  create?(newData: X): Promise<X>;
  update?(newData: Partial<X>, id?: X['id']): Promise<X>;
  delete?(id: string | number): Promise<boolean>;
}
