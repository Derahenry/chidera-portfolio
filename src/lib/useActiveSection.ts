import { useEffect, useState } from 'react'

/** Returns the id of the section currently nearest the top of the viewport. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')
  const key = ids.join(',')

  useEffect(() => {
    const sections = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      // A thin band across the upper middle of the screen decides which section is "current".
      { rootMargin: '-35% 0px -60% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [key])

  return active
}
