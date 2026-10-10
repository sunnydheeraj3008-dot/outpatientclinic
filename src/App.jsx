import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Stats from "./components/Stats";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

function App() {
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            patientName: "Rahul Kumar",
            age: 24,
            phone: "9876543210",
            doctor: "Dr. Sharma",
            date: "2026-10-05",
            time: "09:00",
            reason: "General Checkup",
            status: "Scheduled"
        },
        {
            id: 2,
            patientName: "Priya Singh",
            age: 31,
            phone: "9876501234",
            doctor: "Dr. Kumar",
            date: "2026-10-05",
            time: "09:30",
            reason: "Fever",
            status: "Completed"
        },
        {
            id: 3,
            patientName: "Arjun Reddy",
            age: 28,
            phone: "9123456789",
            doctor: "Dr. Sharma",
            date: "2026-10-05",
            time: "10:00",
            reason: "Headache",
            status: "Scheduled"
        }
    ]);

    function addAppointment(newAppointment) {
        setAppointments((current) => [
            ...current,
            {
                id: Date.now(),
                ...newAppointment,
                status: "Scheduled"
            }
        ]);
    }

    function updateStatus(id, status) {
        setAppointments((current) =>
            current.map((appointment) =>
                appointment.id === id
                    ? { ...appointment, status }
                    : appointment
            )
        );
    }

    function deleteAppointment(id) {
        setAppointments((current) =>
            current.filter((appointment) => appointment.id !== id)
        );
    }

    return (
        <div className="app">
            <Header />

            <main className="container">
                <Stats appointments={appointments} />

                <div className="content-grid">
                    <AppointmentForm
                        appointments={appointments}
                        onAddAppointment={addAppointment}
                    />

                    <AppointmentList
                        appointments={appointments}
                        onUpdateStatus={updateStatus}
                        onDeleteAppointment={deleteAppointment}
                    />
                </div>
            </main>
        </div>
    );
}

export default App;
