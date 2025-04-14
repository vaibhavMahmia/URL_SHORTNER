import jwt from "jsonwebtoken";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6InZhaWJoYXYiLCJlbWFpbCI6InZhaWJoYXZAZ21haWwuY29tIiwic2Vzc2lvbklkIjo1LCJpYXQiOjE3NDQ1Njc2MjksImV4cCI6MTc0NDU2ODUyOX0.Dowcp2lot1Wdu6lteha3-jZR2_1yohKO89Y63B2w3-Q';
const decoded = jwt.verify(token, "QWERTY@12345");
console.log(decoded);