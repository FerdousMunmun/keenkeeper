
import React, { useEffect, useMemo, useState } from "react";
import {
  Home,
  Clock3,
  BarChart3,
  UserPlus,
  Mail,
  Phone,
  MessageSquare,
  Video,
  Archive,
  Trash2,
  AlarmClock,
  Search,
  ChevronDown,
  Link,
  Share2,
  Globe,

  Handshake,
  ArrowLeft,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const friendsSeed = [
  {
    id: 1,
    name: "Emma Wilson",
    picture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    email: "emma.wilson@example.com",
    days_since_contact: 62,
    status: "overdue",
    tags: ["family"],
    bio: "Former colleague turned trusted friend. Always gives thoughtful advice and keeps me grounded.",
    goal: 30,
    next_due_date: "2026-02-27",
  },
  {
    id: 2,
    name: "David Kim",
    picture:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    email: "david.kim@example.com",
    days_since_contact: 24,
    status: "almost due",
    tags: ["work"],
    bio: "Ex-teammate and one of the best people to brainstorm startup ideas with over coffee.",
    goal: 21,
    next_due_date: "2026-03-18",
  },
  {
    id: 3,
    name: "Lisa Nakamura",
    picture:
      "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=300&q=80",
    email: "lisa.nakamura@example.com",
    days_since_contact: 42,
    status: "overdue",
    tags: ["work"],
    bio: "Creative collaborator from a previous product team. We always swap book recommendations.",
    goal: 28,
    next_due_date: "2026-03-11",
  },
  {
    id: 4,
    name: "James Wright",
    picture:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    email: "james.wright@example.com",
    days_since_contact: 18,
    status: "on-track",
    tags: ["hobby", "travel"],
    bio: "Travel buddy and hiking partner. Usually the first person I message when planning a weekend trip.",
    goal: 30,
    next_due_date: "2026-03-30",
  },
  {
    id: 5,
    name: "Sarah Chen",
    picture:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
    email: "sarah.chen@example.com",
    days_since_contact: 12,
    status: "on-track",
    tags: ["college", "close friend"],
    bio: "Met in university. Long walks, deep talks, and very spontaneous brunch plans.",
    goal: 20,
    next_due_date: "2026-04-02",
  },
  {
    id: 6,
    name: "Aisha Patel",
    picture:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    email: "aisha.patel@example.com",
    days_since_contact: 29,
    status: "almost due",
    tags: ["mentor"],
    bio: "A warm mentor who checks in with encouragement and practical wisdom.",
    goal: 30,
    next_due_date: "2026-03-19",
  },
  {
    id: 7,
    name: "Marcus Johnson",
    picture:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80",
    email: "marcus.johnson@example.com",
    days_since_contact: 33,
    status: "overdue",
    tags: ["gym", "neighbor"],
    bio: "Neighborhood friend and accountability buddy for fitness goals.",
    goal: 14,
    next_due_date: "2026-03-06",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    picture:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    email: "olivia.martinez@example.com",
    days_since_contact: 9,
    status: "on-track",
    tags: ["design", "friend"],
    bio: "Designer friend with sharp taste and endless curiosity about art and culture.",
    goal: 21,
    next_due_date: "2026-04-05",
  },
];

const defaultTimeline = [
  { id: 101, type: "meetup", friendName: "Tom Baker", date: "2026-03-29" },
  { id: 102, type: "text", friendName: "Sarah Chen", date: "2026-03-28" },
  { id: 103, type: "meetup", friendName: "Olivia Martinez", date: "2026-03-26" },
  { id: 104, type: "video", friendName: "Aisha Patel", date: "2026-03-23" },
  { id: 105, type: "meetup", friendName: "Sarah Chen", date: "2026-03-21" },
  { id: 106, type: "call", friendName: "Marcus Johnson", date: "2026-03-19" },
  { id: 107, type: "meetup", friendName: "Aisha Patel", date: "2026-03-17" },
  { id: 108, type: "text", friendName: "Olivia Martinez", date: "2026-03-13" },
  { id: 109, type: "call", friendName: "Lisa Nakamura", date: "2026-03-11" },
  { id: 110, type: "call", friendName: "Sarah Chen", date: "2026-03-11" },
  { id: 111, type: "video", friendName: "Marcus Johnson", date: "2026-03-06" },
  { id: 112, type: "video", friendName: "Ryan O'Brien", date: "2026-02-24" },
];

const statusStyles = {
  overdue: "bg-red-500 text-white",
  "almost due": "bg-amber-400 text-white",
  "on-track": "bg-emerald-700 text-white",
};

const tagStyles = {
  family: "bg-emerald-100 text-emerald-700",
  work: "bg-emerald-100 text-emerald-700",
  hobby: "bg-emerald-100 text-emerald-700",
  travel: "bg-emerald-100 text-emerald-700",
  college: "bg-emerald-100 text-emerald-700",
  mentor: "bg-emerald-100 text-emerald-700",
  friend: "bg-emerald-100 text-emerald-700",
  design: "bg-emerald-100 text-emerald-700",
  gym: "bg-emerald-100 text-emerald-700",
  neighbor: "bg-emerald-100 text-emerald-700",
  "close friend": "bg-emerald-100 text-emerald-700",
};

const interactionMeta = {
  call: { label: "Call", icon: Phone },
  text: { label: "Text", icon: MessageSquare },
  video: { label: "Video", icon: Video },
  meetup: { label: "Meetup", icon: Handshake },
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getHashRoute() {
  return window.location.hash.replace(/^#/, "") || "/";
}

function useHashRoute() {
  const [route, setRoute] = useState(getHashRoute());

  useEffect(() => {
    const onHash = () => setRoute(getHashRoute());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) window.location.hash = "/";
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (to) => {
    window.location.hash = to;
  };

  return { route, navigate };
}

function usePersistentTimeline() {
  const [timeline, setTimeline] = useState(() => {
    const saved = localStorage.getItem("keenkeeper-timeline");
    return saved ? JSON.parse(saved) : defaultTimeline;
  });

  useEffect(() => {
    localStorage.setItem("keenkeeper-timeline", JSON.stringify(timeline));
  }, [timeline]);

  return [timeline, setTimeline];
}

function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-5 right-5 z-50 rounded-2xl bg-emerald-900 px-4 py-3 text-sm text-white shadow-2xl"
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Shell({ children, route, navigate }) {
  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/timeline", label: "Timeline", icon: Clock3 },
    { to: "/stats", label: "Stats", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="text-xl font-extrabold tracking-tight text-slate-900"
          >
            KeenKeeper
          </button>

          <nav className="flex items-center gap-2 text-sm">
            {links.map((link) => {
              const Icon = link.icon;
              const active =
                route === link.to || (link.to !== "/" && route.startsWith(link.to));

              return (
                <button
                  key={link.to}
                  onClick={() => navigate(link.to)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 transition ${
                    active
                      ? "bg-emerald-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-4xl font-bold text-emerald-900">{value}</div>
      <div className="mt-2 text-sm text-slate-500">{label}</div>
    </div>
  );
}

function FriendCard({ friend, onOpen }) {
  return (
    <button
      onClick={() => onOpen(friend.id)}
      className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="mx-auto h-16 w-16 rounded-full object-cover"
      />
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{friend.name}</h3>
      <p className="mt-1 text-xs text-slate-400">{friend.days_since_contact}d ago</p>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {friend.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium capitalize ${
              tagStyles[tag] || "bg-slate-100 text-slate-600"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3">
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${statusStyles[friend.status]}`}
        >
          {friend.status}
        </span>
      </div>
    </button>
  );
}

function HomePage({ friends, navigate }) {
  const total = friends.length;
  const onTrack = friends.filter((f) => f.status === "on-track").length;
  const attention = friends.filter((f) => f.status !== "on-track").length;
  const interactions = 12;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Friends to keep close in your life
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500">
          Your personal shelf of meaningful connections. Browse, tend, and nurture
          the relationships that matter most.
        </p>
        <div className="mt-6">
          <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow">
            <UserPlus className="h-4 w-4" />
            Add a Friend
          </button>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard value={total} label="Total Friends" />
        <StatCard value={onTrack} label="On Track" />
        <StatCard value={attention} label="Need Attention" />
        <StatCard value={interactions} label="Interactions This Month" />
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Your Friends</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              onOpen={(id) => navigate(`/friend/${id}`)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function DetailPage({ friend, addInteraction, navigate }) {
  if (!friend) return <NotFound navigate={navigate} />;

  const quickActions = ["call", "text", "video"];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <button
        onClick={() => navigate("/")}
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </button>

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <img
              src={friend.picture}
              alt={friend.name}
              className="mx-auto h-20 w-20 rounded-full object-cover"
            />
            <h1 className="mt-4 text-2xl font-bold text-slate-900">{friend.name}</h1>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${statusStyles[friend.status]}`}
              >
                {friend.status}
              </span>
              {friend.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium capitalize ${
                    tagStyles[tag] || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm italic leading-6 text-slate-500">“{friend.bio}”</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
              <Mail className="h-4 w-4" />
              {friend.email}
            </div>
          </div>

          <div className="space-y-2">
            <ActionButton icon={AlarmClock} label="Snooze 2 Weeks" />
            <ActionButton icon={Archive} label="Archive" />
            <ActionButton icon={Trash2} label="Delete" destructive />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard value={friend.days_since_contact} label="Days Since Contact" />
            <StatCard value={friend.goal} label="Goal (Days)" />
            <StatCard value={formatDate(friend.next_due_date)} label="Next Due" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-900">Relationship Goal</h3>
                <p className="mt-3 text-slate-500">
                  Connect every <span className="font-semibold text-slate-800">{friend.goal} days</span>
                </p>
              </div>
              <button className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900">Quick Check-In</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {quickActions.map((type) => {
                const meta = interactionMeta[type];
                const Icon = meta.icon;
                return (
                  <button
                    key={type}
                    onClick={() => addInteraction(type, friend.name)}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:bg-slate-100"
                  >
                    <Icon className="mx-auto h-6 w-6 text-slate-700" />
                    <div className="mt-2 text-sm font-medium text-slate-800">{meta.label}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ActionButton({ icon: Icon, label, destructive = false }) {
  return (
    <button
      className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm shadow-sm ${
        destructive
          ? "border-red-100 bg-white text-red-500"
          : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function TimelinePage({ timeline }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  const visible = useMemo(() => {
    let items = timeline.filter((item) => (filter === "all" ? true : item.type === filter));

    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (item) =>
          item.friendName.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
      );
    }

    items = [...items].sort((a, b) => {
      const diff = new Date(a.date) - new Date(b.date);
      return sort === "newest" ? -diff : diff;
    });

    return items;
  }, [timeline, filter, query, sort]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">Timeline</h1>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by friend or interaction"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-emerald-400"
            />
          </div>

          <SelectLike
            value={filter}
            onChange={setFilter}
            options={[
              ["all", "Filter timeline"],
              ["call", "Call"],
              ["text", "Text"],
              ["video", "Video"],
              ["meetup", "Meetup"],
            ]}
          />

          <SelectLike
            value={sort}
            onChange={setSort}
            options={[
              ["newest", "Newest first"],
              ["oldest", "Oldest first"],
            ]}
          />
        </div>
      </section>

      <div className="mt-4 space-y-3">
        {visible.map((entry) => {
          const meta = interactionMeta[entry.type];
          const Icon = meta.icon;

          return (
            <div
              key={entry.id}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-semibold text-slate-800">
                    {meta.label} <span className="font-normal text-slate-500">with {entry.friendName}</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-500">{formatDate(entry.date)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

function SelectLike({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
      >
        {options.map(([v, label]) => (
          <option key={v} value={v}>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-slate-400" />
    </div>
  );
}

function StatsPage({ timeline }) {
  const counts = useMemo(() => {
    const base = { text: 0, call: 0, video: 0 };
    timeline.forEach((item) => {
      if (item.type in base) base[item.type] += 1;
    });

    return [
      { name: "Text", value: base.text, color: "#7C3AED" },
      { name: "Call", value: base.call, color: "#1F4D43" },
      { name: "Video", value: base.video, color: "#47A36B" },
    ];
  }, [timeline]);

  return (
    <>
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
          Friendship Analytics
        </h1>

        <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-700">By Interaction Type</h2>
          <div className="mt-8 h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={counts}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={6}
                  dataKey="value"
                >
                  {counts.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="-mt-2 flex items-center justify-center gap-6 text-sm text-slate-500">
            {counts.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                {item.name}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* <footer className="mt-16 bg-emerald-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <div className="text-6xl font-extrabold tracking-tight">KeenKeeper</div>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-emerald-50/80">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>

          <div className="mt-8">
            <h3 className="text-base font-semibold">Social Links</h3>
            <div className="mt-4 flex justify-center gap-3">
              {[Link,Share2,Globe].map((Icon, idx) => (
                <button
                  key={idx}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-800"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-emerald-50/60 md:flex-row">
            <div>© 2026 KeenKeeper. All rights reserved.</div>
            <div className="flex gap-6">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </footer> */}
    </>
  );
}

function NotFound({ navigate }) {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
      <div className="text-7xl font-extrabold text-emerald-900">404</div>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-500">The page you were looking for does not exist.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white"
      >
        Go Home
      </button>
    </main>
  );
}

function LoadingScreen() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid place-items-center rounded-[28px] border border-slate-200 bg-white px-6 py-20 shadow-sm">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-emerald-900"
        />
        <p className="mt-4 text-sm text-slate-500">Loading your meaningful connections...</p>
      </div>
    </div>
  );
}

export default function KeenKeeperApp() {
  const { route, navigate } = useHashRoute();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = usePersistentTimeline();
  const [toast, setToast] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(friendsSeed);
      setLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const addInteraction = (type, friendName) => {
    const today = new Date().toISOString().slice(0, 10);

    setTimeline((prev) => [
      {
        id: Date.now(),
        type,
        friendName,
        date: today,
      },
      ...prev,
    ]);

    const label = interactionMeta[type].label;
    setToast(`${label} logged with ${friendName}`);
    navigate("/timeline");
  };

  let page = null;

  if (loading && route === "/") {
    page = <LoadingScreen />;
  } else if (route === "/") {
    page = <HomePage friends={friends} navigate={navigate} />;
  } else if (route.startsWith("/friend/")) {
    const id = Number(route.split("/")[2]);
    const friend = friendsSeed.find((f) => f.id === id);
    page = <DetailPage friend={friend} addInteraction={addInteraction} navigate={navigate} />;
  } else if (route === "/timeline") {
    page = <TimelinePage timeline={timeline} />;
  } else if (route === "/stats") {
    page = <StatsPage timeline={timeline} />;
  } else {
    page = <NotFound navigate={navigate} />;
  }





  function Shell({ children, route, navigate }) {
const links = [
{ to: "/", label: "Home", icon: Home },
{ to: "/timeline", label: "Timeline", icon: Clock3 },
{ to: "/stats", label: "Stats", icon: BarChart3 },
];

return (
<div className="min-h-screen bg-slate-100 text-slate-800">
<header className="border-b border-slate-200 bg-white/95 backdrop-blur">
<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
<button
onClick={() => navigate("/")}
className="text-xl font-extrabold tracking-tight text-slate-900"
>
KeenKeeper
</button>

<nav className="flex items-center gap-2 text-sm">
{links.map((link) => {
const Icon = link.icon;
const active =
route === link.to || (link.to !== "/" && route.startsWith(link.to));

return (
<button
key={link.to}
onClick={() => navigate(link.to)}
className={`flex items-center gap-2 rounded-xl px-3 py-2 transition ${
active
? "bg-emerald-900 text-white"
: "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
}`}
>
<Icon className="h-4 w-4" />
<span>{link.label}</span>
</button>
);
})}
</nav>
</div>
</header>

{children}

<footer className="mt-16 bg-emerald-900 text-white">
<div className="mx-auto max-w-6xl px-6 py-16 text-center">
<div className="text-6xl font-extrabold tracking-tight">KeenKeeper</div>
<p className="mx-auto mt-4 max-w-2xl text-sm text-emerald-50/80">
Your personal shelf of meaningful connections. Browse, tend, and nurture
the relationships that matter most.
</p>

<div className="mt-8">
<h3 className="text-base font-semibold">Social Links</h3>
<div className="mt-4 flex justify-center gap-3">
{[Link, Share2, Globe].map((Icon, idx) => (
<button
key={idx}
className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-800"
>
<Icon className="h-4 w-4" />
</button>
))}
</div>
</div>

<div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-emerald-50/60 md:flex-row">
<div>© 2026 KeenKeeper. All rights reserved.</div>
<div className="flex gap-6">
<span>Privacy Policy</span>
<span>Terms of Service</span>
<span>Cookies</span>
</div>
</div>
</div>
</footer>
</div>
);
}
  return (
    <Shell route={route} navigate={navigate}>
      {page}
      <Toast toast={toast} />
      
    </Shell>
   
  );
}