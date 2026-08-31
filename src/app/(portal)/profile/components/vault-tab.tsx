"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, File, Trash2, Loader2 } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { saveClientFileMetadata } from "../actions/portal";
import { toast } from "sonner";

export function VaultTab({ files, user }: { files: any[], user: any }) {
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClientComponentClient();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      
      const { data, error } = await supabase.storage
        .from("client_vault")
        .upload(filePath, file);

      if (error) throw error;

      // Save metadata to database
      const res = await saveClientFileMetadata(file.name, filePath, file.size);
      if (!res.success) throw new Error(res.error);

      toast.success("File uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="p-8 border-2 border-dashed border-white/20 rounded-2xl bg-white/5 text-center relative hover:bg-white/10 transition-colors">
        <input 
          type="file" 
          onChange={handleFileUpload} 
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <UploadCloud className="w-10 h-10 mx-auto mb-4 text-white/40" />
        <h3 className="text-lg font-medium text-white mb-1">Upload Document</h3>
        <p className="text-sm text-white/60">Drag and drop or click to upload assets, logos, or requirements</p>
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium text-white">Your Files</h3>
        {files.length === 0 ? (
          <p className="text-white/40 text-sm">No files uploaded yet.</p>
        ) : (
          files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                  <File className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{file.file_name}</p>
                  <p className="text-xs text-white/40">{formatSize(file.size)}</p>
                </div>
              </div>
              <button className="p-2 text-white/40 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
