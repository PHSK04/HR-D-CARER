import { useMemo, useState } from 'react'
import { Clock3, Link, PlayCircle, Plus, Trash2, Upload, Video } from 'lucide-react'

const learningContent = {
  ep01: {
    title: 'EP01: วิธีคีย์ข้อมูลพนักงาน',
    subtitle: 'คู่มือการบันทึกข้อมูลพนักงานเข้าระบบ',
    duration: '12:40',
  },
  ep02: {
    title: 'EP02: วิธีแก้ข้อมูลตำแหน่ง',
    subtitle: 'ขั้นตอนการแก้ไขข้อมูลตำแหน่งที่ไม่ถูกต้อง',
    duration: '09:25',
  },
  ep03: {
    title: 'EP03: วิธีตรวจสอบข้อมูลผิด',
    subtitle: 'แนวทางการตรวจสอบและระบุข้อมูลที่ไม่ถูกต้อง',
    duration: '14:10',
  },
  ep04: {
    title: 'EP04: วิธีส่งหลักฐานการแก้ไข',
    subtitle: 'ขั้นตอนการแนบและส่งหลักฐานการแก้ไขข้อมูล',
    duration: '11:05',
  },
  faq: {
    title: 'FAQ / Download Master Data',
    subtitle: 'คำถามที่พบบ่อย และดาวน์โหลด Master Data',
    duration: '08:30',
  },
}

const videoLessons = Object.entries(learningContent).map(([id, item]) => ({
  id,
  ...item,
}))

function getEmbedUrl(value) {
  if (!value) return ''

  try {
    const url = new URL(value)

    if (url.hostname.includes('youtube.com')) {
      const videoId = url.searchParams.get('v')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : value
    }

    if (url.hostname.includes('youtu.be')) {
      const videoId = url.pathname.replace('/', '')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : value
    }

    return value
  } catch {
    return ''
  }
}

function LearningHubPage({ lesson = 'ep01', onSelectLesson }) {
  const [customVideos, setCustomVideos] = useState([])
  const [selectedCustomVideoId, setSelectedCustomVideoId] = useState('')
  const [videoForm, setVideoForm] = useState({
    title: '',
    subtitle: '',
    url: '',
    duration: '',
  })

  const allVideos = useMemo(
    () => [...videoLessons, ...customVideos],
    [customVideos],
  )
  const selectedVideoId = selectedCustomVideoId || lesson
  const content = allVideos.find((item) => item.id === selectedVideoId) ?? videoLessons[0]
  const embedUrl = getEmbedUrl(content.videoUrl)

  const addVideo = (event) => {
    event.preventDefault()
    const title = videoForm.title.trim()
    const url = videoForm.url.trim()

    if (!title || !url) return

    const newVideo = {
      id: `custom-${Date.now()}`,
      title,
      subtitle: videoForm.subtitle.trim() || 'วิดีโอคู่มือเพิ่มเติม',
      duration: videoForm.duration.trim() || 'วิดีโอใหม่',
      videoUrl: url,
    }

    setCustomVideos((current) => [...current, newVideo])
    setSelectedCustomVideoId(newVideo.id)
    setVideoForm({
      title: '',
      subtitle: '',
      url: '',
      duration: '',
    })
  }

  const deleteVideo = (id) => {
    setCustomVideos((current) => current.filter((item) => item.id !== id))
    if (selectedCustomVideoId === id) {
      setSelectedCustomVideoId('')
    }
  }

  return (
    <div className="learning-page">
      <div className="learning-heading">
        <h1>{content.title}</h1>
        <p>{content.subtitle}</p>
      </div>

      <section className="learning-video-panel panel">
        <div className="video-frame">
          {embedUrl ? (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              src={embedUrl}
              title={content.title}
            />
          ) : (
            <div className="video-placeholder">
              <PlayCircle size={82} />
              <strong>{content.title}</strong>
              <span>ยังไม่ได้แนบลิงก์วิดีโอ</span>
            </div>
          )}
          <div className="video-meta-bar">
            <span><Video size={18} />Training Video</span>
            <span><Clock3 size={18} />{content.duration}</span>
          </div>
        </div>

        <div className="video-side">
          <h2>รายละเอียดวิดีโอ</h2>
          <p>{content.subtitle}</p>
          <button type="button" disabled={!embedUrl}>
            <PlayCircle size={20} />
            เล่นวิดีโอ
          </button>
        </div>
      </section>

      <section className="learning-video-grid" aria-label="Learning Hub videos">
        {allVideos.map((item) => (
          <article
            className={`video-card ${item.id === selectedVideoId ? 'active' : ''}`}
            key={item.id}
          >
            <button type="button" onClick={() => {
              if (!item.id.startsWith('custom-')) {
                setSelectedCustomVideoId('')
                onSelectLesson?.(item.id)
                return
              }
              setSelectedCustomVideoId(item.id)
            }}>
              <span className="video-card-thumb">
                <PlayCircle size={34} />
              </span>
              <strong>{item.title}</strong>
              <small>{item.subtitle}</small>
              <em><Clock3 size={15} />{item.duration}</em>
            </button>
            {item.id.startsWith('custom-') && (
              <button
                className="video-delete-button"
                type="button"
                aria-label={`ลบวิดีโอ ${item.title}`}
                onClick={() => deleteVideo(item.id)}
              >
                <Trash2 size={17} />
              </button>
            )}
          </article>
        ))}
      </section>

      <section className="add-video-panel panel">
        <div>
          <span><Plus size={24} /></span>
          <strong>เพิ่มวิดีโอใหม่</strong>
          <p>แนบลิงก์ YouTube หรือ URL วิดีโอ เพื่อเพิ่มเข้าหน้า Learning Hub</p>
        </div>
        <form className="add-video-form" onSubmit={addVideo}>
          <label>
            <span>ชื่อวิดีโอ</span>
            <input
              onChange={(event) => setVideoForm((current) => ({
                ...current,
                title: event.target.value,
              }))}
              placeholder="เช่น EP05: วิธีตรวจรายงาน"
              type="text"
              value={videoForm.title}
            />
          </label>
          <label>
            <span>คำอธิบาย</span>
            <input
              onChange={(event) => setVideoForm((current) => ({
                ...current,
                subtitle: event.target.value,
              }))}
              placeholder="รายละเอียดสั้น ๆ ของวิดีโอ"
              type="text"
              value={videoForm.subtitle}
            />
          </label>
          <label>
            <span>ลิงก์วิดีโอ</span>
            <div>
              <Link size={18} />
              <input
                onChange={(event) => setVideoForm((current) => ({
                  ...current,
                  url: event.target.value,
                }))}
                placeholder="https://www.youtube.com/watch?v=..."
                type="url"
                value={videoForm.url}
              />
            </div>
          </label>
          <label>
            <span>ความยาว</span>
            <input
              onChange={(event) => setVideoForm((current) => ({
                ...current,
                duration: event.target.value,
              }))}
              placeholder="เช่น 05:30"
              type="text"
              value={videoForm.duration}
            />
          </label>
          <button type="submit">
            <Upload size={20} />
            เพิ่มวิดีโอ
          </button>
        </form>
      </section>
    </div>
  )
}

export default LearningHubPage
