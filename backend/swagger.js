// swagger.js
// Full OpenAPI 3.0 spec for iVision API

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "iVision Clinic API",
    version: "1.0.0",
    description:
      "REST API documentation for the iVision Clinic system (users, appointments, services, articles, banners, FAQ, doctor schedules).",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Local development",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      // ====== USER ======
      User: {
        type: "object",
        properties: {
          _id: { type: "string" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          dob: { type: "string", format: "date-time", nullable: true },
          gender: { type: "string", nullable: true },
          email: { type: "string", format: "email" },
          phone: { type: "string" },
          address: { type: "string" },
          password: { type: "string", writeOnly: true },
          role: {
            type: "string",
            enum: ["user", "doctor", "admin"],
            default: "user",
          },
          status: { type: "boolean", default: true },
          doctorInfo: {
            type: "object",
            properties: {
              specialization: { type: "string" },
              licenseNumber: { type: "string" },
              yoe: { type: "integer", description: "Years of experience" },
              education: { type: "string" },
              bio: { type: "string" },
              profilePicture: { type: "string" },
            },
          },
          createdBy: { type: "string" },
          modifiedBy: { type: "string", nullable: true },
          createdDateTime: { type: "string", format: "date-time" },
          modifiedDateTime: { type: "string", format: "date-time" },
        },
      },

      // Auth payloads
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
      LoginResponse: {
        type: "object",
        properties: {
          user: { $ref: "#/components/schemas/User" },
          token: { type: "string" },
        },
      },
      ChangePasswordRequest: {
        type: "object",
        properties: {
          currentPassword: { type: "string", nullable: true },
          newPassword: { type: "string" },
        },
        required: ["newPassword"],
      },

      // ====== SERVICE ======
      Service: {
        type: "object",
        properties: {
          _id: { type: "string" },
          serviceName: { type: "string" },
          shortDescription: { type: "string" },
          fullDescription: { type: "string" },
          image: { type: "string" },
          duration: { type: "string" },
          price: { type: "string" },
          frequency: { type: "string" },
          features: { type: "string" },
          benefits: { type: "string" },
          isActive: { type: "boolean", default: true },
          createdBy: { type: "string" },
          modifiedBy: { type: "string", nullable: true },
          createdDateTime: { type: "string", format: "date-time" },
          modifiedDateTime: { type: "string", format: "date-time" },
        },
      },

      // ====== APPOINTMENT ======
      Appointment: {
        type: "object",
        properties: {
          _id: { type: "string" },
          userId: { type: "string", description: "Patient user id" },
          doctorId: { type: "string", description: "Doctor user id" },
          serviceId: { type: "string", nullable: true },
          date: {
            type: "string",
            example: "2025-01-20",
            description: "YYYY-MM-DD",
          },
          time: {
            type: "string",
            example: "14:30",
            description: "HH:mm",
          },
          status: {
            type: "string",
            enum: ["pending", "confirmed", "completed", "cancelled"],
            default: "pending",
          },
          diagnosis: { type: "string" },
          rightEye: { type: "string" },
          leftEye: { type: "string" },
          prescriptionNotes: { type: "string" },
          userNotes: { type: "string" },
          doctorNotes: { type: "string" },
          nextAppointment: {
            type: "string",
            nullable: true,
            description: "YYYY-MM-DD of next appointment",
          },
          createdBy: { type: "string" },
          modifiedBy: { type: "string", nullable: true },
          createdDateTime: { type: "string", format: "date-time" },
          modifiedDateTime: { type: "string", format: "date-time" },
        },
      },

      // ====== ARTICLE ======
      Article: {
        type: "object",
        properties: {
          _id: { type: "string" },
          category: { type: "string" },
          title: { type: "string" },
          subtitle: { type: "string" },
          author: { type: "string" },
          authorBio: { type: "string" },
          readTime: { type: "string" },
          image: { type: "string" },
          content: { type: "string" },
          isPublished: { type: "boolean" },
          createdBy: { type: "string" },
          modifiedBy: { type: "string", nullable: true },
          createdDateTime: { type: "string", format: "date-time" },
          modifiedDateTime: { type: "string", format: "date-time" },
        },
      },

      // ====== BANNER ======
      Banner: {
        type: "object",
        properties: {
          _id: { type: "string" },
          badge: { type: "string" },
          image: { type: "string" },
          title: { type: "string" },
          subtitle: { type: "string" },
          buttonText: { type: "string" },
          buttonLink: { type: "string" },
          order: { type: "integer" },
          isActive: { type: "boolean" },
          createdBy: { type: "string" },
          modifiedBy: { type: "string", nullable: true },
          createdDateTime: { type: "string", format: "date-time" },
          modifiedDateTime: { type: "string", format: "date-time" },
        },
      },

      // ====== DOCTOR TIME ======
      DoctorTime: {
        type: "object",
        properties: {
          _id: { type: "string" },
          userId: { type: "string", description: "Doctor user id" },
          week: { type: "integer", example: 3 },
          date: {
            type: "string",
            example: "2025-01-20",
            description: "YYYY-MM-DD",
          },
          availableTime: {
            type: "object",
            properties: {
              slot1: { type: "boolean", description: "09:00–10:00" },
              slot2: { type: "boolean", description: "10:00–11:00" },
              slot3: { type: "boolean", description: "11:00–12:00" },
              slot4: { type: "boolean", description: "14:00–15:00" },
              slot5: { type: "boolean", description: "15:00–16:00" },
              slot6: { type: "boolean", description: "16:00–17:00" },
            },
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
            default: "active",
          },
          createdBy: { type: "string" },
          modifiedBy: { type: "string", nullable: true },
          createdDateTime: { type: "string", format: "date-time" },
          modifiedDateTime: { type: "string", format: "date-time" },
        },
      },

      // ====== FAQ ======
      FAQ: {
        type: "object",
        properties: {
          _id: { type: "string" },
          question: { type: "string" },
          answer: { type: "string" },
          createdBy: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },

      // ====== COMMON ERROR ======
      ErrorResponse: {
        type: "object",
        properties: {
          message: { type: "string" },
          details: { type: "string" },
        },
      },
    },
  },

  paths: {
    // =========================================================
    // USERS
    // =========================================================
    "/api/users/doctors/public": {
      get: {
        tags: ["Users"],
        summary: "Get public doctor list",
        description: "Public route: returns list of doctors with public info.",
        responses: {
          200: {
            description: "List of doctors",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
        },
      },
    },

    "/api/users/signup": {
      post: {
        tags: ["Auth"],
        summary: "Sign up as patient",
        description: 'Creates a new user with role "user".',
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["firstName", "lastName", "email", "password"],
                properties: {
                  firstName: { type: "string" },
                  lastName: { type: "string" },
                  email: { type: "string", format: "email" },
                  password: { type: "string" },
                  phone: { type: "string" },
                  address: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
      },
    },

    "/api/users/login": {
      post: {
        tags: ["Auth"],
        summary: "Login",
        description: "Login with email and password, returns user and JWT.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginResponse" },
              },
            },
          },
          401: {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },

    "/api/users/{userId}/password": {
      put: {
        tags: ["Users"],
        summary: "Change password",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ChangePasswordRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Password changed successfully",
          },
          400: {
            description: "Validation error",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },

    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "List users (patients)",
        description: "Admin and doctor can list users.",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
        },
      },
      post: {
        tags: ["Users"],
        summary: "Create user (admin)",
        description: "Admin can create user/doctor/admin.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        responses: {
          201: {
            description: "User created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
        },
      },
    },

    "/api/users/{userId}": {
      get: {
        tags: ["Users"],
        summary: "Get user by id",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            schema: { type: "string" },
            required: true,
          },
        ],
        responses: {
          200: {
            description: "User",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          404: { description: "User not found" },
        },
      },
      put: {
        tags: ["Users"],
        summary: "Update user",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            schema: { type: "string" },
            required: true,
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        responses: {
          200: {
            description: "User updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
          404: { description: "User not found" },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Delete user (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            schema: { type: "string" },
            required: true,
          },
        ],
        responses: {
          204: { description: "User deleted" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
        },
      },
    },

    // =========================================================
    // APPOINTMENTS
    // =========================================================
    "/api/appointments": {
      get: {
        tags: ["Appointments"],
        summary: "List appointments",
        description:
          "Get all appointments with optional filters: q, userId, doctorId, status, date.",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "query", name: "q", schema: { type: "string" } },
          { in: "query", name: "userId", schema: { type: "string" } },
          { in: "query", name: "doctorId", schema: { type: "string" } },
          {
            in: "query",
            name: "status",
            schema: {
              type: "string",
              enum: ["pending", "confirmed", "completed", "cancelled"],
            },
          },
          {
            in: "query",
            name: "date",
            schema: { type: "string", example: "2025-01-20" },
          },
        ],
        responses: {
          200: {
            description: "List of appointments",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Appointment" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Appointments"],
        summary: "Create appointment",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/Appointment" },
                  {
                    required: ["userId", "doctorId", "date", "time"],
                  },
                ],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Appointment created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Appointment" },
              },
            },
          },
        },
      },
    },

    "/api/appointments/{appointmentId}": {
      get: {
        tags: ["Appointments"],
        summary: "Get appointment by id",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "appointmentId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Appointment",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Appointment" },
              },
            },
          },
          404: { description: "Appointment not found" },
        },
      },
      put: {
        tags: ["Appointments"],
        summary: "Update appointment",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "appointmentId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Appointment" },
            },
          },
        },
        responses: {
          200: {
            description: "Appointment updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Appointment" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Appointments"],
        summary: "Delete appointment (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "appointmentId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Appointment deleted" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
        },
      },
    },

    // =========================================================
    // SERVICES
    // =========================================================
    "/api/services": {
      get: {
        tags: ["Services"],
        summary: "List services",
        parameters: [
          { in: "query", name: "q", schema: { type: "string" } },
          { in: "query", name: "isActive", schema: { type: "boolean" } },
        ],
        responses: {
          200: {
            description: "List of services",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Service" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Services"],
        summary: "Create service (admin)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/Service" },
                  { required: ["serviceName"] },
                ],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Service created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Service" },
              },
            },
          },
        },
      },
    },

    "/api/services/{serviceId}": {
      get: {
        tags: ["Services"],
        summary: "Get service by id",
        parameters: [
          {
            in: "path",
            name: "serviceId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Service",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Service" },
              },
            },
          },
          404: { description: "Service not found" },
        },
      },
      put: {
        tags: ["Services"],
        summary: "Update service (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "serviceId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Service" },
            },
          },
        },
        responses: {
          200: {
            description: "Service updated",
          },
        },
      },
      delete: {
        tags: ["Services"],
        summary: "Delete service (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "serviceId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Service deleted" },
        },
      },
    },

    "/api/services/{serviceId}/toggle": {
      patch: {
        tags: ["Services"],
        summary: "Toggle service active status (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "serviceId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Service status toggled",
          },
        },
      },
    },

    // =========================================================
    // ARTICLES
    // =========================================================
    "/api/articles": {
      get: {
        tags: ["Articles"],
        summary: "List articles",
        description: "Public: filter by q, category, isPublished.",
        parameters: [
          { in: "query", name: "q", schema: { type: "string" } },
          { in: "query", name: "category", schema: { type: "string" } },
          { in: "query", name: "isPublished", schema: { type: "boolean" } },
        ],
        responses: {
          200: {
            description: "List of articles",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Article" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Articles"],
        summary: "Create article (admin)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/Article" },
                  { required: ["title", "content"] },
                ],
              },
            },
          },
        },
        responses: {
          201: { description: "Article created" },
        },
      },
    },

    "/api/articles/{articleId}": {
      get: {
        tags: ["Articles"],
        summary: "Get article by id",
        parameters: [
          {
            in: "path",
            name: "articleId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Article",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Article" },
              },
            },
          },
          404: { description: "Article not found" },
        },
      },
      put: {
        tags: ["Articles"],
        summary: "Update article (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "articleId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Article" },
            },
          },
        },
        responses: {
          200: { description: "Article updated" },
        },
      },
      delete: {
        tags: ["Articles"],
        summary: "Delete article (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "articleId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Article deleted" },
        },
      },
    },

    // =========================================================
    // BANNERS
    // =========================================================
    "/api/banners": {
      get: {
        tags: ["Banners"],
        summary: "List banners",
        description: "Public endpoint, filter by active and q.",
        parameters: [
          { in: "query", name: "active", schema: { type: "boolean" } },
          { in: "query", name: "q", schema: { type: "string" } },
        ],
        responses: {
          200: {
            description: "List of banners",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Banner" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Banners"],
        summary: "Create banner (admin)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/Banner" },
                  { required: ["image", "title"] },
                ],
              },
            },
          },
        },
        responses: {
          201: { description: "Banner created" },
        },
      },
    },

    "/api/banners/{bannerId}": {
      get: {
        tags: ["Banners"],
        summary: "Get banner by id",
        parameters: [
          {
            in: "path",
            name: "bannerId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Banner",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Banner" },
              },
            },
          },
          404: { description: "Banner not found" },
        },
      },
      put: {
        tags: ["Banners"],
        summary: "Update banner (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "bannerId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Banner" },
            },
          },
        },
        responses: {
          200: { description: "Banner updated" },
        },
      },
      delete: {
        tags: ["Banners"],
        summary: "Delete banner (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "bannerId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Banner deleted" },
        },
      },
    },

    "/api/banners/reorder": {
      put: {
        tags: ["Banners"],
        summary: "Reorder banners (admin)",
        description: "Send an array of { id, order } objects.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    order: { type: "integer" },
                  },
                  required: ["id", "order"],
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Banners reordered" },
        },
      },
    },

    "/api/banners/{bannerId}/toggle": {
      patch: {
        tags: ["Banners"],
        summary: "Toggle banner active status (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "bannerId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Banner toggled" },
        },
      },
    },

    // =========================================================
    // DOCTOR TIME
    // =========================================================
    "/api/doctor-time": {
      get: {
        tags: ["DoctorTime"],
        summary: "List doctor schedules",
        description:
          "Public: filter by userId, week, date, status for available slots.",
        parameters: [
          { in: "query", name: "userId", schema: { type: "string" } },
          { in: "query", name: "week", schema: { type: "string" } },
          { in: "query", name: "date", schema: { type: "string" } },
          {
            in: "query",
            name: "status",
            schema: { type: "string", enum: ["active", "inactive"] },
          },
        ],
        responses: {
          200: {
            description: "List of doctor schedules",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/DoctorTime" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["DoctorTime"],
        summary: "Create doctor schedule (doctor/admin)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/DoctorTime" },
                  { required: ["userId", "date"] },
                ],
              },
            },
          },
        },
        responses: {
          201: { description: "Schedule created" },
        },
      },
    },

    "/api/doctor-time/{doctorTimeId}": {
      get: {
        tags: ["DoctorTime"],
        summary: "Get doctor schedule by id",
        parameters: [
          {
            in: "path",
            name: "doctorTimeId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Schedule",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DoctorTime" },
              },
            },
          },
          404: { description: "Not found" },
        },
      },
      put: {
        tags: ["DoctorTime"],
        summary: "Update doctor schedule (doctor/admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "doctorTimeId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DoctorTime" },
            },
          },
        },
        responses: {
          200: { description: "Schedule updated" },
        },
      },
      delete: {
        tags: ["DoctorTime"],
        summary: "Delete doctor schedule (doctor/admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "doctorTimeId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Schedule deleted" },
        },
      },
    },

    "/api/doctor-time/user/{userId}/date/{date}": {
      get: {
        tags: ["DoctorTime"],
        summary: "Get doctor schedule for a given date (public)",
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: { type: "string" },
          },
          {
            in: "path",
            name: "date",
            required: true,
            schema: { type: "string", example: "2025-01-20" },
          },
        ],
        responses: {
          200: {
            description: "Schedule",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DoctorTime" },
              },
            },
          },
          404: { description: "Not found" },
        },
      },
    },

    "/api/doctor-time/user/{userId}/rescheduledate/{date}": {
      get: {
        tags: ["DoctorTime"],
        summary: "Get doctor schedule for rescheduling (admin/doctor)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: { type: "string" },
          },
          {
            in: "path",
            name: "date",
            required: true,
            schema: { type: "string", example: "2025-01-20" },
          },
        ],
        responses: {
          200: {
            description: "Schedule",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DoctorTime" },
              },
            },
          },
        },
      },
    },

    "/api/doctor-time/user/{userId}/week/{week}": {
      get: {
        tags: ["DoctorTime"],
        summary: "Get doctor schedule by week (doctor/admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: { type: "string" },
          },
          {
            in: "path",
            name: "week",
            required: true,
            schema: { type: "string", example: "2025-W03" },
          },
        ],
        responses: {
          200: {
            description: "List of schedules",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/DoctorTime" },
                },
              },
            },
          },
        },
      },
    },

    "/api/doctor-time/{doctorTimeId}/toggle/{slotName}": {
      patch: {
        tags: ["DoctorTime"],
        summary: "Toggle one time slot (doctor/admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "doctorTimeId",
            required: true,
            schema: { type: "string" },
          },
          {
            in: "path",
            name: "slotName",
            required: true,
            schema: {
              type: "string",
              enum: ["slot1", "slot2", "slot3", "slot4", "slot5", "slot6"],
            },
          },
        ],
        responses: {
          200: { description: "Slot toggled" },
        },
      },
    },

    // =========================================================
    // FAQ
    // =========================================================
    "/api/faq": {
      get: {
        tags: ["FAQ"],
        summary: "List FAQ",
        parameters: [
          {
            in: "query",
            name: "q",
            schema: { type: "string" },
            description: "Search keyword",
          },
        ],
        responses: {
          200: {
            description: "List of FAQ items",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/FAQ" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["FAQ"],
        summary: "Create FAQ (admin)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/FAQ" },
                  { required: ["question", "answer"] },
                ],
              },
            },
          },
        },
        responses: {
          201: { description: "FAQ created" },
        },
      },
    },

    "/api/faq/{faqId}": {
      get: {
        tags: ["FAQ"],
        summary: "Get FAQ by id",
        parameters: [
          {
            in: "path",
            name: "faqId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "FAQ item",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/FAQ" },
              },
            },
          },
          404: { description: "FAQ not found" },
        },
      },
      put: {
        tags: ["FAQ"],
        summary: "Update FAQ (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "faqId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/FAQ" },
            },
          },
        },
        responses: {
          200: { description: "FAQ updated" },
        },
      },
      delete: {
        tags: ["FAQ"],
        summary: "Delete FAQ (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "faqId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "FAQ deleted" },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
