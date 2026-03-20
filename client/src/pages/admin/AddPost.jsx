import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Tiptap from "../../components/admin/Editor";
import {
  Save,
  Eye,
  Globe,
  Lock,
  Info,
  Image as ImageIcon,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      category: "General",
    },
  });

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    // Simulate API logic
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Committing to Archive...", data);
    // navigate("/admin/posts");
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* TOP NAVIGATION BAR */}
      <div className="flex items-center justify-between mb-8 sticky top-0 z-30 bg-main/80 backdrop-blur-md py-4 border-b border-border-soft">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-soft rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-txt-main tracking-tight">
              New Ledger Entry
            </h1>
            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em]">
              Status: System_Ready
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden md:flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-txt-muted hover:text-txt-main transition-all"
          >
            <Eye size={14} /> Preview
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isDirty}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-[0.15em] transition-all shadow-lg shadow-blue-600/20"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <Save size={14} />
            )}
            Commit Entry
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* MAIN CONTENT COLUMN */}
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-main border border-border-soft rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <label className="text-[10px] font-black uppercase text-txt-muted mb-3 block tracking-widest">
                Entry Subject
              </label>
              <input
                {...register("title")}
                className={`w-full bg-soft/30 border ${errors.title ? "border-red-500" : "border-border-soft"} p-4 rounded-xl text-lg font-medium outline-none focus:ring-2 focus:ring-blue-500/10 transition-all`}
                placeholder="The Future of Decentralized Nodes..."
              />
              {errors.title && (
                <p className="text-red-500 text-[10px] mt-2 font-bold">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-txt-muted mb-3 block tracking-widest">
                Deep Content Analysis
              </label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <Tiptap value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.content && (
                <p className="text-red-500 text-[10px] mt-2 font-bold">
                  {errors.content.message}
                </p>
              )}
            </div>
          </section>

          {/* SEO / EXCERPT SECTION */}
          <section className="bg-main border border-border-soft rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-txt-main mb-4 flex items-center gap-2">
              <Globe size={14} className="text-blue-500" /> SEO Meta Summary
            </h3>
            <textarea
              {...register("excerpt")}
              rows={3}
              className="w-full bg-soft/30 border border-border-soft p-4 rounded-xl text-sm outline-none focus:border-blue-500/50 resize-none"
              placeholder="Brief summary for search engine indexing..."
            />
            <div className="mt-2 flex justify-between">
              <p className="text-[9px] text-txt-muted italic">
                Recommended: 150-160 characters
              </p>
            </div>
          </section>
        </div>

        {/* SIDEBAR SETTINGS COLUMN */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* PUBLISH SETTINGS */}
            <section className="bg-main border border-border-soft rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-txt-main mb-6 border-b border-border-soft pb-4">
                Configuration
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="text-[9px] font-black uppercase text-txt-muted mb-3 block">
                    Visibility
                  </label>
                  <select
                    {...register("status")}
                    className="w-full bg-soft border border-border-soft p-3 rounded-lg text-xs font-bold outline-none cursor-pointer hover:border-blue-500/50 transition-colors"
                  >
                    <option value="draft">Private Draft</option>
                    <option value="published">Public Archive</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase text-txt-muted mb-3 block">
                    Index Category
                  </label>
                  <select
                    {...register("category")}
                    className="w-full bg-soft border border-border-soft p-3 rounded-lg text-xs font-bold outline-none cursor-pointer"
                  >
                    <option value="Tech">Technical</option>
                    <option value="Editorial">Editorial</option>
                    <option value="System">System Update</option>
                  </select>
                </div>
              </div>
            </section>

            {/* FEATURED IMAGE */}
            <section className="bg-main border border-border-soft rounded-2xl p-6 shadow-sm">
              <label className="text-[9px] font-black uppercase text-txt-muted mb-4 block tracking-widest">
                Visual Anchor
              </label>
              <div className="relative group overflow-hidden rounded-xl bg-soft border-2 border-dashed border-border-soft hover:border-blue-500/50 transition-all aspect-video flex items-center justify-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-txt-muted group-hover:text-blue-500 transition-colors">
                    <ImageIcon size={24} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">
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
            </section>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
