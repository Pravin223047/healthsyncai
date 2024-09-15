import {
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { Copy, Save, CheckSquare } from "lucide-react";
import React from "react";

const ContextMenuImage: React.FC = () => {
  return (
    <>
      <ContextMenuSeparator className="bg-gray-700" />
      <ContextMenuItem
        onSelect={() => console.log("Copy image")}
        aria-label="Copy image"
      >
        <Copy className="mr-2 h-4 w-4" aria-hidden="true" /> Copy Image
      </ContextMenuItem>
      <ContextMenuItem
        onSelect={() => console.log("Save As")}
        aria-label="Save image as"
      >
        <Save className="mr-2 h-4 w-4" aria-hidden="true" /> Save As
      </ContextMenuItem>
      <ContextMenuItem
        onSelect={() => console.log("Select")}
        aria-label="Select image"
      >
        <CheckSquare className="mr-2 h-4 w-4" aria-hidden="true" /> Select
      </ContextMenuItem>
    </>
  );
};

export default ContextMenuImage;
