declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}

// Adicionando uma nova informacao dentro de Request
