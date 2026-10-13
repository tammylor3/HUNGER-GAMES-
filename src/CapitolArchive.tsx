import { useEffect, useMemo, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import books from './data/capitol-books.json'
import CapitolPullout from './CapitolPullout'

type IconName = 'mockingjay' | 'flame' | 'rose' | 'snake' | 'wheat'
type SeriesOrder = number | 'prequel'
type Book = {
  id: string
  title: string
  year: number
  publicationOrder: number
  seriesOrder: SeriesOrder
  chronologicalOrder: number
  blurb: string
  spineStyle: 'magenta' | 'sunset' | 'pearl' | 'emerald' | 'champagne'
  icon: IconName
  height: number
  tassel: boolean
  coverPath: string
  fallbackCoverPath: string
}
const seededBooks = books as Book[]

function CapitolIcon({ name, className = '' }: { name: IconName; className?: string }) {
  const common = {
    className: `cap-icon ${className}`,
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (name === 'mockingjay') return <svg {...common}><circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" /><path d="M21 24C15 18 8 17 4 18c4 3 8 7 14 8M27 24c6-6 13-7 17-6-4 3-8 7-14 8M20 22c-3-6-3-11-1-15 3 4 5 9 5 15M28 22c3-6 3-11 1-15-3 4-5 9-5 15M22 27c-3 5-7 9-13 11 4-5 7-9 8-14M26 27c3 5 7 9 13 11-4-5-7-9-8-14" /><path d="M24 28v9" /></svg>
  if (name === 'flame') return <svg {...common}><path d="M25 42c8-1 12-6 11-13-1-6-6-9-7-15-3 4-5 7-5 11-2-2-4-5-4-9-7 7-10 14-7 20 2 4 6 6 12 6Z" fill="currentColor" opacity=".88" stroke="none" /><path d="M24 39c4-1 6-4 5-8-1-2-3-4-3-6-3 3-5 6-4 9 .3 2 1 4 2 5Z" /></svg>
  if (name === 'rose') return <svg {...common}><path d="M24 23c-6 0-9-4-7-8 2-4 7-4 9 0 2-5 7-6 10-3 3 3 1 8-4 10 3 3 1 8-3 9-4 1-7-2-7-6-5 2-9-1-9-5 0-3 4-5 8-3" /><path d="M24 28c0 5-2 9-7 13M24 32c3 0 6 1 9 4" /></svg>
  if (name === 'snake') return <svg {...common}><path d="M33 9c-8-2-13 4-10 9 3 4 10 2 11 7 1 5-7 7-13 5-7-2-12 2-10 8 2 5 9 4 13 1" /><path d="M34 9l5-2M34 9l2 5" /><circle cx="36.5" cy="7" r="1" fill="currentColor" stroke="none" /></svg>
  return <svg {...common}><path d="M23 40V10M23 15c-7 0-10-4-12-7 6 0 10 2 12 7ZM23 22c-7 0-10-3-13-6 7-.5 11 1 13 6ZM23 29c6 0 10-3 13-6-7-.5-11 1-13 6ZM23 36c6 0 9-3 11-6-6-.2-9 1-11 6Z" /><path d="M13 40h21" /></svg>
}

function SpineOrnament({ book }: { book: Book }) {
  if (book.id === 'songbirds-snakes') {
    return <svg className="cap-spine-ornament cap-snake-ornament" viewBox="0 0 120 42" aria-hidden="true"><path d="M8 29c12-24 23-24 31-7s20 20 31 2 20-17 42-12" /><path d="M102 12l10 0-5 8" /><circle cx="108" cy="12" r="2" /></svg>
  }
  if (book.id === 'sunrise-reaping') {
    return <svg className="cap-spine-ornament cap-sunrise-ornament" viewBox="0 0 120 42" aria-hidden="true"><path d="M60 8v26M37 13l17 17M83 13L66 30M28 25h24M92 25H68" /><circle cx="60" cy="25" r="9" /></svg>
  }
  return <svg className="cap-spine-ornament cap-arrow-ornament" viewBox="0 0 120 42" aria-hidden="true"><path d="M8 21h34M112 21H78" /><path d="M20 13l-12 8 12 8M100 13l12 8-12 8" /><path d="M47 10h26M47 32h26" /></svg>
}

function CapitolArchive() {
  const shouldReduceMotion = useReducedMotion()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  useEffect(() => { document.title = 'The Capitol Archive' }, [])

  useEffect(() => {
    const assetUrls = ['/references/capitol-cityscape.jpeg', ...seededBooks.map((book) => book.fallbackCoverPath)]
    const images = assetUrls.map((url) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = url
      return image
    })
    return () => images.forEach((image) => { image.src = '' })
  }, [])

  const sortedBooks = useMemo(() => [...seededBooks].sort((a, b) => a.publicationOrder - b.publicationOrder), [])
  const selectedBook = sortedBooks.find((book) => book.id === selectedId) ?? null
  const transition = shouldReduceMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 220, damping: 24, mass: .86 }

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') { setSelectedId(null); return }
      if (!selectedId || (event.target as HTMLElement)?.tagName === 'BUTTON') return
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      const currentIndex = sortedBooks.findIndex((book) => book.id === selectedId)
      if (currentIndex === -1) return
      event.preventDefault()
      const offset = event.key === 'ArrowRight' ? 1 : -1
      setSelectedId(sortedBooks[(currentIndex + offset + sortedBooks.length) % sortedBooks.length].id)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedId, sortedBooks])

  const selectBook = (book: Book) => setSelectedId(book.id)
  const onSpineKeyDown = (event: KeyboardEvent<HTMLElement>, book: Book) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectBook(book) }
  }

  return (
    <div className="cap-app">
      <header className="cap-header">
        <div className="cap-wordmark">THE CAPITOL ARCHIVE</div>
      </header>

      <main className="cap-main">
        <section className="cap-stage" aria-label="The Capitol Archive bookshelf">
          <div className="cap-intro">
            <h1>Book Corner</h1>
            <div className="cap-intro-rule" />
            <p>An ever-evolving, carefully curated archive of rare and sought-after books, publications, and printed matter spanning rebellion, architecture, fashion, and culture.</p>
            <span>Visit the archive to explore our collection.</span>
          </div>

          <div className="cap-shelf">
            <div className="cap-book-row is-upright" data-selected={selectedBook ? 'true' : 'false'}>
              <AnimatePresence initial={false}>
                {sortedBooks.map((book, index) => {
                  const isSelected = book.id === selectedId
                  const selectedIndex = selectedId ? sortedBooks.findIndex((item) => item.id === selectedId) : -1
                  const shelfShift = selectedId && !isSelected ? (index < selectedIndex ? 7 : -7) : 0
                  return (
                    <motion.article
                      key={book.id}
                      layout
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: isSelected ? .2 : 1, x: isSelected ? -10 : shelfShift, y: isSelected ? -17 : 0, rotateY: isSelected ? -11 : 0, rotateZ: isSelected ? -1.5 : 0, scale: isSelected ? .99 : 1 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                      transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 25, mass: .82 }}
                      whileHover={shouldReduceMotion ? undefined : { y: -9, rotateY: -4, rotateX: 1 }}
                      className={`cap-book-card cap-${book.spineStyle} ${isSelected ? 'is-selected' : ''}`}
                      style={{ '--cap-book-height': `${book.height}px`, '--cap-book-index': index } as CSSProperties}
                      tabIndex={0}
                      role="button"
                      aria-label={`Open ${book.title}, ${book.year}`}
                      aria-pressed={isSelected}
                      onClick={() => selectBook(book)}
                      onKeyDown={(event) => onSpineKeyDown(event, book)}
                    >
                      <div className="cap-tassel" aria-hidden="true" />
                      <div className="cap-book-shell">
                        <div className="cap-page-edge" aria-hidden="true" />
                        <div className="cap-book-spine">
                          <span className="cap-spine-publisher">COLLINS</span>
                          <span className="cap-spine-title">{book.title}</span>
                          <div className="cap-spine-footer">
                            <CapitolIcon name={book.icon} className={book.icon === 'mockingjay' ? 'cap-mockingjay-mark' : ''} />
                            <span>SCHOLASTIC<br />PRESS</span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </AnimatePresence>
            </div>
            <div className="cap-shelf-surface" aria-hidden="true"><span /><b /></div>
          </div>

          <CapitolPullout book={selectedBook} shouldReduceMotion={shouldReduceMotion} onClose={() => setSelectedId(null)} />
        </section>
      </main>

    </div>
  )
}

export default CapitolArchive
