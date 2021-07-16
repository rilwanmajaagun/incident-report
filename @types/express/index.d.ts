declare namespace Express {
  export interface Request {
    weatherReport: Record<string, string>;
    client: Record<string, string>;
    hash: string;
    decodedToken: any;
  }
}
