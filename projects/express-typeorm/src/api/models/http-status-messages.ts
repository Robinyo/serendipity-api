// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

//
// Errors
// Errors, or more specifically Service Errors, are defined as a client passing invalid data to the service and the
// service correctly rejecting that data. Examples include invalid credentials, incorrect parameters, unknown version
// IDs, or similar. These generally result in "4xx" HTTP error codes and are due to client's passing incorrect or
// invalid data.
//

export const INVALID_ARGUMENT = 'Invalid argument';
export const NOT_FOUND = 'The specified resource was not found';
export const UNAUTHORIZED = 'Unauthorized';

//
// Faults
// Service Faults, are defined as the service failing to correctly return a response to a valid client request. These
// generally result in "5xx" HTTP error codes. Calls that fail due to rate limiting do not count as faults. Calls that
// fail as the result of a service fast-failing requests (often for its own protection) do count as faults.
//

// https://github.com/Robinyo/restful-api-design-guidelines

// export const INTERNAL = 'Internal server error';
// export const PERMISSION_DENIED = 'Client does not have sufficient permission';
