const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://mongo:27017/mern-starter',
  port: process.env.PORT || 8000,
  access_token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDk1MjkyMTMsInVzZXJfbmFtZSI6ImJhY2tlbmRhZG1pbkBzdGFnZTMuY28iLCJhdXRob3JpdGllcyI6WyJST0xFX0FOT05ZTU9VUyIsIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwianRpIjoiYzIxZGVhYTQtZjViNS00ZGUwLTllYTctYzdlY2M2YzJhYTYzIiwiY2xpZW50X2lkIjoiZWRnZSIsInNjb3BlIjpbInBhc3N3b3JkIl19.-LWwJXs_wVbWT1iY_qUBGwsgZVKvZ4DbeUpIqkQttAU',
  targetURL: 'https://staging.stage3.co',
};

export default config;
