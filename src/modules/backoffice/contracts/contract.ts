export interface Contract {
  errors: string[];
  validate(model: any): boolean;
}
