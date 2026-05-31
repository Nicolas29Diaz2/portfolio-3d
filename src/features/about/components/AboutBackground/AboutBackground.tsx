import './AboutBackground.css'

export function AboutBackground() {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 720 330"
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
      }}
    >
      <g transform="translate(5,0)">
        <polyline
          className="about-border-line-filled"
          points="10,10 10,50 30,70 200,70 220,50 220,10 8,10"
        />
        <polyline
          className="about-border-line"
          points="30,70 10,90 10,320 220,320 220,90 200,70 30,70"
        />
        <polyline
          className="about-border-line"
          points="215,70 235,50 235,10 680,10 700,30 700,320 235,320 235,90 215,68"
        />
      </g>
    </svg>
  )
}
