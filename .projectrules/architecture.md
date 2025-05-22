# Mini-CMS "User Hub" - Architecture Document

## 1. Overview

This document outlines the architecture for the Mini-CMS "User Hub" application. The system is designed as a client-server web application with a separate front-end and back-end.

- **Front-end:** Angular with Angular Material for UI components.
- **Back-end:** Java with Spring Boot for API and business logic.
- **Real-time Updates:** WebSockets for live updates on the user list.
- **Data Persistence:** Initially Mock Data (JSON/In-memory), with the option to move to a real database (PostgreSQL/MongoDB/SQLite) later.

## 2. Guiding Principles

The development will adhere to the following principles:

- **SOLID:** Ensuring a robust and maintainable codebase.
- **DRY (Don't Repeat Yourself):** Avoiding redundancy in code.
- **KISS (Keep It Simple, Stupid):** Favoring simplicity in design and implementation.
- **User-Friendly UX/UI:** Leveraging Angular Material to create a modern and intuitive interface.

## 3. File and Folder Structure

```
mini-cms-user-hub/
├── frontend-angular/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/                     # Core services (auth simulation, WebSocket)
│   │   │   │   ├── services/
│   │   │   │   │   ├── user.service.ts
│   │   │   │   │   ├── permission.service.ts
│   │   │   │   │   ├── websocket.service.ts
│   │   │   │   │   └── notification.service.ts (for UI feedback)
│   │   │   │   └── guards/                 # Route guards (if needed for conditional UI)
│   │   │   ├── features/
│   │   │   │   ├── user-management/
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── user-list/
│   │   │   │   │   │   │   └── user-list.component.ts (.html, .scss)
│   │   │   │   │   │   ├── user-form/
│   │   │   │   │   │   │   └── user-form.component.ts (.html, .scss)
│   │   │   │   │   │   └── user-detail/    # Optional, for showing user permissions
│   │   │   │   │   │       └── user-detail.component.ts (.html, .scss)
│   │   │   │   │   └── user-management.module.ts
│   │   │   │   ├── permission-management/
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── permission-list/
│   │   │   │   │   │   │   └── permission-list.component.ts (.html, .scss)
│   │   │   │   │   │   └── permission-form/
│   │   │   │   │   │       └── permission-form.component.ts (.html, .scss)
│   │   │   │   │   └── permission-management.module.ts
│   │   │   │   └── dashboard/              # For admin actions, conditional UI elements
│   │   │   │       ├── components/
│   │   │   │       │   └── admin-panel/
│   │   │   │       │       └── admin-panel.component.ts (.html, .scss)
│   │   │   │       └── dashboard.module.ts
│   │   │   ├── shared/
│   │   │   │   ├── components/             # Reusable UI components (e.g., confirmation dialog)
│   │   │   │   ├── models/
│   │   │   │   │   ├── user.model.ts
│   │   │   │   │   └── permission.model.ts
│   │   │   │   └── material.module.ts      # Module for Angular Material imports
│   │   │   ├── app-routing.module.ts
│   │   │   ├── app.component.ts (.html, .scss)
│   │   │   └── app.module.ts
│   │   ├── assets/
│   │   ├── environments/
│   │   │   ├── environment.ts
│   │   │   └── environment.prod.ts
│   │   ├── main.ts
│   │   ├── polyfills.ts
│   │   └── styles.scss
│   ├── angular.json
│   ├── package.json
│   ├── tsconfig.app.json
│   └── tsconfig.json
└── backend-springboot/
    ├── src/
    │   ├── main/
    │   │   ├── java/
    │   │   │   └── com/example/minicms/
    │   │   │       ├── MiniCmsApplication.java
    │   │   │       ├── config/
    │   │   │       │   └── WebSocketConfig.java
    │   │   │       ├── controller/
    │   │   │       │   ├── UserController.java
    │   │   │       │   └── PermissionController.java
    │   │   │       ├── dto/
    │   │   │       │   ├── UserDTO.java
    │   │   │       │   ├── PermissionDTO.java
    │   │   │       │   └── UserPermissionDTO.java # For assigning/unassigning
    │   │   │       ├── model/
    │   │   │       │   ├── User.java
    │   │   │       │   └── Permission.java
    │   │   │       ├── repository/
    │   │   │       │   ├── UserRepository.java   # Interface (e.g., extends JpaRepository or custom in-memory)
    │   │   │       │   └── PermissionRepository.java # Interface
    │   │   │       ├── service/
    │   │   │       │   ├── UserService.java
    │   │   │       │   └── PermissionService.java
    │   │   │       └── websocket/
    │   │   │           └── UserUpdateHandler.java  # WebSocket handler for user updates
    │   │   └── resources/
    │   │       ├── application.properties
    │   │       └── static/ # Optional for serving static files if needed
    │   └── test/
    │       └── java/
    │           └── com/example/minicms/
    │               └── ... # Test classes
    ├── pom.xml
    └── .mvn/
```

## 4. Component Responsibilities

### 4.1 Front-end (Angular)

- **`core/services/`**:
    - `user.service.ts`: Handles HTTP requests to the backend for user CRUD operations.
    - `permission.service.ts`: Handles HTTP requests for permission CRUD and user-permission association.
    - `websocket.service.ts`: Manages WebSocket connection and message handling for real-time updates.
    - `notification.service.ts`: Provides UI feedback (e.g., toasts/snackbars) for operations.
- **`features/user-management/`**:
    - `user-list.component.ts`: Displays the list of users, receives real-time updates.
    - `user-form.component.ts`: Form for creating/updating users.
- **`features/permission-management/`**:
    - `permission-list.component.ts`: Displays the list of available permissions.
    - `permission-form.component.ts`: Form for creating/updating permissions.
- **`features/dashboard/`**:
    - `admin-panel.component.ts`: Contains UI elements that are conditionally visible based on the active user's permissions (e.g., "Admin Actions" button).
- **`shared/models/`**: TypeScript interfaces for `User` and `Permission` data structures.
- **`shared/material.module.ts`**: Consolidates all Angular Material component imports.
- **`app.component.ts`**: Main application component, may include navigation and layout structure.
- **State Management**: Primarily managed within Angular components. For more complex state, RxJS BehaviorSubjects in services can be used to share state across components (e.g., current user list, active user for permission checks). WebSocket service will update relevant BehaviorSubjects upon receiving messages.

### 4.2 Back-end (Spring Boot)

- **`config/WebSocketConfig.java`**: Configuration for setting up WebSocket endpoints and message brokers.
- **`controller/`**:
    - `UserController.java`: RESTful API endpoints for user CRUD operations (`/api/users`).
    - `PermissionController.java`: RESTful API endpoints for permission CRUD and user-permission association (`/api/permissions`, `/api/users/{userId}/permissions`).
- **`dto/`**: Data Transfer Objects used for request/response payloads to decouple API from domain models.
- **`model/`**: JPA Entities (if using a database) or simple POJOs for `User` and `Permission`. Includes relationships (e.g., ManyToMany between User and Permission).
- **`repository/`**: Data Access Layer interfaces (e.g., extending `JpaRepository` or custom implementations for in-memory data).
    - `UserRepository.java`: Handles data operations for Users.
    - `PermissionRepository.java`: Handles data operations for Permissions.
- **`service/`**:
    - `UserService.java`: Business logic for user management (validation, interaction with repository, notifying WebSocket handler).
    - `PermissionService.java`: Business logic for permission management.
- **`websocket/UserUpdateHandler.java`**: Spring WebSocket handler (`SimpMessagingTemplate` or custom `WebSocketHandler`) to broadcast messages to connected clients when user data changes.
- **State Management**: The primary state (users, permissions, associations) resides in the chosen persistence layer (in-memory data structures or database). Services manage and manipulate this state.

## 5. Service Connection and Data Flow

1.  **User Interaction (FE):** User performs an action (e.g., clicks "Add User") in an Angular component.
2.  **Component to Service (FE):** The Angular component calls a method in its corresponding service (e.g., `userService.createUser(userData)`).
3.  **HTTP Request (FE to BE):** The Angular service makes an HTTP request (e.g., POST to `/api/users`) to the Spring Boot backend.
4.  **Controller (BE):** The Spring Boot `UserController` receives the request, validates input (using DTOs).
5.  **Service Logic (BE):** The controller calls the `UserService` to perform the business logic (e.g., create a new user entity, save it).
6.  **Repository (BE):** The `UserService` interacts with the `UserRepository` to persist the data (in-memory or database).
7.  **WebSocket Notification (BE):** After successful creation/update/deletion, the `UserService` (or a dedicated event listener) triggers the `UserUpdateHandler`.
8.  **Broadcast (BE to FE via WebSocket):** `UserUpdateHandler` broadcasts a message (e.g., `USER_CREATED`, new user list) to all connected WebSocket clients.
9.  **HTTP Response (BE to FE):** The Spring Boot controller returns an HTTP response (e.g., 201 Created with the new user data) to the originating Angular service.
10. **Service Update (FE):** The Angular service receives the HTTP response. If maintaining a local cache of data (e.g., in a BehaviorSubject), it updates it.
11. **WebSocket Message Handling (FE):** The `websocket.service.ts` in Angular receives the broadcasted message.
12. **Component Update (FE):** The `websocket.service.ts` notifies relevant components (e.g., `UserListComponent` subscribes to updates) or updates shared state (BehaviorSubjects) that components are subscribed to. Components then re-render to reflect the changes.

### 5.1 Conditional UI Element Flow:

1.  **Simulate Active User (FE):** For simplicity, a user can be hardcoded or selected in the frontend to represent the "current active user."
2.  **Fetch User Permissions (FE):** When the application loads or the active user changes, the frontend fetches the permissions for this active user (e.g., via `userService.getUserPermissions(activeUserId)`).
3.  **Store Active User Permissions (FE):** The permissions are stored in a service (e.g., `AuthService` or `UserService` via a BehaviorSubject).
4.  **Conditional Rendering (FE):** Components like `AdminPanelComponent` subscribe to the active user's permissions. An `*ngIf` directive in the template checks if the required permission (e.g., `CAN_ACCESS_ADMIN_TOOLS`) is present in the active user's permission list to show/hide the UI element.

## 6. Choice of UI Library

**Angular Material** is chosen for its comprehensive set of well-tested UI components, adherence to Material Design principles (providing a modern look and feel), good documentation, and strong community support. It integrates seamlessly with Angular and helps in building accessible and responsive UIs efficiently.

## 7. Real-time Updates with WebSockets

-   **Backend:** Spring Boot's WebSocket support (e.g., using STOMP over WebSocket with a Simple Message Broker or integrating with a full-fledged message queue like RabbitMQ/Kafka for more complex scenarios, though a simple broker is sufficient for this MVP).
    -   Endpoint: e.g., `/ws`
    -   Topics: e.g., `/topic/users` for user list updates.
-   **Frontend:** A `WebSocketService` in Angular will use native WebSocket API or a library like `ngx-socket-io` (if STOMP is used on the backend, a STOMP client like `@stomp/rx-stomp` would be appropriate) to connect to the backend, subscribe to topics, and handle incoming messages.

This architecture provides a solid foundation for developing the Mini-CMS "User Hub" while adhering to the specified requirements and best practices.