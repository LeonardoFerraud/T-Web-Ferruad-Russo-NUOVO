type ActivityFeedProps = {
  activities: string[];
};

function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <section className="card">
      <h3>Attività recenti</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity}>{activity}</li>
        ))}
      </ul>
    </section>
  );
}

export default ActivityFeed;
