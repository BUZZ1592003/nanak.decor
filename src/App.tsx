import { useEffect, useMemo, useState, type FormEvent } from 'react'
import './App.css'

type HeroSlide = {
  image: string
  eyebrow: string
  title: string
  blurb: string
}

type PortfolioProject = {
  id: number
  title: string
  category: string
  area: string
  description: string
  image: string
  tags: string[]
}

type Service = {
  title: string
  description: string
}

type Testimonial = {
  name: string
  role: string
  quote: string
  image: string
  rating: number
}

type BlogItem = {
  title: string
  excerpt: string
  image: string
  category: string
}

const heroSlides: HeroSlide[] = [
  {
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80',
    eyebrow: 'Luxury interiors for modern living',
    title: 'Transforming Spaces Into Timeless Experiences',
    blurb:
      'Bespoke interiors shaped for high-value homes, signature offices, and hospitality spaces that need to feel rare, refined, and unforgettable.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=80',
    eyebrow: 'Warm minimalism with depth',
    title: 'Elevated design, crafted room by room',
    blurb:
      'We blend curated materials, subtle lighting, and intelligent layouts into spaces that photograph beautifully and work even better.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80',
    eyebrow: 'Cinematic kitchen and living concepts',
    title: 'From concept sketches to complete execution',
    blurb:
      'Every detail is managed end-to-end with premium finishes, precise timelines, and a client experience designed around trust.',
  },
]

const heroStats = [
  { value: 320, label: 'Projects Completed', suffix: '+' },
  { value: 180, label: 'Happy Clients', suffix: '+' },
  { value: 12, label: 'Years of Experience', suffix: '+' },
]

const services: Service[] = [
  {
    title: 'Residential Interior Design',
    description:
      'Tailored homes with a premium sense of scale, comfort, and visual harmony.',
  },
  {
    title: 'Commercial Interior Design',
    description:
      'Brand-led workplaces and client-facing environments that elevate perception.',
  },
  {
    title: 'Modular Kitchen Design',
    description:
      'Functional, elegant kitchens with precise storage planning and high-end finishes.',
  },
  {
    title: 'Space Planning',
    description:
      'Optimized layouts that improve flow, daylight, and daily usability across every square foot.',
  },
  {
    title: 'Renovation Services',
    description:
      'Transformative upgrades for dated properties with a clear process and seamless execution.',
  },
  {
    title: '3D Design Visualization',
    description:
      'Immersive renders and walkthroughs so clients can approve with confidence before build begins.',
  },
]

const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: 'Serene Penthouse Living',
    category: 'Living Room',
    area: '1,900 sq ft',
    description:
      'Muted textures, brushed metals, and layered lighting for a refined city retreat.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    tags: ['Custom Joinery', 'Ambient Lighting', 'Stone Finish'],
  },
  {
    id: 2,
    title: 'Boutique Bedroom Suite',
    category: 'Bedroom',
    area: 'Luxury Residence',
    description:
      'A warm sanctuary anchored by tactile fabrics, soft illumination, and bespoke wardrobes.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=70',
    tags: ['Soft Furnishings', 'Wardrobe Design', 'Mood Lighting'],
  },
  {
    id: 3,
    title: 'Architectural Modular Kitchen',
    category: 'Modular Kitchen',
    area: 'Family Home',
    description:
      'A balanced layout with concealed storage, premium handles, and a timeless palette.',
    image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80',
    tags: ['Quartz Countertop', 'Storage Planning', 'Premium Appliances'],
  },
  {
    id: 4,
    title: 'Executive Office Interior',
    category: 'Office Interior',
    area: 'Corporate Suite',
    description:
      'A disciplined work environment with hospitality-grade detailing and acoustic comfort.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    tags: ['Workplace Strategy', 'Acoustics', 'Brand Identity'],
  },
  {
    id: 5,
    title: 'Quiet Luxury Villa Lounge',
    category: 'Luxury Villa',
    area: '4,800 sq ft',
    description:
      'Statement proportions, natural light, and sculptural forms for a villa of presence.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=60',
    tags: ['Double Height', 'Natural Stone', 'Statement Seating'],
  },
  {
    id: 6,
    title: 'Hospitality Reception Suite',
    category: 'Commercial Spaces',
    area: 'Guest Experience',
    description:
      'A hospitality-forward environment designed to make first impressions feel expensive.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=50',
    tags: ['Reception', 'Wayfinding', 'Finishing'],
  },
]

