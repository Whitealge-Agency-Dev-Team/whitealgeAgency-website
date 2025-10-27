router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Mock de usuario
    if (email === "test@test.com" && password === "123456") {
      const token = "MOCK_TOKEN_123";

      return res.json({
        token,
        user: {
          id: 1,
          email: "test@test.com",
          name: "Test",
          surname: "User",
          role: "admin"
        }
      });
    }

    // Si falla login
    return res.status(401).json({ message: "Credenciales inválidas" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});
