# API Contract – CampusConnect Backend

## Base URL
```
http://localhost:5000/api
```

## Events Endpoints

### 1. Create Event
**POST** `/events`

**Request Body**
```json
{
  "title": "Tech Fest",
  "description": "Annual technical fest with coding competitions",
  "date": "2025-09-12",
  "category": "Technical",
  "posted_by": "IEEE Club"
}
```

**Response (201)**
```json
{
  "id": 1,
  "title": "Tech Fest",
  "description": "Annual technical fest with coding competitions",
  "date": "2025-09-12",
  "category": "Technical",
  "posted_by": "IEEE Club"
}
```

### 2. Get All Events
**GET** `/events`

**Response (200)**
```json
[
  {
    "id": 1,
    "title": "Tech Fest",
    "description": "Annual technical fest with coding competitions",
    "date": "2025-09-12",
    "category": "Technical",
    "posted_by": "IEEE Club"
  }
]
```

### 3. Get Event by ID
**GET** `/events/{id}`

**Response (200)**
```json
{
  "id": 1,
  "title": "Tech Fest",
  "description": "Annual technical fest with coding competitions",
  "date": "2025-09-12",
  "category": "Technical",
  "posted_by": "IEEE Club"
}
```

**Response (404)**
```json
{
  "message": "Event not found"
}
```

### 4. Update Event
**PUT** `/events/{id}`

**Request Body**
```json
{
  "title": "Tech Fest 2025",
  "description": "Updated details for tech fest"
}
```

**Response (200)**
```json
{
  "id": 1,
  "title": "Tech Fest 2025",
  "description": "Updated details for tech fest",
  "date": "2025-09-12",
  "category": "Technical",
  "posted_by": "IEEE Club"
}
```

### 5. Delete Event
**DELETE** `/events/{id}`

**Response (204)**
_No Content_
