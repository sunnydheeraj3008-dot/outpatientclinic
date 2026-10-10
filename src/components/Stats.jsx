function Stats({ appointments }) {
    const stats = [
        {
            label: "Total Appointments",
            value: appointments.length
        },
        {
            label: "Scheduled",
            value: appointments.filter(
                (a) => a.status === "Scheduled"
            ).length
        },
        {
            label: "Completed",
            value: appointments.filter(
                (a) => a.status === "Completed"
            ).length
        },
        {
            label: "Cancelled",
            value: appointments.filter(
                (a) => a.status === "Cancelled"
            ).length
        }
    ];

    return (
        <section className="stats">
            {stats.map((stat) => (
                <article className="stat-card" key={stat.label}>
                    <div className="stat-label">{stat.label}</div>
                    <div className="stat-value">{stat.value}</div>
                </article>
            ))}
        </section>
    );
}

export default Stats;
