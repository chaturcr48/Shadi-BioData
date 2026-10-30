import { Editor } from "@/components/editor/Editor";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create your marriage biodata",
  description: "Fill in your details, add a photo, pick a template and download your marriage biodata as a print-ready PDF."
};

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Editor />
    </Suspense>
  );
}
