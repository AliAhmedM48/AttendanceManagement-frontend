# Project Documentation

## 🚀 Project Overview

This project is designed to efficiently manage employee attendance, profiles, and other related functionalities. By integrating seamlessly with an API, it enables operations such as:

- Fetching attendance data
- Managing employee information
- Handling authentication

The core features of the project include:

- **Attendance Management**
- **Employee Management**
- **Profile Management**

These features ensure a seamless experience for both employees and administrators, simplifying workflows and improving efficiency.

---

## 🏗️ Backend Repository

The backend is built to handle API requests and manage core functionalities. You can explore the backend code at the following GitHub repository:

[Attendance Management Backend Repository](https://github.com/AliAhmedM48/AttendanceManagement-backend)

**Contributions are always welcome!** Clone, contribute, or suggest improvements to enhance the project.

---

## 🔧 Features

### 1. **Attendance Management** 📅
   - **Check-In Attendance**: Employees can check in when they arrive at work.
   - **Check-Out Attendance**: Employees can check out when they leave work.
   - **Fetch All Attendances**: View all attendance records for the organization.
   - **Get Today's Attendance**: Retrieve today's attendance data.
   - **Attendance History**: View historical attendance records for employees.

### 2. **Employee Management** 👥
   - **Create Employee**: Add a new employee to the system.
   - **Update Employee**: Modify an employee's information.
   - **Delete Employee**: Remove an employee from the system.
   - **Fetch All Employees**: Retrieve a list of all employees.
   - **Upload Employee Signature**: Upload or update an employee’s signature.

### 3. **Profile Management** 🧑‍💼
   - **Get Employee Profile**: Fetch employee profile details, including personal information and signature.
   - **Update Profile**: Employees can update their personal details and signature.

### 4. **Authentication & Token Management** 🔑
   - **Login**: Allows users to log in and obtain an authentication token.
   - **Token Validation**: Verifies the validity of an authentication token.

### 5. **Date & Time Utilities** 🕒
   - **Format Date**: Convert a date string into `dd/MM/yyyy` format.
   - **Format DateTime**: Convert a datetime string into `dd/MM/yyyy HH:mm:ss` format.
   - **Convert Time to Date**: Convert a time string (`HH:mm`) into a Date object for today.

---

## 📡 API Endpoints

### 1. **Authentication** 🔐
   - **POST** `/api/auth/login`: Log in and receive an authentication token.
   - **GET** `/api/auth/validate_token`: Validate an existing authentication token.

### 2. **Employee Operations** 👥
   - **GET** `/api/employees`: Retrieve a list of all employees.
   - **POST** `/api/employees`: Add a new employee.
   - **PUT** `/api/employees/{id}`: Update an employee's information.
   - **DELETE** `/api/employees/{id}`: Delete an employee from the system.
   - **PATCH** `/api/employees/{id}/signature`: Update an employee's signature.

### 3. **Attendance Operations** 📝
   - **GET** `/api/attendances`: Retrieve all attendance records.
   - **POST** `/api/attendances/check-in`: Check in an employee.
   - **PATCH** `/api/attendances/{id}/check-out`: Check out an employee.
   - **GET** `/api/attendances/today`: Fetch today's attendance data.
   - **GET** `/api/attendances/history`: Retrieve historical attendance data.

### 4. **Employee Profile Operations** 🧑‍💼
   - **GET** `/api/profile`: Retrieve the profile data of the logged-in employee.
   - **GET** `/api/profile/signature`: Retrieve an employee’s signature.

---

## ⚠️ Error Handling

The project ensures that API call failures are handled gracefully:

- **Unauthorized (401)**: The user will be prompted to log in again if their session expires or credentials are invalid.
- **General Errors**: Unexpected errors are logged, and an appropriate message is returned to the user.

---

## 📝 Usage

1. **Login**: Use the `POST /api/auth/login` endpoint to authenticate and obtain a token.
2. **Token Validation**: Validate the token using `GET /api/auth/validate_token`.
3. **Employee Management**: Create, update, or delete employee records using the employee-related endpoints.
4. **Attendance Management**: Check in, check out, or view attendance data using the attendance-related endpoints.
5. **Profile Management**: View and update employee profiles using the profile-related endpoints.

---

## 🔑 Authentication Context & Token Management

This feature securely manages user authentication and authorization. It uses **React Context** and **hooks** for centralized authentication across the app.

- **Authentication Context**: The `AuthContext` stores user authentication data (like `token`, `role`, `fullName`, etc.) and provides it throughout the app without prop-drilling.
- **Authentication Provider**: The `AuthProvider` manages the login process by decoding JWT tokens using the `jwt-decode` library. This ensures user identity and permissions are verified.
- **Login & Logout**: The `login` method stores user data, like the authentication token, in local storage for persistence. The `logout` method clears the authentication state and removes the stored data, ensuring the user is logged out properly.
- **Token Validation**: Token validation confirms the JWT token's validity through API requests, preventing unauthorized access and ensuring session integrity.

---

## 📱 Responsive Screen Size Detection

This feature adapts the UI based on the screen size, ensuring a seamless experience across devices.

- **Screen Size Context**: The `ScreenSizeContext` detects if the user is on a small screen (e.g., mobile) using `window.matchMedia` with the query `max-width: 768px`.
- **Responsive State**: The state `isSmallScreen` tracks and updates the screen size when the window resizes, ensuring that UI components are rendered accordingly.
- **useScreenSize Hook**: A custom hook that makes the screen size state available to other components, enabling adaptive layouts for small screens.

Together, these features create a user-friendly, secure, and adaptable app for mobile and desktop platforms.


---


## 👋 A Final Note

Thank you for exploring this project! We hope it helps streamline attendance and profile management, providing an efficient authentication process. If you have any questions or suggestions, feel free to reach out.

**Let's improve and grow together!**

Happy coding! 🚀
