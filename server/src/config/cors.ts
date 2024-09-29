export const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4200"],
  methods: ["GET", "POST", "DELETE", "UPDATE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
