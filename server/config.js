const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://mongo:27017/stage3-admin',
  port: process.env.PORT || 8000,
  access_token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDQxNDUzMDIsInVzZXJfbmFtZSI6ImJhY2tlbmRhZG1pbkBzdGFnZTMuY28iLCJhdXRob3JpdGllcyI6WyJST0xFX0FOT05ZTU9VUyIsIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwianRpIjoiYTIwMWNiYzctYmExZC00YjYxLWE4NGUtNDhmZTk0Mjk3ZjFjIiwiY2xpZW50X2lkIjoiZWRnZSIsInNjb3BlIjpbInBhc3N3b3JkIl19.NJrr29bgOVjdVJ6cfiWQdKRE_Y8QZg4a0YXJeMbRB9E',
  targetURL: 'https://staging.stage3.co',
  notificationUrl: 'https://notification-test.stage3.co'
};

export default config;
