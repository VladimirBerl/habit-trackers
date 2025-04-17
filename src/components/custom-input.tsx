import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface AutoWidthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  disabledWidth?: boolean;
}

export function AutoWidthInput({ className, disabledWidth = false, ...props }: AutoWidthInputProps) {
  const onChangeWidthInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!disabledWidth) {
      const width = typeof window !== "undefined" ? window.innerWidth : 0;
      const nextLength = e.currentTarget.value.length + 1;
      const newWidth = nextLength * 24;
      if (e.currentTarget.value.length <= 1) {
        e.currentTarget.style.width = "100%";
        return;
      }
      if (newWidth + 40 <= width) {
        e.currentTarget.style.width = `${newWidth}px`;
      }
    }
  };

  return (
    <Input
      className={cn(
        "underline p-0 leading-[2.125rem] uppercase border-none rounded-none shadow-none min-h-8 font-bold text-[2.125rem] text-primary placeholder:font-bold placeholder:text-[2.125rem] placeholder:text-primary/50",
        className
      )}
      autoComplete="off"
      onKeyDown={(e) => onChangeWidthInput(e)}
      {...props}
    />
  );
}
