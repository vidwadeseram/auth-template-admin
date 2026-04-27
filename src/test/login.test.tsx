import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockPush = vi.fn();
const mockLogin = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@vidwadeseram/auth-ui-shared", () => ({
  useAuth: () => ({ login: mockLogin, user: null, loading: false }),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import AdminLoginPage from "@/app/(meta)/login/page";
import { toast } from "sonner";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("AdminLoginPage", () => {
  it("renders email and password fields and submit button", () => {
    render(<AdminLoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows validation error when email is empty on submit", async () => {
    render(<AdminLoginPage />);
    fireEvent.submit(screen.getByRole("button", { name: /sign in/i }).closest("form")!);
    await screen.findByText("Password is required");
    expect(screen.getByText(/email is required|invalid email address/i)).toBeInTheDocument();
  });

  it("shows invalid email error for bad email format", async () => {
    render(<AdminLoginPage />);
    await userEvent.type(screen.getByLabelText(/email/i), "notanemail");
    fireEvent.submit(screen.getByRole("button", { name: /sign in/i }).closest("form")!);
    await screen.findByText("Invalid email address");
  });

  it("shows password required error when password is empty", async () => {
    render(<AdminLoginPage />);
    await userEvent.type(screen.getByLabelText(/email/i), "admin@example.com");
    fireEvent.submit(screen.getByRole("button", { name: /sign in/i }).closest("form")!);
    await screen.findByText("Password is required");
  });

  it("calls login with email and password on valid submit", async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    render(<AdminLoginPage />);
    await userEvent.type(screen.getByLabelText(/email/i), "admin@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "secret123");
    fireEvent.submit(screen.getByRole("button", { name: /sign in/i }).closest("form")!);
    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith("admin@example.com", "secret123"));
  });

  it("redirects to /dashboard after successful login", async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    render(<AdminLoginPage />);
    await userEvent.type(screen.getByLabelText(/email/i), "admin@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "secret123");
    fireEvent.submit(screen.getByRole("button", { name: /sign in/i }).closest("form")!);
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
  });

  it("shows toast error when login throws", async () => {
    mockLogin.mockRejectedValueOnce(new Error("Invalid credentials"));
    render(<AdminLoginPage />);
    await userEvent.type(screen.getByLabelText(/email/i), "admin@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "wrongpass");
    fireEvent.submit(screen.getByRole("button", { name: /sign in/i }).closest("form")!);
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Invalid credentials"));
  });

  it("shows generic error message when login throws non-Error", async () => {
    mockLogin.mockRejectedValueOnce("oops");
    render(<AdminLoginPage />);
    await userEvent.type(screen.getByLabelText(/email/i), "admin@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "wrongpass");
    fireEvent.submit(screen.getByRole("button", { name: /sign in/i }).closest("form")!);
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Login failed"));
  });

  it("disables submit button while loading", async () => {
    let resolveLogin!: () => void;
    mockLogin.mockReturnValueOnce(new Promise<void>((res) => { resolveLogin = res; }));
    render(<AdminLoginPage />);
    await userEvent.type(screen.getByLabelText(/email/i), "admin@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "secret123");
    fireEvent.submit(screen.getByRole("button", { name: /sign in/i }).closest("form")!);
    await screen.findByText("Signing in...");
    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
    resolveLogin();
  });

  it("has a forgot password link", () => {
    render(<AdminLoginPage />);
    expect(screen.getByRole("link", { name: /forgot password/i })).toHaveAttribute("href", "/forgot-password");
  });
});
