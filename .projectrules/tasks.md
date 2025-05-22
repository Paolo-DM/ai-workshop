# Mini-CMS "User Hub" - MVP Step-by-Step Plan

This document outlines the granular tasks to build the MVP for the Mini-CMS "User Hub".

## Phase 0: Project Setup & Initial Configuration

**Goal:** Initialize both frontend and backend projects with basic configurations.

*   **Task 0.1: Initialize Angular Frontend Project**
    *   **Action:** Use Angular CLI (`ng new frontend-angular`) to create a new Angular project.
    *   **Verification:** Project structure is created, and `ng serve` runs successfully.
*   **Task 0.2: Initialize Spring Boot Backend Project**
    *   **Action:** Use Spring Initializr (start.spring.io or IDE equivalent) to create a new Spring Boot project with dependencies: Spring Web, Spring Boot DevTools, Lombok (optional).
    *   **Verification:** Project structure is created, and the basic Spring Boot application runs successfully.
*   **Task 0.3: Basic Folder Structures**
    *   **Action (FE):** Create initial folders within `frontend-angular/src/app/` for `core`, `features`, `shared` as per the architecture document.
    *   **Action (BE):** Create initial packages within `backend-springboot/src/main/java/com/example/minicms/` for `config`, `controller`, `dto`, `model`, `repository`, `service`, `websocket` as per the architecture document.
    *   **Verification:** Folder/package structures match the architecture diagram.
*   **Task 0.4: Configure CORS on Backend**
    *   **Action (BE):** Add a global CORS configuration in Spring Boot (e.g., using `@Configuration` class with `WebMvcConfigurer`) to allow requests from the Angular development server (typically `http://localhost:4200`).
    *   **Verification:** Frontend will be able to make requests to backend without CORS errors later.

## Phase 1: Backend - User Management Core (In-Memory)

**Goal:** Implement basic CRUD (Create, Read) for Users on the backend using in-memory storage.

*   **Task 1.1: BE - Create `User` Model (POJO)**
    *   **Action:** Create `User.java` in `com.example.minicms.model` with fields: `long id`, `String name`, `String email`. Include getters, setters, constructors (Lombok can be used).
    *   **Verification:** `User.java` compiles.
*   **Task 1.2: BE - Create `UserDTO`**
    *   **Action:** Create `UserDTO.java` in `com.example.minicms.dto` with fields matching `User` (or a subset for API responses/requests). Include getters, setters.
    *   **Verification:** `UserDTO.java` compiles.
*   **Task 1.3: BE - Create `UserRepository` (In-Memory)**
    *   **Action:** Create `UserRepository.java` interface in `com.example.minicms.repository`. Create an in-memory implementation class (e.g., `InMemoryUserRepository`) that implements this interface. It should use a `Map<Long, User>` or `List<User>` to store users and manage a simple ID counter.
    *   **Methods:** `findAll()`, `save(User user)`, `findById(long id)`.
    *   **Verification:** Implementation class methods can be unit-tested or tested via service layer.
*   **Task 1.4: BE - Create `UserService`**
    *   **Action:** Create `UserService.java` in `com.example.minicms.service`. Inject `UserRepository`. Implement `getAllUsers()` (returns `List<UserDTO>`) and `createUser(UserDTO userDTO)` (returns created `UserDTO`). The `createUser` method should handle ID generation (or delegate to repository) and save the user.
    *   **Verification:** `UserService` methods can be unit-tested.
*   **Task 1.5: BE - Create `UserController` for Listing Users**
    *   **Action:** Create `UserController.java` in `com.example.minicms.controller`. Inject `UserService`. Implement a GET endpoint `/api/users` that calls `userService.getAllUsers()` and returns the list.
    *   **Verification:** Start the backend. Use Postman or `curl` to hit `GET http://localhost:8080/api/users`. It should return an empty list or pre-populated data if any.
*   **Task 1.6: BE - Implement `createUser` Endpoint in `UserController`**
    *   **Action:** Add a POST endpoint `/api/users` to `UserController` that accepts a `UserDTO` in the request body, calls `userService.createUser()`, and returns the created user with HTTP status 201.
    *   **Verification:** Use Postman or `curl` to hit `POST http://localhost:8080/api/users` with a JSON payload (e.g., `{"name": "Test User", "email": "test@example.com"}`). Verify the response and that a subsequent GET call shows the new user.

## Phase 2: Frontend - User Listing & Creation

**Goal:** Display users from the backend and allow creation of new users via a form.

