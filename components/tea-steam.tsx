'use client'

import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  radius: number
  maxRadius: number
  alpha: number
  maxAlpha: number
  vy: number
  vx: number
  swaySpeed: number
  swayDist: number
  phase: number
  life: number
  maxLife: number
}

export function TeaSteam() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }

    window.addEventListener('resize', handleResize)

    // Calculate exact cup rim position according to object-fit: cover of a 16:9 image
    const getCupPosition = () => {
      const isMobile = width <= 760
      const objectPositionX = isMobile ? 0.80 : 0.50
      const imgRatio = 16 / 9
      const screenRatio = width / height
      let renderedW = width
      let renderedH = height
      let offsetX = 0
      let offsetY = 0

      if (screenRatio > imgRatio) {
        renderedW = width
        renderedH = width / imgRatio
        offsetY = (height - renderedH) / 2
      } else {
        renderedH = height
        renderedW = height * imgRatio
        offsetX = (width - renderedW) * objectPositionX
      }

      // Cup rim in story-bg.jpg is at approx 79.2% horizontally, 47.5% vertically
      const cupX = offsetX + renderedW * 0.792
      const cupY = offsetY + renderedH * 0.475
      const rimWidth = Math.max(renderedW * 0.055, 32)

      return { cupX, cupY, rimWidth }
    }

    const particles: Particle[] = []
    const MAX_PARTICLES = 36

    const createParticle = (initRandomLife = false): Particle => {
      const { cupX, cupY, rimWidth } = getCupPosition()
      const spreadX = (Math.random() - 0.5) * (rimWidth * 0.7)
      const maxLife = 270 + Math.random() * 150
      const currentLife = initRandomLife ? Math.random() * maxLife : 0

      return {
        originX: cupX + spreadX,
        originY: cupY,
        x: cupX + spreadX,
        y: cupY,
        radius: 9 + Math.random() * 6,
        maxRadius: 46 + Math.random() * 24, // slimmer, less thick plumes
        alpha: 0,
        maxAlpha: 0.20 + Math.random() * 0.14, // delicate sheer opacity
        vy: 0.50 + Math.random() * 0.42, // relaxed medium upward speed
        vx: (Math.random() - 0.5) * 0.16,
        swaySpeed: 0.009 + Math.random() * 0.010, // smooth medium sway
        swayDist: 14 + Math.random() * 18,
        phase: Math.random() * Math.PI * 2,
        life: currentLife,
        maxLife,
      }
    }

    // Pre-populate so smoke is already rising immediately on load
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push(createParticle(true))
    }

    let tick = 0

    const render = () => {
      tick++
      ctx.clearRect(0, 0, width, height)

      // Use destination-over or screen blend mode for soft ambient steam
      ctx.globalCompositeOperation = 'screen'

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.life++

        const progress = p.life / p.maxLife

        if (progress >= 1) {
          // Reset particle to cup mouth seamlessly
          particles[i] = createParticle(false)
          continue
        }

        // Rise upwards
        p.y -= p.vy

        // Gentle sinusoidal sway mimicking rising hot air drafts
        p.x = p.originX + Math.sin(tick * p.swaySpeed + p.phase) * p.swayDist + (p.vx * p.life)

        // Expand as steam diffuses into air
        const currentRadius = p.radius + (p.maxRadius - p.radius) * Math.pow(progress, 0.75)

        // Fade in rapidly as it leaves the rim, stay visible, then evaporate softly
        let currentAlpha = 0
        if (progress < 0.2) {
          currentAlpha = (progress / 0.2) * p.maxAlpha
        } else if (progress < 0.55) {
          currentAlpha = p.maxAlpha
        } else {
          currentAlpha = p.maxAlpha * (1 - (progress - 0.55) / 0.45)
        }

        // Draw soft volumetric steam wisp
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius)
        // Warm creamy white hue matching karak tea vapor with lighter opacity
        grad.addColorStop(0, `rgba(255, 245, 230, ${(currentAlpha * 0.75).toFixed(3)})`)
        grad.addColorStop(0.35, `rgba(250, 238, 220, ${(currentAlpha * 0.42).toFixed(3)})`)
        grad.addColorStop(0.7, `rgba(240, 225, 205, ${(currentAlpha * 0.12).toFixed(3)})`)
        grad.addColorStop(1, 'rgba(235, 220, 200, 0)')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="tea-steam-canvas"
      aria-hidden="true"
    />
  )
}
