const statusEl = document.getElementById('status');
const calendarEl = document.getElementById('calendar');
const noticeEl = document.getElementById('notice');
const assumptionsEl = document.getElementById('assumptions');
const homeLabel = document.getElementById('home-label');
const radiusLabel = document.getElementById('radius-label');

function setStatus(msg, isError = false) {
  statusEl.textContent = msg;
  statusEl.classList.toggle('error', isError);
}

function renderSchedule(data) {
  homeLabel.textContent = data.home.postcode;
  radiusLabel.textContent = String(data.workingRadiusMiles);

  noticeEl.textContent = data.dataSource.note;
  noticeEl.classList.remove('hidden');

  const c = data.costAssumptions;
  assumptionsEl.textContent = `Assumptions: fuel £${c.fuelPerMile.toFixed(2)}/mi · Uber commission ${(c.uberCommissionRate * 100).toFixed(0)}% · insurance £${c.insurancePerHour.toFixed(2)}/hr · travel ${c.travelSpeedMph} mph · ~${c.workingMilesPerHour} mi/hr while working.`;

  const bestNet = Math.max(...data.days.map((d) => d.recommendation?.netPerHour ?? 0));

  calendarEl.innerHTML = data.days
    .map((day) => {
      const rec = day.recommendation;
      const isBest = rec?.netPerHour === bestNet && bestNet > 0;
      const maxBar = Math.max(...day.hourlyProfile.map((h) => h.netPerHour), 1);

      const bars = day.hourlyProfile
        .map((h) => {
          const pct = Math.max(4, (h.netPerHour / maxBar) * 100);
          const inShift =
            rec &&
            h.hour >= rec.startHour &&
            h.hour < rec.startHour + rec.shiftHours;
          return `<div class="bar${inShift ? ' recommended' : ''}" style="height:${pct}%" title="${h.label}: £${h.netPerHour.toFixed(2)}/hr net${h.zoneLabel ? ` · ${h.zoneLabel}` : ''}"></div>`;
        })
        .join('');

      return `
        <article class="day-card${isBest ? ' best-day' : ''}">
          <div class="day-header">
            <div class="day-date">${day.label}</div>
            <div class="day-weekday">${day.weekday}</div>
          </div>

          <div class="shift-rec">
            ${isBest ? '<span class="badge">Best day</span>' : '<span class="badge">Recommended shift</span>'}
            <div class="time">${rec.shiftHours}h · ${rec.shiftWindow}</div>
            <div class="area">${rec.zoneLabel}</div>
            <div class="meta">
              Travel: ${rec.travelMilesOneWay} mi one-way (~${rec.travelMinutesOneWay} min) ·
              round-trip fuel £${rec.costs.fuelTravel.toFixed(2)}
            </div>
            <div class="net-highlight">
              <span class="amount">£${rec.netPerHour.toFixed(2)}</span>
              <span class="unit">net / hr (incl. travel time)</span>
            </div>
            <div class="meta">
              Shift net £${rec.netTotal.toFixed(2)} · gross £${rec.grossTotal.toFixed(2)}
            </div>
          </div>

          <div>
            <div class="chart-label">Net £/hr by hour (00–23)</div>
            <div class="bar-chart" role="img" aria-label="Hourly net earnings bar chart">${bars}</div>
          </div>

          <div class="cost-breakdown">
            Costs: fuel £${rec.costs.fuel.toFixed(2)} · commission £${rec.costs.commission.toFixed(2)} · insurance £${rec.costs.insurance.toFixed(2)}
          </div>
        </article>`;
    })
    .join('');

  setStatus(`Schedule updated ${new Date(data.generatedAt).toLocaleString('en-GB')}.`);
}

async function load() {
  setStatus('Loading schedule…');
  try {
    const res = await fetch('/api/schedule');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load schedule');
    renderSchedule(data);
  } catch (err) {
    setStatus(err.message || 'Something went wrong.', true);
  }
}

load();
