interface VisuallyHiddenProps {
    children: React.ReactNode;
  }
  
  export function VisuallyHidden({ children }: VisuallyHiddenProps) {
    return (
      <span className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0">
        {children}
      </span>
    );
  } 