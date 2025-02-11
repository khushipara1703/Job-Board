interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition focus:outline-none
        ${variant === "primary" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}
        ${className}`}
      {...props}
    />
  );
}
