import { useState } from "react";
import doctors from "../data/doctors";

function AppointmentList({
    appointments,
    onUpdateStatus,
    onDeleteAppointment
}) {
    const [search, setSearch] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");

    const filteredAppointments = appointments.filter((appointment) => {
        const matchesSearch = appointment.patientName
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesDoctor =
            selectedDoctor === "" ||
            appointment.doctor === selectedDoctor;

        return matchesSearch && matchesDoctor;
    });

    function statusClass(status) {
        if (status === "Completed") return "status status-completed";
        if (status === "Cancelled") return "status status-cancelled";
        return "status status-scheduled";
    }

    return (
        <section className="card">
            <div className="list-header">
                <div>
                    <h2>Appointments</h2>
                    <p className="card-subtitle">
                        View and manage scheduled patient visits.
                    </p>
                </div>

                <div className="filters">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search patient..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />

                    <select
                        className="doctor-filter"
                        value={selectedDoctor}
                        onChange={(event) =>
                            setSelectedDoctor(event.target.value)
                        }
                    >
                        <option value="">All Doctors</option>

                        {doctors.map((doctor) => (
                            <option key={doctor} value={doctor}>
                                {doctor}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredAppointments.length === 0 ? (
                <div className="empty-state">
                    <p>No appointments found.</p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="appointment-table">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Doctor</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredAppointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>
                                        <div className="patient-name">
                                            {appointment.patientName}
                                        </div>
                                        <div className="patient-phone">
                                            {appointment.phone}
                                        </div>
                                    </td>

                                    <td>{appointment.doctor}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.reason}</td>

                                    <td>
                                        <span className={statusClass(appointment.status)}>
                                            {appointment.status}
                                        </span>
                                    </td>

                                    <td>
                                        {appointment.status === "Scheduled" && (
                                            <>
                                                <button
                                                    className="action-button complete"
                                                    onClick={() =>
                                                        onUpdateStatus(
                                                            appointment.id,
                                                            "Completed"
                                                        )
                                                    }
                                                >
                                                    Complete
                                                </button>

                                                <button
                                                    className="action-button cancel"
                                                    onClick={() =>
                                                        onUpdateStatus(
                                                            appointment.id,
                                                            "Cancelled"
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}

                                        <button
                                            className="action-button delete"
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        "Delete this appointment?"
                                                    )
                                                ) {
                                                    onDeleteAppointment(
                                                        appointment.id
                                                    );
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default AppointmentList;
