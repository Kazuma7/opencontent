import { ReactNode } from "react";

type SampleCardProps = {
  title?: string;
  children: ReactNode;
};

export const SampleCard = ({ title, children }: SampleCardProps) => {
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
      {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}
      <div>{children}</div>
    </div>
  );
};
