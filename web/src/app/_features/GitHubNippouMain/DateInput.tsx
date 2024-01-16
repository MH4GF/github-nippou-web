import { Input, Label } from '@/app/_components'

function format(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

interface Props {
  name: string
  label: string
}

export const DateInput = ({ name, label }: Props) => {
  const today = new Date()

  return (
    <div className="grid gap-1">
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} id={name} type="date" defaultValue={format(today)} />
    </div>
  )
}
