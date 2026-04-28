# 🔧 Fix Error 500 - Checklist & Solutions

## ❌ Error 500 Checklist

Most error 500s happen due to missing data, database issues, or configuration problems. Follow this checklist:

---

## ✅ Checklist 1: Verify Backend Structure

- [ ] `application.properties` exists with H2 config
- [ ] `PasswordConfig.java` exists with @Bean PasswordEncoder
- [ ] `SecurityConfig.java` exists with CORS config
- [ ] `CorsConfig.java` exists
- [ ] `AuthController.java` exists with /api/auth/register endpoint

**If ANY of these are missing**, the backend won't work!

---

## ✅ Checklist 2: Database Configuration

Verify your `application.properties` has:

```properties
spring.datasource.url=jdbc:h2:file:./data/workshopdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
```

**Why this matters:**
- `ddl-auto=update` → Tables created automatically ✅
- H2 driver → No MySQL needed ✅
- File-based storage → Data persists ✅

---

## ✅ Checklist 3: Frontend Sending Correct Data

Your frontend sends:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Test123!",
  "role": "user"
}
```

Backend expects exactly this in `RegisterRequest.java`:
- `fullName` ✅
- `email` ✅
- `password` ✅
- `role` ✅

**If these don't match → Error 400 or 500**

---

## ✅ Checklist 4: Test With curl (Skip Frontend Issues)

Open terminal and test backend directly:

```bash
curl -X POST http://localhost:8081/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"Test123!\",\"role\":\"user\"}"
```

**If this works**: Error is in frontend ✅

**If this fails**: Error is in backend ✅

---

## 🔴 Common Error 500s & Fixes

### Error 1: "Property not found: fullName"
```
{"timestamp":"...","status":500,"error":"...","message":"Can not construct..."}
```

**Cause**: RegisterRequest doesn't have fullName field

**Fix**: Add to `RegisterRequest.java`:
```java
@NotBlank(message = "Full name is required")
private String fullName;

public String getFullName() { return fullName; }
public void setFullName(String fullName) { this.fullName = fullName; }
```

---

### Error 2: "Column 'role' cannot be null"
```
java.sql.SQLException: Constraint [ROLE_NOTNULL] on table [USERS]...
```

**Cause**: Role is null when saved

**Fix**: Ensure User model has role field with @Column(nullable = false)
```java
@Column(nullable = false)
private String role;
```

---

### Error 3: "PasswordEncoder bean not found"
```
No qualifying bean of type 'org.springframework.security.crypto.password.PasswordEncoder'
```

**Cause**: PasswordConfig not loaded

**Fix**: Verify PasswordConfig.java exists:
```java
@Configuration
public class PasswordConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

---

### Error 4: "Unique constraint violation"
```
java.sql.SQLIntegrityConstraintViolationException: Unique index or primary key violation
```

**Cause**: Email already exists

**Fix**: Use a **different email** each test:
- test1@example.com ✅
- test2@example.com ✅
- test1@example.com ❌ (already used)

Or delete the database file: `./data/workshopdb.mv.db`

---

### Error 5: "Cannot parse HTTP request"
```
HTTP 400: Bad Request - Cannot deserialize...
```

**Cause**: Frontend sending wrong JSON format

**Fix**: Ensure frontend sends exactly:
```json
{
  "fullName": "string",
  "email": "string",
  "password": "string",
  "role": "string"
}
```

---

## 🛠️ How to Debug

### Step 1: Enable Debug Logging
Add to `application.properties`:
```properties
logging.level.root=INFO
logging.level.com.example.demo=DEBUG
```

### Step 2: Watch Console Output
```
DEBUG com.example.demo.controller.AuthController : Registering user: test@example.com
DEBUG org.hibernate.SQL : insert into users(email,name,password,role) values (?,?,?,?)
INFO com.example.demo.controller.AuthController : User registered successfully
```

### Step 3: Check DevTools Network Tab
1. F12 → Network tab
2. Make request
3. Click failed request
4. Read "Response" tab for error details

### Step 4: Read Backend Logs
Eclipse Console shows exact error with line numbers.

---

## 🧹 Reset Everything to Test Fresh

```bash
# 1. Stop backend
# 2. Delete database file
del ".\data\workshopdb.mv.db"

# 3. Restart backend
.\mvnw.cmd spring-boot:run

# 4. Try registration again with new email
```

---

## ✨ What Success Looks Like

**Successful registration response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2024-04-09T10:30:00"
}
```

**Status Code**: 201 (Created) ✅

---

## 📞 If Still Not Working

Send me:
1. **Error message from DevTools** (Network → Response tab)
2. **Backend console error** (Eclipse console output)
3. **What data you're sending** (fullName, email, password, role)
4. **What the 500 error says**

I'll fix it! 🔧

---

## 🎯 Testing Your Full Stack

Once registration works:

```bash
# Test login
curl -X POST http://localhost:8081/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"Test123!\"}"

# Get all users
curl http://localhost:8081/api/auth/users

# Get workshops
curl http://localhost:8081/api/workshops
```

All should return data! ✅
