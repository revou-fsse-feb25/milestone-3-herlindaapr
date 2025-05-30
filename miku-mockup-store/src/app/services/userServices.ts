export async function getUser() {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users");
  
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
  
      const users = await response.json();
  
      return Response.json({ users }, { status: 200 });
    } catch (error) {
      console.error("Error fetching users:", error);
      return Response.json({ error: "Failed to fetch users" }, { status: 500 });
    }
  }