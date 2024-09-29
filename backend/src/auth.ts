import express, {
    Request,
    Response,
    Router,
    RequestHandler,
    NextFunction,
  } from "express";
  import bcrypt from "bcrypt";
  import { client } from "./mongoServices";
  import { v4 as uuidv4 } from 'uuid'; 

  
  const authRouter: Router = express.Router();
  
  const registerHandler: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required." });
      return;
    }
  
    try {
      await client.connect();
  
      const existingUser = await client
        .db("users")
        .collection("userInfo")
        .findOne({ username });
      if (existingUser) {
        res.status(400).json({ message: "Username already exists" });
        return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = uuidv4(); // Generate a unique user ID
  
      const result = await client.db("users").collection("userInfo").insertOne({
        userId,
        username,
        passwordHash: hashedPassword,
      });
  
      res.status(201).json({ 
        message: "User registered successfully",
        userId,
        username
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await client.close();
    }
  };



  
  const loginHandler: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required." });
      return;
    }
  
    try {
      await client.connect();
  
      const user = await client
        .db("users")
        .collection("userInfo")
        .findOne({ username });
      if (!user) {
        res.status(400).json({ message: "Invalid username or password" });
        return;
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid username or password" });
        return;
      }
  
      res.json({ 
        message: "Login successful",
        userId: user.userId,
        username: user.username
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await client.close();
    }
  };
  
  authRouter.post("/register", registerHandler);
  authRouter.post("/login", loginHandler);
  
  export default authRouter;
  