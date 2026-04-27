import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockUseAuth = vi.fn();
vi.mock("@vidwadeseram/auth-ui-shared", () => ({
  useAuth: () => mockUseAuth(),
}));

import { AuthGuard } from "@/components/auth-guard";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("AuthGuard", () => {
  it("shows loading indicator while auth is loading", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: true });
    render(<AuthGuard><span>Protected</span></AuthGuard>);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Protected")).not.toBeInTheDocument();
  });

  it("renders children when user is authenticated", () => {
    mockUseAuth.mockReturnValue({ user: { id: "1", email: "admin@example.com" }, loading: false });
    render(<AuthGuard><span>Protected</span></AuthGuard>);
    expect(screen.getByText("Protected")).toBeInTheDocument();
  });

  it("renders nothing (null) when not loading and no user", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false });
    const { container } = render(<AuthGuard><span>Protected</span></AuthGuard>);
    expect(screen.queryByText("Protected")).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  it("redirects to /login when not loading and no user", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false });
    render(<AuthGuard><span>Protected</span></AuthGuard>);
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("does not redirect while still loading", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: true });
    render(<AuthGuard><span>Protected</span></AuthGuard>);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("does not redirect when user is present", () => {
    mockUseAuth.mockReturnValue({ user: { id: "1" }, loading: false });
    render(<AuthGuard><span>Protected</span></AuthGuard>);
    expect(mockPush).not.toHaveBeenCalled();
  });
});
