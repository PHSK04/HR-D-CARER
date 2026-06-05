import { Edit, Plus, Trash2 } from 'lucide-react'

const users = [
  {
    initials: 'JS',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    initials: 'SJ',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    role: 'Data Owner',
    status: 'Active',
  },
  {
    initials: 'MC',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'Data Owner',
    status: 'Active',
  },
  {
    initials: 'LW',
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    role: 'Analyst',
    status: 'Active',
  },
  {
    initials: 'DL',
    name: 'David Lee',
    email: 'david.lee@company.com',
    role: 'Data Owner',
    status: 'Inactive',
  },
]

function Settings({ notify }) {
  return (
    <div className="settings-page">
      <div className="settings-heading">
        <h1>Settings</h1>
        <p>Manage system configuration</p>
      </div>

      <section className="settings-card" aria-label="User and role management">
        <header className="settings-card-title">
          <h2>User / Role Management</h2>
        </header>

        <div className="settings-section-head">
          <div>
            <h3>User Management</h3>
            <p>Manage user accounts and roles</p>
          </div>
          <button
            className="settings-add-button"
            type="button"
            onClick={() => notify?.('Add User')}
          >
            <Plus size={21} />
            Add User
          </button>
        </div>

        <div className="settings-user-table" role="table" aria-label="User management table">
          <div className="settings-table-head" role="row">
            <span role="columnheader">Name</span>
            <span role="columnheader">Email</span>
            <span role="columnheader">Role</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Actions</span>
          </div>

          {users.map((user) => (
            <div className="settings-table-row" role="row" key={user.email}>
              <div className="settings-user-cell" role="cell">
                <span className="settings-avatar">{user.initials}</span>
                <strong>{user.name}</strong>
              </div>
              <span className="settings-email-cell" role="cell">{user.email}</span>
              <span className="settings-role-cell" role="cell">
                <span>{user.role}</span>
              </span>
              <span className="settings-status-cell" role="cell">
                <span className={user.status === 'Active' ? 'active' : 'inactive'}>
                  {user.status}
                </span>
              </span>
              <span className="settings-actions-cell" role="cell">
                <button
                  type="button"
                  aria-label={`Edit ${user.name}`}
                  onClick={() => notify?.(`Edit ${user.name}`)}
                >
                  <Edit size={21} />
                </button>
                <button
                  className="danger"
                  type="button"
                  aria-label={`Delete ${user.name}`}
                  onClick={() => notify?.(`Delete ${user.name}`)}
                >
                  <Trash2 size={21} />
                </button>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Settings
