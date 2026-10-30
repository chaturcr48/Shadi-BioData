"use client";

import { fileToPhotoDataUrl } from "@/utils/photo";
import { Camera, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";

interface PhotoUploadProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  onError?: (message: string) => void;
}

export function PhotoUpload({ value, onChange, onError }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleFile(file?: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onError?.("Please choose a JPG or PNG image.");
      return;
    }
    setBusy(true);
    try {
      onChange(await fileToPhotoDataUrl(file));
    } catch {
      onError?.("Could not read that image. Try another file.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={`photo-drop ${dragging ? "is-dragging" : ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        void handleFile(event.dataTransfer.files?.[0]);
      }}
    >
      <div className="photo-preview">{value ? <img src={value} alt="Your photo" /> : <Camera size={26} />}</div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{value ? "Looking good" : "Add your photo"}</p>
        <p className="mt-0.5 text-sm text-mute">{value ? "The photo appears at the top of your biodata." : "JPG or PNG. A clear, front-facing portrait works best."}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className="btn btn-sm btn-secondary" onClick={() => inputRef.current?.click()} disabled={busy}>
            <Upload size={14} /> {value ? "Replace" : busy ? "Reading…" : "Upload photo"}
          </button>
          {value ? (
            <button type="button" className="btn btn-sm btn-ghost text-red-700" onClick={() => onChange(undefined)}>
              <Trash2 size={14} /> Remove
            </button>
          ) : null}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          void handleFile(event.target.files?.[0]);
          event.currentTarget.value = "";
        }}
      />
    </div>
  );
}
