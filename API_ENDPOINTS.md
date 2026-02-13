# Hospital Finder - API Endpoints Documentation

## Base URL
```
http://localhost:3000/api
```

---

## 1. Authentication Routes (`/api/auth`)

### 1.1 Login User
**Endpoint:** `POST /api/auth/login`  
**Authentication:** ❌ No JWT Required  
**Authorization:** None

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "USER"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Invalid credentials"
}
```

---

## 2. User Routes (`/api/user`)

### 2.1 Register User
**Endpoint:** `POST /api/user/register`  
**Authentication:** ❌ No JWT Required  
**Authorization:** None

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Email already exists"
}
```

---

## 3. Super Admin Routes (`/api/superadmin`)

### 3.1 Create Hospital Admin
**Endpoint:** `POST /api/superadmin/create-hospital-admin`  
**Authentication:** ✅ JWT Required  
**Authorization:** SUPER_ADMIN only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Admin Name",
  "email": "admin@hospital.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Hospital admin created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Admin Name",
    "email": "admin@hospital.com",
    "role": "HOSPITAL_ADMIN"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

### 3.2 Create Doctor
**Endpoint:** `POST /api/superadmin/create-doctor`  
**Authentication:** ✅ JWT Required  
**Authorization:** SUPER_ADMIN only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Dr. Smith",
  "email": "smith@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Doctor account created successfully. Doctor must complete profile.",
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "name": "Dr. Smith",
    "email": "smith@example.com",
    "role": "DOCTOR"
  }
}
```

---

### 3.3 Create Blood Bank Admin
**Endpoint:** `POST /api/superadmin/create-bloodbank-admin`  
**Authentication:** ✅ JWT Required  
**Authorization:** SUPER_ADMIN only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Blood Bank Admin",
  "email": "admin@bloodbank.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Blood bank admin created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439014",
    "name": "Blood Bank Admin",
    "email": "admin@bloodbank.com",
    "role": "BLOOD_BANK_ADMIN"
  }
}
```

---

## 4. Hospital Routes (`/api/hospital`)

### 4.1 Create Hospital
**Endpoint:** `POST /api/hospital/`  
**Authentication:** ✅ JWT Required  
**Authorization:** HOSPITAL_ADMIN only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "City Hospital",
  "address": "123 Main Street, City",
  "type": "PRIVATE",
  "lat": 40.7128,
  "lng": -74.0060,
  "specializations": ["507f1f77bcf86cd799439015", "507f1f77bcf86cd799439016"]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Hospital created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439017",
    "name": "City Hospital",
    "address": "123 Main Street, City",
    "type": "PRIVATE",
    "location": {
      "type": "Point",
      "coordinates": [-74.0060, 40.7128]
    },
    "specializations": ["507f1f77bcf86cd799439015", "507f1f77bcf86cd799439016"],
    "adminUserId": "507f1f77bcf86cd799439018",
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
}
```

---

### 4.2 Get Hospitals by Disease
**Endpoint:** `GET /api/hospital/filter?diseaseId=<id>`  
**Authentication:** ❌ No JWT Required  
**Authorization:** None

**Request Params:**
```
diseaseId: "507f1f77bcf86cd799439015" (optional query parameter)
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439017",
      "name": "City Hospital",
      "address": "123 Main Street, City",
      "type": "PRIVATE",
      "location": {
        "type": "Point",
        "coordinates": [-74.0060, 40.7128]
      },
      "specializations": [
        {
          "_id": "507f1f77bcf86cd799439015",
          "name": "Cardiology"
        }
      ],
      "adminUserId": "507f1f77bcf86cd799439018"
    }
  ]
}
```

---

## 5. Hospital Admin Routes (`/api/hospitaladmin`)

### 5.1 Add Doctor to Hospital
**Endpoint:** `POST /api/hospitaladmin/add-doctor`  
**Authentication:** ✅ JWT Required  
**Authorization:** HOSPITAL_ADMIN only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "doctorId": "507f1f77bcf86cd799439019",
  "hospitalId": "507f1f77bcf86cd799439017",
  "department": "Cardiology",
  "consultationHours": "09:00 - 17:00"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Doctor successfully added to hospital",
  "data": {
    "_id": "507f1f77bcf86cd79943901a",
    "doctorId": "507f1f77bcf86cd799439019",
    "hospitalId": "507f1f77bcf86cd799439017",
    "department": "Cardiology",
    "consultationHours": "09:00 - 17:00",
    "isActive": true,
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Hospital not found"
}
```

