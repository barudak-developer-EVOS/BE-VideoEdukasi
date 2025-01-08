const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EduVid API",
      version: "1.0.0",
      description: "EduVid API made with express js and mysql",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Kharisma Sastrawansyah",
        email: "kharismasastrawansyah@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Video: {
          type: "object",
          properties: {
            video_id: {
              type: "integer",
              description: "Unique identifier for the video",
            },
            video_title: {
              type: "string",
              description: "Title of the video",
            },
            video_description: {
              type: "string",
              description: "Description of the video",
            },
            video_url: {
              type: "string",
              format: "url",
              description: "URL of the video file",
            },
            video_thumbnail: {
              type: "string",
              format: "url",
              description: "URL of the video's thumbnail",
            },
            video_education_level: {
              type: "string",
              enum: ["SD", "SMP", "SMA"],
              description: "Education level of the video",
            },
            video_subject: {
              type: "string",
              enum: [
                "PPKn",
                "Bahasa Indonesia",
                "Matematika",
                "IPA",
                "IPS",
                "Agama",
                "PJOK",
              ],
              description: "Subject of the video",
            },
            views: {
              type: "integer",
              description: "Number of views the video has",
            },
            likes: {
              type: "integer",
              description: "Number of likes the video has",
            },
            dislikes: {
              type: "integer",
              description: "Number of dislikes the video has",
            },
            account_id: {
              type: "integer",
              description: "ID of the user who uploaded the video",
            },
            video_created_at: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the video was created",
            },
            video_updated_at: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the video was last updated",
            },
          },
          required: ["video_id", "video_title", "video_url", "video_thumbnail"],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./server/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
