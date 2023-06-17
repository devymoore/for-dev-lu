import { mainnet } from "wagmi";
import {
  housePlantsABI,
  housePlantsAddress,
  mechaFuturesABI,
  mechaFuturesAddress,
  usePrepareHousePlantsGrowPlants,
  usePrepareMechaFuturesMint,
} from "../wagmi/generated";
import { MintFeltProject } from "./mintFeltProject";

export function MintFeltProjects() {
  return (
    <div>      
      <MintFeltProject
        abi={housePlantsABI}
        prepareWrite={usePrepareHousePlantsGrowPlants}
        address={housePlantsAddress[mainnet.id]}
      />
      <MintFeltProject
        // temporarily make look like house plants
        abi={mechaFuturesABI as any}
        prepareWrite={usePrepareMechaFuturesMint}
        address={mechaFuturesAddress[mainnet.id]}
      />
    </div>
  );
}
