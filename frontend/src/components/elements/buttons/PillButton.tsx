import clsx from 'clsx'

const variants = {
  black: 'bg-black text-white',
  white: 'bg-white text-black border border-gray-200',
  blue: 'bg-primary-blue text-white',
}

const sizes = {
  small: 'h-[32px]',
  medium: 'h-[36px]',
  large: 'h-[42px]',
}

interface Props {
  text: string | React.ReactNode
  variant: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export const PillButton = ({
  text,
  variant,
  size = 'medium',
  className,
  onClick,
  ...rest
}: Props) => (
  <button
    className={clsx(
      'flex h-[36px] items-center justify-center rounded-full px-4 text-sm font-semibold',
      variants[variant],
      sizes[size],
      className
    )}
    onClick={onClick}
    {...rest}
  >
    {text}
  </button>
)
