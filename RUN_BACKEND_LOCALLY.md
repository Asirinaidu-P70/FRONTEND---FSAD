# 🚀 Run Spring Boot Backend Locally - Complete Guide

## Step 1: Open Backend in Spring Boot IDE

1. **Open Eclipse or Spring Tools Suite**
2. Go to **File** → **Open Projects from File System**
3. Select: `C:\Users\pagot\Documents\workspace-spring-tools-for-eclipse-5.0.1.RELEASE\workshop-backend`
4. Click **Finish**

---

## Step 2: Make Sure H2 Database is Configured

Your `application.properties` is already set to use H2 (file-based, no MySQL needed!):

```properties
spring.datasource.url=jdbc:h2:file:./data/workshopdb
```

✅ This means no MySQL setup required!

---

## Step 3: Run the Backend

### Method 1: Using IDE (Easiest)

1. Right-click on project → **Run As** → **Spring Boot App**
2. Wait for server to start
3. You should see: `Started WorkshopBackendApplication in X seconds`

### Method 2: Using Terminal

```bash
cd "C:\Users\pagot\Documents\workspace-spring-tools-for-eclipse-5.0.1.RELEASE\workshop-backend"
.\mvnw.cmd spring-boot:run
```

**The backend is now running on:** `http://localhost:8081`

---

## Step 4: Configure Frontend to Call Backend Locally

In **VS Code**, update your frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:8081/api
```

Save it!

---

## Step 5: Run Frontend in VS Code

In VS Code terminal:

```bash
cd "C:\Users\pagot\NEW WEB"
npm run dev
```

Your frontend is now running on: `http://localhost:5173`

---

## Testing Registration (Finding the Error 500)

### Step 1: Open DevTools in Browser

1. Open `http://localhost:5173` in browser
2. Press **F12** to open DevTools
3. Go to **Network** tab
4. Try to register an account

### Step 2: See the Error

In the Network tab, click on the failed request to `/api/auth/register`. You'll see the error details.

---

## Common Error 500 Issues & Fixes

### Issue 1: Missing Fields
**Error**: "null pointer exception" on fullName, email, password

**Fix**: Make sure your RegisterRequest DTO has:
```java
@NotBlank(message = "Full name is required")
private String fullName;

@Email(message = "Invalid email")
@NotBlank(message = "Email is required")
private String email;

@NotBlank(message = "Password is required")
private String password;

@NotBlank(message = "Role is required")
private String role;
```

### Issue 2: Database Constraint (Duplicate Email)
**Error**: "Unique constraint violation on email"

**Fix**: The email might already exist. Register with a **different email** each time.

### Issue 3: Missing PasswordEncoder Bean
**Error**: "Cannot find bean of type PasswordEncoder"

**Fix**: Make sure `PasswordConfig.java` exists with:
```java
@Configuration
public class PasswordConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

### Issue 4: CORS Issues
**Error**: "No 'Access-Control-Allow-Origin' header"

**Fix**: Your `CrosConfig.java` already allows localhost:
```java
.allowedOrigins(
    "http://localhost:5173",
    "http://localhost:5175",
    ...
)
```

---

## View Backend Logs to Debug

### In Eclipse/Spring Tools:

1. Go to **Console** tab at the bottom
2. Run the backend
3. Watch for errors as you try to register
4. **Copy the error message** and send it to me ✅

### Example Error Log:

```
[ERROR] ... NullPointerException: Cannot invoke method on null object
at com.example.demo.controller.AuthController.register(AuthController.java:35)
```

---

## H2 Database Console (Optional)

To view your database while backend is running:

1. Go to: `http://localhost:8081/h2-console`
2. JDBC URL: `jdbc:h2:file:./data/workshopdb`
3. Username: `sa`
4. Password: (leave blank)
5. Click **Connect**
6. Now you can see your tables and data!

---

## Full Testing Flow

```bash
# Terminal 1: Start Backend
cd workshop-backend
.\mvnw.cmd spring-boot:run

# Terminal 2: Start Frontend
cd "NEW WEB"
npm run dev

# Then in Browser:
# 1. Open http://localhost:5173
# 2. Try to register
# 3. Check DevTools Console for errors
# 4. Report any 500 errors to me
```

---

## Next Steps with Full Stack Running

Once backend is running:

1. ✅ Test user registration → Check for error 500
2. ✅ Test user login
3. ✅ View workshops
4. ✅ Create workshops
5. ✅ Register for workshops

All data will be saved in `./data/workshopdb.mv.db`

---

## Important Notes

- **H2 Database**: Uses file-based storage, not MySQL
- **Auto Table Creation**: JPA creates tables automatically (ddl-auto=update)
- **Data Persistence**: Data survives application restarts
- **Port**: Backend on 8081, Frontend on 5173
- **CORS**: Already configured for localhost

---

## Still Getting Error 500?

1. **Take a screenshot** of the error in DevTools Network tab
2. **Copy the error message** from the response
3. **Check Eclipse console logs**
4. Send me the error details and I'll fix it! 🛠️

Good luck! You're ready to debug and fix! 🚀
