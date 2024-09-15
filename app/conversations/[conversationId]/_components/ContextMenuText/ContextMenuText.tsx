import {
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { Edit, Trash, Pin } from "lucide-react";
import React from "react";

const ContextMenuImage: React.FC = () => {
  return (
    <>
      <ContextMenuSeparator className="bg-gray-700" />
      <ContextMenuItem
        onSelect={() => console.log("Edit message")}
        aria-label="Edit message" // Add ARIA label for accessibility
      >
        <Edit className="mr-2 h-4 w-4" aria-hidden="true" /> Edit
      </ContextMenuItem>
      <ContextMenuItem
        onSelect={() => console.log("Delete message")}
        aria-label="Delete message" // Add ARIA label for accessibility
      >
        <Trash className="mr-2 h-4 w-4" aria-hidden="true" /> Delete
      </ContextMenuItem>
      <ContextMenuItem
        onSelect={() => console.log("Pin")}
        aria-label="Pin" // Add ARIA label for accessibility
      >
        <Pin className="mr-2 h-4 w-4" aria-hidden="true" /> Pin
      </ContextMenuItem>
    </>
  );
};

export default React.memo(ContextMenuImage); // Memoize the component for performance optimization
