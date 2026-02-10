# Witcher Board — React + Vite (Exam Project)

This project was built for an evaluation. The goal is to implement the requested features **only** (no extra features) while respecting:
- the **given subject requirements**
- the **React competency grid**
- the **imposed project architecture** (no renaming of existing folders/files, separation of responsibilities)

---

## 1) What the app does

The application manages **Witcher contracts**:

- List contracts with minimal styling and status-based visuals
- Filter contracts (title + status)
- View contract details (including assigned witcher when relevant)
- Create a new contract (title/description/reward only)
- Edit an existing contract (title/description/reward only)
- “Login” as a witcher (not real auth): select an existing witcher and keep it during navigation (tab lifetime)
- From contract details:
  - assign an available contract to the current witcher
  - complete an assigned contract if it belongs to the current witcher

---

## 2) Tech stack

- React (with Vite)
- React Router DOM
- Fetch API for HTTP calls
- CSS Modules (no Bootstrap/Tailwind, per exam rules)
- sessionStorage for tab-lifetime “authentication”

---

## 3) How to run the project

### Prerequisites
- Node.js installed
- The API server running at: `http://localhost:3000/api`

### Install & start
npm install
npm run dev

---


Environment

In .env:

VITE_API_URL=http://localhost:3000/api


4) Routes
Route	Page	Purpose
/	Home	Entry page with navigation
/contracts	ContractsContainer → Contracts	List + filters + navigation
/contracts/details/:id	DetailsContractContainer → DetailsContract	Contract details + actions
/contracts/create	CreateContractContainer → CreateContract	Create contract (POST)
/contracts/edit/:id	EditContractContainer → EditContract	Edit contract (GET prefill + PUT)
/login	LoginWitcherContainer → LoginWitcher	Select a witcher (GET /witchers)
5) Architecture & separation of responsibilities

The project follows a Container / UI pattern to keep responsibilities clean:

Containers (logic + state + side effects)

Fetch data with useEffect

Hold state with useState

Handle API calls (GET/POST/PUT)

Handle navigation (useNavigate)

Pass data + handlers to UI components via props

Examples:

ContractsContainer

DetailsContractContainer

CreateContractContainer

EditContractContainer

LoginWitcherContainer

UI Components (render only)

Receive props

Render HTML/JSX

Bind DOM events to provided handlers

Apply CSS Modules

Examples:

Contracts

DetailsContract

CreateContract

EditContract

LoginWitcher

✅ This mapping is aligned with competency expectations: state management, unidirectional data flow, componentization, clean separation of concerns.

6) API layer (src/lib/api.ts)

All HTTP calls are centralized in api.ts to:

avoid duplication

keep components focused on UI/logic

make endpoints easier to maintain

Contracts endpoints used:

GET /contracts

GET /contracts/:id

POST /contracts

PUT /contracts/:id

PUT /contracts/:id/assignedTo
⚠ Swagger expects the payload to be only the witcher id in the request body.

PUT /contracts/:id/status
⚠ Swagger expects the payload to be only the status string (e.g. "Completed").

Witchers endpoints used:

GET /witchers

GET /witchers/:id

7) “Authentication” as a witcher (Exam Step 7)
Requirement

The subject requires that the chosen witcher identity is kept:

during navigation

until the browser tab is closed

Implementation choice

✅ sessionStorage is used because it matches the requirement exactly.

Storage helper

A small helper was created to centralize storage access:

src/lib/authWitcher.ts

setCurrentWitcher({ id, name })

getCurrentWitcher()

clearCurrentWitcher() (optional utility)

This avoids repeating sessionStorage logic everywhere and keeps code readable.

8) UI “Current Witcher” display (Exam Step 7.2)

The current witcher name must be visible on every page.

Solution:

A reusable UI component is displayed at the top of each page:

Shows current witcher name if selected

Otherwise shows “No witcher selected”

Provides a link to the login page

This respects unidirectional flow and avoids global frameworks (Redux, etc.) which are not required for the exam.

9) Contract details actions (Exam Step 7.3)

On the contract details page:

Assign button

Shown only if:

contract status is "Available"

and a witcher is selected

Action:

PUT /contracts/:id/assignedTo

payload: witcherId only

Complete button

Shown only if:

contract status is "Assigned"

and the assignedTo witcher matches the current witcher

Action:

PUT /contracts/:id/status

payload: "Completed" only

After success:

the contract is refetched to refresh UI state