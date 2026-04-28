import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, BarChart3, Briefcase, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AlertBanner from "../components/AlertBanner";
import ChartCard from "../components/ChartCard";
import PageIntro from "../components/PageIntro";
import StatCard from "../components/StatCard";
import { quickActions } from "../data/navigation";
import {
  adminOverview,
  calendarEvents,
  popularityData,
  registrationTrend,
} from "../data/analytics";
import { recentActivities } from "../data/notifications";

function AdminDashboardPage() {
  return (
    <div className="container">
      <PageIntro
        eyebrow="Admin dashboard"
        title="See registrations, workshop health, and learner momentum in one control center."
        description="The admin workspace focuses on operational clarity, chart-driven insights, and quick actions for day-to-day training management."
        actions={
          <Link className="button button-primary" to="/admin/workshops/new">
            Create workshop
            <ArrowRight size={16} />
          </Link>
        }
      />

      <AlertBanner
        title="Capacity alert: Design Systems for Fast Teams is almost full"
        description="Consider adding another cohort or moving the workshop to a larger session plan."
        action={<Link className="button button-secondary" to="/admin/workshops">Manage workshops</Link>}
      />

      <section className="page-section" style={{ paddingTop: "1.4rem" }}>
        <div className="stat-grid">
          {adminOverview.map((stat, index) => {
            const icons = [Briefcase, BarChart3, Users, Users];
            const Icon = icons[index];
            return <StatCard key={stat.label} delta={stat.delta} icon={Icon} label={stat.label} value={stat.value} />;
          })}
        </div>
      </section>

      <section className="dashboard-grid">
        <ChartCard title="Registration growth" subtitle="Monthly registrations and attendance trend">
          <ResponsiveContainer height={290} width="100%">
            <AreaChart data={registrationTrend}>
              <defs>
                <linearGradient id="adminRegistrationGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#57F5FF" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#57F5FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3c4" />
              <YAxis stroke="#94a3c4" />
              <Tooltip
                contentStyle={{
                  background: "rgba(10,15,32,0.92)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 18,
                }}
              />
              <Area dataKey="registrations" fill="url(#adminRegistrationGradient)" stroke="#57F5FF" strokeWidth={3} type="monotone" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="stack">
          <ChartCard title="Workshop popularity" subtitle="High-intent topics this quarter">
            <ResponsiveContainer height={230} width="100%">
              <BarChart data={popularityData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3c4" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,15,32,0.92)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 18,
                  }}
                />
                <Bar dataKey="popularity" fill="#7B5DFF" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="data-card">
            <div className="data-card-head">
              <h3 style={{ margin: 0 }}>Quick actions</h3>
              <span className="pill">Ops</span>
            </div>
            <div className="page-grid">
              {quickActions.map((action) => (
                <Link key={action.href} className="quick-action-card" to={action.href}>
                  <strong>{action.title}</strong>
                  <p className="muted" style={{ marginBottom: 0, marginTop: "0.35rem" }}>
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-grid" style={{ marginTop: "1rem" }}>
        <div className="data-card">
          <div className="data-card-head">
            <h3 style={{ margin: 0 }}>Recent activity</h3>
            <span className="pill">Realtime</span>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <strong>{activity.label}</strong>
                <span className="muted">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="calendar-card">
          <div className="data-card-head">
            <h3 style={{ margin: 0 }}>Calendar snapshot</h3>
            <span className="pill">This month</span>
          </div>
          <div className="calendar-list">
            {calendarEvents.map((event) => (
              <div key={event.title} className="calendar-item">
                <div className="calendar-date">{event.day}</div>
                <div>
                  <strong>{event.title}</strong>
                  <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                    {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;
