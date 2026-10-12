import { AnimatePresence, motion } from 'framer-motion'

export type PulloutBook = {
  id: string
  title: string
  year: number
  publicationOrder: number
  blurb: string
  spineStyle: string
  coverPath: string
  fallbackCoverPath: string
}

type CapitolPulloutProps = {
  book: PulloutBook | null
  shouldReduceMotion: boolean | null
  onClose: () => void
}

export default function CapitolPullout({ book, shouldReduceMotion, onClose }: CapitolPulloutProps) {
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 260, damping: 24, mass: 0.85 }
  const searchTerm = encodeURIComponent(`${book?.title ?? ''} Suzanne Collins`)
  const amazonUrl = `https://www.amazon.com/s?k=${searchTerm}`

  return (
    <AnimatePresence>
      {book && (
        <motion.div
          className="cap-pullout-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22 }}
          onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
          role="dialog"
          aria-modal="false"
          aria-label={`${book.title} quick view`}
        >
          <div className="cap-pullout-stage">
            <motion.div
              className={`cap-pullout-book cap-${book.spineStyle}`}
              initial={shouldReduceMotion ? false : { x: -64, y: 46, rotateY: -72, rotateZ: -3, opacity: 0 }}
              animate={{ x: 0, y: 0, rotateY: -8, rotateZ: 0, opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { x: -34, y: 28, rotateY: -58, opacity: 0 }}
              transition={transition}
            >
              <div className="cap-pullout-cover">
                <img
                  src={book.coverPath}
                  alt={`${book.title} official cover`}
                  onError={(event) => { event.currentTarget.src = book.fallbackCoverPath }}
                />
                <span>OFFICIAL COVER</span>
              </div>
              <div className="cap-pullout-pages" aria-hidden="true" />
            </motion.div>

            <motion.aside
              className="cap-pullout-card"
              initial={shouldReduceMotion ? false : { x: 26, y: 10, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { x: 18, opacity: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...transition, delay: 0.08 }}
            >
              <div className="cap-pullout-meta"><span>CAPITOL RECORD {String(book.publicationOrder).padStart(2, '0')}</span><span>{book.year}</span></div>
              <h2>{book.title}</h2>
              <div className="cap-pullout-rule" />
              <p>{book.blurb}</p>
              <a href={amazonUrl} target="_blank" rel="noreferrer">READ THIS EDITION <span>→</span></a>
              <div className="cap-read-elsewhere">
                <div className="cap-read-elsewhere-links">
                  <a href={`https://bookshop.org/search?keywords=${searchTerm}`} target="_blank" rel="noreferrer">BOOKSHOP</a>
                  <a href={`https://www.barnesandnoble.com/s/${searchTerm}`} target="_blank" rel="noreferrer">B&amp;N</a>
                  <a href={`https://www.amazon.com/s?k=${searchTerm}`} target="_blank" rel="noreferrer">AMAZON</a>
                  <a href={`https://www.kobo.com/search?query=${searchTerm}`} target="_blank" rel="noreferrer">KOBO</a>
                </div>
              </div>
            </motion.aside>

            <button className="cap-pullout-close" onClick={onClose} aria-label="Close quick view">×</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