*   **Task 2.1: FE - Add Angular Material**
    *   **Action:** Run `ng add @angular/material` in the `frontend-angular` directory. Follow prompts to choose a theme and set up typography.
    *   **Action:** Create `src/app/shared/material.module.ts`. Import and export common Material modules (e.g., `MatTableModule`, `MatButtonModule`, `MatFormFieldModule`, `MatInputModule`, `MatCardModule`, `MatToolbarModule`, `MatSnackBarModule`). Import `MaterialModule` into `AppModule`.
    *   **Verification:** Angular Material components can be used in templates.
*   **Task 2.2: FE - Create `User` Model (Interface)**
    *   **Action:** Create `src/app/shared/models/user.model.ts` with an interface `User` matching the backend `UserDTO` (e.g., `id: number`, `name: string`, `email: string`).
    *   **Verification:** Interface is defined correctly.
*   **Task 2.3: FE - Create `core/services/user.service.ts`**
    *   **Action:** Generate `UserService` (`ng g s core/services/user`). Inject `HttpClient`. Implement `getUsers(): Observable<User[]>` to make a GET request to `/api/users`. Implement `createUser(user: Omit<User, 'id'>): Observable<User>` to make a POST request to `/api/users`.
    *   **Verification:** Service methods can be called; ensure backend URL is correct (use `environment.ts` for API base URL).
*   **Task 2.4: FE - Create `UserListComponent`**
    *   **Action:** Generate `UserListComponent` (`ng g c features/user-management/components/user-list`). Inject `UserService`. In `ngOnInit`, call `userService.getUsers()` and store the result in a public property. Use `*ngFor` with an Angular Material Table (`<mat-table>`) in the template to display user ID, Name, and Email.
    *   **Verification:** Component displays users fetched from the backend (initially empty or with users created via Postman).
*   **Task 2.5: FE - Integrate `UserListComponent` & Basic Routing**
    *   **Action:** Create `UserManagementModule` (`ng g m features/user-management`). Declare and export `UserListComponent`. Import `UserManagementModule` into `AppModule`.
    *   **Action:** Set up basic routing in `app-routing.module.ts` to show `UserListComponent` at a path like `/users`.
    *   **Action:** Add a simple navigation bar in `app.component.html` (e.g., using `mat-toolbar`) with a link to `/users`.
    *   **Verification:** Navigating to `/users` displays the `UserListComponent`.
*   **Task 2.6: FE - Create `UserFormComponent`**
    *   **Action:** Generate `UserFormComponent` (`ng g c features/user-management/components/user-form`). Add it to `UserManagementModule`.
    *   **Action:** Create a reactive form (or template-driven) with input fields for Name and Email (using `mat-form-field` and `mat-input`). Add a "Create User" button (`mat-button`).
    *   **Action:** Inject `UserService`. On form submission, call `userService.createUser()` with form data. After successful creation, ideally, trigger a refresh of the user list (for now, manual navigation or a simple alert is fine).
    *   **Verification:** Add `UserFormComponent` to the `UserListComponent`'s template or a separate route. Creating a user via the form should make a POST request to the backend. Verify in backend logs or by refreshing the user list.
*   **Task 2.7: FE - Basic Form Validation in `UserFormComponent`**
    *   **Action:** Add `Validators.required` to Name and Email fields. Display basic error messages if fields are empty upon submission attempt.
    *   **Verification:** Form submission is blocked, and errors are shown if fields are invalid.

## Phase 3: Backend - Permission Management Core (In-Memory)

**Goal:** Implement basic CRUD (Create, Read) for Permissions on the backend.

*   **Task 3.1: BE - Create `Permission` Model (POJO)**
    *   **Action:** Create `Permission.java` in `com.example.minicms.model` with fields: `long id`, `String name` (e.g., "CAN_VIEW_REPORTS").
    *   **Verification:** `Permission.java` compiles.
*   **Task 3.2: BE - Create `PermissionDTO`**
    *   **Action:** Create `PermissionDTO.java` in `com.example.minicms.dto`.
    *   **Verification:** `PermissionDTO.java` compiles.
*   **Task 3.3: BE - Create `PermissionRepository` (In-Memory)**
    *   **Action:** Create `PermissionRepository.java` interface and an in-memory implementation (similar to `UserRepository`).
    *   **Methods:** `findAll()`, `save(Permission permission)`, `findByName(String name)` (useful for uniqueness).
    *   **Verification:** Repository methods are functional.
*   **Task 3.4: BE - Create `PermissionService`**
    *   **Action:** Create `PermissionService.java`. Inject `PermissionRepository`. Implement `getAllPermissions()` and `createPermission(PermissionDTO permissionDTO)`. Ensure permission names are unique before saving.
    *   **Verification:** Service methods are functional, uniqueness check works.
