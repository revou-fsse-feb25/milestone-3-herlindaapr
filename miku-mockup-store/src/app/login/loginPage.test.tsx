// __tests__/LoginPage.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPageWrapper from "./page"; // Adjust path as needed
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock next/router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock next-auth
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("LoginPage", () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });

    // Default: no search params
    const searchParams = new URLSearchParams();
    (require("next/navigation").useSearchParams as jest.Mock).mockReturnValue(searchParams);
  });

  it("renders email and password inputs", () => {
    render(<LoginPageWrapper />);

    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("submits login form and redirects on success", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ ok: true });

    render(<LoginPageWrapper />);

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "user123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "user@example.com",
        password: "user123",
      });
      expect(mockRefresh).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("displays error on failed login", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ error: "Invalid email or password" });

    render(<LoginPageWrapper />);

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    const errorMsg = await screen.findByText(/invalid email or password/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it("shows success message from URL param", () => {
    const params = new URLSearchParams({ registered: "true" });
    (require("next/navigation").useSearchParams as jest.Mock).mockReturnValue(params);

    render(<LoginPageWrapper />);
    expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
  });

  it("shows error message from URL param", () => {
    const params = new URLSearchParams({ error: "CredentialsSignin" });
    (require("next/navigation").useSearchParams as jest.Mock).mockReturnValue(params);

    render(<LoginPageWrapper />);
    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
  });
});
