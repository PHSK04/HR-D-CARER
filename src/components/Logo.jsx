function Logo({ compact = false }) {
  return (
    <div className={`logo ${compact ? 'logo-compact' : ''}`} aria-label="HR D-CARE">
      <span className="logo-mark" />
      <span>
        <strong>HR D-CARE</strong>
        {!compact && <small>Data Quality Monitoring</small>}
      </span>
    </div>
  )
}

export default Logo
