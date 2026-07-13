"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TechStackItem } from "@/lib/actions/projects";
import { Plus, Trash2 } from "lucide-react";

interface TechStackEditorProps {
  value: TechStackItem[];
  onChange: (value: TechStackItem[]) => void;
  error?: string;
}

export function TechStackEditor({
  value,
  onChange,
  error,
}: TechStackEditorProps) {
  const items = value.length > 0 ? value : [{ name: "", reason: "" }];

  const updateItem = (index: number, field: keyof TechStackItem, text: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: text };
    onChange(next);
  };

  const addItem = () => {
    onChange([...items, { name: "", reason: "" }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="grid gap-3 rounded-lg border p-4 md:grid-cols-[1fr_1.5fr_auto]"
        >
          <div className="space-y-2">
            <Label htmlFor={`tech-name-${index}`}>Technology</Label>
            <Input
              id={`tech-name-${index}`}
              placeholder="Next.js"
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`tech-reason-${index}`}>Why I used it</Label>
            <Textarea
              id={`tech-reason-${index}`}
              placeholder="App router and server components for fast portfolio pages"
              rows={2}
              value={item.reason}
              onChange={(e) => updateItem(index, "reason", e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeItem(index)}
              disabled={items.length === 1}
              aria-label="Remove technology"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" size="sm" onClick={addItem}>
        <Plus className="mr-2 h-4 w-4" />
        Add technology
      </Button>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
