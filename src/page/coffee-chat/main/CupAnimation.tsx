"use client"

import CupRunning from "@/components/shared/animation/CupRunning"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"

function CupAnimation() {
  return (
    <div>
      <Cup
        className={`min-w-[120px] min-h-[120px] inline-flex align-top relative w-fit transition-transform md:![animation-duration:15s] lgDevice:![animation-duration:20s]`}
      >
        <CupRunning
          style={{
            width: "120px",
            flexShrink: "0",
          }}
        />
      </Cup>
    </div>
  )
}

export default CupAnimation

const cupMoving = keyframes`
  from {
    transform: rotateY(0deg);
    left: 0px;
  }

  50% {
    transform: rotateY(0deg);
    left: calc(100% - 120px);
  }
  51% {
    transform: rotateY(180deg);
  }

  99% {
    transform: rotateY(180deg);
    left: 0px;
  }

  to {
    transform: rotate(0deg);
    left: 0px
  }
`

const Cup = styled.div`
  animation: ${cupMoving} 10s linear infinite forwards;
`
