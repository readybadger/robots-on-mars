const TextArea = ({
  value,
  onChange,
}: {
  value?: string
  onChange?: (value: string) => void
}) => {
  return (
    <textarea
      value={value}
      onChange={(event) => {
        onChange(event.target.value)
      }}
      className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  )
}

export default TextArea
