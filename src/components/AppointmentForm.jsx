import { useState } from "react";
import doctors from "../data/doctors";

function AppointmentForm({ appointments, onAddAppointment }) {
    const [form, setForm] = useState({
        patientName: "",
        age: "",
        phone: "",
        doctor: "",
        date: "",
        time: "",
        reason: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (Object.values(form).some((value) => !value.trim())) {
            alert("Please fill all fields.");
            return;
        }

        const conflict = appointments.some(
            (appointment) =>
                appointment.doctor === form.doctor &&
                appointment.date === form.date &&
                appointment.time === form.time &&
                appointment.status !== "Cancelled"
        );

        if (conflict) {
            alert(
                `${form.doctor} already has an appointment at ${form.time} on ${form.date}.`
            );
            return;
        }

        onAddAppointment(form);

        setForm({
            patientName: "",
            age: "",
            phone: "",
            doctor: "",
            date: "",
            time: "",
            reason: ""
        });
    }

    return (
        <section className="card">
            <h2>Book Appointment</h2>
            <p className="card-subtitle">
                Enter patient details to schedule a visit.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="patientName">Patient Name</label>
                    <input
                        id="patientName"
                        name="patientName"
                        type="text"
                        value={form.patientName}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Kumar"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            min="1"
                            max="120"
                            value={form.age}
                            onChange={handleChange}
                            placeholder="Age"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="doctor">Doctor</label>
                    <select
                        id="doctor"
                        name="doctor"
                        value={form.doctor}
                        onChange={handleChange}
                    >
                        <option value="">Select doctor</option>

                        {doctors.map((doctor) => (
                            <option key={doctor} value={doctor}>
                                {doctor}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={form.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="time">Time</label>
                        <input
                            id="time"
                            name="time"
                            type="time"
                            value={form.time}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="reason">Reason for Visit</label>
                    <textarea
                        id="reason"
                        name="reason"
                        rows="3"
                        value={form.reason}
                        onChange={handleChange}
                        placeholder="e.g. General checkup"
                    />
                </div>

                <button className="primary-button" type="submit">
                    Book Appointment
                </button>
            </form>
        </section>
    );
}

export default AppointmentForm;
