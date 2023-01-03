import { ReactNode } from 'react'
import ScrollButton from '../ScrollButton/ScrollButton'
import './PageContainer.scss'

interface IContainer {
  children: ReactNode
}

function PageContainer({ children }: IContainer) {
  return (
    <div className="container mx-auto px-4 pt-5">
      <ScrollButton />
      <main>{children}</main>
    </div>
  )
}

export default PageContainer
