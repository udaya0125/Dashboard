import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Wrapper from '../BarComponents/Wrapper';
import { ChevronLeft, ChevronRight, CalendarDays, CalendarRange, Calendar, List } from 'lucide-react';
import EventForm from '@/AddFormComponemts/EventForm';
import axios from 'axios';
import { toast } from 'react-toastify';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(route('event.index'));
        const formattedEvents = response.data.map(event => ({
          id: event.id,
          title: event.event_name,
          color: getColorForCategory(event.category),
          category: event.category,
          start: new Date(event.date),
          end: new Date(event.date),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getColorForCategory = (category) => {
    const colors = {
      meeting: '#3b82f6',
      appointment: '#10b981',
      reminder: '#f59e0b',
      task: '#8b5cf6',
      birthday: '#ec4899',
      holiday: '#ef4444',
      default: '#6b7280',
    };
    return colors[category] || colors.default;
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedEvent({
      start: slotInfo.start,
      end: slotInfo.end,
      category: 'meeting',
      title: '',
    });
    setShowEventForm(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  const handleCloseForm = () => {
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  const handleSubmit = async (eventData) => {
    try {
      const formattedData = {
        event_name: eventData.title,
        category: eventData.category,
        date: eventData.start.toISOString(),
      };

      if (selectedEvent && selectedEvent.id) {
        // Update existing event
        await axios.put(route('event.update', { id: selectedEvent.id }), formattedData);
        setEvents(events.map(e => 
          e.id === selectedEvent.id ? { 
            ...e, 
            title: eventData.title,
            category: eventData.category,
            color: getColorForCategory(eventData.category),
            start: eventData.start,
            end: eventData.end || eventData.start
          } : e
        ));
        toast.success('Event updated successfully');
      } else {
        // Add new event
        const response = await axios.post(route('event.store'), formattedData);
        const newEvent = {
          id: response.data.data.id,
          title: eventData.title,
          category: eventData.category,
          color: getColorForCategory(eventData.category),
          start: eventData.start,
          end: eventData.end || eventData.start,
        };
        setEvents([...events, newEvent]);
        toast.success('Event added successfully');
      }
      handleCloseForm();
    } catch (error) {
      console.error('Error saving event:', error);
      if (error.response && error.response.data.errors) {
        Object.values(error.response.data.errors).forEach(err => {
          toast.error(err[0]);
        });
      } else {
        toast.error('Failed to save event');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    
    try {
      await axios.delete(route('event.destroy', { id }));
      setEvents(events.filter(e => e.id !== id));
      toast.success('Event deleted successfully');
      handleCloseForm();
    } catch (error) {
      console.error("Delete error", error);
      toast.error('Failed to delete event');
    }
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '0.25rem',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className='py-6 px-4 md:px-12 lg:px-10 w-full md:w-[82%] ml-auto pt-24'>
      <div className="max-w-7xl mx-auto p-6 font-sans">
        <h1 className="text-3xl font-light text-center text-gray-800">My Schedule</h1>  
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '700px' }}
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            eventPropGetter={eventStyleGetter}
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
            components={{
              toolbar: (props) => <CustomToolbar {...props} />,
              event: CustomEvent,
            }}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            className="p-4"
          />
        </div>
      </div>

      {showEventForm && (
        <EventForm
          event={selectedEvent}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

const CustomToolbar = ({ label, onNavigate, onView, view }) => {
  return (
    <Wrapper>
      <div className='py-6 px-4 md:px-12 lg:px-10 w-full md:w-[82%] ml-auto '>
        <div className="flex flex-col md:flex-row justify-between items-center py-4 px-2 border-b border-gray-200">
          <div className="flex items-center mb-4 md:mb-0">
            <button 
              onClick={() => onNavigate('TODAY')} 
              className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Today
            </button>
            <button 
              onClick={() => onNavigate('PREV')} 
              className="p-2 mr-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="mx-2 text-lg font-semibold text-gray-800">{label}</span>
            <button 
              onClick={() => onNavigate('NEXT')} 
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { view: Views.MONTH, label: 'Month', icon: <CalendarDays className="h-4 w-4 mr-1" /> },
              { view: Views.WEEK, label: 'Week', icon: <CalendarRange className="h-4 w-4 mr-1" /> },
              { view: Views.DAY, label: 'Day', icon: <Calendar className="h-4 w-4 mr-1" /> },
              { view: Views.AGENDA, label: 'Agenda', icon: <List className="h-4 w-4 mr-1" /> },
            ].map((item) => (
              <button
                key={item.view}
                onClick={() => onView(item.view)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${
                  view === item.view 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
     </Wrapper>
  );
};

const CustomEvent = ({ event }) => {
  return (
    <div className="p-1">
      <strong className="block text-sm font-medium truncate">{event.title}</strong>
      <span className="text-xs opacity-80 capitalize">{event.category}</span>
    </div>
  );
};

export default MyCalendar;