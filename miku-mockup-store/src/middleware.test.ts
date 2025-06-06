// __tests__/middleware.test.ts
import middleware from "./middleware"; // Adjust the path
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Mock getToken
jest.mock("next-auth/jwt", () => ({
  getToken: jest.fn(),
}));

// Declare mocks INSIDE jest.mock factory
let redirectMock: jest.Mock;
let nextMock: jest.Mock;

jest.mock("next/server", () => {
  redirectMock = jest.fn();
  nextMock = jest.fn();
  return {
    NextResponse: {
      redirect: redirectMock,
      next: nextMock,
    },
  };
});

// Now we can import mockGetToken
const mockGetToken = getToken as jest.Mock;

const createMockRequest = (pathname: string): any => ({
  nextUrl: {
    pathname,
    href: `http://localhost${pathname}`,
  },
  url: `http://localhost${pathname}`,
});

describe("middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects unauthenticated user from / to /login", async () => {
    mockGetToken.mockResolvedValue(null);
    const req = createMockRequest("/");

    await middleware(req as any);

    expect(redirectMock).toHaveBeenCalledWith(new URL("/login", req.url));
  });

  it("redirects authenticated admin from / to /admin", async () => {
    mockGetToken.mockResolvedValue({ role: "admin" });
    const req = createMockRequest("/");

    await middleware(req as any);

    expect(redirectMock).toHaveBeenCalledWith(new URL("/admin", req.url));
  });

  it("redirects authenticated user from / to /home", async () => {
    mockGetToken.mockResolvedValue({ role: "user" });
    const req = createMockRequest("/");

    await middleware(req as any);

    expect(redirectMock).toHaveBeenCalledWith(new URL("/home", req.url));
  });

  it("redirects authenticated user away from /login to /home", async () => {
    mockGetToken.mockResolvedValue({ role: "user" });
    const req = createMockRequest("/login");

    await middleware(req as any);

    expect(redirectMock).toHaveBeenCalledWith(new URL("/home", req.url));
  });

  it("redirects authenticated admin away from /register to /admin", async () => {
    mockGetToken.mockResolvedValue({ role: "admin" });
    const req = createMockRequest("/register");

    await middleware(req as any);

    expect(redirectMock).toHaveBeenCalledWith(new URL("/admin", req.url));
  });

  it("redirects unauthenticated user trying to access /home", async () => {
    mockGetToken.mockResolvedValue(null);
    const req = createMockRequest("/home");

    await middleware(req as any);

    expect(redirectMock).toHaveBeenCalledWith(new URL("/login", req.url));
  });

  it("redirects non-admin trying to access /admin to /home", async () => {
    mockGetToken.mockResolvedValue({ role: "user" });
    const req = createMockRequest("/admin");

    await middleware(req as any);

    expect(redirectMock).toHaveBeenCalledWith(new URL("/home", req.url));
  });

  it("allows admin to access /admin", async () => {
    mockGetToken.mockResolvedValue({ role: "admin" });
    const req = createMockRequest("/admin/dashboard");

    await middleware(req as any);

    expect(nextMock).toHaveBeenCalled();
  });

  it("allows user to access /home", async () => {
    mockGetToken.mockResolvedValue({ role: "user" });
    const req = createMockRequest("/home/profile");

    await middleware(req as any);

    expect(nextMock).toHaveBeenCalled();
  });
});