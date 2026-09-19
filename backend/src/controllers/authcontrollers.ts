import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/Users.js";
import jwt, { SignOptions } from "jsonwebtoken";
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    // 2. Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 5. Send response
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        status: user.status,
        isOnline: user.isOnline,
        lastSeen: user.lastSeen,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//signup function
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Step 1: Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Step 2: Find the user using email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Step 3: Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Step 4: Generate JWT
        const token = jwt.sign(
            {
                userId: user._id.toString()
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"]
            }
        );

        // Step 5: Send response
        return res.status(200).json({
            message: "Login successful",

            token,

            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
                status: user.status,
                isOnline: user.isOnline,
                lastSeen: user.lastSeen
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};