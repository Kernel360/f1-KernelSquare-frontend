interface SpacingProps {
  size: number
}

function Spacing({ size }: SpacingProps) {
  return <div style={{ height: `${size}px` }} />
}

export default Spacing
