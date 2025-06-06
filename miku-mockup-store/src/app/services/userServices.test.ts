// __tests__/getUser.test.ts
import { getUser } from "./userServices"; // Adjust path as needed

global.fetch = jest.fn();

describe("getUser", () => {
  const mockResponseJson = jest.fn();
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn(); // Suppress expected errors in test logs
    mockResponseJson.mockClear();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it("returns users on successful fetch", async () => {
    const mockUsers = [{ id: 1, name: "John" }, { id: 2, name: "Jane" }];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    // Mock global Response.json
    global.Response = {
      json: mockResponseJson,
    } as any;

    await getUser();

    expect(fetch).toHaveBeenCalledWith("https://api.escuelajs.co/api/v1/users");
    expect(mockResponseJson).toHaveBeenCalledWith({ users: mockUsers }, { status: 200 });
  });

  it("handles fetch failure (non-ok response)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    global.Response = {
      json: mockResponseJson,
    } as any;

    await getUser();

    expect(mockResponseJson).toHaveBeenCalledWith(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  });

  it("handles fetch error (network failure)", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    global.Response = {
      json: mockResponseJson,
    } as any;

    await getUser();

    expect(mockResponseJson).toHaveBeenCalledWith(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  });
});