---

## 6. Doctor Routes (`/api/doctor`)

### 6.1 Create/Update Doctor Profile
**Endpoint:** `PUT /api/doctor/profile`  
**Authentication:** ✅ JWT Required  
**Authorization:** DOCTOR only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "specialization": "Cardiology",
  "experience": 10,
  "licenseNumber": "LIC123456"
}
```

**Response (200 OK):**
```json
{
  "message": "Doctor profile updated",
  "doctor": {
    "_id": "507f1f77bcf86cd79943901b",
    "userId": "507f1f77bcf86cd799439013",
    "specialization": "Cardiology",
    "experience": 10,
    "licenseNumber": "LIC123456"
  }
}
```

---

## 7. Appointment Routes (`/api/appointments`)

### 7.1 Request Appointment
**Endpoint:** `POST /api/appointments/`  
**Authentication:** ✅ JWT Required  
**Authorization:** USER only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "doctorId": "507f1f77bcf86cd799439019",
  "hospitalId": "507f1f77bcf86cd799439017",
  "reason": "Heart checkup"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Appointment request submitted",
  "data": {
    "_id": "507f1f77bcf86cd79943901c",
    "patientId": "507f1f77bcf86cd799439011",
    "doctorId": "507f1f77bcf86cd799439019",
    "hospitalId": "507f1f77bcf86cd799439017",
    "reason": "Heart checkup",
    "status": "REQUESTED",
    "slotTime": null,
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Doctor does not work in this hospital"
}
```

---

### 7.2 Accept Appointment Slot
**Endpoint:** `PUT /api/appointments/:appointmentId/accept`  
**Authentication:** ✅ JWT Required  
**Authorization:** USER only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Params:**
```
appointmentId: "507f1f77bcf86cd79943901c"
```

**Request Body:** {} (empty)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Appointment confirmed",
  "data": {
    "_id": "507f1f77bcf86cd79943901c",
    "patientId": "507f1f77bcf86cd799439011",
    "doctorId": "507f1f77bcf86cd799439019",
    "hospitalId": "507f1f77bcf86cd799439017",
    "reason": "Heart checkup",
    "status": "CONFIRMED",
    "slotTime": "2026-02-15T10:00:00.000Z",
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:05:00.000Z"
  }
}
```

---

### 7.3 Reject Appointment Slot
**Endpoint:** `PUT /api/appointments/:appointmentId/reject`  
**Authentication:** ✅ JWT Required  
**Authorization:** USER only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Params:**
```
appointmentId: "507f1f77bcf86cd79943901c"
```

**Request Body:** {} (empty)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Slot rejected",
  "data": {
    "_id": "507f1f77bcf86cd79943901c",
    "patientId": "507f1f77bcf86cd799439011",
    "doctorId": "507f1f77bcf86cd799439019",
    "hospitalId": "507f1f77bcf86cd799439017",
    "reason": "Heart checkup",
    "status": "REJECTED",
    "slotTime": null,
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:05:00.000Z"
  }
}
```

---

### 7.4 Complete Appointment
**Endpoint:** `PUT /api/appointments/:appointmentId/complete`  
**Authentication:** ✅ JWT Required  
**Authorization:** HOSPITAL_ADMIN only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Params:**
```
appointmentId: "507f1f77bcf86cd79943901c"
```

