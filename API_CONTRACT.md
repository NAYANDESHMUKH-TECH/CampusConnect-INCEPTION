Core Features for CampusConnect
1. User Authentication & Profiles
Sign up / Login (with role: Student / Faculty / Admin)

Profile management (name, department, year, photo, bio)

2. Announcements & Notices
Faculty/Admin can post official announcements (exam dates, events, deadlines)

Students can view & filter by category (Academic, Sports, Cultural, etc.)

3. Event Management
Event Creation (title, description, date/time, venue, organizer)

Students can RSVP or mark interest

Event reminders/notifications

4. Discussion Forum / Q&A
Post questions or discussion topics

Comment & reply

Upvote/downvote or mark as resolved

5. Club & Group Spaces
Each club/society gets its own page

Post updates, recruit members, share media

6. Resource Sharing
Share PDFs, lecture notes, timetables

Organized by subjects & departments

7. Direct Messaging / Chat (Optional for v1, can be v2)
One-to-one or group chats for students/faculty




User Model
Represents students, faculty, or admin users.{
  "id": "integer / UUID",
  "name": "string",
  "email": "string",
  "password": "hashed string",
  "role": "enum: ['student', 'faculty', 'admin']",
  "profile_picture": "string (URL)",
  "department": "string",
  "year_of_study": "integer",
  "created_at": "datetime"
}




Event Model
Covers college fests, workshops, seminars, and other activities.
{
  "id": "integer / UUID",
  "title": "string",
  "description": "string",
  "location": "string",
  "date_time": "datetime",
  "organizer_id": "integer (User ID)",
  "event_type": "enum: ['cultural', 'technical', 'sports', 'other']",
  "image": "string (URL)",
  "created_at": "datetime"
}



 Announcement Model
For important college notices.
{
  "id": "integer / UUID",
  "title": "string",
  "message": "string",
  "posted_by": "integer (User ID)",
  "audience": "enum: ['all', 'students', 'faculty', 'specific_department']",
  "created_at": "datetime"
}


Post Model
For discussion boards, Q&A, and sharing information.
{
  "id": "integer / UUID",
  "title": "string",
  "content": "string",
  "author_id": "integer (User ID)",
  "category": "string (e.g., 'study material', 'lost & found', 'general')",
  "created_at": "datetime"
}


Comment Model
Replies on posts or announcements.
{
  "id": "integer / UUID",
  "post_id": "integer (Post ID)",
  "user_id": "integer (User ID)",
  "content": "string",
  "created_at": "datetime"
}


 Resource Model 
 For sharing documents, study notes, and links.
 {
  "id": "integer / UUID",
  "title": "string",
  "description": "string",
  "file_url": "string (URL)",
  "uploaded_by": "integer (User ID)",
  "created_at": "datetime"
}





API Endpoints
1. User Registration
Feature: Register a new user

HTTP Method: POST

Endpoint Path: /api/users/register

Description: Creates a new user account

Request Body:

json

{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "department": "string",
  "year": "number"
}
Success Response (201 Created):

json

{
  "message": "User registered successfully",
  "user_id": "number"
}
Error Response (400 Bad Request):

json

{
  "error": "Email already exists"
}
2. Login
Feature: Login user

HTTP Method: POST

Endpoint Path: /api/users/login

Description: Authenticates user and returns token

Request Body:

json

{
  "email": "string",
  "password": "string"
}
Success Response (200 OK):

json

{
  "message": "Login successful",
  "token": "string"
}
Error Response (401 Unauthorized):

json

{
  "error": "Invalid credentials"
}
3. Get All Events
Feature: Retrieve all events

HTTP Method: GET

Endpoint Path: /api/events

Description: Returns a list of events

Success Response (200 OK):

json

[
  {
    "id": "number",
    "title": "string",
    "description": "string",
    "date": "string",
    "location": "string"
  }
]
Error Response (404 Not Found):

json

{
  "error": "No events found"
}
4. Create Event
Feature: Add new event

HTTP Method: POST

Endpoint Path: /api/events/create

Description: Creates a new event

Request Body:

json

{
  "title": "string",
  "description": "string",
  "date": "string",
  "location": "string"
}
Success Response (201 Created):

json

{
  "message": "Event created successfully"
}
Error Response (400 Bad Request):

json

{
  "error": "Invalid event data"
}
5. Get All Notices
Feature: Retrieve all notices

HTTP Method: GET

Endpoint Path: /api/notices

Description: Returns a list of notices

Success Response (200 OK):

json
[
{
"id": "number",
"title": "string",
"content": "string",
"date_posted": "string"
}
]


Error Response (404 Not Found):

json

{
  "error": "No notices found"
}
