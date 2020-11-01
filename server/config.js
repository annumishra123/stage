const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://mongo:27017/stage3-admin',
  port: process.env.PORT || 8000,
  access_token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU3NDg5NDUsInVzZXJfbmFtZSI6ImJhY2tlbmRhZG1pbkBzdGFnZTMuY28iLCJhdXRob3JpdGllcyI6WyJST0xFX0FOT05ZTU9VUyIsIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwianRpIjoiMjczZjU3YmItOGQ2Ny00MDRlLWI3NDMtMDI4ZGE4N2I2MmMyIiwiY2xpZW50X2lkIjoiZWRnZSIsInNjb3BlIjpbInBhc3N3b3JkIl19.ELO4jXM8ydQzTyKT87MJBk5NwnKAulLqSfN-i2-LweY',
  targetURL: 'https://staging.stage3.co',
  notificationUrl: 'https://notification-test.stage3.co',
  refundKey: 'backendsecretstage123'
};

export default config;
