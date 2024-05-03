export const Main: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props

  return <main className="flex h-screen flex-col p-7">{children}</main>
}
