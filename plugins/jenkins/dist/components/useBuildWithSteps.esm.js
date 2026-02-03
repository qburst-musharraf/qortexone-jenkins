import { useCallback } from 'react';
import useAsyncRetry from 'react-use/esm/useAsyncRetry';
import { jenkinsApiRef } from '../api/JenkinsApi.esm.js';
import { useAsyncPolling } from './useAsyncPolling.esm.js';
import { useApi, errorApiRef } from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { getCompoundEntityRef } from '@backstage/catalog-model';

const INTERVAL_AMOUNT = 1500;
function useBuildWithSteps({
  jobFullName,
  buildNumber
}) {
  const api = useApi(jenkinsApiRef);
  const errorApi = useApi(errorApiRef);
  const { entity } = useEntity();
  const getBuildWithSteps = useCallback(async () => {
    try {
      const entityName = await getCompoundEntityRef(entity);
      return api.getBuild({ entity: entityName, jobFullName, buildNumber });
    } catch (e) {
      errorApi.post(e);
      return Promise.reject(e);
    }
  }, [buildNumber, jobFullName, entity, api, errorApi]);
  const { loading, value, retry } = useAsyncRetry(
    () => getBuildWithSteps(),
    [getBuildWithSteps]
  );
  const { startPolling, stopPolling } = useAsyncPolling(
    getBuildWithSteps,
    INTERVAL_AMOUNT
  );
  return [
    { loading, value, retry },
    {
      getBuildWithSteps,
      startPolling,
      stopPolling
    }
  ];
}

export { useBuildWithSteps };
//# sourceMappingURL=useBuildWithSteps.esm.js.map
