# Self-Assessment  

- **Member name:** Thanh Nguyen  
- **Contribution area:** 
  - Frontend: integrated the frontend with backend APIs for
    - ConTactFormMap, ServiceSection, Login, Register
    - User Dashboard: 
        - UserProfile
        - Appointments 
        - Prescriptions
    - Doctor Dashboard:
        - DoctorProfile
        - AppointmentList
    - Admin Dashboard:
        - FQAs
In this sprint, I focused on connecting frontend components and pages with backend APIs for the following parts: ContactFormMap, ServiceSection, AppointmentCard, Login, Register, User Dashboard (UserProfile, Appointments, Prescriptions), and Doctor Dashboard (DoctorProfile, AppointmentList). I implemented data fetching from the API, as well as create/update/delete operations related to user profiles, appointments, and prescriptions. I also added client-side validation, basic error handling, loading/error states in the UI, and addressed special cases such as empty lists and server validation errors. In addition, I built a small API client layer and reusable hooks for requests, which helped make the code cleaner and easier to maintain.

---

### 1. Functionality
- **Does the code meet the requirements?**
  - [x] Implements all assigned features across Auth (Login/Register), User Dashboard (UserProfile, Appointments, Prescriptions), and Doctor Dashboard (DoctorProfile, AppointmentList).  
  - [x] Handles edge cases such as empty lists, invalid input, duplicate submissions, and server validation errors. 
  - [ ] Minor race conditions remain when rescheduling appointments simultaneously in multiple tabs.
    - Duplicate booking not checked 
    - Conflict detection not implemented
    - Overlapping appointments not validated  

- **Integration**
  - [x] Works correctly with other parts of the application.  
    - Integrated with backend authentication tokens and role-based access checks for both user and doctor routes; components consume shared global state where needed (auth, notifications).  
  - [x] Inputs and outputs managed appropriately.  
    - API responses normalized through a small client wrapper so components receive consistent data shapes; error messages forwarded to a centralized notification component for unified handling.  
---

### 2. Code Quality
- **Readability**
  - [x] Is your code easy to understand for other developers?  
    - Code is organized into components and hooks such as `LoginForm.jsx`, `RegistrationForm.jsx`, `UserProfile.jsx`, and `Appointments.jsx`.  
    - Each component follows a clear structure: form inputs, validation logic, API calls, and UI rendering are separated logically.  
    - Custom hooks (`useField`, `useLogin`, `useSignup`) encapsulate state and API logic, making the components cleaner and easier to follow.  
    - Meaningful names are used for state variables (`showPassword`, `editing`, `appointments`, `selectedAppt`) and functions (`handleLogin`, `handleRegister`, `updateProfile`, `confirmCancel`).  

  - [x] Are variable and function names descriptive and meaningful?  
    - Yes — API calls are clearly defined in hooks like `useLogin("/api/users/login")` and `useSignup("/api/users/signup")`.  
    - Functions such as `handleRescheduleSave`, `updatePassword`, and `loadAppointments` directly describe their purpose.  
    - State variables (`errors`, `message`, `isLoading`) are named to reflect their role in the component.  
    - Components (`UserProfileForm`, `AppointmentCard`) are named according to their functionality, making the codebase intuitive for other developers.  


- **Reusability**
  - [x] Can your code or parts of it be reused elsewhere in the application?  
    - Created reusable form components, table/list components, and api hooks that are used across user pages.
  - [x] Is logic modular and separated from unrelated concerns?  
    - Yes — network logic lives in api services; UI logic in components; shared utilities (formatters, validators) are in a utils folder.

- **Comments and Documentation**
  - [x] Are there comments explaining complex logic?  
    - Added comments for tricky areas like appointment timezone handling and optimistic update flows.
  - [ ] Is there documentation for how to use your code unit?  
    - Basic README notes are present for the api client and hooks, but more examples and usage docs would help onboard others faster.

---

### 3. Performance
- **Efficiency**
  - [x] Are there any unnecessary operations or performance bottlenecks?  
    - Avoided unnecessary full-page reloads by using client-side updates and optimistic UI for create/update where appropriate.
  - [ ] Is the code optimized for larger datasets or high traffic (if applicable)?  
    - Implemented server-side pagination and client-side pagination controls for lists, but caching and advanced list virtualization (for extremely large lists) are not yet implemented.

Notable optimizations already applied:
- Debounced search inputs in list views to reduce API calls.
- Lazy-loaded article images and admin table rows where feasible.
- Used React.memo in a few heavy list child components to reduce re-renders.

---

### 4. Overall Assessment
- **Strengths**
  - Full API integration for Auth, User Dashboard, and Doctor Dashboard.  
  - Clear separation between API services and UI components.  
  - Reusable hooks and components reduced duplication.  
  - Good UX: loading states, error handling, confirmation dialogs, password toggle, remember-me option.  

- **Areas for Improvement**
  - Add automated tests (unit + E2E).  
  - Introduce caching (React Query/SWR).  
  - Improve accessibility (aria labels, keyboard navigation).  
  - Harden concurrency handling to avoid double-booking.  
  - Expand developer documentation.  

- **Action Plan**  
  1. Add unit tests for api service functions and core hooks.
  2. Integrate a caching/data-fetching library (SWR or React Query) for lists/detail pages to reduce requests and add background revalidation.
  3. Add E2E test coverage for Appointment flow and a critical Admin CRUD flow using Playwright or Cypress.
  4. Perform an accessibility audit and fix identified issues (aria, focus management, color contrast).
  5. Address the reschedule race condition by adding server-side conflict detection UI and client-side retry/backoff handling.
  6. Update backend to send email for ContactForm.

---

### 5. Additional Notes
- Collaboration: I coordinated with backend to confirm endpoints and request/response shapes; when backend changes occurred I updated the api client accordingly.
- Blockers encountered: occasional backend schema changes required small follow-up updates; where the backend lacked a specific endpoint (e.g., batch user updates) I mocked behavior or added graceful fallbacks.
- Lessons learned: separating API client and reusable hooks significantly reduced duplication and made updates easier when backend changed.