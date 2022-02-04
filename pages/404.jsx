import Link from 'next/link'
import classes from '../styles/error.module.scss'
import { Layout } from "../components/layout/layout"

export default function ErrorPage() {
  return (
      <>
        <Layout>
          <h1 className={classes.error}>Ничего не найдено</h1>
        </Layout>
      </>
  )
}