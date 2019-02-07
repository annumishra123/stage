const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://mongo:27017/stage3-admin',
  port: process.env.PORT || 8000,
  access_token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzI2MDcyNDMsInVzZXJfbmFtZSI6ImJhY2tlbmRhZG1pbkBzdGFnZTMuY28iLCJhdXRob3JpdGllcyI6WyJST0xFX0FOT05ZTU9VUyIsIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwianRpIjoiYzc2MTMwYjItZGU5NC00YmM5LTlhNTktOWUxNTlmNWNiYzQxIiwiY2xpZW50X2lkIjoiZWRnZSIsInNjb3BlIjpbInBhc3N3b3JkIl19.MQfxuV5lx1Os8KtCnVk2_YNyljlnoa1BO2nKrqILU0Q',
  targetURL: 'https://staging.stage3.co',
  notificationUrl: 'https://notification-test.stage3.co'
};

export default config;
