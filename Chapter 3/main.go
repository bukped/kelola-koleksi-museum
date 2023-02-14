package main

import (
    "github.com/gin-gonic/gin"
    "gin-mongo-api/configs"
    "gin-mongo-api/routes"
)

func main() {
    router := gin.Default()

    // Run Database
    configs.ConnectDB()

    // Routes
    routes.FosilRoute(router)

    router.Run(“localhost:8080”)
}