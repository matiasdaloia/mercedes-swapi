import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({
  placeholder,
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer block w-full rounded-md border py-2 pl-10 text-sm"
      />
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
    </div>
  );
}
