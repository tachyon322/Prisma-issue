export const publicRoutes = [
    {
        path: "/newest",
    },
    {
        path: "/login",
        component: "Login"
    },
    {
        path: "/register",
        component: "Register",
    },
]

export const authRoutes = [
    "/user"
]

export const loginAuthRoutes = [
    {
        path: "/login",
        component: "Login"
    },
    {
        path: "/register",
        component: "Register"
    }
]

export const apiRoute = "/api/auth"

export const helloRoute = "/"

export const DEFAULT_REDIRECT = "/newest"