# 🚀 Student Management System - MongoDB Atlas Integration

**A production-ready Node.js/Express backend with clean architecture, MongoDB Atlas, and comprehensive error handling.**

## 📚 Quick Links

- [MONGODB_UPGRADE_GUIDE.md](./MONGODB_UPGRADE_GUIDE.md) - Complete upgrade documentation
- `.env.example` - Environment variables template

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create a database user
4. Whitelist your IP address
5. Copy connection string

### 3. Configure Environment
```bash
# Copy the template
cp .env.example .env

# Edit .env with your MongoDB URI
nano .env
```

Update `.env`:
```env
MONGO_URI=mongodb+srv://stud_mgmt:your_password@cluster0.3nywc1k.mongodb.net/student_management?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### 4. Start the Server
```bash
npm start
```

**Expected Output:**
```
✓ MongoDB Atlas Connection Successful
✓ Connected to Database: student_management
✓ Server running on port 5000
✓ Base URL: http://localhost:5000
✓ Students API: http://localhost:5000/api/students
```

## 📁 Project Structure

```
stud_management_backend/
├── config/
│   ├── app.config.js         # App configuration
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── student.controller.js # Request handlers
├── models/
│   └── student.model.js      # Mongoose schema
├── services/
│   └── student.service.js    # Business logic
├── routes/
│   └── student.routes.js     # API routes
├── middlewares/
│   ├── error.middleware.js   # Error handling
│   ├── logger.middleware.js  # Request logging
│   ├── notfound.middleware.js # 404 handling
│   └── validation.middleware.js # Input validation
├── .env                      # Environment variables
├── .env.example              # Template
├── app.js                    # Express app
├── server.js                 # Entry point
└── package.json              # Dependencies
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/students` | Create a new student |
| GET | `/api/students` | Get all students (with pagination & search) |
| GET | `/api/students/:id` | Get a student by ID |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

## 📝 Example Requests

### Create Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 20,
    "course": "Computer Science"
  }'
```

### Get All Students
```bash
curl http://localhost:5000/api/students?page=1&limit=5&search=john
```

### Get by ID
```bash
curl http://localhost:5000/api/students/67a1234567890abcdef12345
```

### Update Student
```bash
curl -X PUT http://localhost:5000/api/students/67a1234567890abcdef12345 \
  -H "Content-Type: application/json" \
  -d '{"age": 21}'
```

### Delete Student
```bash
curl -X DELETE http://localhost:5000/api/students/67a1234567890abcdef12345
```

## 🗄️ Database Schema

### Student Document
```javascript
{
  _id: ObjectId,           // MongoDB unique ID
  name: String,            // Required: 2-50 chars
  age: Number,             // Required: 1-100
  course: String,          // Required: enum list
  createdAt: Date,         // Auto: creation time
  updatedAt: Date,         // Auto: last update
  __v: Number              // Mongoose version
}
```

### Valid Courses
- Computer Science
- Information Technology
- Software Engineering
- Data Science
- Cybersecurity
- Web Development
- Mobile Development
- Other

## ✅ Features

✅ **Clean Architecture** - Proper separation of concerns  
✅ **MongoDB Atlas** - Cloud database integration  
✅ **Mongoose ODM** - Type-safe database operations  
✅ **Error Handling** - Comprehensive error messages  
✅ **Validation** - Input and schema validation  
✅ **Pagination** - Efficient data retrieval  
✅ **Search** - Name-based search functionality  
✅ **Timestamps** - Auto-managed createdAt/updatedAt  
✅ **Async/Await** - Modern async patterns  
✅ **Environment Variables** - Secure config management  

## 🧪 Testing with cURL

```bash
# Create student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","age":21,"course":"Computer Science"}'

# Get all
curl http://localhost:5000/api/students

# Get one
curl http://localhost:5000/api/students/<student_id>

# Update
curl -X PUT http://localhost:5000/api/students/<student_id> \
  -H "Content-Type: application/json" \
  -d '{"age":22}'

# Delete
curl -X DELETE http://localhost:5000/api/students/<student_id>
```

