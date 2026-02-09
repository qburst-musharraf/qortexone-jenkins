import { columnFactories } from './columns.esm.js';

const defaultCITableColumns = [
  columnFactories.createTimestampColumn(),
  columnFactories.createSourceColumn(),
  columnFactories.createBuildColumn(),
  columnFactories.createTestColumn(),
  columnFactories.createStatusColumn(),
  columnFactories.createLastRunDuration(),
  columnFactories.createActionsColumn()
];

export { defaultCITableColumns };
//# sourceMappingURL=presets.esm.js.map
