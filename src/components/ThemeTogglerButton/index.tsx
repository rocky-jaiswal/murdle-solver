import { useTranslation } from 'react-i18next'

interface Props {
  handleClick: () => void
}

export const ThemeTogglerButton: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation()

  return (
    <button onClick={props.handleClick} className="rounded-sm p-4">
      {t('ThemeTogglerButton.toggleTheme')}
    </button>
  )
}
