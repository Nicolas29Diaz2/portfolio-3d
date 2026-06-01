import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createAppError } from "@/core/api/errors";
import { err, ok } from "@/core/api/result";
import { useAbout } from "@/features/about/hooks/useAbout";
import type { AboutContent } from "@/features/about/types/about.types";

const { mockFetchAbout, mockShowError } = vi.hoisted(() => ({
  mockFetchAbout: vi.fn(),
  mockShowError: vi.fn(),
}));

vi.mock("@/features/about/services/about.service", () => ({
  fetchAbout: mockFetchAbout,
}));

vi.mock("@/store/toastStore", () => ({
  useToastStore: (selector: (state: { showError: typeof mockShowError }) => unknown) =>
    selector({ showError: mockShowError }),
}));

const aboutContent: AboutContent = {
  name: "Jane Doe",
  age: "28",
  role: "Engineer",
  description: "Bio text",
  imageUrl: "/uploads/profile.jpg",
};

describe("useAbout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts in a loading state with no content", () => {
    mockFetchAbout.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useAbout());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.content).toBeNull();
  });

  it("loads about content when fetch succeeds", async () => {
    mockFetchAbout.mockResolvedValue(ok(aboutContent));

    const { result } = renderHook(() => useAbout());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.content).toEqual(aboutContent);
    expect(mockShowError).not.toHaveBeenCalled();
  });

  it("shows an error toast when fetch fails", async () => {
    const error = createAppError("NETWORK_ERROR", "Unable to load about content");
    mockFetchAbout.mockResolvedValue(err(error));

    const { result } = renderHook(() => useAbout());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockShowError).toHaveBeenCalledWith(error);
    expect(result.current.content).toBeNull();
  });

  it("does not update state after the hook unmounts", async () => {
    let resolveFetch!: (value: ReturnType<typeof ok<AboutContent>>) => void;
    mockFetchAbout.mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const { unmount } = renderHook(() => useAbout());

    unmount();
    resolveFetch(ok(aboutContent));

    await waitFor(() => {
      expect(mockFetchAbout).toHaveBeenCalled();
    });

    expect(mockShowError).not.toHaveBeenCalled();
  });
});
