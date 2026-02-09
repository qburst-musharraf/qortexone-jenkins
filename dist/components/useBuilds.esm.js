import { useState } from 'react';
import useAsyncRetry from 'react-use/esm/useAsyncRetry';
import { jenkinsApiRef } from '../api/JenkinsApi.esm.js';
import { useApi, errorApiRef } from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { getCompoundEntityRef } from '@backstage/catalog-model';

var ErrorType = /* @__PURE__ */ ((ErrorType2) => {
  ErrorType2[ErrorType2["CONNECTION_ERROR"] = 0] = "CONNECTION_ERROR";
  ErrorType2[ErrorType2["NOT_FOUND"] = 1] = "NOT_FOUND";
  return ErrorType2;
})(ErrorType || {});
function useBuilds({ branch } = {}) {
  const { entity } = useEntity();
  const entityName = getCompoundEntityRef(entity);
  const api = useApi(jenkinsApiRef);
  const errorApi = useApi(errorApiRef);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [error, setError] = useState();
  const restartBuild = async (jobFullName, buildNumber) => {
    try {
      await api.retry({ entity: entityName, jobFullName, buildNumber });
    } catch (e) {
      errorApi.post(e);
    }
  };
  const {
    loading,
    value: projects,
    retry
  } = useAsyncRetry(async () => {
    try {
      const build = await api.getProjects({
        entity: getCompoundEntityRef(entity),
        filter: { branch }
      });
      setTotal(build.length);
      return build;
    } catch (e) {
      const errorType = e.notFound ? 1 /* NOT_FOUND */ : 0 /* CONNECTION_ERROR */;
      setError({ message: e.message, errorType });
      throw e;
    }
  }, [api, errorApi, entity, branch]);
  return [
    {
      page,
      pageSize,
      loading,
      projects,
      total,
      error
    },
    {
      setPage,
      setPageSize,
      restartBuild,
      retry
      // fetch data again
    }
  ];
}

export { ErrorType, useBuilds };
//# sourceMappingURL=useBuilds.esm.js.map
