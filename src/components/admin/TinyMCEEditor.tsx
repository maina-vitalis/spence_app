"use client";

import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditorType } from "tinymce";
import { useRef } from "react";
import { toast } from "sonner";

interface TinyMCEEditorProps {
  content: string;
  onChange: (content: string) => void;
  height?: number;
  placeholder?: string;
}

export function TinyMCEEditor({
  content,
  onChange,
  height = 600,
  placeholder = "Start writing your content here...",
}: TinyMCEEditorProps) {
  const editorRef = useRef<TinyMCEEditorType | null>(null);

  /**
   * Cloudinary image upload handler — called by TinyMCE when the user
   * picks a file through the image toolbar button or drag-and-drop.
   */
  const handleImageUpload = (
    blobInfo: { blob: () => Blob; filename: () => string },
    progress: (percent: number) => void,
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const file = new File([blobInfo.blob()], blobInfo.filename(), {
        type: blobInfo.blob().type,
      });

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPEG, PNG, GIF, and WebP images are allowed.");
        reject("Invalid file type");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be smaller than 5MB.");
        reject("File too large");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);

        progress(10);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        progress(80);

        const result = await response.json();

        if (result.success) {
          progress(100);
          toast.success("Image uploaded to Cloudinary");
          resolve(result.url);
        } else {
          toast.error(result.error || "Failed to upload image");
          reject(result.error || "Upload failed");
        }
      } catch {
        toast.error("Failed to upload image");
        reject("Network error");
      }
    });
  };

  return (
    <div className="tinymce-wrapper">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(_evt, editor: TinyMCEEditorType) => {
          editorRef.current = editor;
        }}
        initialValue={content}
        onEditorChange={(newContent) => {
          onChange(newContent);
        }}
        init={{
          height,
          menubar: "file edit view insert format tools table",
          plugins: [
            // Core editing
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "visualchars",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
            // Extra
            "codesample",
            "emoticons",
            "accordion",
            "directionality",
            "pagebreak",
            "nonbreaking",
            "quickbars",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | " +
            "bold italic underline strikethrough | " +
            "forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist | outdent indent | " +
            "link image media | " +
            "table | codesample code | " +
            "blockquote hr | " +
            "charmap emoticons | " +
            "searchreplace | fullscreen | help",
          toolbar_mode: "sliding",
          contextmenu: "link image table",
          // Image upload
          images_upload_handler: handleImageUpload,
          automatic_uploads: true,
          images_reuse_filename: false,
          file_picker_types: "image",
          // Image editing
          image_advtab: true,
          image_caption: true,
          image_title: true,
          // Media
          media_live_embeds: true,
          // Code sample
          codesample_languages: [
            { text: "HTML/XML", value: "markup" },
            { text: "JavaScript", value: "javascript" },
            { text: "TypeScript", value: "typescript" },
            { text: "CSS", value: "css" },
            { text: "Python", value: "python" },
            { text: "Java", value: "java" },
            { text: "C#", value: "csharp" },
            { text: "PHP", value: "php" },
            { text: "Ruby", value: "ruby" },
            { text: "Go", value: "go" },
            { text: "Rust", value: "rust" },
            { text: "SQL", value: "sql" },
            { text: "Bash", value: "bash" },
            { text: "JSON", value: "json" },
          ],
          // Content styling — mirrors Tailwind prose styles
          content_style: `
            body {
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              font-size: 16px;
              line-height: 1.75;
              color: #1a1a1a;
              max-width: 100%;
              padding: 1.5rem;
              background-color: #ffffff;
            }
            h1, h2, h3, h4, h5, h6 {
              font-weight: 700;
              line-height: 1.25;
              margin-top: 2rem;
              margin-bottom: 0.75rem;
            }
            h1 { font-size: 2em; }
            h2 { font-size: 1.5em; }
            h3 { font-size: 1.25em; }
            p { margin-bottom: 1em; }
            ul, ol { padding-left: 1.5em; margin-bottom: 1em; }
            li { margin-bottom: 0.25em; }
            blockquote {
              border-left: 4px solid #e5e7eb;
              padding-left: 1rem;
              color: #6b7280;
              font-style: italic;
              margin: 1.5em 0;
            }
            pre {
              background: #1e293b;
              color: #e2e8f0;
              padding: 1rem 1.25rem;
              border-radius: 0.5rem;
              overflow-x: auto;
              font-size: 0.875em;
            }
            code {
              background: #f1f5f9;
              color: #e11d48;
              padding: 0.125em 0.375em;
              border-radius: 0.25rem;
              font-size: 0.875em;
            }
            pre code { background: transparent; color: inherit; padding: 0; }
            img {
              max-width: 100%;
              height: auto;
              border-radius: 0.5rem;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 1.5em 0;
            }
            th, td {
              border: 1px solid #e5e7eb;
              padding: 0.5rem 0.75rem;
              text-align: left;
            }
            th { background: #f9fafb; font-weight: 600; }
            a { color: #6366f1; text-decoration: underline; }
            hr { border: none; border-top: 1px solid #e5e7eb; margin: 2em 0; }
          `,
          placeholder,
          // Quickbars config
          quickbars_selection_toolbar: "bold italic | h2 h3 | blockquote",
          quickbars_insert_toolbar: "image media table",
          // Resize
          resize: true,
          // Status bar
          statusbar: true,
          elementpath: false,
          // Skin
          skin: "oxide",
          content_css: "default",
          // Prevent XSS
          extended_valid_elements:
            "iframe[src|width|height|allowfullscreen|allow|frameborder]",
          // Auto-save
          autosave_ask_before_unload: false,
        }}
      />
    </div>
  );
}
