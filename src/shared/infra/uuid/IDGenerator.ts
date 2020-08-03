import IIDGenerator from "@shared/utils/IIDGenerator";

import { v4 } from "uuid";

export default class IDGenerator implements IIDGenerator {
  public getId() {
    return v4();
  }
}
