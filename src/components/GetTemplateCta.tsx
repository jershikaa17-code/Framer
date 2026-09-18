import './get-template-cta.css'

export function GetTemplateCta() {
  return (
    <a
      className="get-template-cta"
      href="#showreel"
      data-cursor="View"
      data-cursor-icon="arrow"
      aria-label="Get Template"
    >
      <span className="get-template-cta__thumb">
        <img src={`${import.meta.env.BASE_URL}assets/hero-portrait.png`} alt="" />
      </span>
      <span className="get-template-cta__text">
        <span className="get-template-cta__title">Get Template</span>
        <span className="get-template-cta__sub">See what&apos;s inside</span>
      </span>
    </a>
  )
}
