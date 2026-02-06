import { useState } from 'react';
import useAsyncRetry from 'react-use/esm/useAsyncRetry';
import { jenkinsApiRef } from '../api/JenkinsApi.esm.js';
import { useApi, errorApiRef } from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { getCompoundEntityRef } from '@backstage/catalog-model';

function useJobRuns(jobFullName) {
  const { entity } = useEntity();
  const api = useApi(jenkinsApiRef);
  const errorApi = useApi(errorApiRef);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [error, setError] = useState();
  const { loading, value: jobRuns } = useAsyncRetry(async () => {
    try {
      const jobBuilds = await api.getJobBuilds({
        entity: getCompoundEntityRef(entity),
        jobFullName
      });
      return jobBuilds;
    } catch (e) {
      const errorType = e.notFound ? 1 /* NOT_FOUND */ : 0 /* CONNECTION_ERROR */;
      setError({ message: e.message, errorType });
      throw e;
    }
  }, [api, errorApi, entity]);
  return [
    {
      page,
      pageSize,
      loading,
      jobRuns,
      error
    },
    {
      setPage,
      setPageSize
    }
  ];
}

export { useJobRuns };
//# sourceMappingURL=useJobRuns.esm.js.map
