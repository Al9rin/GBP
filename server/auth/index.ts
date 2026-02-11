import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { users, type User } from "@shared/models/auth";
import { db } from "../db";
import { eq } from "drizzle-orm";
import type { Express } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "../db";

export function setupAuth(app: Express) {
    const pgSession = connectPg(session);

    app.use(
        session({
            store: new pgSession({
                pool,
                tableName: "session",
                createTableIfMissing: true,
            }),
            secret: process.env.SESSION_SECRET || "super_secret_session",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                secure: process.env.NODE_ENV === "production",
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID || "mock_client_id",
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock_client_secret",
                callbackURL: "/api/auth/google/callback",
            },
            async (_accessToken, _refreshToken, profile, done) => {
                try {
                    const googleId = profile.id;
                    const email = profile.emails?.[0]?.value;
                    const displayName = profile.displayName;
                    const photoUrl = profile.photos?.[0]?.value;

                    if (!email) {
                        return done(new Error("No email found from Google"), undefined);
                    }

                    // Check if user exists
                    const [existingUser] = await db
                        .select()
                        .from(users)
                        .where(eq(users.id, googleId))
                        .limit(1);

                    if (existingUser) {
                        // Update user info if needed
                        const [updatedUser] = await db
                            .update(users)
                            .set({
                                email,
                                firstName: profile.name?.givenName || displayName.split(" ")[0],
                                lastName: profile.name?.familyName || displayName.split(" ").slice(1).join(" "),
                                profileImageUrl: photoUrl,
                                updatedAt: new Date(),
                            })
                            .where(eq(users.id, googleId))
                            .returning();
                        return done(null, updatedUser);
                    }

                    // Create new user
                    const [newUser] = await db
                        .insert(users)
                        .values({
                            id: googleId,
                            email,
                            firstName: profile.name?.givenName || displayName.split(" ")[0],
                            lastName: profile.name?.familyName || displayName.split(" ").slice(1).join(" "),
                            profileImageUrl: photoUrl,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        })
                        .returning();

                    return done(null, newUser);
                } catch (err) {
                    return done(err as Error, undefined);
                }
            }
        )
    );

    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
            if (!user) {
                return done(null, false);
            }
            // Ensure null values are handled or cast if necessary, though Express.User definition might need adjustment
            // For now, we return the user object as is, assuming it matches what Passport expects or we update the type
            done(null, user as Express.User);
        } catch (err) {
            done(err, null);
        }
    });

    // Routes
    app.get(
        "/api/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
    );

    app.get(
        "/api/auth/google/callback",
        passport.authenticate("google", { failureRedirect: "/login" }),
        (_req, res) => {
            res.redirect("/");
        }
    );

    app.post("/api/auth/logout", (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            res.sendStatus(200);
        });
    });

    app.get("/api/auth/user", (req, res) => {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.sendStatus(401);
        }
    });
}
