"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SearchInput = ({
  value,
  onChange,
  disabled,
  placeholder = "Search Item...",
  className,
  onSearch,
  debounceTime = 500,
}) => {
  const [searchTerm, setSearchTerm] = React.useState(value || "");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch && searchTerm !== null) {
        onSearch(searchTerm);
      }
      if (onChange) {
        onChange(searchTerm);
      }
    }, debounceTime);
    return () => clearTimeout(timer);
  }, [searchTerm, onSearch, onChange, debounceTime]);

  return (
    <div
      className={cn(
        "relative flex items-center border rounded-md px-2 py-0.5 w-full max-w-xs h-9",
        disabled && "pointer-events-none",
        className,
      )}
    >
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none pl-1.5"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={disabled}
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full absolute right-0 scale-90 z-50"
          onClick={() => setSearchTerm("")}
        >
          <X />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