const testimonials: Testimonial[] = [
  {
    name: 'Aarav Mehta',
    role: 'Villa Owner, Chandigarh',
    quote:
      'Nanak Decor brought a level of polish that felt more like a luxury studio than a conventional interior vendor. The execution matched the renders.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 5,
  },
  {
    name: 'Ritika Sharma',
    role: 'Founder, Wellness Clinic',
    quote:
      'They understood both aesthetics and business outcomes. Our reception now feels premium, and the lead quality improved immediately.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    rating: 5,
  },
  {
    name: 'Kabir Sethi',
    role: 'Penthouse Client, Ambala',
    quote:
      'The process was extremely structured, the communication was clean, and the final home feels calm, elegant, and distinctly ours.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    rating: 5,
  },
]

const processSteps = [
  'Consultation',
  'Design Planning',
  '3D Visualization',
  'Execution',
  'Final Handover',
]

const faqs = [
  {
    question: 'How long does a premium interior project usually take?',
    answer:
      'Timelines vary by scope, but most residential projects move through design, approvals, procurement, and execution in a structured phased schedule.',
  },
  {
    question: 'Do you handle both design and execution?',
    answer:
      'Yes. Nanak Decor manages concept design, 3D visualization, vendor coordination, and site execution so the experience remains seamless.',
  },
  {
    question: 'Can you work with an existing home or office shell?',
    answer:
      'Absolutely. We handle renovation, retrofitting, and full-space transformations while preserving the best parts of the original structure.',
  },
  {
    question: 'Do you provide 3D renders before execution?',
    answer:
      'Yes. We prepare design visualizations so clients can review finishes, proportions, and furniture placement before work begins.',
  },
]

const blogItems: BlogItem[] = [
  {
    title: 'The rise of quiet luxury in Indian homes',
    excerpt:
      'Why warm neutrals, clean geometry, and bespoke detailing are replacing loud trend-led spaces.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    category: 'Design Insight',
  },
  {
    title: 'How to plan a modular kitchen that feels expensive',
    excerpt:
      'Storage strategy, lighting, and material selection make the difference between functional and exceptional.',
    image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80',
    category: 'Kitchen Planning',
  },
  {
    title: 'What high-net-worth clients expect from an interior studio',
    excerpt:
      'A clear process, superior presentation, and quality control at every milestone.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    category: 'Client Experience',
  },
]

const instagramShots = [
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
]

const whatsappLink =
  'https://wa.me/919999000000?text=Hello%20Nanak%20Decor%2C%20I%27d%20like%20to%20book%20a%20free%20consultation.'