**Request Body:** {} (empty)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Appointment marked as completed"
}
```

---

## 8. Hospital Admin Appointment Routes (`/api/hospitaladmin`)

### 8.1 Get Requested Appointments
**Endpoint:** `GET /api/hospitaladmin/appointments`  
**Authentication:** ✅ JWT Required  
**Authorization:** HOSPITAL_ADMIN only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd79943901c",
      "patientId": "507f1f77bcf86cd799439011",
      "doctorId": "507f1f77bcf86cd799439019",
      "hospitalId": "507f1f77bcf86cd799439017",
      "reason": "Heart checkup",
      "status": "REQUESTED",
      "slotTime": null,
      "createdAt": "2026-02-13T10:00:00.000Z",
      "updatedAt": "2026-02-13T10:00:00.000Z"
    }
  ]
}
```

---

### 8.2 Assign Slot to Appointment
**Endpoint:** `PUT /api/hospitaladmin/appointments/assign-slot`  
**Authentication:** ✅ JWT Required  
**Authorization:** HOSPITAL_ADMIN only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "appointmentId": "507f1f77bcf86cd79943901c",
  "slotTime": "2026-02-15T10:00:00Z"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Slot assigned successfully",
  "data": {
    "_id": "507f1f77bcf86cd79943901c",
    "patientId": "507f1f77bcf86cd799439011",
    "doctorId": "507f1f77bcf86cd799439019",
    "hospitalId": "507f1f77bcf86cd799439017",
    "reason": "Heart checkup",
    "status": "SLOT_ASSIGNED",
    "slotTime": "2026-02-15T10:00:00.000Z",
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:05:00.000Z"
  }
}
```

---

## 9. Review Routes (`/api/reviews`)

### 9.1 Add Review
**Endpoint:** `POST /api/reviews/`  
**Authentication:** ✅ JWT Required  
**Authorization:** USER only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "hospitalId": "507f1f77bcf86cd799439017",
  "rating": 5,
  "description": "Excellent service and professional staff"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Review submitted successfully",
  "data": {
    "_id": "507f1f77bcf86cd79943901d",
    "userId": "507f1f77bcf86cd799439011",
    "hospitalId": "507f1f77bcf86cd799439017",
    "rating": 5,
    "description": "Excellent service and professional staff",
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
}
```

**Error Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "You can review only after completing an appointment"
}
```

---

### 9.2 Get Hospital Reviews
**Endpoint:** `GET /api/reviews/hospital/:hospitalId`  
**Authentication:** ❌ No JWT Required  
**Authorization:** None

**Request Params:**
```
hospitalId: "507f1f77bcf86cd799439017"
```

**Response (200 OK):**
```json
{
  "success": true,
  "averageRating": 4.5,
  "totalReviews": 2,
  "reviews": [
    {
      "rating": 5,
      "description": "Excellent service and professional staff",
      "user": "John Doe",
      "date": "2026-02-13T10:00:00.000Z"
    },
    {
      "rating": 4,
      "description": "Good facility, could improve waiting time",
      "user": "Jane Smith",
      "date": "2026-02-12T15:30:00.000Z"
    }
  ]
}
```

---

## 10. Blood Bank Routes (`/api/bloodbanks`)

### 10.1 Create Blood Bank
**Endpoint:** `POST /api/bloodbanks/`  
**Authentication:** ✅ JWT Required  
**Authorization:** BLOOD_BANK_ADMIN only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Red Cross Blood Bank",
  "address": "456 Health Street, City",
  "lat": 40.7580,
  "lng": -73.9855
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Blood bank created successfully",
  "data": {
    "_id": "507f1f77bcf86cd79943901e",
    "name": "Red Cross Blood Bank",
    "address": "456 Health Street, City",
    "adminUserId": "507f1f77bcf86cd799439014",
    "location": {
      "type": "Point",
      "coordinates": [-73.9855, 40.7580]
    },
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
}
```

---

### 10.2 Search Nearby Blood Banks
**Endpoint:** `GET /api/bloodbanks/nearby?lat=40.7128&lng=-74.0060`  
**Authentication:** ❌ No JWT Required  
**Authorization:** None

