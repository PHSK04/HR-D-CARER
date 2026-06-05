import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Database,
  Filter,
  HardDrive,
  Info,
  Plus,
  Search,
  User,
} from 'lucide-react'

const datasetRows = [
  {
    name: 'Invalid Position Executive Test',
    updated: 'Updated 25 Apr 2024 14:32',
    owner: 'HR Admin',
    source: 'SQL Server (prd-care)',
    fields: '320',
    score: 84.2,
    tone: 'warning',
  },
  {
    name: 'Invalid Position Employee',
    updated: 'Updated 25 Apr 2024 14:15',
    owner: 'HR Admin',
    source: 'SQL Server (prd-care)',
    fields: '2,475',
    score: 90.2,
    tone: 'success',
  },
]

function DatasetsPage({ notify }) {
  return (
    <div className="datasets-page">
      <div className="datasets-heading">
        <h1>Datasets</h1>
        <p>Manage and monitor dataset quality</p>
      </div>

      <section className="datasets-toolbar panel">
        <label className="dataset-search">
          <Search size={24} />
          <input type="search" placeholder="Search datasets..." />
        </label>
        <div className="dataset-toolbar-actions">
          <button type="button" onClick={() => notify('เปิดตัวกรอง Dataset')}>
            <Filter size={20} />
            Filter
            <ChevronDown size={16} />
          </button>
          <button type="button" onClick={() => notify('เพิ่ม Dataset ใหม่')}>
            <Plus size={22} />
            Add Dataset
          </button>
        </div>
      </section>

      <section className="dataset-table-card panel">
        <div className="dataset-table">
          <div className="dataset-table-head">
            <span>DATASET NAME</span>
            <span>OWNER</span>
            <span>SOURCE SYSTEM</span>
            <span>FIELDS</span>
            <span>
              QUALITY SCORE
              <Info size={15} />
            </span>
            <span>STATUS</span>
            <span />
          </div>

          {datasetRows.map((dataset) => (
            <button
              className="dataset-row"
              key={dataset.name}
              type="button"
              onClick={() => notify(`เปิด Dataset: ${dataset.name}`)}
            >
              <div className="dataset-name-cell">
                <span className="dataset-icon">
                  <Database size={25} />
                </span>
                <strong>
                  {dataset.name}
                  <small>{dataset.updated}</small>
                </strong>
              </div>
              <div className="dataset-meta-cell">
                <User size={22} />
                {dataset.owner}
              </div>
              <div className="dataset-meta-cell">
                <HardDrive size={22} />
                {dataset.source}
              </div>
              <span className="dataset-fields">{dataset.fields}</span>
              <div className="dataset-score-cell">
                <span className="dataset-score-track">
                  <i className={dataset.tone} style={{ width: `${dataset.score}%` }} />
                </span>
                <strong className={dataset.tone}>{dataset.score}%</strong>
              </div>
              <span className="dataset-status">
                <CircleAlert size={17} />
                มีปัญหาคุณภาพ
              </span>
              <ChevronRight size={25} />
            </button>
          ))}
        </div>

        <div className="dataset-pagination">
          <span>Showing 1 to 2 of 2 results</span>
          <div>
            <button type="button" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="active" type="button">1</button>
            <button type="button">
              <ChevronRight size={18} />
            </button>
            <button type="button">
              10 / page
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}


export default DatasetsPage
