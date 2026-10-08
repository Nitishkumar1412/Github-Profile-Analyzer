export default function Heatmap({ data }) {
  if (!data?.length) return <div className="card"><h3>Contribution heatmap</h3><p className="muted">Heatmap is unavailable right now.</p></div>;
  const pad = new Date(data[0].date).getUTCDay();
  const cells = [...Array(pad).fill(null), ...data];
  return (
    <div className="card">
      <h3>Contribution heatmap <span className="muted small">last 12 months</span></h3>
      <div className="heat-scroll">
        <div className="heat">
          {cells.map((d, i) =>
            d ? <span key={i} className={`cell l${d.level}`} title={`${d.count} contributions on ${d.date}`}
                  style={{ animationDelay: `${Math.floor(i / 7) * 14}ms` }} />
              : <span key={i} />
          )}
        </div>
      </div>
      <div className="heat-legend muted small">Less {[0, 1, 2, 3, 4].map((l) => <span key={l} className={`cell l${l}`} />)} More</div>
    </div>
  );
}