**Request Params:**
```
lat: 40.7128
lng: -74.0060
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd79943901e",
      "name": "Red Cross Blood Bank",
      "address": "456 Health Street, City",
      "location": {
        "type": "Point",
        "coordinates": [-73.9855, 40.7580]
      },
      "adminUserId": "507f1f77bcf86cd799439014"
    }
  ]
}
```

---

## 11. Blood Inventory Routes (`/api/bloodbanks/inventory`)

### 11.1 Update Blood Inventory
**Endpoint:** `PUT /api/bloodbanks/inventory/`  
**Authentication:** ✅ JWT Required  
**Authorization:** BLOOD_BANK_ADMIN only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "bloodGroup": "O+",
  "unitsAvailable": 50
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Blood inventory updated",
  "data": {
    "_id": "507f1f77bcf86cd79943901f",
    "bloodBankId": "507f1f77bcf86cd79943901e",
    "bloodGroup": "O+",
    "unitsAvailable": 50,
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
}
```

---

### 11.2 Get Blood Inventory
**Endpoint:** `GET /api/bloodbanks/inventory/:bloodBankId`  
**Authentication:** ❌ No JWT Required  
**Authorization:** None

**Request Params:**
```
bloodBankId: "507f1f77bcf86cd79943901e"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd79943901f",
      "bloodBankId": "507f1f77bcf86cd79943901e",
      "bloodGroup": "O+",
      "unitsAvailable": 50,
      "createdAt": "2026-02-13T10:00:00.000Z",
      "updatedAt": "2026-02-13T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439020",
      "bloodBankId": "507f1f77bcf86cd79943901e",
      "bloodGroup": "B-",
      "unitsAvailable": 25,
      "createdAt": "2026-02-13T10:00:00.000Z",
      "updatedAt": "2026-02-13T10:00:00.000Z"
    }
  ]
}
```

---

## 12. Disease Routes (`/api/diseases`)

### 12.1 Create Disease
**Endpoint:** `POST /api/diseases/`  
**Authentication:** ✅ JWT Required  
**Authorization:** SUPER_ADMIN only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Cardiology",
  "description": "Heart and cardiovascular diseases"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Disease created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "name": "Cardiology",
    "description": "Heart and cardiovascular diseases",
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
}
```

---

### 12.2 Get All Diseases
**Endpoint:** `GET /api/diseases/`  
**Authentication:** ❌ No JWT Required  
**Authorization:** None

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "name": "Cardiology",
      "description": "Heart and cardiovascular diseases",
      "createdAt": "2026-02-13T10:00:00.000Z",
      "updatedAt": "2026-02-13T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439016",
      "name": "Orthopedics",
      "description": "Bone and joint diseases",
      "createdAt": "2026-02-13T09:00:00.000Z",
      "updatedAt": "2026-02-13T09:00:00.000Z"
    }
  ]
}
```

---

## 13. Operation Routes (`/api/operations`)

### 13.1 Create Operation
**Endpoint:** `POST /api/operations/`  
**Authentication:** ✅ JWT Required  
**Authorization:** SUPER_ADMIN only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Open Heart Surgery",
  "description": "Major surgical procedure for heart conditions",
  "diseaseId": "507f1f77bcf86cd799439015"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Operation created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439021",
    "name": "Open Heart Surgery",
    "description": "Major surgical procedure for heart conditions",
    "diseaseId": "507f1f77bcf86cd799439015",
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
}
```

---

### 13.2 Get Operations
**Endpoint:** `GET /api/operations/?diseaseId=<id>`  
**Authentication:** ❌ No JWT Required  
**Authorization:** None

**Request Params (Optional):**
```
diseaseId: "507f1f77bcf86cd799439015"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439021",
      "name": "Open Heart Surgery",
      "description": "Major surgical procedure for heart conditions",
      "diseaseId": {
        "_id": "507f1f77bcf86cd799439015",
        "name": "Cardiology"
      },
      "createdAt": "2026-02-13T10:00:00.000Z",
      "updatedAt": "2026-02-13T10:00:00.000Z"
    }
  ]
}
```