## 🔧 Configuration

### Environment Variables
```env
# MongoDB Connection URI
MONGO_URI=mongodb+srv://stud_mgmt:password@cluster0.mongodb.net/database

# Server Port
PORT=5000

# Environment (development | production)
NODE_ENV=development
```

### Database Connection
- **File**: `config/db.js`
- **Features**: Connection validation, error handling, graceful shutdown

### Error Handling
- **File**: `middlewares/error.middleware.js`
- **Handles**: Validation errors, MongoDB errors, server errors

## 🚨 Error Responses

### Validation Error
```json
{
  "success": false,
  "error": {
    "status": 400,
    "message": "Validation Error",
    "details": [
      {
        "field": "name",
        "message": "Name must be at least 2 characters long"
      }
    ]
  }
}
```

### Not Found
```json
{
  "success": false,
  "error": {
    "status": 404,
    "message": "Student not found"
  }
}
```

### Server Error
```json
{
  "success": false,
  "error": {
    "status": 500,
    "message": "Internal Server Error"
  }
}
```

## 📚 What's New (MongoDB Upgrade)

### ✨ Added
- ✅ MongoDB Atlas integration
- ✅ Mongoose schema with validation
- ✅ Database connection file
- ✅ Environment variable management
- ✅ Enhanced error handling
- ✅ Pagination implementation
- ✅ Search functionality
- ✅ Timestamps (createdAt, updatedAt)

### 🔄 Changed
- ✅ Replaced in-memory storage with MongoDB
- ✅ Updated service layer with Mongoose operations
- ✅ Enhanced controller responses
- ✅ Improved error middleware
- ✅ Updated server.js for DB connection

### 🎯 Maintained
- ✅ Clean architecture structure
- ✅ Route organization
- ✅ Controller layer pattern
- ✅ Service layer abstraction
- ✅ Middleware system

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Check .env file
cat .env

# Verify MongoDB URI
echo $MONGO_URI

# Ensure IP is whitelisted in MongoDB Atlas
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### dotenv Not Loading
```bash
# Verify .env file exists
ls -la .env

# Check server.js starts with require('dotenv').config()
head -5 server.js
```

## 📖 Documentation

See [MONGODB_UPGRADE_GUIDE.md](./MONGODB_UPGRADE_GUIDE.md) for:
- Complete technical guide
- API endpoints with examples
- Error handling detailed explanations
- Best practices and common mistakes
- Postman testing guide
- Production deployment checklist

## 🚀 Production Deployment

Before deploying:

```bash
# 1. Update environment variables
NODE_ENV=production
MONGO_URI=<production_uri>

# 2. Use strong passwords

# 3. Enable IP whitelisting (specific IPs only)

# 4. Setup monitoring and logging

# 5. Configure database backups

# 6. Add rate limiting

# 7. Enable CORS for frontend domains
```

## 💡 Key Improvements

| Aspect | Before | After |
|--------|--------|-------|
| **Storage** | In-memory array | MongoDB Atlas (persistent) |
| **Validation** | Basic checks | Schema-level validation |
| **Errors** | Basic messages | Comprehensive error handling |
| **Performance** | Limited scalability | Query optimization |
| **Reliability** | Data lost on restart | Data persists |
| **Scalability** | Single server | Cloud-based MongoDB |
| **Production Ready** | No | Yes |

## 📝 What Changed from Original

### Before (In-Memory Storage)
```javascript
let students = [];  // In-memory array
const createStudent = (data) => {
    students.push(data);
    return data;
};
```

### After (MongoDB)
```javascript
const createStudent = async (data) => {
    const student = await Student.create(data);  // Save to MongoDB
    return student;
};
```

## 📄 License

ISC

## 👨‍💻 Author

Sachin (Backend Engineer)

---

**Happy coding! 🚀**

For detailed technical documentation, see [MONGODB_UPGRADE_GUIDE.md](./MONGODB_UPGRADE_GUIDE.md)