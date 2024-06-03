export interface RemoveCardRepository {
  remove(id: number): Promise<null>;
}