---

## 14. Doctor Operation Routes (`/api/doctor-operations`)

### 14.1 Add Doctor Operation
**Endpoint:** `POST /api/doctor-operations/`  
**Authentication:** ✅ JWT Required  
**Authorization:** HOSPITAL_ADMIN only

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "doctorId": "507f1f77bcf86cd799439019",
  "hospitalId": "507f1f77bcf86cd799439017",
  "operationId": "507f1f77bcf86cd799439021",
  "fee": 50000
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Doctor operation added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439022",
    "doctorId": "507f1f77bcf86cd799439019",
    "hospitalId": "507f1f77bcf86cd799439017",
    "operationId": "507f1f77bcf86cd799439021",
    "fee": 50000,
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
}
```

---

### 14.2 Get Hospital Operations
**Endpoint:** `GET /api/doctor-operations/hospital/:hospitalId`  
**Authentication:** ❌ No JWT Required  
**Authorization:** None

**Request Params:**
```
hospitalId: "507f1f77bcf86cd799439017"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439022",
      "doctorId": {
        "_id": "507f1f77bcf86cd799439019",
        "name": "Dr. Smith"
      },
      "operationId": {
        "_id": "507f1f77bcf86cd799439021",
        "name": "Open Heart Surgery",
        "description": "Major surgical procedure for heart conditions"
      },
      "fee": 50000,
      "createdAt": "2026-02-13T10:00:00.000Z",
      "updatedAt": "2026-02-13T10:00:00.000Z"
    }
  ]
}
```

---

## Authentication Notes

### JWT Token
- Token format: `Bearer <token>`
- Token expires in: **1 day**
- Stored in: Request header `Authorization`

### Token Payload
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "role": "USER",
  "iat": 1707816000,
  "exp": 1707902400
}
```

### Role-Based Access Control
| Role | Allowed Endpoints |
|------|-------------------|
| SUPER_ADMIN | Create Hospital Admin, Create Doctor, Create Blood Bank Admin, Create Disease, Create Operation |
| HOSPITAL_ADMIN | Create Hospital, Add Doctor to Hospital, Get Appointments, Assign Slots, Complete Appointment, Add Doctor Operation |
| DOCTOR | Update Doctor Profile |
| USER | Register, Request Appointment, Accept/Reject Slots, Add Review |
| BLOOD_BANK_ADMIN | Create Blood Bank, Update Inventory |

---

## Error Responses

### 401 Unauthorized (Missing/Invalid Token)
```json
{
  "message": "No token provided"
}
```

### 403 Forbidden (Insufficient Permissions)
```json
{
  "message": "Access denied"
}
```

### 400 Bad Request (Invalid Input)
```json
{
  "message": "All fields are required"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details"
}
```

---

## Example cURL Commands

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Register
```bash
curl -X POST http://localhost:3000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Hospital (with JWT)
```bash
curl -X POST http://localhost:3000/api/hospital/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "City Hospital",
    "address": "123 Main Street, City",
    "type": "PRIVATE",
    "lat": 40.7128,
    "lng": -74.0060,
    "specializations": ["507f1f77bcf86cd799439015"]
  }'
```

### Get Hospitals by Disease
```bash
curl -X GET "http://localhost:3000/api/hospital/filter?diseaseId=507f1f77bcf86cd799439015" \
  -H "Content-Type: application/json"
