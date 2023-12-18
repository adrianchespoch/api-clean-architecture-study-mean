export interface ProcessPassword {

  hash(password: string): string;

  compare(password: string, hashed: string): boolean;

}
