interface CoffeeChatTitleProps {
  title: string
}

function CoffeeChatTitle({ title }: CoffeeChatTitleProps) {
  return (
    <section>
      <h3 className="max-w-full my-6 text-xl pc:text-2xl font-bold text-[#444444]">
        {title}
      </h3>
    </section>
  )
}

export default CoffeeChatTitle