*   **Task 3.5: BE - Create `PermissionController`**
    *   **Action:** Create `PermissionController.java`. Inject `PermissionService`. Implement GET `/api/permissions` and POST `/api/permissions` endpoints.
    *   **Verification:** Test endpoints via Postman. Create a few sample permissions (e.g., `CAN_EDIT_USERS`, `CAN_VIEW_DASHBOARD`).

## Phase 4: Frontend - Permission Listing & Creation

**Goal:** Display permissions and allow creation of new permissions.

*   **Task 4.1: FE - Create `Permission` Model (Interface)**
    *   **Action:** Create `src/app/shared/models/permission.model.ts` with an interface `Permission` (e.g., `id: number`, `name: string`).
    *   **Verification:** Interface is defined.
*   **Task 4.2: FE - Create `core/services/permission.service.ts`**
    *   **Action:** Generate `PermissionService`. Implement `getPermissions()` and `createPermission(permission: Omit<Permission, 'id'>)`. 
    *   **Verification:** Service methods call backend endpoints.
*   **Task 4.3: FE - Create `PermissionListComponent` and `PermissionFormComponent`**
    *   **Action:** Generate components `PermissionListComponent` and `PermissionFormComponent` within a new `PermissionManagementModule` (similar to User management).
    *   **Action:** `PermissionListComponent` fetches and displays permissions in a table.
    *   **Action:** `PermissionFormComponent` provides a form to create a new permission (Name input).
    *   **Action:** Add routing for these components (e.g., `/permissions`). Update `app.component.html` navigation.
    *   **Verification:** Permissions can be listed and created from the UI.

## Phase 5: Backend - User-Permission Association

**Goal:** Allow associating permissions with users (Many-to-Many).

*   **Task 5.1: BE - Update `User` Model for Associations**
    *   **Action:** Modify `User.java` to include `private Set<Permission> permissions = new HashSet<>();`. Add helper methods `addPermission(Permission p)` and `removePermission(Permission p)`.
    *   **Verification:** `User.java` compiles. `Permission` objects need to have `equals()` and `hashCode()` implemented correctly if stored in a `Set` (based on `id` or `name`).
*   **Task 5.2: BE - Update `UserDTO` for Associations**
    *   **Action:** Modify `UserDTO.java` to include `private Set<String> permissionNames;` or `private Set<PermissionDTO> permissions;` to represent associated permissions.
    *   **Verification:** `UserDTO.java` compiles.
*   **Task 5.3: BE - Create `UserPermissionAssignmentDTO`**
    *   **Action:** Create `UserPermissionAssignmentDTO.java` in `dto` with fields `long userId`, `long permissionId` (or `String permissionName`).
    *   **Verification:** DTO compiles.
*   **Task 5.4: BE - Implement Association Logic in `UserService`**
    *   **Action:** Add methods to `UserService`:
        *   `assignPermissionToUser(long userId, long permissionId)`: Fetches User and Permission, adds permission to user's set, saves user.
        *   `removePermissionFromUser(long userId, long permissionId)`: Similar logic for removal.
        *   `getUserPermissions(long userId)`: Returns permissions for a user.
    *   Handle cases where user or permission is not found.
    *   **Verification:** Unit test these service methods.
*   **Task 5.5: BE - Add Association Endpoints in `UserController`**
    *   **Action:** In `UserController.java`:
        *   `POST /api/users/{userId}/permissions` (accepts `UserPermissionAssignmentDTO` or just `permissionId` in body/path and `userId` from path) to assign.
        *   `DELETE /api/users/{userId}/permissions/{permissionId}` to unassign.
        *   `GET /api/users/{userId}/permissions` to view a user's permissions.
        *   Modify `GET /api/users` and `GET /api/users/{id}` to include user's permissions in the response (via `UserDTO`).
    *   **Verification:** Test these new endpoints thoroughly with Postman.

## Phase 6: Frontend - User-Permission Association UI

**Goal:** Provide UI to manage user-permission associations.

*   **Task 6.1: FE - Update `User` Model for Associations**
    *   **Action:** Modify `user.model.ts` to include `permissionNames?: string[];` or `permissions?: Permission[];`.
    *   **Verification:** Interface updated.
*   **Task 6.2: FE - Display User Permissions in `UserListComponent`**
    *   **Action:** Modify `UserListComponent` template to display a list/comma-separated string of permission names for each user. Update `UserService` `getUsers()` to fetch this data if backend API changed.
    *   **Verification:** User table shows assigned permissions.
