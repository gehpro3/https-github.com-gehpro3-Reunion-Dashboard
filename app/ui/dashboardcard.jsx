"use client";

const DashboardCard = ({ title, value, icon, footer }) => {
  return (
    <div className="bg-bg-light p-6 rounded-xl shadow-lg border border-border-color flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <div className="text-brand-primary">{icon}</div>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold text-text-primary">{value}</p>
        {footer && <p className="text-xs text-text-secondary mt-1">{footer}</p>}
      </div>
    </div>
  );
};

export default DashboardCard;
