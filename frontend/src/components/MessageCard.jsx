const MessageCard = ({ message, type }) => {
  const isQuestion = type === 'question'

  return (
    <div
      className={`rounded-[10px] px-[14px] py-3 text-left ${
        isQuestion
          ? 'ml-5 bg-[#1d3a70] text-white'
          : 'mr-5 border border-[#b3dce8] bg-[#e8f4f8] text-[#1d1b17]'
      }`}
    >
      <p className="m-0 whitespace-pre-wrap leading-[1.5]">{message}</p>
    </div>
  )
}

export default MessageCard
