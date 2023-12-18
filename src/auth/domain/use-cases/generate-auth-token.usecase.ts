export interface GenerateAuthToken {

  run(payload: { id: string }, duration: string): Promise<string>;

}
