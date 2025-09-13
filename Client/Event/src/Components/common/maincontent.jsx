import React, { useState, useEffect } from 'react';

// --- FONT IMPORTS & STYLES ---
const StyleInjector = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700;900&family=Source+Sans+Pro:wght@400;600;700&display=swap');
        
        body {
            font-family: 'Source Sans Pro', sans-serif;
            background-color: #0B132B;
        }

        .font-heading {
            font-family: 'Merriweather', serif;
        }
    `}</style>
);

// --- MOCK DATA ---
const mockEvents = [
 { 
    id: 1, 
    title: 'Innovate India Hackathon 2025', 
    category: 'Tech',
    date: '2025-11-22T09:00:00Z', 
    location: 'IIT Bombay, Mumbai', 
    price: 1500,
    imageUrl: 'https://placehold.co/600x400/0B132B/C9A66B?text=Hackathon',
  },
 { 
    id: 2, 
    title: 'National Quiz Championship', 
    category: 'Competition',
    date: '2025-12-05T10:00:00Z', 
    location: 'Pragati Maidan, New Delhi', 
    price: 500,
    imageUrl: 'https://placehold.co/600x400/1C2541/C9A66B?text=Quiz+Champ',
  },
 { 
    id: 3, 
    title: 'Future of AI Conference', 
    category: 'Tech',
    date: '2025-10-18T09:30:00Z', 
    location: 'HICC, Hyderabad', 
    price: 7500,
    imageUrl: 'https://placehold.co/600x400/3B0918/C9A66B?text=AI+Conference',
  },
 { 
    id: 4, 
    title: 'Starlight Charity Ball',
    category: 'Gala',
    date: '2024-12-31T19:00:00Z',
    location: 'The Taj Palace, Mumbai',
    price: 25000,
    imageUrl: 'https://placehold.co/600x400/1C2541/C9A66B?text=Charity+Ball'
  },
   { 
    id: 5, 
    title: 'Mumbai Fashion Week', 
    category: 'Lifestyle',
    date: '2025-11-01T17:00:00Z', 
    location: 'Jio World Centre, Mumbai', 
    price: 4000,
    imageUrl: 'https://placehold.co/600x400/212529/C9A66B?text=Fashion+Week',
  },
  { 
    id: 6, 
    title: 'Elysian Fields Music Festival', 
    category: 'Music',
    date: '2025-11-05T15:00:00Z', 
    location: 'Sunrise Valley Estate, Goa', 
    price: 3500,
    imageUrl: 'https://placehold.co/600x400/5A3E36/C9A66B?text=Music+Fest',
  },
];

const initialUserBookings = [
    { bookingId: 'BK123', eventId: 4, eventTitle: 'Starlight Charity Ball', date: '2024-12-31T19:00:00Z', tickets: 2, totalPrice: 50000 },
];

// --- HELPER COMPONENTS ---
const Spinner = () => ( <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#C9A66B]"></div></div> );


// --- CORE UI COMPONENTS ---
const EventCard = ({ event, onSelectEvent }) => (
    <div className="bg-[#1C2541] rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#C9A66B]/20 transform hover:-translate-y-2 transition-all duration-300 group flex flex-col">
        <div className="overflow-hidden relative">
             <img src={event.imageUrl} alt={event.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
             <div className="absolute top-4 right-4 bg-[#0B132B]/80 text-[#C9A66B] text-xs font-bold uppercase px-3 py-1 rounded-full">{event.category}</div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-2xl font-heading text-white mb-2">{event.title}</h3>
            <p className="text-slate-400 font-semibold text-sm mb-4">{new Date(event.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <p className="text-slate-500 text-sm mb-6 flex-grow">{event.location}</p>
            <button onClick={() => onSelectEvent(event.id)} className="w-full mt-auto bg-transparent border-2 border-[#C9A66B] hover:bg-[#C9A66B] text-[#C9A66B] hover:text-[#0B132B] font-bold py-3 px-6 rounded-lg transition-colors"> Book Ticket </button>
        </div>
    </div>
);

// --- PAGES / VIEWS ---

const HomePage = ({ onSelectEvent }) => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Tech', 'Music', 'Gala', 'Competition', 'Lifestyle'];

    const filteredEvents = filter === 'All' ? mockEvents : mockEvents.filter(e => e.category === filter);

    return (
        <div className="bg-[#0B132B]">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-6xl font-heading text-white mb-4 text-center">Upcoming Events</h1>
                <p className="text-slate-400 text-center mb-8">Filter by category to find your next exclusive experience.</p>
                <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 text-sm md:text-base rounded-full font-semibold transition-colors ${filter === cat ? 'bg-[#C9A66B] text-[#0B132B]' : 'bg-[#1C2541] text-slate-300 hover:bg-slate-700'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.map(event => <EventCard key={event.id} event={event} onSelectEvent={onSelectEvent} />)}
                </div>
            </div>
        </div>
    );
};

const BookingPage = ({ eventId, setPage, onConfirmBooking }) => {
    const [event, setEvent] = useState(null);
    const [ticketCount, setTicketCount] = useState(1);
    
    useEffect(() => { setEvent(mockEvents.find(e => e.id === eventId)); }, [eventId]);

    const handleConfirm = () => {
        const newBooking = {
            bookingId: `BK${Date.now()}`,
            eventId: event.id,
            eventTitle: event.title,
            date: event.date,
            tickets: ticketCount,
            totalPrice: event.price * ticketCount
        };
        onConfirmBooking(newBooking);
        setPage('my-bookings');
    };
    
    if (!event) return <Spinner />;
    
    const totalPrice = event.price * ticketCount;

    return (
        <div className="container mx-auto px-6 py-8 max-w-3xl">
            {/* Back button is already present here */}
            <button onClick={() => setPage('home')} className="mb-6 text-[#C9A66B] hover:text-amber-300">&larr; Back to Events</button>
             <div className="bg-[#1C2541] rounded-2xl shadow-2xl p-8">
                <h1 className="text-4xl font-heading text-white mb-2">{event.title}</h1>
                <p className="text-slate-400 font-semibold text-lg mb-6">{new Date(event.date).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}</p>
                
                <div className="my-8 border-t border-slate-700"></div>

                <h2 className="text-2xl font-heading text-white mb-4">Select Tickets</h2>
                <div className="flex items-center justify-between bg-slate-800 p-4 rounded-lg">
                    <span className="text-lg text-white font-semibold">Quantity</span>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setTicketCount(p => Math.max(1, p-1))} className="bg-slate-700 w-10 h-10 text-2xl rounded-full font-bold hover:bg-slate-600 transition-colors">-</button>
                        <span className="text-3xl font-bold text-white w-12 text-center">{ticketCount}</span>
                        <button onClick={() => setTicketCount(p => p+1)} className="bg-slate-700 w-10 h-10 text-2xl rounded-full font-bold hover:bg-slate-600 transition-colors">+</button>
                    </div>
                </div>

                <div className="my-8 border-t border-slate-700"></div>

                <div className="flex justify-between items-center">
                   <span className="text-slate-300 text-xl uppercase tracking-wider">Total Price</span>
                   <span className="text-4xl font-bold text-white">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>

                 <button onClick={handleConfirm} className="w-full mt-8 bg-[#C9A66B] hover:bg-amber-500 text-[#0B132B] font-bold py-3 px-4 rounded-lg text-lg transition-colors">
                    Confirm & Book
                </button>
            </div>
        </div>
    );
};

const MyBookingsPage = ({ bookings, setPage }) => { // Added setPage prop
    const upcomingBookings = bookings.filter(b => new Date(b.date) >= new Date());
    const pastBookings = bookings.filter(b => new Date(b.date) < new Date());
    
    const BookingList = ({ title, bookingsToList }) => (
        <div>
            <h2 className="text-3xl font-heading text-white mb-6">{title}</h2>
            {bookingsToList.length > 0 ? (
                 <div className="space-y-6">
                    {bookingsToList.map(booking => (
                        <div key={booking.bookingId} className="bg-[#1C2541] rounded-2xl p-6 shadow-xl md:flex justify-between items-center">
                            <div>
                               <h3 className="text-xl font-heading text-white">{booking.eventTitle}</h3>
                               <p className="text-slate-400">{new Date(booking.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="text-left md:text-right mt-4 md:mt-0">
                               <p className="text-lg font-semibold text-[#C9A66B]">Total: ₹{booking.totalPrice.toLocaleString('en-IN')}</p>
                               <p className="text-sm text-slate-500">{`Tickets: ${booking.tickets} | ID: ${booking.bookingId}`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p className="text-slate-500">No {title.toLowerCase()} found.</p>}
        </div>
    );

    return (
         <div className="container mx-auto px-6 py-8 max-w-4xl">
            {/* Back button added here */}
            <button onClick={() => setPage('home')} className="mb-6 text-[#C9A66B] hover:text-amber-300">&larr; Back to Events</button>
            <h1 className="text-5xl font-heading text-white mb-10 text-center">Booking History</h1>
            <div className="space-y-12">
                <BookingList title="Upcoming Bookings" bookingsToList={upcomingBookings} />
                <BookingList title="Past Bookings" bookingsToList={pastBookings} />
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [bookings, setBookings] = useState(initialUserBookings);

  const handleSelectEvent = (eventId) => { 
    setSelectedEventId(eventId); 
    setPage('booking'); 
  };

  const handleAddBooking = (newBooking) => {
    setBookings(prevBookings => [...prevBookings, newBooking]);
  };

  const renderPage = () => {
    switch (page) {
        case 'booking': return <BookingPage eventId={selectedEventId} setPage={setPage} onConfirmBooking={handleAddBooking} />;
        // Pass setPage to MyBookingsPage
        case 'my-bookings': return <MyBookingsPage bookings={bookings} setPage={setPage} />; 
        default: return <HomePage onSelectEvent={handleSelectEvent} />;
    }
  }

  return (
    <div className="bg-[#0B132B] min-h-screen text-[#F8F6F0]">
        <StyleInjector />
        <main>{renderPage()}</main>
        <footer className="bg-[#0B132B] mt-12 py-6 border-t border-slate-800">
             <div className="container mx-auto text-center text-slate-500"> &copy; {new Date().getFullYear()} AlphaEvents. All Rights Reserved. </div>
        </footer>
    </div>
  );
}