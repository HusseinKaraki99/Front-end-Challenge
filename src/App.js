import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import Row from './Components/Row/Row'
import axios from 'axios'
export default function App() {

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

  const observer = useRef()
  const lastRepositoryId = useCallback(node => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [])

  useEffect(() => {

    let date = new Date()
    date.setDate(date.getDate() - 30);
    let targetDate = date.toISOString().split('T')[0];


    let cancel;
    axios({
      method: 'GET',
      url: `https://api.github.com/search/repositories?q=created:>${targetDate}&sort=stars&order=desc&page=${page}`,
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(response => {
        setData(prevData => {
          return [...new Set([...prevData, ...response.data.items.map(item => item)])]

        })
      })
      .catch(e => {
        if (axios.isCancel(e)) return
      })
    return () => cancel()


  }, [page])


  return (
    <div className="container">
      {data.map((item, index) => {

        if (data.length === index + 1) {
          return <div key={index} ref={lastRepositoryId}>
            <Row name={item.name} avatar={item.owner.avatar_url} description={item.description} stars={item.stargazers_count} issues={item.open_issues_count} startDate={item.created_at} username={item.owner.login} />
          </div>
        }
        else {
          return <div key={index}>
            <Row name={item.name} avatar={item.owner.avatar_url} description={item.description} stars={item.stargazers_count} issues={item.open_issues_count} startDate={item.created_at} username={item.owner.login} />
          </div>
        }
      })}

    </div >
  );
}


