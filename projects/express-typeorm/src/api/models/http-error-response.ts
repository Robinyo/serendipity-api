export interface HttpErrorDetails {

  code: string;
  target: string;
  message: string;

}

export interface HttpErrorResponse {

  error: {
    code: number;
    message: string;
    status: string;
    details?: HttpErrorDetails;
  }

}

/*

details: [
  {
    code: string;
    target: string;
    message: string;
  }
]

*/
