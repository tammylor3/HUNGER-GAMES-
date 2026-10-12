import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import books from './data/books.json'

type IconName = 'mockingjay' | 'arrow' | 'ember' | 'snake' | 'wheat'
type SeriesOrder = number | 'prequel'
type Book = {
  id: string
  title: string
  year: number
  publicationOrder: number
  seriesOrder: SeriesOrder
  chronologicalOrder: number
  blurb: string
  spineColor: 'coal' | 'ember' | 'slate' | 'emerald' | 'amber'
  icon: IconName
  height: number
}

type OrderMode = 'publication' | 'chronology'

const seededBooks = books as Book[]

const iconLabels: Record<IconName, string> = {
  mockingjay: 'mockingjay emblem',
  arrow: 'arrow emblem',
  ember: 'ember emblem',
  snake: 'snake emblem',
  wheat: 'wheat sheaf emblem',
}

function BookIcon({ name, className = '' }: { name: IconName; className?: string }) {
  const common = {
    className: `book-icon ${className}`,
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (name === 'mockingjay') {
    return (
      <svg {...common}>
        <circle cx="24" cy="24" r="3.5" fill="currentColor" stroke="none" />
        <path d="M21 24C15 18 8 17 4 18c4 3 8 7 14 8M27 24c6-6 13-7 17-6-4 3-8 7-14 8M20 22c-3-6-3-11-1-15 3 4 5 9 5 15M28 22c3-6 3-11 1-15-3 4-5 9-5 15M22 27c-3 5-7 9-13 11 4-5 7-9 8-14M26 27c3 5 7 9 13 11-4-5-7-9-8-14" />
        <path d="M24 28v9" />
      </svg>
    )
  }

  if (name === 'arrow') {
    return (
      <svg {...common}>
        <path d="M7 34L39 14" />
        <path d="M29 14h10v10" />
        <path d="M10 31l-2 6 6-2" />
        <path d="M11 28l-3-3M15 25l-3-3" />
      </svg>
    )
  }

  if (name === 'ember') {
    return (
      <svg {...common}>
        <path d="M25 42c8-1 12-6 11-13-1-6-6-9-7-15-3 4-5 7-5 11-2-2-4-5-4-9-7 7-10 14-7 20 2 4 6 6 12 6Z" fill="currentColor" opacity=".88" stroke="none" />
        <path d="M24 39c4-1 6-4 5-8-1-2-3-4-3-6-3 3-5 6-4 9 .3 2 1 4 2 5Z" fill="none" />
      </svg>
    )
  }

  if (name === 'snake') {
    return (
      <svg {...common}>
        <path d="M33 9c-8-2-13 4-10 9 3 4 10 2 11 7 1 5-7 7-13 5-7-2-12 2-10 8 2 5 9 4 13 1" />
        <path d="M34 9l5-2M34 9l2 5" />
        <circle cx="36.5" cy="7" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M23 40V10M23 15c-7 0-10-4-12-7 6 0 10 2 12 7ZM23 22c-7 0-10-3-13-6 7-.5 11 1 13 6ZM23 29c6 0 10-3 13-6-7-.5-11 1-13 6ZM23 36c6 0 9-3 11-6-6-.2-9 1-11 6Z" />
      <path d="M13 40h21" />
    </svg>
  )
}

function orderLabel(mode: OrderMode) {
  return mode === 'publication' ? 'Publication order' : 'Story chronology'
}

function App() {
  const shouldReduceMotion = useReducedMotion()
  const [orderMode, setOrderMode] = useState<OrderMode>('publication')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  const sortedBooks = useMemo(() => {
    const key = orderMode === 'publication' ? 'publicationOrder' : 'chronologicalOrder'
    return [...seededBooks].sort((a, b) => a[key] - b[key])
  }, [orderMode])

  const selectedBook = sortedBooks.find((book) => book.id === selectedId) ?? null
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 260, damping: 24, mass: 0.9 }

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedId(null)
        return
      }

      if (!selectedId || (event.target as HTMLElement)?.tagName === 'BUTTON') return
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

      const currentIndex = sortedBooks.findIndex((book) => book.id === selectedId)
      if (currentIndex === -1) return
      event.preventDefault()
      const offset = event.key === 'ArrowRight' ? 1 : -1
      const nextIndex = (currentIndex + offset + sortedBooks.length) % sortedBooks.length
      setSelectedId(sortedBooks[nextIndex].id)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedId, sortedBooks])

  const selectBook = (book: Book) => setSelectedId(book.id)

  const onSpineKeyDown = (event: KeyboardEvent<HTMLElement>, book: Book) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectBook(book)
    }
  }

  return (
    <div className="app-shell">
      <div className="vignette" />
      <div className="ember-field" aria-hidden="true">
        {Array.from({ length: 22 }, (_, index) => (
          <motion.span
            key={index}
            className="ash-particle"
            style={{
              left: `${(index * 37) % 101}%`,
              top: `${12 + ((index * 23) % 72)}%`,
              width: `${2 + (index % 3)}px`,
              height: `${2 + (index % 3)}px`,
            }}
            animate={shouldReduceMotion ? undefined : { y: [0, -16, 0], x: [0, index % 2 ? 6 : -4, 0], opacity: [0.1, 0.48, 0.1] }}
            transition={shouldReduceMotion ? undefined : { duration: 5 + (index % 4), delay: index * 0.18, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <header className="site-header">
        <div className="header-kicker"><span className="kicker-rule" />ARCHIVE 05 <span className="kicker-rule" /></div>
        <h1>The Hunger Games <em>Library</em></h1>
        <p className="subtitle">Five books. One rebellion.</p>
        <div className="header-meta">
          <span className="collection-note">THE PANEM COLLECTION <span>•</span> SUZANNE COLLINS</span>
          <div className="order-switch" role="group" aria-label="Sort bookshelf">
            <span className="switch-label">ARRANGE BY</span>
            <button className={orderMode === 'publication' ? 'active' : ''} onClick={() => setOrderMode('publication')} aria-pressed={orderMode === 'publication'}>Publication Order</button>
            <span className="switch-divider">/</span>
            <button className={orderMode === 'chronology' ? 'active' : ''} onClick={() => setOrderMode('chronology')} aria-pressed={orderMode === 'chronology'}>Story Chronology</button>
          </div>
        </div>
      </header>

      <main className="library-main">
        <div className="library-stage" ref={stageRef}>
          <div className="stage-label stage-label-left">SHELF I <span>•</span> FICTION</div>
          <div className="stage-label stage-label-right">{orderLabel(orderMode).toUpperCase()} <span>•</span> 05 VOLUMES</div>
          <div className="back-glow" aria-hidden="true" />
          <div className="book-stage" aria-label="Panem bookshelf">
            <div className="book-row" data-has-selection={selectedBook ? 'true' : 'false'}>
              <AnimatePresence initial={false}>
                {sortedBooks.map((book, index) => {
                  const isSelected = book.id === selectedId
                  return (
                    <motion.article
                      key={book.id}
                      layout
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: isSelected ? 0 : 1, y: 0, scale: isSelected ? 0.9 : 1 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                      transition={transition}
                      className={`book-card book-${book.spineColor} ${isSelected ? 'is-selected' : ''}`}
                      style={{ '--book-height': `${book.height}px`, '--book-index': index } as CSSProperties}
                      tabIndex={0}
                      role="button"
                      aria-label={`Open ${book.title}, ${book.year}`}
                      aria-pressed={isSelected}
                      onClick={() => selectBook(book)}
                      onKeyDown={(event) => onSpineKeyDown(event, book)}
                    >
                      <div className="book-shell">
                        <div className="page-edge" aria-hidden="true" />
                        <div className="book-spine">
                          <span className="spine-order">{book.seriesOrder === 'prequel' ? 'PREQUEL' : `BOOK ${book.seriesOrder}`}</span>
                          <span className="spine-title">{book.title}</span>
                          <BookIcon name={book.icon} className={book.icon === 'mockingjay' ? 'mockingjay-mark' : ''} />
                        </div>
                        <div className="book-top-edge" aria-hidden="true" />
                      </div>
                    </motion.article>
                  )
                })}
              </AnimatePresence>
            </div>
            <div className="shelf-lip" aria-hidden="true"><span /></div>
            <div className="shelf-shadow" aria-hidden="true" />
          </div>
          <p className="stage-instruction">SELECT A VOLUME <span>•</span> USE ← → TO BROWSE</p>

          <AnimatePresence>
            {selectedBook && (
              <motion.div
                className="selection-layer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.34 }}
                onClick={() => setSelectedId(null)}
                role="dialog"
                aria-modal="true"
                aria-label={`${selectedBook.title} details`}
              >
                <div className="selection-layout" onClick={(event) => event.stopPropagation()}>
                  <motion.div
                    className={`open-book book-${selectedBook.spineColor}`}
                    initial={shouldReduceMotion ? false : { x: -42, rotateY: -76, opacity: 0, scale: 0.86 }}
                    animate={{ x: 0, rotateY: 0, opacity: 1, scale: 1 }}
                    exit={shouldReduceMotion ? undefined : { x: -42, rotateY: -76, opacity: 0, scale: 0.86 }}
                    transition={transition}
                  >
                    <div className="cover-ridge" aria-hidden="true" />
                    <div className="front-cover">
                      <div className="cover-corner" aria-hidden="true" />
                      <span className="cover-overline">THE PANEM ARCHIVE</span>
                      <span className="cover-series">{selectedBook.seriesOrder === 'prequel' ? 'PREQUEL' : `BOOK ${selectedBook.seriesOrder}`}</span>
                      <h2>{selectedBook.title}</h2>
                      <div className="cover-divider" />
                      <BookIcon name={selectedBook.icon} className={selectedBook.icon === 'mockingjay' ? 'mockingjay-mark' : ''} />
                      <span className="cover-year">{selectedBook.year}</span>
                      <span className="cover-author">SUZANNE COLLINS</span>
                    </div>
                    <div className="cover-pages" aria-hidden="true" />
                  </motion.div>

                  <motion.aside
                    className="detail-card"
                    initial={shouldReduceMotion ? false : { x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={shouldReduceMotion ? undefined : { x: 30, opacity: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.36, delay: 0.08 }}
                  >
                    <div className="detail-topline"><span>VOLUME {String(selectedBook.publicationOrder).padStart(2, '0')}</span><span>{selectedBook.year}</span></div>
                    <p className="detail-kicker">A STORY FROM PANEM</p>
                    <h2>{selectedBook.title}</h2>
                    <div className="detail-rule" />
                    <p className="detail-blurb">{selectedBook.blurb}</p>
                    <a className="about-link" href={`/about/${selectedBook.id}`} onClick={(event) => event.preventDefault()}>
                      ABOUT THIS BOOK <span>→</span>
                    </a>
                    <div className="detail-footer"><span>ESC TO CLOSE</span><span>← → NEXT VOLUME</span></div>
                  </motion.aside>
                </div>
                <button className="close-button" onClick={() => setSelectedId(null)} aria-label="Close book details">×</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="site-footer">
        <span>LIBRARY OF PANEM</span>
        <span className="footer-mark">◈</span>
        <span>AN ORIGINAL TYPOGRAPHIC ARCHIVE</span>
      </footer>
    </div>
  )
}

export default App
