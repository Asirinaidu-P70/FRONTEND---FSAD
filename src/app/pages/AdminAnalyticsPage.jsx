import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartCard from "../components/ChartCard";
import PageIntro from "../components/PageIntro";
import {
  attendanceBreakdown,
  popularityData,
  registrationTrend,
} from "../data/analytics";

function AdminAnalyticsPage() {
  return (
    <div className="container">
      <PageIntro
        eyebrow="Analytics"
        title="Turn workshop data into a presentation-ready command center."
        description="Charts and graphs make the admin experience feel strategic, measurable, and much closer to a real SaaS platform."
      />

      <div className="page-grid grid-2">
        <ChartCard title="Registrations vs attendance" subtitle="Multi-metric comparison">
          <ResponsiveContainer height={300} width="100%">
            <BarChart data={registrationTrend}>
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
              <Legend />
              <Bar dataKey="registrations" fill="#57F5FF" radius={[10, 10, 0, 0]} />
              <Bar dataKey="attendance" fill="#7B5DFF" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Attendance split" subtitle="Session participation quality">
          <ResponsiveContainer height={300} width="100%">
            <PieChart>
              <Pie
                data={attendanceBreakdown}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={8}
                fill="#57F5FF"
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(10,15,32,0.92)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 18,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Category popularity radar" subtitle="High-demand program themes">
          <ResponsiveContainer height={320} width="100%">
            <RadarChart data={popularityData}>
              <PolarGrid stroke="rgba(255,255,255,0.12)" />
              <PolarAngleAxis dataKey="name" stroke="#94a3c4" />
              <Radar dataKey="popularity" fill="#FF9B71" fillOpacity={0.5} stroke="#FF9B71" />
              <Tooltip
                contentStyle={{
                  background: "rgba(10,15,32,0.92)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 18,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="data-card">
          <div className="data-card-head">
            <h3 style={{ margin: 0 }}>Insight highlights</h3>
            <span className="pill">Quarterly</span>
          </div>
          <div className="page-grid">
            <div className="activity-item">
              <strong>AI Product Strategy Sprint leads demand with 92 popularity points.</strong>
            </div>
            <div className="activity-item">
              <strong>Attendance remains healthy at 91%, suggesting strong reminder UX.</strong>
            </div>
            <div className="activity-item">
              <strong>Design Systems continues to fill fastest, indicating premium design demand.</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalyticsPage;
