import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Save,
  Eye,
  Globe,
  ImageIcon,
  Loader2,
  ChevronLeft,
  Settings,
  Image as ImageIconLucide,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Editor from "../../components/editor/Editor";

const AddPost = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      status: "draft",
      category: "Tech",
      excerpt: "",
    },
  });

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewImage) URL.revokeObjectURL(previewImage);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const plainText = data.content.replace(/<[^>]*>/g, "").trim();
    if (!plainText) {
      alert("System Notice: Content Buffer Empty.");
      return;
    }

    try {
      console.log("Committing to Archive...", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (err) {
      console.error("Transmission Failed", err);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-6">
      <Helmet>
        <title>New Ledger Entry | INKWELL</title>
      </Helmet>

      <form onSubmit={handleSubmit(onSubmit)} className="pb-20">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-10 sticky top-0 z-30 bg-main/80 backdrop-blur-md -mx-6 px-6 py-4 border-b border-border-soft transition-colors">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center bg-card border border-border-soft rounded-xl hover:bg-soft transition-all shadow-sm"
            >
              <ChevronLeft size={18} className="text-txt-muted" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-txt-main tracking-tight">
                New Ledger Entry
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${isDirty ? "bg-warning animate-pulse" : "bg-success"}`}
                />
                <p className="text-[10px] text-txt-muted font-medium uppercase tracking-[0.2em]">
                  {isDirty ? "Unsaved Changes" : "System Synchronized"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-txt-muted hover:text-brand-primary transition-all"
            >
              <Eye size={16} /> Preview
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="flex items-center gap-2 bg-brand-primary hover:opacity-90 disabled:opacity-30 text-white px-8 py-2.5 rounded-xl font-medium text-xs uppercase tracking-[0.15em] transition-all shadow-lg shadow-brand-primary/20"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <Save size={14} />
              )}
              {isSubmitting ? "Syncing..." : "Commit Entry"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- LEFT: MAIN EDITOR --- */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-card border border-border-soft p-8 rounded-[2rem] shadow-sm">
              <div className="mb-8">
                <label className="text-[10px] font-medium uppercase text-txt-muted mb-4 block tracking-[0.2em]">
                  Entry Subject
                </label>
                <input
                  {...register("title", { required: "Title required" })}
                  className={`w-full bg-transparent border-b ${errors.title ? "border-danger/50" : "border-border-soft focus:border-brand-primary"} py-4 text-3xl font-medium outline-none transition-all placeholder:text-txt-muted/10 text-txt-main`}
                  placeholder="Enter dynamic title..."
                />
                {errors.title && (
                  <p className="text-danger text-[10px] mt-2 font-medium uppercase tracking-tight">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-medium uppercase text-txt-muted mb-4 block tracking-[0.2em]">
                  Data Content Buffer
                </label>
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div
                      className={
                        errors.content ? "ring-1 ring-danger rounded-xl" : ""
                      }
                    >
                      <Editor value={field.value} onChange={field.onChange} />
                    </div>
                  )}
                />
              </div>
            </section>

            <section className="bg-card border border-border-soft p-8 rounded-[2rem] shadow-sm">
              <h3 className="text-[10px] font-medium uppercase tracking-widest text-txt-main mb-6 flex items-center gap-2">
                <Globe size={14} className="text-brand-primary" /> SEO Metadata
              </h3>
              <textarea
                {...register("excerpt")}
                rows={4}
                className="w-full bg-soft/20 border border-border-soft p-5 rounded-2xl text-sm outline-none focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/5 transition-all resize-none text-txt-main placeholder:text-txt-muted/30 font-normal"
                placeholder="Brief summary for search engine indexing..."
              />
            </section>
          </div>

          {/* --- RIGHT: SIDEBAR --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <section className="bg-card border border-border-soft rounded-[2rem] overflow-hidden shadow-sm">
                <div className="p-5 border-b border-border-soft bg-soft/10 flex items-center gap-2">
                  <Settings size={14} className="text-txt-muted" />
                  <h3 className="text-[10px] font-medium uppercase tracking-widest text-txt-main">
                    Configuration
                  </h3>
                </div>

                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[9px] font-medium uppercase text-txt-muted mb-2 block tracking-wider">
                        Post Visibility
                      </label>
                      <select
                        {...register("status")}
                        className="w-full bg-soft/10 border border-border-soft p-3 rounded-xl text-xs font-medium outline-none cursor-pointer text-txt-main hover:border-brand-primary/30 transition-all"
                      >
                        <option value="draft">Private Draft</option>
                        <option value="published">Public Archive</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] font-medium uppercase text-txt-muted mb-2 block tracking-wider">
                        Index Category
                      </label>
                      <select
                        {...register("category")}
                        className="w-full bg-soft/10 border border-border-soft p-3 rounded-xl text-xs font-medium outline-none cursor-pointer text-txt-main hover:border-brand-primary/30 transition-all"
                      >
                        <option value="Tech">Technical</option>
                        <option value="Editorial">Editorial</option>
                        <option value="System">System Update</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-card border border-border-soft rounded-[2rem] overflow-hidden shadow-sm">
                <div className="p-5 border-b border-border-soft bg-soft/10 flex items-center gap-2">
                  <ImageIconLucide size={14} className="text-txt-muted" />
                  <h3 className="text-[10px] font-medium uppercase tracking-widest text-txt-main">
                    Visual Anchor
                  </h3>
                </div>
                <div className="p-6">
                  <div className="relative group overflow-hidden rounded-2xl bg-soft/30 border border-dashed border-border-base hover:border-brand-primary/40 transition-all aspect-[16/10] flex items-center justify-center cursor-pointer">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-txt-muted group-hover:text-brand-primary transition-colors">
                        <ImageIcon size={24} strokeWidth={1.2} />
                        <span className="text-[9px] font-medium uppercase tracking-widest">
                          Upload Cover
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={onImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
