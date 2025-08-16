import { useState, useEffect } from 'react';
import {
  Megaphone,
  Calendar,
  MessageSquareText,
  Users,
  Book,
  UserCircle,
  LogOut,
  Menu,
  X,
  Plus
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000';

const App = () => {
    // State to manage UI and data
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userRole, setUserRole] = useState('faculty'); // Changed to 'faculty' to test POST requests
    const [currentPage, setCurrentPage] = useState('events');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);

    // Mock JWT token for a faculty user to test POST requests
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInJvbGUiOiJmYWN1bHR5IiwiaWF0IjoxNzIyMTA1ODUyLCJleHAiOjE3MjIxMDk0NTJ9.H3_y_eR8t3g9u2iG1h1S9u8yX_l6z7X_j5w1q7l6k_0";

    // Fetch announcements from the backend using the /api/notices endpoint
    const fetchAnnouncements = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/notices`);
            if (!response.ok) {
                throw new Error('Failed to fetch announcements');
            }
            const data = await response.json();
            setAnnouncements(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch events from the backend using the /api/events endpoint
    const fetchEvents = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/events`);
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data = await response.json();
            setEvents(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle creating a new event
    const handleCreateEvent = async (eventData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${mockToken}`
                },
                body: JSON.stringify(eventData),
            });

            if (response.status === 403) {
                throw new Error('Forbidden: Only faculty and admin can create events.');
            }
            if (!response.ok) {
                throw new Error('Failed to create event');
            }

            const newEvent = await response.json();
            console.log('New event created:', newEvent);
            fetchEvents(); // Re-fetch the events to show the new one
            setShowCreateEventForm(false); // Hide the form after success
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    // Use effect hook to fetch data on the initial component render
    useEffect(() => {
        fetchAnnouncements();
        fetchEvents();
    }, []);

    // Sidebar navigation items
    const navItems = [
        { name: "Announcements", icon: Megaphone, page: 'announcements', roles: ['student', 'faculty', 'admin'] },
        { name: "Events", icon: Calendar, page: 'events', roles: ['student', 'faculty', 'admin'] },
        { name: "Discussion Forum", icon: MessageSquareText, page: 'discussions', roles: ['student', 'faculty', 'admin'] },
        { name: "Clubs & Groups", icon: Users, page: 'clubs', roles: ['student', 'faculty', 'admin'] },
        { name: "Resource Sharing", icon: Book, page: 'resources', roles: ['student', 'faculty', 'admin'] },
        { name: "Profile", icon: UserCircle, page: 'profile', roles: ['student', 'faculty', 'admin'] },
    ];

    // Conditional rendering for the main content area
    const renderPage = () => {
        if (isLoading) {
            return <p className="text-center text-xl text-gray-500">Loading...</p>;
        }
        if (error) {
            return <p className="text-center text-xl text-red-500">Error: {error}</p>;
        }

        if (showCreateEventForm) {
            return <CreateEventForm onSave={handleCreateEvent} onCancel={() => setShowCreateEventForm(false)} />;
        }

        switch (currentPage) {
            case 'announcements':
                return <AnnouncementsPage announcements={announcements} userRole={userRole} />;
            case 'events':
                return <EventsPage events={events} userRole={userRole} onCreateClick={() => setShowCreateEventForm(true)} />;
            case 'discussions':
                return <h2 className="text-3xl font-bold text-gray-900">Discussion Forum (Coming Soon)</h2>;
            case 'clubs':
                return <h2 className="text-3xl font-bold text-gray-900">Clubs & Groups (Coming Soon)</h2>;
            case 'resources':
                return <h2 className="text-3xl font-bold text-gray-900">Resource Sharing (Coming Soon)</h2>;
            case 'profile':
                return <h2 className="text-3xl font-bold text-gray-900">User Profile (Coming Soon)</h2>;
            default:
                return <AnnouncementsPage announcements={announcements} userRole={userRole} />;
        }
    };

    // Component for the Announcements page
    const AnnouncementsPage = ({ announcements, userRole }) => (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Announcements</h2>
                {['faculty', 'admin'].includes(userRole) && (
                    <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                        <Plus className="w-4 h-4" />
                        <span>Post New</span>
                    </button>
                )}
            </div>
            <div className="space-y-4">
                {announcements.length > 0 ? (
                    announcements.map((announcement) => (
                        <div key={announcement.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-indigo-800">{announcement.title}</h3>
                                </div>
                                <span className="text-sm text-gray-500">{new Date(announcement.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="mt-4 text-gray-700">{announcement.message}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-500">No announcements found.</p>
                )}
            </div>
        </div>
    );

    // Component for the Events page
    const EventsPage = ({ events, userRole, onCreateClick }) => (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Events</h2>
                {['faculty', 'admin'].includes(userRole) && (
                    <button onClick={onCreateClick} className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                        <Plus className="w-4 h-4" />
                        <span>Create Event</span>
                    </button>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id} className="bg-white p-6 rounded-xl shadow-md flex flex-col">
                            <h3 className="text-xl font-bold text-indigo-800">{event.title}</h3>
                            <div className="mt-4 text-gray-700 space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-indigo-500" />
                                    <span>{new Date(event.date_time).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Users className="w-4 h-4 text-indigo-500" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-500 col-span-full">No events found.</p>
                )}
            </div>
        </div>
    );

    // Component for the new event creation form
    const CreateEventForm = ({ onSave, onCancel }) => {
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [location, setLocation] = useState('');
        const [dateTime, setDateTime] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            onSave({ title, description, location, date_time: dateTime });
        };

        return (
            <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-indigo-800 mb-6">Create New Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="date_time" className="block text-sm font-medium text-gray-700">Date & Time</label>
                        <input
                            type="datetime-local"
                            id="date_time"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        />
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    // Main dashboard layout
    const Dashboard = () => (
        <div className="flex min-h-screen bg-gray-100 text-gray-800">
            {/* Sidebar for desktop */}
            <aside className={`bg-white shadow-lg w-64 p-6 flex-col transition-transform duration-300 ease-in-out hidden md:flex`}>
                <div className="flex items-center space-x-2 mb-8">
                    <img src="https://placehold.co/40x40/6B46C1/FFFFFF?text=CC" alt="CampusConnect Logo" className="w-10 h-10 rounded-full" />
                    <h1 className="text-2xl font-bold text-indigo-800">CampusConnect</h1>
                </div>
                <nav className="flex-grow">
                    <ul className="space-y-2">
                        {navItems.filter(item => item.roles.includes(userRole)).map((item) => (
                            <li key={item.page}>
                                <button
                                    onClick={() => setCurrentPage(item.page)}
                                    className={`flex items-center w-full space-x-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                                        currentPage === item.page
                                            ? 'bg-indigo-100 text-indigo-700 font-semibold'
                                            : 'hover:bg-gray-200 text-gray-600'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Mobile Header and Sidebar */}
            <header className="bg-white shadow-md p-4 flex items-center justify-between md:hidden sticky top-0 z-50">
                <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-indigo-800">CampusConnect</h1>
                <div className="w-6"></div> {/* Placeholder to center the title */}
            </header>

            {/* Mobile Sidebar overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <aside className="bg-white shadow-lg w-64 p-6 flex-col h-full absolute left-0" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-2">
                                <img src="https://placehold.co/40x40/6B46C1/FFFFFF?text=CC" alt="CampusConnect Logo" className="w-10 h-10 rounded-full" />
                                <h1 className="text-2xl font-bold text-indigo-800">CampusConnect</h1>
                            </div>
                            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="flex-grow">
                            <ul className="space-y-2">
                                {navItems.filter(item => item.roles.includes(userRole)).map((item) => (
                                    <li key={item.page}>
                                        <button
                                            onClick={() => {
                                                setCurrentPage(item.page);
                                                setIsSidebarOpen(false);
                                            }}
                                            className={`flex items-center w-full space-x-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                                                currentPage === item.page
                                                    ? 'bg-indigo-100 text-indigo-700 font-semibold'
                                                    : 'hover:bg-gray-200 text-gray-600'
                                            }`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                </div>
            )}

            {/* Main content area */}
            <main className="flex-1 p-6 md:p-10 overflow-auto">
                {renderPage()}
            </main>
        </div>
    );

    return (
        <Dashboard />
    );
};

export default App;
