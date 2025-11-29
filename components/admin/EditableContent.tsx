"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "@/lib/auth";
import { UserRole } from "@/entities/User";
import styles from "./EditableContent.module.scss";

interface EditableContentProps {
  initialContent: string;
  pageSlug: string;
}

export default function EditableContent({ initialContent, pageSlug }: EditableContentProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [editedContent, setEditedContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.role === UserRole.ADMIN;
  console.log(isAdmin);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(content);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(content);
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      await axios.patch(`/api/admin/static-pages/${pageSlug}`, {
        content: editedContent,
      });

      setContent(editedContent);
      setIsEditing(false);
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ error: string }>).response?.data?.error ||
        "Failed to save changes";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      {isAdmin && !isEditing && (
        <button onClick={handleEdit} className={styles.editButton} title="Edit this page">
          ✏️
        </button>
      )}

      {isEditing ? (
        <div className={styles.editMode}>
          <div className={styles.toolbar}>
            <h3>Editing Page</h3>
            <div className={styles.actions}>
              <button onClick={handleCancel} className={styles.cancelBtn} disabled={saving}>
                Cancel
              </button>
              <button onClick={handleSave} className={styles.saveBtn} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <textarea
            className={styles.editor}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Enter HTML content..."
          />

          <div className={styles.preview}>
            <h4>Preview:</h4>
            <div
              className={styles.previewContent}
              dangerouslySetInnerHTML={{ __html: editedContent }}
            />
          </div>
        </div>
      ) : (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