const callLink = 'tel:+919999000000'

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(
    null,
  )
  const [activeFaq, setActiveFaq] = useState(0)
  const [splitPosition, setSplitPosition] = useState(58)
  const [scrollY, setScrollY] = useState(0)
  const [countValues, setCountValues] = useState(heroStats.map(() => 0))
  const [submitted, setSubmitted] = useState(false)

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return portfolioProjects
    }

    return portfolioProjects.filter((project) => project.category === selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 6500)

    const testimonialTimer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length)
    }, 7000)

    return () => {
      window.clearInterval(slideTimer)
      window.clearInterval(testimonialTimer)
    }
  }, [])

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        frame = 0
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    revealTargets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const duration = 1600
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)

      setCountValues(
        heroStats.map((stat) => Math.round(stat.value * (0.12 + progress * 0.88))),
      )

      if (progress < 1) {
        window.requestAnimationFrame(tick)
      }
    }

    const animationFrame = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [])

  const heroSlide = heroSlides[activeSlide]
  const testimonial = testimonials[activeTestimonial]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')

    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#home" aria-label="Nanak Decor home">
          <span className="brand-mark">ND</span>
          <span>
            <strong>nanak.decor</strong>
            <small>Luxury Interior Design Studio</small>
          </span>
        </a>

        <nav className="nav" aria-label="Primary navigation">
          <a href="#portfolio">Portfolio</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="topbar-actions">
          <a className="ghost-button" href={callLink}>
            Call Now
          </a>
          <a className="primary-button" href="#contact">
            Get Free Consultation
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="hero section-frame">
          <div
            className="hero-background"
            style={{
              backgroundImage: `url(${heroSlide.image})`,
              transform: `translate3d(0, ${scrollY * 0.18}px, 0) scale(1.08)`,
            }}
            aria-hidden="true"
          />
          <div className="hero-overlay" aria-hidden="true" />

          <div className="hero-content reveal" data-reveal>
            <p className="eyebrow reveal-line">{heroSlide.eyebrow}</p>
            <h1 className="hero-title">
              <span>Transforming Spaces</span>
              <span>Into Timeless Experiences</span>
            </h1>
            <p className="hero-copy">{heroSlide.blurb}</p>

            <div className="hero-cta-row">
              <a className="primary-button" href="#portfolio">
                View Portfolio
              </a>
              <a className="secondary-button" href="#contact">
                Get Free Consultation
              </a>
            </div>

            <div className="hero-trust-row" aria-label="Quick contact highlights">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                WhatsApp Response in Minutes
              </a>
              <span>Ambala • Chandigarh • Tricity</span>
              <span>Premium residential and commercial execution</span>
            </div>
          </div>

          <div className="hero-panel glass-card reveal" data-reveal>
            <p className="panel-label">Studio performance</p>
            <div className="panel-stats">
              {heroStats.map((stat, index) => (
                <article className="panel-stat" key={stat.label}>
                  <strong>
                    {countValues[index]}
                    {stat.suffix}
                  </strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-meta glass-card reveal" data-reveal>
            <span>Selected by discerning homeowners</span>
            <span>Design, visualization, execution, handover</span>
          </div>

          <div className="hero-slider glass-card reveal" data-reveal>
            <div className="hero-slider-copy">
              <p>Featured concept</p>
              <h2>{heroSlide.title}</h2>
            </div>
            <div className="hero-slider-dots" aria-label="Hero slide indicators">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  className={index === activeSlide ? 'dot active' : 'dot'}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="ticker" aria-label="Studio strengths">
          <div className="ticker-track">
            <span>Premium residential interiors</span>
            <span>Luxury villas</span>
            <span>Modular kitchens</span>
            <span>Commercial spaces</span>
            <span>3D visualization</span>
            <span>Turnkey execution</span>
          </div>
        </section>

        <section id="stats" className="section-frame metrics-grid reveal" data-reveal>
          {heroStats.map((stat, index) => (
            <article className="metric-card glass-card" key={stat.label}>
              <strong>
                {countValues[index]}
                {stat.suffix}
              </strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </section>

        <section className="section-frame highlight-band reveal" data-reveal>
          <div>
            <p className="eyebrow">Designed for high-intent clients</p>
            <h2>Elegant spaces with the precision of a luxury studio.</h2>
          </div>
          <p>
            Nanak Decor combines cinematic aesthetics, technical discipline, and
            premium material curation to produce homes and commercial interiors
            that inspire trust before the first meeting ends.
          </p>
        </section>

        <section className="section-frame reveal" id="portfolio" data-reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Portfolio</p>
              <h2>Large-format projects crafted to impress on first glance.</h2>
            </div>
            <p>
              Explore signature residential and commercial work across living
              rooms, bedrooms, kitchens, offices, villas, and hospitality-led spaces.
            </p>
          </div>

          <div className="filter-row" role="tablist" aria-label="Portfolio categories">
            {[
              'All',
              'Living Room',
              'Bedroom',
              'Modular Kitchen',
              'Office Interior',
              'Luxury Villa',
              'Commercial Spaces',
            ].map((category) => (
              <button
                key={category}
                type="button"
                className={category === selectedCategory ? 'filter-chip active' : 'filter-chip'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="masonry-grid">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                className="project-card glass-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-image-wrap">
                  <img src={project.image} alt={project.title} className="project-image" />
                </div>
                <div className="project-copy">
                  <div className="project-meta-row">
                    <span>{project.category}</span>
                    <span>{project.area}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="section-frame before-after reveal" data-reveal>
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Before & after</p>
              <h2>Visible transformation, clear ROI, premium finishing.</h2>
            </div>
            <p>
              Drag the slider to compare a dated shell with the renovated final result.
            </p>
          </div>

          <div className="comparison-card glass-card">
            <div className="comparison-stage">
              <img
                src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80"
                alt="Before renovation"
                className="comparison-image before"
              />
              <div className="comparison-overlay" style={{ width: `${splitPosition}%` }}>
                <img
                  src="https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1400&q=80"
                  alt="After renovation"
                  className="comparison-image after"
                />
              </div>
              <div className="comparison-label left">Before</div>
              <div className="comparison-label right">After</div>
            </div>
            <div className="comparison-controls">
              <input
                type="range"
                min="10"
                max="90"
                value={splitPosition}
                onChange={(event) => setSplitPosition(Number(event.target.value))}
                aria-label="Comparison slider"
              />
              <div className="comparison-caption">
                <strong>Renovation uplift</strong>
                <span>Space planning, lighting, finishes, and furniture design</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-frame reveal" id="services" data-reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Services</p>
              <h2>Every service built to support premium client conversion.</h2>
            </div>
            <p>
              From the first consultation to the final handover, each step is designed
              to feel structured, calm, and exceptionally polished.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <article className="service-card glass-card" key={service.title}>
                <span className="service-index">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-frame process-band reveal" data-reveal>
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Process</p>
              <h2>Clear milestones from consultation to handover.</h2>
            </div>
            <p>
              The workflow is intentionally transparent so clients always know what is
              happening next.
            </p>
          </div>

          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div className="process-step glass-card" key={step}>
                <span>0{index + 1}</span>
                <h3>{step}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="section-frame split-layout reveal" id="about" data-reveal>
          <div className="about-panel glass-card">
            <p className="eyebrow">About Nanak Decor</p>
            <h2>Purpose-built for clients who expect elegance and execution.</h2>
            <p>
              Based in Kesri, Ambala, Nanak Decor creates interiors with a premium
              architectural mindset. We care about the story a space tells, the way it
              flows, and the confidence it gives to every person who walks in.
            </p>

            <div className="timeline">
              <div>
                <span>01</span>
                <strong>Vision</strong>
                <p>We translate aspirations into a clear design direction.</p>
              </div>
              <div>
                <span>02</span>
                <strong>Craft</strong>
                <p>Materials, lighting, and detailing are curated to feel elevated.</p>
              </div>
              <div>
                <span>03</span>
                <strong>Delivery</strong>
                <p>Every project is managed with disciplined execution and quality checks.</p>
              </div>
            </div>
          </div>

          <div className="team-panel glass-card">
            <p className="eyebrow">Team introduction</p>
            <h2>Design leadership with a hospitality-grade client experience.</h2>
            <p>
              Our team combines interior design, site coordination, and finishing
              expertise to keep the whole process smooth, premium, and predictable.
            </p>
            <div className="team-card">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
                alt="Design lead portrait"
              />
              <div>
                <strong>Studio-first leadership</strong>
                <span>Visual clarity, precise communication, and meticulous site control.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-frame testimonials reveal" data-reveal>
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Testimonials</p>
              <h2>Client reviews that signal trust before the first call.</h2>
            </div>
            <p>The right experience should look premium and feel effortless.</p>
          </div>

          <article className="testimonial-card glass-card">
            <div className="testimonial-top">
              <img src={testimonial.image} alt={testimonial.name} />
              <div>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
            <div className="stars" aria-label={`${testimonial.rating} star review`}>
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <span key={index}>★</span>
              ))}
            </div>
            <p>“{testimonial.quote}”</p>
          </article>

          <div className="testimonial-controls">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={index === activeTestimonial ? 'dot active' : 'dot'}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="section-frame blog-section reveal" data-reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Latest projects & blog</p>
              <h2>Inspiration, process notes, and style direction for serious buyers.</h2>
            </div>
            <p>
              Design inspiration should still drive inquiries. These editorial cards support
              discovery while keeping the presentation premium.
            </p>
          </div>

          <div className="blog-grid">
            {blogItems.map((item) => (
              <article className="blog-card glass-card" key={item.title}>
                <img src={item.image} alt={item.title} />
                <div>
                  <span className="blog-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-frame faq-section reveal" data-reveal>
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Frequently asked questions</p>
              <h2>Helpful answers that reduce friction before inquiry.</h2>
            </div>
            <p>
              Good conversion depends on clarity. These FAQs support the consultation flow.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index

              return (
                <button
                  key={faq.question}
                  type="button"
                  className={isOpen ? 'faq-item glass-card open' : 'faq-item glass-card'}
                  onClick={() => setActiveFaq(isOpen ? -1 : index)}
                >
                  <div className="faq-question-row">
                    <strong>{faq.question}</strong>
                    <span>{isOpen ? '−' : '+'}</span>
                  </div>
                  <p>{faq.answer}</p>
                </button>
              )
            })}
          </div>
        </section>

        <section className="section-frame instagram-section reveal" data-reveal>
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Instagram gallery</p>
              <h2>A visual feed that reinforces premium taste.</h2>
            </div>
            <p>
              These shots mirror the kind of elevated atmosphere the studio creates in
              real projects and on social channels.
            </p>
          </div>

          <div className="instagram-grid">
            {instagramShots.map((shot, index) => (
              <button
                key={shot}
                type="button"
                className="instagram-card"
                onClick={() => setSelectedProject(portfolioProjects[index % portfolioProjects.length])}
              >
                <img src={shot} alt={`Instagram inspiration ${index + 1}`} />
              </button>
            ))}
          </div>
        </section>

        <section className="section-frame contact-section reveal" id="contact" data-reveal>
          <div className="contact-copy glass-card">
            <p className="eyebrow">Lead generation</p>
            <h2>Book a free consultation and start with a premium design brief.</h2>
            <p>
              Share your space, goals, and timeline. We’ll respond with the right
              next step for your project.
            </p>

            <div className="contact-actions">
              <a className="primary-button" href={whatsappLink} target="_blank" rel="noreferrer">
                WhatsApp Us
              </a>
              <a className="ghost-button" href={callLink}>
                Call Now
              </a>
            </div>

            <div className="business-card">
              <strong>Business hours</strong>
              <span>Mon - Sat, 10:00 AM - 7:30 PM</span>
              <span>Nanak Decor Kesri, Ambala, Haryana</span>
            </div>
          </div>

          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label>
                <span>Phone</span>
                <input type="tel" name="phone" placeholder="Your phone number" required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" placeholder="Your email address" required />
              </label>
              <label>
                <span>Project type</span>
                <select name="projectType" defaultValue="Residential Interior Design">
                  <option>Residential Interior Design</option>
                  <option>Commercial Interior Design</option>
                  <option>Modular Kitchen Design</option>
                  <option>Renovation Services</option>
                </select>
              </label>
            </div>

            <label className="full-width">
              <span>Project details</span>
              <textarea
                name="details"
                rows={5}
                placeholder="Tell us about your space, size, style preferences, and timeline."
                required
              />
            </label>

            <button className="primary-button submit-button" type="submit">
              Request Free Consultation
            </button>

            {submitted ? (
              <p className="form-success">
                Thanks. Your inquiry is ready. Connect this form to email, CRM, or WhatsApp
                routing when you deploy.
              </p>
            ) : null}
          </form>
        </section>
      </main>

      <footer className="footer section-frame">
        <div className="footer-brand">
          <strong>nanak.decor</strong>
          <p>Luxury interior design studio serving discerning residential and commercial clients.</p>
        </div>

        <div className="footer-links">
          <a href="#portfolio">Portfolio</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-contact">
          <span>Kesri, Ambala, Haryana 134003</span>
          <span>
            <a href={callLink}>Call Now</a>
          </span>
          <span>
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </span>
        </div>

        <div className="footer-map glass-card">
          <iframe
            title="Nanak Decor location map"
            src="https://www.google.com/maps?q=Nanak%20Decor%20Kesri%2C%20Shop%20number%202%2C%201st%20floor%2C%20mohri%20road%2C%20kesri%2C%20Sector%208%2C%20Ambala%2C%20Haryana%20134003&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </footer>

      <button className="sticky-inquiry" type="button" onClick={scrollToContact}>
        Free Consultation
      </button>

      {selectedProject ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="modal glass-card"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
            <div className="modal-copy">
              <p className="eyebrow">Project details</p>
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.description}</p>
              <div className="tag-row">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
              <a className="primary-button" href="#contact" onClick={() => setSelectedProject(null)}>
                Start Similar Project
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App