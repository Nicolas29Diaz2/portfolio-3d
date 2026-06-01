# Exercise 4 — AI-Assisted Code Refactoring

## Original Code

```javascript
function getUser(d){
  return fetch("https://jsonplaceholder.typicode.com/users/"+d)
    .then(x => x.json())
    .then(j => console.log(j))
}
```

---

# 1. Code Review — Issues in the Original Implementation


| #   | Issue                                     | Why It's Problematic in Production                                                                                                    |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `d` — cryptic parameter name              | Provides no intent signal. A reviewer cannot tell whether it's an ID, DTO, or another value without reading the implementation.       |
| 2   | No input validation                       | Passing `0`, `-1`, `null`, or `"abc"` silently generates an invalid URL and performs an unnecessary network request.                  |
| 3   | No network error handling                 | `fetch()` may reject due to DNS failures, connectivity issues, timeouts, or CORS errors. These failures are currently unhandled.      |
| 4   | No HTTP status validation                 | Responses such as `404` or `500` still resolve successfully. The implementation never checks whether the request actually succeeded.  |
| 5   | Side effects inside data-access function  | `console.log()` couples data retrieval with presentation/logging concerns, reducing testability and violating separation of concerns. |
| 6   | Returns `undefined` instead of data       | The final `.then()` logs the user but returns nothing, preventing callers from using the fetched data.                                |
| 7   | No TypeScript typing                      | All values are implicitly untyped, increasing the risk of runtime errors and reducing compile-time safety.                            |
| 8   | Promise chaining instead of `async/await` | Harder to read, maintain, and extend when introducing additional logic or error handling.                                             |
| 9   | Hardcoded URL                             | The API base URL is embedded directly in the function, making future changes more difficult.                                          |
| 10  | Missing documentation                     | No function contract, parameter descriptions, return type information, or usage examples are provided.                                |


---

# 2. Final Refactored Solution

```typescript
const BASE_URL = "https://jsonplaceholder.typicode.com";

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  company: Company;
}

export class UserFetchError extends Error {
  constructor(
    public readonly userId: number,
    public readonly statusCode?: number,
    message?: string
  ) {
    super(message);
    this.name = "UserFetchError";
  }
}

/**
 * Retrieves a user by ID from the JSONPlaceholder API.
 *
 * @param userId - User identifier.
 * @returns The requested user.
 * @throws UserFetchError when validation, network, or HTTP errors occur.
 *
 * @example
 * const user = await getUserById(1);
 * console.log(user.name);
 */
export async function getUserById(userId: number): Promise<User> {
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new UserFetchError(
      userId,
      undefined,
      `Invalid user ID: "${userId}". Must be a positive integer.`
    );
  }

  const url = `${BASE_URL}/users/${userId}`;

  let response: Response;

  try {
    response = await fetch(url);
  } catch (networkError) {
    throw new UserFetchError(
      userId,
      undefined,
      `Network request failed for user ID ${userId}: ${
        (networkError as Error).message
      }`
    );
  }

  if (!response.ok) {
    throw new UserFetchError(
      userId,
      response.status,
      `Unexpected response ${response.status} (${response.statusText}) for user ID ${userId}.`
    );
  }

  return (await response.json()) as User;
}
```

---

# 3. Explanation of Improvements

## Readability

The refactored version uses descriptive names such as `getUserById`, `userId`, and `response`, making the code self-explanatory. JSDoc comments further clarify the function's purpose and usage.

## Maintainability

The API base URL is centralized in a constant, and all domain models are represented through exported TypeScript interfaces. Future changes can be made in a single location.

## Robustness

The implementation explicitly handles three categories of failures:

- Invalid input values.
- Network-level failures.
- HTTP-level failures.

Each scenario throws a typed `UserFetchError` containing contextual information.

## Testability

The function no longer contains side effects such as `console.log()`. It simply returns data, allowing tests to focus on behavior rather than output interception.

## Scalability

The design can be extended with authentication headers, retry mechanisms, environment-based URLs, caching layers, or API clients without changing the public contract of the function.

The caller receives a fully typed `User` object and remains responsible for presentation, logging, caching, or UI rendering concerns, preserving separation of responsibilities.