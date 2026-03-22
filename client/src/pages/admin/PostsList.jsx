import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  ChevronRight,
  ChevronLeft,
  CheckSquare,
  Square,
} from "lucide-react";

const mockPosts = [
  {
    id: 1,
    title: "The Minimalism of Digital Architecture",
    category: "Design",
    date: "Mar 12, 2026",
    status: "Published",
  },
  {
    id: 2,
    title: "Optimizing React with Framer Motion",
    category: "Technical",
    date: "Mar 08, 2026",
    status: "Draft",
  },
  {
    id: 3,
    title: "System Status: Spring 2026 Update",
    category: "Research",
    date: "Feb 28, 2026",
    status: "Published",
  },
];

const PostList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState([]);

  const filteredData = useMemo(() => {
    return mockPosts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === filteredData.length) setSelected([]);
    else setSelected(filteredData.map((p) => p.id));
  };

  return (
    <div className="min-h-screen bg-main p-8 transition-colors">
      <Helmet>
        <title>Management Ledger | INKWELL</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* --- KPI SECTION --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Nodes", val: "104", color: "text-brand-primary" },
            { label: "Live Deployment", val: "82", color: "text-success" },
            { label: "Staging/Draft", val: "22", color: "text-warning" },
            { label: "System Uptime", val: "99.9%", color: "text-info" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-card border border-border-soft p-5 rounded-3xl shadow-sm"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-txt-muted mb-2">
                {stat.label}
              </p>
              <p
                className={`text-3xl font-semibold tracking-tight ${stat.color}`}
              >
                {stat.val}
              </p>
            </div>
          ))}
        </div>

        {/* --- SEARCH & ACTIONS --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex flex-1 items-center gap-3 w-full">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-txt-muted/40"
                size={16}
              />
              <input
                type="text"
                placeholder="Search system archive..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-card border border-border-soft rounded-2xl pl-12 pr-4 py-3 text-sm focus:border-brand-primary/40 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all font-normal text-txt-main"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-card border border-border-soft rounded-2xl px-5 py-3 text-[10px] font-medium uppercase tracking-widest outline-none cursor-pointer hover:border-border-base transition-colors"
            >
              <option value="All">All States</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <button
            onClick={() => navigate("/admin/posts/add")}
            className="w-full lg:w-auto flex items-center justify-center gap-3 bg-brand-primary text-white px-8 py-3.5 rounded-2xl font-medium text-[10px] uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-xl shadow-brand-primary/20"
          >
            <Plus size={18} /> New Entry
          </button>
        </div>

        {/* --- DATA TABLE --- */}
        <div className="bg-card border border-border-soft rounded-[2rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border-soft bg-soft/10">
                  <th className="p-6 w-12 text-center">
                    <button
                      onClick={toggleSelectAll}
                      className="text-txt-muted/30 hover:text-brand-primary transition-colors"
                    >
                      {selected.length > 0 &&
                      selected.length === filteredData.length ? (
                        <CheckSquare size={18} className="text-brand-primary" />
                      ) : (
                        <Square size={18} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-5 text-left text-[10px] font-medium uppercase tracking-[0.2em] text-txt-muted">
                    Identifier
                  </th>
                  <th className="px-6 py-5 text-left text-[10px] font-medium uppercase tracking-[0.2em] text-txt-muted">
                    Taxonomy
                  </th>
                  <th className="px-6 py-5 text-left text-[10px] font-medium uppercase tracking-[0.2em] text-txt-muted">
                    Status
                  </th>
                  <th className="px-6 py-5 text-left text-[10px] font-medium uppercase tracking-[0.2em] text-txt-muted">
                    Created
                  </th>
                  <th className="px-6 py-5 text-right text-[10px] font-medium uppercase tracking-[0.2em] text-txt-muted">
                    Commands
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft/30">
                {filteredData.map((post) => (
                  <tr
                    key={post.id}
                    className="group hover:bg-soft/5 transition-all"
                  >
                    <td className="p-6 text-center">
                      <button
                        onClick={() => toggleSelect(post.id)}
                        className="text-txt-muted/20 hover:text-brand-primary transition-colors"
                      >
                        {selected.includes(post.id) ? (
                          <CheckSquare
                            size={18}
                            className="text-brand-primary"
                          />
                        ) : (
                          <Square size={18} />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-txt-main group-hover:text-brand-primary transition-colors cursor-pointer leading-none mb-1.5">
                          {post.title}
                        </span>
                        <span className="text-[10px] text-txt-muted/50 font-mono tracking-tighter">
                          REF_ID: {post.id.toString().padStart(4, "0")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-3 py-1 rounded-lg border border-border-soft bg-soft/20 text-txt-muted text-[9px] font-medium uppercase tracking-widest">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-2 h-2 rounded-full ${post.status === "Published" ? "bg-success" : "bg-warning"}`}
                        />
                        <span className="text-[10px] font-medium uppercase tracking-widest text-txt-main/70">
                          {post.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-[11px] font-normal text-txt-muted font-mono">
                        {post.date}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <button className="p-2.5 bg-white dark:bg-card border border-border-soft rounded-xl text-txt-muted hover:text-brand-primary transition-all">
                          <Edit3 size={14} />
                        </button>
                        <button className="p-2.5 bg-danger/5 rounded-xl text-danger/60 hover:text-danger transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- FOOTER --- */}
          <div className="p-8 bg-soft/5 border-t border-border-soft flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-[10px] font-medium text-txt-muted uppercase tracking-[0.3em]">
                Registry_Page{" "}
                <span className="text-brand-primary ml-1 font-semibold">
                  01 / 12
                </span>
              </div>
              {selected.length > 0 && (
                <button className="flex items-center gap-2 text-[10px] font-medium text-danger uppercase tracking-[0.2em]">
                  <Trash2 size={12} /> Purge {selected.length} Selected
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 rounded-2xl border border-border-soft bg-card text-txt-muted hover:text-brand-primary transition-all shadow-sm">
                <ChevronLeft size={16} />
              </button>
              <button className="p-3 rounded-2xl border border-border-soft bg-card text-txt-muted hover:text-brand-primary transition-all shadow-sm">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
