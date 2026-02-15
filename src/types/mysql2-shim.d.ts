declare module "mysql2" {
  export interface RowDataPacket {
    [column: string]: unknown;
  }
}

declare module "mysql2/promise" {
  export interface Pool {
    query<T = unknown>(sql: string, values?: unknown[]): Promise<[T, unknown]>;
  }

  export interface PoolOptions {
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    database?: string;
    waitForConnections?: boolean;
    connectionLimit?: number;
    queueLimit?: number;
  }

  const mysql: {
    createPool(options: PoolOptions): Pool;
  };

  export default mysql;
}
