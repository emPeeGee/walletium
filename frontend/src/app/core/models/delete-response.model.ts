export interface DeleteResponse {
  afected: number;
  raw: {
    affectedRows: number;
    changedRows: number;
    fieldCount: number;
    insertId: number;
    message: number;
    protocol41: number;
    serverStatus: number;
    warningCount: number;
  };
}
