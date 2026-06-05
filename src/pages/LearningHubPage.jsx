import { Clock3, PlayCircle, Video } from 'lucide-react'

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

function LearningHubPage({ lesson = 'ep01' }) {
  const content = learningContent[lesson] ?? learningContent.ep01
  const embedUrl = getEmbedUrl(content.videoUrl)

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
      </section>
    </div>
  )
}

export default LearningHubPage