*   **Task 6.3: FE - Create `UserDetailComponent` (Optional but Recommended)**
    *   **Action:** Generate `UserDetailComponent`. This component will show details for a single user and allow managing their permissions.
    *   **Action:** Route: `/users/:id`. Link from `UserListComponent` rows to this detail view.
    *   **Action:** In `UserDetailComponent`, fetch the specific user's data including their current permissions. Fetch all available permissions (from `PermissionService`).
    *   **Verification:** Navigating to a user's detail view shows their info.
*   **Task 6.4: FE - Implement UI for Assigning/Unassigning Permissions**
    *   **Action:** In `UserDetailComponent` (or directly in `UserListComponent` if simpler for MVP):
        *   Display available permissions (e.g., using `mat-select` with `multiple` option, or a list of `mat-checkbox`).
        *   Pre-select/check permissions already assigned to the user.
        *   Provide "Save Permissions" button.
    *   **Action:** Update `UserService` with methods like `assignPermission(userId, permissionId)` and `unassignPermission(userId, permissionId)`.
    *   **Action:** On "Save", determine which permissions were added/removed and call the respective service methods.
    *   **Verification:** UI allows selecting/deselecting permissions. Changes are reflected on the backend and subsequently in the user list/detail view upon refresh.

## Phase 7: Backend - WebSocket for Real-time User List Updates

**Goal:** Implement WebSocket to notify clients of user changes.

*   **Task 7.1: BE - Add WebSocket Dependency**
    *   **Action:** Add `spring-boot-starter-websocket` to `pom.xml`.
    *   **Verification:** Dependency is downloaded.
*   **Task 7.2: BE - Create `WebSocketConfig.java`**
    *   **Action:** Create `WebSocketConfig.java` in `com.example.minicms.config`. Annotate with `@Configuration` and `@EnableWebSocketMessageBroker`. Configure a STOMP endpoint (e.g., `/ws-minicms`) and a simple message broker for a topic like `/topic/users`.
    *   Enable CORS for WebSocket: `setAllowedOriginPatterns("*")` for development.
    *   **Verification:** Backend starts without WebSocket configuration errors.
*   **Task 7.3: BE - Create `UserUpdateNotifierService` (or similar)**
    *   **Action:** Create a service (e.g., `UserUpdateNotifierService`) or add methods to `UserService`. Inject `SimpMessagingTemplate`.
    *   **Action:** Create a method `notifyUserChange()` that sends a message (e.g., a simple string like "USERS_UPDATED" or the updated list of users) to `/topic/users` using `simpMessagingTemplate.convertAndSend()`.
    *   **Verification:** Service can be injected and method called.
