import { ArrowRight, BarChart3, Bell, BookOpen, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import AlertBanner from "../components/AlertBanner";
import ChartCard from "../components/ChartCard";
import PageIntro from "../components/PageIntro";
import StatCard from "../components/StatCard";
import WorkshopCard from "../components/WorkshopCard";
import { learnerOverview, completionTrend, calendarEvents } from "../data/analytics";
import { recentActivities } from "../data/notifications";
import { fetchMyWorkshops } from "../services/api";

function UserDashboardPage() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadWorkshops = async () => {
      try {
        const data = await fetchMyWorkshops();

        if (isMounted) {
          setWorkshops(data.slice(0, 2));
        }
      } catch (error) {
        console.error("Error fetching dashboard workshops:", error);
      }
    };

    loadWorkshops();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container">
      <PageIntro
        eyebrow="Learner dashboard"
        title="Stay on top of workshops, progress, and upcoming learning moments."
        description="This learner workspace surfaces key progress signals, upcoming sessions, and quick actions in a calm, premium dashboard."
        actions={
          <Link className="button button-primary" to="/app/workshops">
            Browse more workshops
            <ArrowRight size={16} />
          </Link>
        }
      />

      <AlertBanner
        title="Your next live session starts in 18 hours"
        description="AI Product Strategy Sprint has a live kickoff scheduled for tomorrow at 7:00 PM IST."
        action={<Link className="button button-secondary" to="/app/my-workshops">Open schedule</Link>}
      />

      <section className="page-section" style={{ paddingTop: "1.4rem" }}>
        <div className="stat-grid">
          {learnerOverview.map((stat, index) => {
            const icons = [GraduationCap, BookOpen, BarChart3, Bell];
            const Icon = icons[index];

            return <StatCard key={stat.label} delta={stat.delta} icon={Icon} label={stat.label} value={stat.value} />;
          })}
        </div>
      </section>

      <section className="dashboard-grid">
        <ChartCard
          title="Learning momentum"
          subtitle="Completion trend across your current workshop modules"
        >
          <ResponsiveContainer height={280} width="100%">
            <AreaChart data={completionTrend}>
              <defs>
                <linearGradient id="completionGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#57F5FF" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#57F5FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3c4" />
              <Tooltip
                contentStyle={{
                  background: "rgba(10,15,32,0.92)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 18,
                }}
              />
              <Area
                dataKey="completion"
                stroke="#57F5FF"
                fill="url(#completionGradient)"
                strokeWidth={3}
                type="monotone"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="stack">
          <div className="data-card">
            <div className="data-card-head">
              <h3 style={{ margin: 0 }}>Recent activity</h3>
              <span className="pill">Live feed</span>
            </div>
            <div className="activity-list">
              {recentActivities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="activity-item">
                  <strong>{activity.label}</strong>
                  <span className="muted">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="calendar-card">
            <div className="data-card-head">
              <h3 style={{ margin: 0 }}>Calendar</h3>
              <span className="pill">April</span>
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
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: "1.6rem" }}>
        <PageIntro
          eyebrow="Registered now"
          title="Your upcoming workshops"
          description="These cards mirror the public browsing experience while giving learners a more progress-aware context."
        />
        <div className="page-grid grid-2">
          {workshops.map((workshop) => (
            <WorkshopCard
              key={workshop.id}
              detailsHref={`/app/workshops/${workshop.id}`}
              registerAction={() => {}}
              workshop={workshop}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default UserDashboardPage;
