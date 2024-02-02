import Button from "@/components/shared/button/Button"
import { FunnelStepFunctionComponentProps } from "@/components/shared/funnel/Funnel"

function IntroStep({ setStep }: FunnelStepFunctionComponentProps) {
  const nextStep = () => {
    setStep("reason")
  }

  return (
    <div>
      <Button
        className="border border-colorsGray bg-colorsLightGray text-danger"
        onClick={nextStep}
      >
        다음
      </Button>
    </div>
  )
}

export default IntroStep
