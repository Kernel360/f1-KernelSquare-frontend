interface CoffeeChatDetailContentProps {
  content: string
}

function CoffeeChatDetailContent({ content }: CoffeeChatDetailContentProps) {
  return (
    <div className="min-h-[200px] border border-colorsGray rounded-lg p-2">
      {content}
    </div>
  )
}

export default CoffeeChatDetailContent