```

---

## 14. Emergency Booking Routes (`/api/emergency`)

### 14.1 Get Nearby Hospitals (Public - No Auth Required)
**Endpoint:** `GET /api/emergency/nearby-hospitals`  
**Authentication:** ❌ No JWT Required  
**Authorization:** None  
**Purpose:** Find hospitals near accident location

**Query Parameters:**
- `latitude` (required): Accident location latitude
- `longitude` (required): Accident location longitude
- `radius` (optional): Search radius in km (default: 50)

**Request Example:**
```bash
curl -X GET "http://localhost:3000/api/emergency/nearby-hospitals?latitude=28.6139&longitude=77.2090&radius=50"
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "hospitalId": "507f1f77bcf86cd799439011",
      "hospitalName": "Apollo Hospital",
      "address": "123 Hospital Street",
      "phone": "9876543210",
      "distance": 9.8,
      "estimatedTime": 15
    }
  ]
}
```

---

### 14.2 Create Emergency Booking
**Endpoint:** `POST /api/emergency/create`  
**Authentication:** ✅ JWT Required  
**Authorization:** USER role  
**Purpose:** Patient initiates emergency booking

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
{
  "patientName": "John Doe",
  "patientPhone": "9876543210",
  "accidentType": "ROAD_ACCIDENT",
  "severity": "CRITICAL",
  "description": "Car collision at main road",
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "address": "Main Road, Delhi"
  },
  "medicalHistory": {
    "allergies": ["Penicillin"],
    "bloodType": "O+",
    "chronicDiseases": ["Diabetes"],
    "currentMedications": ["Insulin"]
  },
  "emergencyContacts": [
    {
      "name": "Jane Doe",
      "phone": "9876543211",
      "relationship": "Wife"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Emergency booking created. Please select a hospital.",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "patientId": "507f1f77bcf86cd799439010",
    "status": "INITIATED",
    "nearbyHospitals": [
      {
        "hospitalId": "507f1f77bcf86cd799439011",
        "hospitalName": "Apollo Hospital",
        "distance": 9.8,
        "estimatedTime": 15
      }
    ]
  }
}
```

---

### 14.3 Send Emergency Request to Hospital
**Endpoint:** `POST /api/emergency/send-request`  
**Authentication:** ✅ JWT Required  
**Authorization:** USER role  
**Purpose:** Patient selects a hospital and sends request

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
{
  "emergencyId": "507f1f77bcf86cd799439020",
  "hospitalId": "507f1f77bcf86cd799439011"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Emergency request sent to hospital. Waiting for response...",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "status": "REQUEST_SENT",
    "selectedHospitalId": "507f1f77bcf86cd799439011"
  }
}
```

---

### 14.4 Get Patient's Emergency History
**Endpoint:** `GET /api/emergency/my-emergencies`  
**Authentication:** ✅ JWT Required  
**Authorization:** USER role  
**Purpose:** View all emergencies for logged-in patient

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "patientName": "John Doe",
      "accidentType": "ROAD_ACCIDENT",
      "severity": "CRITICAL",
      "status": "ACCEPTED",
      "createdAt": "2026-02-13T10:30:00Z"
    }
  ]
}
```

---

### 14.5 Get Emergency Details
**Endpoint:** `GET /api/emergency/:emergencyId`  
**Authentication:** ✅ JWT Required  
**Authorization:** Patient or Hospital Admin  
**Purpose:** Get full details of specific emergency including ambulance location

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "patientId": {
      "_id": "507f1f77bcf86cd799439010",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210"
    },
    "status": "IN_TRANSIT",
    "ambulanceInfo": {
      "driverName": "Michael",
      "driverPhone": "9876543212",
      "gpsTracking": {
        "latitude": 28.6150,
        "longitude": 77.2100,
        "lastUpdated": "2026-02-13T10:35:45Z"
      }
    },
    "selectedHospitalId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Apollo Hospital",
      "address": "123 Hospital Street"
    }
  }
}
```

---

### 14.6 Hospital: Get Pending Emergency Requests
**Endpoint:** `GET /api/emergency/hospital/pending-requests`  
**Authentication:** ✅ JWT Required  
**Authorization:** HOSPITAL_ADMIN role  
**Purpose:** Hospital admin sees all pending emergency requests

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "patientName": "John Doe",
      "patientPhone": "9876543210",
      "accidentType": "ROAD_ACCIDENT",
      "severity": "CRITICAL",
      "description": "Car collision",
      "status": "REQUEST_SENT",
      "priority": 10,
      "patientId": {
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}
```

