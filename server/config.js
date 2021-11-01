const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/stage3-admin',
  port: process.env.PORT || 8000,
  access_token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjczMDIxODMsInVzZXJfbmFtZSI6ImJhY2tlbmRhZG1pbkBzdGFnZTMuY28iLCJhdXRob3JpdGllcyI6WyJST0xFX0FOT05ZTU9VUyIsIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwianRpIjoiYjViNDk3M2MtN2Q4MC00MWVlLWEyNmQtODEzYWVjZjAwZTA0IiwiY2xpZW50X2lkIjoiZWRnZSIsInNjb3BlIjpbInBhc3N3b3JkIl19.NLEnFbJ9rtaM1YP5h2zps4XUwEaUaVw4qlz5jsauiPE',
  targetURL: 'https://staging.stage3.co',
  notificationUrl: 'https://notification-test.stage3.co',
  refundKey: 'backendsecretstage123'
};

export default config;
