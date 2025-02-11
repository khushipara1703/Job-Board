interface FormProps {
  children: React.ReactNode;
  className?: string;
}

export function Form({ children, className }: FormProps) {
  return <form className={`space-y-4 ${className}`}>{children}</form>;
}
