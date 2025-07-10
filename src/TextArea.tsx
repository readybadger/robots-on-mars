const TextArea = ({
  onChange,
  className,
  ...props
}: {
  onChange?: (value: string) => void
} & Omit<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  'onChange'
>) => {
  return (
    <textarea
      onChange={(event) => {
        onChange?.(event.target.value)
      }}
      className={`block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${
        className ?? ''
      }`}
      {...props}
    />
  )
}

export default TextArea