---

### 14.7 Hospital: Accept Emergency Request
**Endpoint:** `PUT /api/emergency/:emergencyId/accept`  
**Authentication:** ✅ JWT Required  
**Authorization:** HOSPITAL_ADMIN role  
**Purpose:** Hospital accepts emergency and optionally provides ambulance info

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body (Optional):**
```json
{
  "ambulanceInfo": {
    "ambulanceId": "AMB001",
    "driverName": "Michael",
    "driverPhone": "9876543212",
    "estimatedArrival": "2026-02-13T10:45:00Z"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Emergency request accepted",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "status": "AMBULANCE_SENT",
    "ambulanceInfo": {
      "driverName": "Michael",
      "driverPhone": "9876543212"
    }
  }
}
```

---

### 14.8 Hospital: Reject Emergency Request
**Endpoint:** `PUT /api/emergency/:emergencyId/reject`  
**Authentication:** ✅ JWT Required  
**Authorization:** HOSPITAL_ADMIN role  
**Purpose:** Hospital rejects emergency (busy/no resources)

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
{
  "rejectionReason": "Hospital at full capacity"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Emergency request rejected. Patient can choose another hospital.",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "status": "REJECTED",
    "rejectionReason": "Hospital at full capacity"
  }
}
```

---

### 14.9 Update Ambulance GPS Location (Real-time Tracking)
**Endpoint:** `PUT /api/emergency/:emergencyId/ambulance-location`  
**Authentication:** ✅ JWT Required  
**Authorization:** AMBULANCE_DRIVER role  
**Purpose:** Ambulance sends real-time GPS coordinates

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
{
  "latitude": 28.6150,
  "longitude": 77.2100
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Ambulance location updated",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "status": "IN_TRANSIT",
    "ambulanceInfo": {
      "gpsTracking": {
        "latitude": 28.6150,
        "longitude": 77.2100,
        "lastUpdated": "2026-02-13T10:35:45Z"
      }
    }
  }
}
```

---

### 14.10 Update Emergency Status
**Endpoint:** `PUT /api/emergency/:emergencyId/status`  
**Authentication:** ✅ JWT Required  
**Authorization:** HOSPITAL_ADMIN role  
**Purpose:** Update emergency status as it progresses

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "ARRIVED",
  "hospitalNotes": "Patient arrived at emergency department"
}
```

**Valid Status Values:**
- `ACCEPTED` - Hospital accepted the request
- `AMBULANCE_SENT` - Ambulance dispatched
- `IN_TRANSIT` - Ambulance on the way
- `ARRIVED` - Ambulance arrived at location
- `ADMITTED` - Patient admitted to hospital
- `COMPLETED` - Treatment completed
- `CANCELLED` - Emergency cancelled

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Emergency status updated",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "status": "ARRIVED",
    "hospitalNotes": "Patient arrived at emergency department"
  }
}
```

---

### 14.11 Cancel Emergency
**Endpoint:** `PUT /api/emergency/:emergencyId/cancel`  
**Authentication:** ✅ JWT Required  
**Authorization:** Patient (USER role)  
**Purpose:** Patient cancels emergency booking

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
{
  "reason": "False alarm"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Emergency cancelled",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "status": "CANCELLED",
    "hospitalNotes": "False alarm"
  }
}
```

---

## Accident Type Values
- `ROAD_ACCIDENT`
- `FALL`
- `BURN`
- `POISONING`
- `DROWNING`
- `ELECTROCUTION`
- `HEART_ATTACK`
- `STROKE`
- `SEVERE_INJURY`
- `OTHER`

## Severity Levels
- `CRITICAL` - Life-threatening
- `SEVERE` - Serious injury
- `MODERATE` - Moderate injury

---

## Environment Variables Required

```
MONGO_URI=mongodb://localhost:27017/hosfinder
JWT_SECRET=your_secret_key_here
```