*   **Task 7.4: BE - Integrate WebSocket Notification in `UserService`**
    *   **Action:** In `UserService`, after a user is successfully created, updated (if implemented), or deleted (if implemented), call `userUpdateNotifierService.notifyUserChange()`.
    *   **Verification:** Test with a WebSocket client (e.g., Postman's WebSocket tool, or a simple online STOMP client). Connect to `/ws-minicms` and subscribe to `/topic/users`. Creating a user via API should trigger a message.

## Phase 8: Frontend - WebSocket Integration for Real-time User List

**Goal:** Update the user list in real-time when changes occur on the backend.

*   **Task 8.1: FE - Add STOMP Client Library**
    *   **Action:** Install `@stomp/rx-stomp` and its peer dependency `webstomp-client` (or just `sockjs-client` and `stompjs` if not using RxStomp, but RxStomp is recommended for Angular).
        `npm install @stomp/rx-stomp webstomp-client`
    *   **Verification:** Libraries are installed.
*   **Task 8.2: FE - Create `core/services/websocket.service.ts`**
    *   **Action:** Generate `WebSocketService`. Use `RxStomp` to configure and manage the WebSocket connection to the backend endpoint (`ws://localhost:8080/ws-minicms`).
    *   **Action:** Implement a method to subscribe to `/topic/users`. This subscription should return an `Observable` that emits data when messages arrive.
    *   **Verification:** Service can connect, and console logs show messages when backend sends them.
*   **Task 8.3: FE - Integrate WebSocket Updates in `UserListComponent`**
    *   **Action:** In `UserListComponent` (or `UserService` if centralizing data fetching):
        *   Inject `WebSocketService`.
        *   Subscribe to the `/topic/users` observable from `WebSocketService`.
        *   When a message is received (e.g., "USERS_UPDATED"), re-fetch the user list by calling `userService.getUsers()` or update the local list if the message contains the new data.
    *   **Verification:** Open two browser windows showing the user list. Create/update a user in one window (or via Postman). The user list in the other window should update automatically without a manual refresh.

## Phase 9: Frontend - Conditional UI Element Based on Permissions

**Goal:** Show/hide a UI element based on the "active" user's permissions.

*   **Task 9.1: FE - Simulate "Active User" Concept**
    *   **Action:** Create an `AuthService` (`ng g s core/services/auth`).
    *   **Action:** In `AuthService`, implement a way to set an "active user". For MVP, this can be a BehaviorSubject `activeUserId$: BehaviorSubject<number | null>` initialized to null. Add a method `setActiveUser(userId: number)`. This could be called from a simple dropdown in `AppComponent` that lists all users.
    *   **Action:** `AuthService` should also store the active user's permissions: `activeUserPermissions$: BehaviorSubject<string[]>`. When `activeUserId$` changes, fetch that user's permissions (from `UserService.getUserPermissions(userId)`) and update `activeUserPermissions$`. Ensure `UserService` has a `getUserPermissions(userId: number): Observable<string[]>` method.
    *   **Verification:** Selecting a user in the dropdown updates `activeUserId$` and subsequently `activeUserPermissions$` in `AuthService`.
*   **Task 9.2: FE - Define and Assign a Specific Permission**
    *   **Action:** Ensure a permission like `CAN_ACCESS_ADMIN_TOOLS` can be created via the Permission Management UI.
    *   **Action:** Assign this permission to at least one test user.
    *   **Verification:** Permission exists and is assigned.
*   **Task 9.3: FE - Create `AdminPanelComponent` (or similar)**
    *   **Action:** Generate a simple component (e.g., `AdminPanelComponent` in `features/dashboard/`).
    *   **Action:** In its template, add an element like `<button mat-raised-button color="warn">Admin Actions</button>`.
    *   **Verification:** Component renders.
*   **Task 9.4: FE - Implement Conditional Rendering in `AdminPanelComponent`**
    *   **Action:** Inject `AuthService` into `AdminPanelComponent`.
    *   **Action:** In the template, use `*ngIf="(authService.activeUserPermissions$ | async)?.includes('CAN_ACCESS_ADMIN_TOOLS')"` to wrap the admin button.
    *   **Verification:** Display the `AdminPanelComponent` (e.g., in `AppComponent`).
        *   Select an active user *without* `CAN_ACCESS_ADMIN_TOOLS` -> Button is hidden.
        *   Select an active user *with* `CAN_ACCESS_ADMIN_TOOLS` -> Button is visible.

## Phase 10: Refinement & Testing

**Goal:** Polish the application and perform final checks.

*   **Task 10.1: FE - Basic Error Handling & Notifications**
    *   **Action:** Inject `MatSnackBar` from Angular Material into services or components.
    *   **Action:** For HTTP calls in services (User, Permission), add error handling (`catchError` in RxJS pipes) to display user-friendly error messages using `MatSnackBar` (e.g., "Failed to load users").
    *   **Verification:** Simulate network errors or backend errors; UI should show a snackbar message.
*   **Task 10.2: FE - Dashboard for Users Without Permissions (RF 3.3.2)**
    *   **Action:** Create a simple section/component that lists users whose `permissionNames` array is empty. This can be part of `UserListComponent` or a new dashboard view.
    *   **Verification:** Users with no assigned permissions are listed in this section.
*   **Task 10.3: BE & FE - Basic Unit Tests**
    *   **Action (BE):** Write a few JUnit tests for critical methods in `UserService` and `PermissionService` (e.g., user creation logic, permission assignment).
    *   **Action (FE):** Write a few Karma/Jasmine tests for `UserService` methods (mock `HttpClient`) and basic component rendering in `UserListComponent`.
    *   **Verification:** Tests pass.
*   **Task 10.4: Code Review & Refactor**
    *   **Action:** Review code for adherence to SOLID, DRY, KISS. Refactor small parts if obvious improvements can be made quickly.
    *   **Verification:** Code quality is improved.
*   **Task 10.5: Final Manual MVP Testing**
    *   **Action:** Test all mandatory requirements from `mini-cms-specifics.md`:
        *   RF 3.1.1 List Users
        *   RF 3.1.2 Create User
        *   RF 3.2.1 List Permissions
        *   RF 3.2.2 Create Permission
        *   RF 3.3.1 Assign/Unassign Permission
        *   RF 3.3.2 View User Permissions (and dashboard for users without permissions)
        *   RF 3.4.1 Conditional UI Element
        *   RF 3.5.1 Live User List Update (WebSockets)
    *   **Verification:** All mandatory MVP features work as expected.
