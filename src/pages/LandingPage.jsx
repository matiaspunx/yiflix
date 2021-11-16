import React from 'react'
import { useOutlet } from "react-router"
import { Search } from '../components/Search';
import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from '../hooks/useQuery';

const Context = React.createContext(null)

export function Outlet({ data }) {
  const el = useOutlet()
  return <Context.Provider value={data}>{el}</Context.Provider>
}

export function useOutletContext() {
  const context = React.useContext(Context)
  if (!context) {
    throw Error('Using context while not in an Outlet Provider')
  }
  return context
}

export const LandingPage = () => {
  const query = useQuery();
  let search = query.get("search");

  let deboucedSearch = useDebounce(search, 300);

  if(!deboucedSearch) {
    deboucedSearch = 999999
  }

  //console.log('en landing page? ', deboucedSearch)

  return (
    <>
    <Search />
    <Outlet key={deboucedSearch} data={deboucedSearch} />
    </>
  )
}
