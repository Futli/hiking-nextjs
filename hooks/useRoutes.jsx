import { useRef } from "react";
import { useCallback, useEffect, useState } from "react";
import { api } from "../services/hiking-service";

const pageSize = 9
export const useRoutes = ({ serverRoutes }) => {
  const [totalRows, setTotalRows] = useState(serverRoutes.pager.rows)
  const [routes, setRoutes] = useState(serverRoutes.data)
  const [isLoading, setLoading] = useState(false);
  const [areaId, setAreaId] = useState('');
  const [filter, setFilter] = useState('');

  const [isShouldLoad, setIsShouldLoad] =  useState(false)

  const [page, setPage] = useState(1);
  
  const load = async ({ areaId, filter, page }) => {
    setLoading(true)
    const result = await api.getRoutes({ page, pageSize, areaId, filter });
    setTotalRows(result.pager.rows)
    setLoading(false)

    return result.data
  }

  useEffect(() => {
    setPage(1)
    const filterChangesHandler = async () => {
      const newRoutes = await load({ areaId, filter, page })
      setRoutes(newRoutes)
    }

    if (isShouldLoad) {
      filterChangesHandler()
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaId, filter])

  useEffect(() => {
    const pageChangeHandler = async () => {
      const newRoutes = await load({ areaId, filter, page })
      setRoutes(prev => [...prev, ...newRoutes])
    }

    if (isShouldLoad) {
      pageChangeHandler()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const setIsShouldLoadRef = useCallback(() => setIsShouldLoad(true), [])

  return {
    routes,
    totalRows,
    isLoading,
    area: {
      setAreaId: useCallback((id) => {
        setAreaId(id)
        setIsShouldLoadRef()
      }, [setIsShouldLoadRef]),
      areaId,
    },
    loadMore: useCallback(() => {
      setPage(page => page + 1)
      setIsShouldLoadRef()
    }, [setIsShouldLoadRef]),
    filter: {
      value: filter,
      onChange: useCallback((p) => {
        setFilter(p)
        setIsShouldLoadRef()
      }, [setIsShouldLoadRef]),
    },
  }
}
