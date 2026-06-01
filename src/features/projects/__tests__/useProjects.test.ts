import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createAppError } from "@/core/api/errors";
import { err, ok } from "@/core/api/result";
import { useProjects } from "@/features/projects/hooks/useProjects";
import type { ProjectContent } from "@/features/projects/types/projects.types";

const { mockFetchProjects, mockShowError } = vi.hoisted(() => ({
  mockFetchProjects: vi.fn(),
  mockShowError: vi.fn(),
}));

vi.mock("@/features/projects/services/projects.service", () => ({
  fetchProjects: mockFetchProjects,
}));

vi.mock("@/store/toastStore", () => ({
  useToastStore: (selector: (state: { showError: typeof mockShowError }) => unknown) =>
    selector({ showError: mockShowError }),
}));

const projects: readonly ProjectContent[] = [
  {
    id: 1,
    title: "Portfolio 3D",
    tags: ["React", "Three.js"],
    description: "Interactive 3D portfolio",
    link: "https://example.com/portfolio",
    image: "/uploads/portfolio.jpg",
  },
  {
    id: 2,
    title: "Task Manager",
    tags: ["TypeScript"],
    description: "Productivity app",
    link: "https://example.com/tasks",
    image: "/uploads/tasks.jpg",
  },
];

describe("useProjects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts in a loading state with no projects", () => {
    mockFetchProjects.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useProjects());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.projects).toEqual([]);
  });

  it("loads projects when fetch succeeds", async () => {
    mockFetchProjects.mockResolvedValue(ok(projects));

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.projects).toEqual(projects);
    expect(mockShowError).not.toHaveBeenCalled();
  });

  it("shows an error toast when fetch fails", async () => {
    const error = createAppError("NETWORK_ERROR", "Unable to load projects");
    mockFetchProjects.mockResolvedValue(err(error));

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockShowError).toHaveBeenCalledWith(error);
    expect(result.current.projects).toEqual([]);
  });

  it("does not update state after the hook unmounts", async () => {
    let resolveFetch!: (value: ReturnType<typeof ok<readonly ProjectContent[]>>) => void;
    mockFetchProjects.mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const { unmount } = renderHook(() => useProjects());

    unmount();
    resolveFetch(ok(projects));

    await waitFor(() => {
      expect(mockFetchProjects).toHaveBeenCalled();
    });

    expect(mockShowError).not.toHaveBeenCalled();
  });
});
