import React from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Tag, Palette, Loader2 } from "lucide-react";

// 🔹 Slug generator utility
const generateSlug = (value) =>
  value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const AddCategory = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      color: "#5951d6",
      description: "",
    },
  });

  const categoryName = watch("name");
  const colorValue = watch("color");

  const slugPreview = categoryName
    ? generateSlug(categoryName)
    : "awaiting-input";

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      slug: slugPreview,
    };

    try {
      console.log("Registering Category Node...", payload);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      navigate("/admin/categories"); // ✅ redirect after success
    } catch (err) {
      console.error("Node Registration Failed", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-6">
      <Helmet>
        <title>Add New Category | INKWELL</title>
      </Helmet>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* --- NAVIGATION --- */}
        <div className="flex items-center justify-between sticky top-0 z-30 -mx-6 px-6 mb-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center bg-white dark:bg-card border border-border-base rounded-xl hover:bg-soft transition-all shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>

            <div>
              <h1 className="text-xl font-bold text-txt-main tracking-tight">
                New Taxonomy Node
              </h1>
              <p className="text-[10px] text-brand-primary font-black uppercase tracking-widest">
                Action: Create_Category
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isDirty || !categoryName}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 disabled:opacity-30 text-white px-8 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-brand-primary/20"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <Save size={14} />
            )}

            <span className=" text-center">
              {isSubmitting ? "Registering..." : "Register Category"}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* --- MAIN --- */}
          <div className="md:col-span-8 space-y-6">
            <section className="dash-card">
              <div className="flex items-center gap-2 mb-6 text-txt-muted">
                <Tag size={14} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Identification
                </h3>
              </div>

              <div className="space-y-6">
                {/* NAME */}
                <div>
                  <label className="text-[9px] font-black uppercase text-txt-muted mb-2 block">
                    Category Name
                  </label>

                  <input
                    {...register("name", {
                      required: "Name is mandatory",
                    })}
                    className={`w-full bg-soft/30 border ${
                      errors.name
                        ? "border-danger/50"
                        : "border-border-soft focus:border-brand-primary/40"
                    } px-4 py-2 rounded-xl text-sm font-bold outline-none transition-all placeholder:text-txt-muted/20`}
                    placeholder="e.g. Technical Analysis"
                  />

                  {/* ERROR */}
                  {errors.name && (
                    <p className="text-[10px] text-danger mt-1 font-semibold">
                      {errors.name.message}
                    </p>
                  )}

                  {/* SLUG */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[9px] font-bold text-txt-muted/50 uppercase italic">
                      Generated Slug:
                    </span>
                    <code className="text-[9px] font-mono text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded">
                      /{slugPreview}
                    </code>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="text-[9px] font-black uppercase text-txt-muted mb-2 block">
                    Description (Optional)
                  </label>

                  <textarea
                    {...register("description")}
                    rows={4}
                    className="w-full bg-soft/30 border border-border-soft p-4 rounded-xl text-sm outline-none focus:border-brand-primary/40 transition-all resize-none"
                    placeholder="Briefly define the scope of this category..."
                  />
                </div>
              </div>
            </section>
          </div>

          {/* --- SIDE --- */}
          <div className="md:col-span-4 space-y-6">
            <section className="dash-card">
              <div className="flex items-center gap-2 mb-6 text-txt-muted">
                <Palette size={14} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Visual ID
                </h3>
              </div>

              <div className="space-y-6">
                {/* COLOR */}
                <div>
                  <label className="text-[9px] font-black uppercase text-txt-muted mb-3 block text-center">
                    Identity Color
                  </label>

                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <input
                        type="color"
                        {...register("color")}
                        className="w-full h-full cursor-pointer"
                      />
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] font-mono font-bold text-txt-main">
                        {colorValue}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          navigator.clipboard.writeText(colorValue)
                        }
                        className="text-[9px] text-brand-primary underline"
                      >
                        Copy
                      </button>

                      <p className="text-[9px] text-txt-muted">
                        Used for KPI badges
                      </p>
                    </div>
                  </div>
                </div>

                {/* PREVIEW */}
                <div className="pt-6 border-t border-border-soft">
                  <div className="bg-soft/20 rounded-xl p-4 flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: colorValue }}
                    />
                    <span className="text-[10px] font-black uppercase text-txt-main tracking-widest">
                      Live Preview Badge
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
