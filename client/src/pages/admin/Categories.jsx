import React from "react";
import { Helmet } from "react-helmet-async";
import { Plus, Edit3, Trash2 } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Literature",
    slug: "literature",
    posts: 124,
    status: "Published",
  },
  { id: 2, name: "Design", slug: "design", posts: 89, status: "Published" },
  { id: 3, name: "Technology", slug: "technology", posts: 56, status: "Draft" },
  {
    id: 4,
    name: "Philosophy",
    slug: "philosophy",
    posts: 42,
    status: "Published",
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-main p-8">
      <Helmet>
        <title>Category Registry | INKWELL</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* --- KPI SECTION --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              label: "Total Categories",
              val: "12",
              color: "text-brand-primary",
            },
            { label: "Published", val: "9", color: "text-success" },
            { label: "Draft", val: "3", color: "text-warning" },
            { label: "System Health", val: "Stable", color: "text-info" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-card border border-border-soft p-5 rounded-3xl shadow-sm"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-txt-muted mb-2">
                {stat.label}
              </p>
              <p className={`text-3xl font-semibold ${stat.color}`}>
                {stat.val}
              </p>
            </div>
          ))}
        </div>

        {/* --- HEADER ACTION --- */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-semibold text-txt-main tracking-tight">
              Category Registry
            </h1>
            <p className="text-xs text-txt-muted mt-1">
              Manage and structure your content taxonomy system.
            </p>
          </div>

          <button className="flex items-center gap-3 bg-brand-primary text-white px-6 py-3 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-brand-primary/20 hover:opacity-90 transition">
            <Plus size={16} /> New Category
          </button>
        </div>

        {/* --- TABLE --- */}
        <div className="bg-card border border-border-soft rounded-[2rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* HEAD */}
              <thead>
                <tr className="border-b border-border-soft bg-soft/10">
                  <th className="px-6 py-5 text-left text-[10px] uppercase tracking-[0.2em] text-txt-muted">
                    Name
                  </th>
                  <th className="px-6 py-5 text-left text-[10px] uppercase tracking-[0.2em] text-txt-muted">
                    Slug
                  </th>
                  <th className="px-6 py-5 text-left text-[10px] uppercase tracking-[0.2em] text-txt-muted">
                    Posts
                  </th>
                  <th className="px-6 py-5 text-left text-[10px] uppercase tracking-[0.2em] text-txt-muted">
                    Status
                  </th>
                  <th className="px-6 py-5 text-right text-[10px] uppercase tracking-[0.2em] text-txt-muted">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y divide-border-soft/30">
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="group hover:bg-soft/5 transition-all"
                  >
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-txt-main group-hover:text-brand-primary transition cursor-pointer">
                          {cat.name}
                        </span>
                        <span className="text-[10px] text-txt-muted/50 font-mono">
                          CAT_ID: {cat.id.toString().padStart(3, "0")}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <code className="text-[10px] bg-soft/20 px-2 py-1 rounded-md text-txt-muted">
                        {cat.slug}
                      </code>
                    </td>

                    <td className="px-6 py-6 text-txt-main/70 text-sm">
                      {cat.posts}
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            cat.status === "Published"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        />
                        <span className="text-[10px] uppercase tracking-widest text-txt-main/70">
                          {cat.status}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button className="p-2.5 bg-white dark:bg-card border border-border-soft rounded-xl text-txt-muted hover:text-brand-primary transition">
                          <Edit3 size={14} />
                        </button>
                        <button className="p-2.5 bg-danger/5 rounded-xl text-danger/60 hover:text-danger transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="p-6 border-t border-border-soft flex justify-between items-center bg-soft/5">
            <span className="text-[10px] uppercase tracking-[0.3em] text-txt-muted">
              Registry Overview
            </span>
            <span className="text-[10px] text-brand-primary font-medium">
              {categories.length} Entries
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
