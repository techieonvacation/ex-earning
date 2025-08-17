import React from "react";

export default function AdminPage() {
  return (
    <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground">
        Admin Dashboard
      </h1>
      <p className="text-text-muted mt-2">
        Manage your application settings and content.
      </p>
    </div>

    {/* Add your admin content here */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Users
        </h3>
        <p className="text-text-muted">
          Manage user accounts and permissions
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Content
        </h3>
        <p className="text-text-muted">Manage website content and pages</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Settings
        </h3>
        <p className="text-text-muted">Configure application settings</p>
      </div>
    </div>
  </div>
  );
}
