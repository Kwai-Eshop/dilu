import { createRoot, Root } from 'react-dom/client';
import { isDLRunEnvironment, registerDLMicro } from '@ks-dilu/react-micro';
import App from './App';

const rootNodeId = 'root2';

registerDLMicro(
  {
    rootNodeId,
    App,
  },
  true,
);

export * from '@ks-dilu/react-micro';
