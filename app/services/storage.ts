import {Injectable} from "@angular/core";
import {Storage, SqlStorage} from "ionic-angular";
import {Subject} from "rxjs";

@Injectable()
export class StorageService {

  private storage: Storage;
  private tablesToCreate = [
    'last_products'
  ]
  private lastProductStream = new Subject();

  constructor() {
    this.storage = new Storage(SqlStorage, {
      name: "janari",
      backupFlag: SqlStorage.BACKUP_LOCAL,
      existingDatabase: true
    });

    let self = this;

    this.tablesToCreate.forEach((table) => {
      self.storage.query(
        `CREATE TABLE IF NOT EXISTS ${table} (data)`
      );
    });

    this.storage.query(
      `SELECT * FROM last_products`
    ).then((resp) => {
      const rows = resp.res.rows;

      for(let i = 0; i < rows.length; i++) {
        this.lastProductStream.next(JSON.parse(rows[i].data.replace(/§/g, '"')));
      }
    })
  }

  insertLastSeenProduct(product: any) {
    const encodedProduct = JSON.stringify(product).replace(/"/g, '§');

    this.storage.query(
      `SELECT * FROM last_products WHERE data = "${encodedProduct}"`
    ).then((resp) => {
      const rows = resp.res.rows;
      if (rows.length > 0) {
        this.storage.query(
          `DELETE FROM last_products WHERE data = "${encodedProduct}"`
        );
      }

      this.lastProductStream.next(product);
      this.storage.query(
        `INSERT INTO last_products(data) values("${encodedProduct}")`
      );
    });
  }

  getLastProductsObervable() {
    return this.lastProductStream;
  }
}
